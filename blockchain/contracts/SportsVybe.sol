// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
@Description: SportsVybe 
*/

//Errors
error FailedEventCreation_DuplicateTeam(uint);
error NotFound(uint);
error FailedEventCreation_ChallengePoolClosed(uint);

error NotFoundMembershipRequest(uint, address);
error FailedEventCreation_InsufficientBalance(uint, uint);
error sendTeamMembershipRequest_Unauthorized(uint, address);


contract SportsVybe is Ownable {

    IERC20 public sportsVybeToken;

    struct Team{
        string name; //The name of the team
        address owner; //The team creator, 
        string game; // e.g: football, tennis,
    }

    struct TeamMate{
        address user; //The name of the team
    }


    struct ChallengePool{
        uint team1;
        uint team2; 
        uint256 amount;
        bool isClosed; 
        bool isCompleted;
    }
    
    //emit this event when ever a team joins a challenge
    event EventCreated(uint challenge_id, uint team1, uint team2);
    event ChallengePoolCreated(uint challenge_id, uint amount);
    event NewTeamMate(uint team_id, address user);
    event MembershipRequestSent(uint team_id);

    Team[] public teams; //List of all the teams on chain
    ChallengePool[] public challengePools; //List of all the teams on chain

    /*
      Cases for sportmanship reduction
      1. Did not show up for a challege
     
    */
    mapping(address => uint256) public sportsmanship; //the sportsmanship of each users
    
    mapping (uint => TeamMate[]) public team_membership_request;
    mapping (uint => address) public team_owner;
    mapping (uint => uint) public team_sportsmanship;


    mapping (uint => TeamMate[]) teamMembers;
    mapping (uint => uint) teamCount;


    constructor (address _sportsVybeToken) public {
        sportsVybeToken = IERC20(_sportsVybeToken);
    }

    function createTeam (string memory _name, string memory _game) external returns (uint) {

      teams.push(Team(_name, msg.sender,_game)) ;

      uint team_id = teams.length - 1;

      team_owner[team_id] = msg.sender;

      teamCount[team_id] = 1;

      team_sportsmanship[team_id] = 100;

      return team_id;

    }

    function createChallengePool(uint team_id, uint amount) external newSportsmanship (msg.sender) returns (uint) {

       challengePools.push(ChallengePool(team_id, 0 ,amount,false,false));
       
       uint id = challengePools.length - 1;

       emit ChallengePoolCreated(id, amount);
       
       return id;

    }

    function sendTeamMembershipRequest(uint team_id, address user) external newSportsmanship (msg.sender) returns(bool) {
      //TODO: Check if team members reached max for the game

      //ENSURE that the team belongs to msg.sender
      if(teams[team_id].owner != msg.sender){
        revert sendTeamMembershipRequest_Unauthorized(team_id, user);
      }

      team_membership_request[team_id].push(TeamMate(user));
      emit MembershipRequestSent(team_id);
      return true;
       
    }

    function acceptMembershipTeamRequest(uint team_id) public newSportsmanship (msg.sender){
      
      uint found = 0;
      for(uint i = 0; i < team_membership_request[team_id].length; i++ ){
        if(team_membership_request[team_id][i].user == msg.sender){
          found = 1;
          break;
        }
      }

      if(found == 0){
         revert NotFoundMembershipRequest(team_id, msg.sender);
      }


      teamMembers[team_id].push(TeamMate(msg.sender));
      teamCount[team_id] = teamCount[team_id] + 1;
      team_sportsmanship[team_id] = 100;

      emit NewTeamMate(team_id, msg.sender);

    }

    // function hh() public returns(address) {
    //    return team_membership_request[0][0].user;
    // }

    function getTeamMate(uint team_id) view public returns(TeamMate[] memory)  {
      return teamMembers[team_id];
    }

    function getTeamCount(uint team_id) view external returns(uint) {

      return  teamCount[team_id];
       
    }

    /*
      @description: Team owner can join a challenge created by another team creator
      @params: challenge_id -The challenge pool id
      @returns: bool
    */
    function joinChallengePool(uint team_id, uint challenge_id) external payable returns (bool)  {
     
     //TODO:Ensure that the Challenge exist
     

     //Ensure that the Challenge is still open
     if(challengePools[challenge_id].isClosed == true){
       revert FailedEventCreation_ChallengePoolClosed(challenge_id);
     }

     //Ensure that the new team joinin the challenge is not creator
     if(team_owner[team_id] == msg.sender){
       revert FailedEventCreation_DuplicateTeam(challenge_id);
     }

     //Ensure that the new team has sufficient balance to join the challenge
     if(msg.value < challengePools[challenge_id].amount){
        revert FailedEventCreation_InsufficientBalance(challenge_id,msg.value);
     }

     //move ether to sportsVybe Token contract
     sportsVybeToken.transfer(msg.sender, challengePools[challenge_id].amount);

     challengePools[challenge_id].team2 = team_id;
     
     emit EventCreated(challenge_id, challengePools[challenge_id].team1, challengePools[challenge_id].team2 );
      
      return true;

    }


    /*
      @description: return team's sportmanship based on 
                    the members of the team, hence;
                    teams_sportsmanship = total players sportmanship / total number of players 
      
      @params: id -The team's ID
      @returns: uint
    */
    function getTeamSportsmanship(uint team_id) public returns ( uint){
       return team_sportsmanship[team_id] / teamCount[team_id];
    }


    modifier newSportsmanship(address user){
      if(sportsmanship[user] == 0){
        sportsmanship[user] = 100;
      }
       _;
    }
 
}
