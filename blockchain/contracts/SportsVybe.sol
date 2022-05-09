// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
@Description: SportsVybe 
*/

//Errors
error FailedEventCreation(uint);
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
        address team1;
        address team2; 
        uint256 amount;
        bool isClosed; 
        bool isCompleted;
    }
    
    //emit this event when ever a team joins a challenge
    event EventCreated(uint challenge_id, address team1, address team2);
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
    
    mapping (uint => TeamMate[]) team_membership_request;

    mapping (uint => TeamMate[]) teamMembers;
    mapping (uint => uint) teamCount;


    constructor(address _sportsVybeToken) public {
        sportsVybeToken = IERC20(_sportsVybeToken);
    }

    function createTeam (string memory _name, string memory _game) external returns (uint) {

      teams.push(Team(_name, msg.sender,_game)) ;

      uint id = teams.length - 1;

      return id;

    }

    function createChallengePool(uint amount) external newSportsmanship (msg.sender) returns (uint) {

       challengePools.push(ChallengePool(msg.sender, msg.sender ,amount,false,false));
       
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
      emit NewTeamMate(team_id, msg.sender);

    }

    function hh() public returns(address) {
       return team_membership_request[0][0].user;
    }

    function getTeamMate(uint team_id) public returns(TeamMate[] memory) {
      return teamMembers[team_id];
    }

    function getTeamCount(uint team_id) external returns(uint) {

      return  teamCount[team_id];
       
    }

    /*
      @description: Team owner can join a challenge created by another team creator
      @params: challenge_id -The challenge pool id
      @returns: bool
    */
    function joinChallengePool(uint challenge_id) external payable returns (bool)  {
     
     //Ensure that a new team is joinin the challenge
     if(challengePools[challenge_id].team1 == msg.sender){
       revert FailedEventCreation(challenge_id);
     }

     //Ensure that the new team has sufficient balance to join the challenge

     if(msg.value < challengePools[challenge_id].amount){
        revert FailedEventCreation_InsufficientBalance(challenge_id,msg.value);
     }

     //move ether to sportsVybe Token contract
     sportsVybeToken.transfer(msg.sender, challengePools[challenge_id].amount);

     challengePools[challenge_id].team2 = msg.sender;
     
     emit EventCreated(challenge_id, challengePools[challenge_id].team1, msg.sender );

    }


    /*
      @description: return team's sportmanship based on 
                    the members of the team, hence;
                    teams_sportsmanship = total players sportmanship / total number of players 
      
      @params: id -The team's ID
      @returns: uint
    */
    function getTeamSportsmanship(uint id) public returns ( uint){

    }


    modifier newSportsmanship(address user){
      if(sportsmanship[user] == 0){
        sportsmanship[user] = 100;
      }
       _;
    }
 
}
