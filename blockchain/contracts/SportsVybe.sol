// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

/*
@Description: SportsVybe 
*/

//TODO: use chainlink VRF for uquiue Identifier -> Challenge, Team

//Errors
error FailedEventCreation_DuplicateTeam(uint);
error NotFound(uint);
error FailedEventCreation_ChallengePoolClosed(uint);
error NotAllowed(uint, uint);
error Unauthorized(uint);
error Team_Unauthorized(uint);
error InsufficientBalance(uint,uint);
error Vote_Unauthorized(uint);



error NotFoundMembershipRequest(uint, address);
error FailedEventCreation_InsufficientBalance(uint, uint);
error sendTeamMembershipRequest_Unauthorized(uint, address);
error ChallengePoolCreation_Unauthorized(uint);


contract SportsVybe is Ownable, KeeperCompatibleInterface {

    IERC20 public sportsVybeToken;

    //Remove Game
    // struct Team{
    //     string name; //The name of the team
    //     address owner; //The team creator, 
    //     string game; // e.g: football, tennis,
    // }

    struct TeamMate{
        address user; //The name of the team
    }


    struct ChallengePool{
        uint team1;
        uint team2; 
        uint256 amount;
        bool isClosed; 
        bool isCompleted;
        uint createdAt;
        uint interval;
    }
    
    //emit this event when ever a team joins a challenge
    event TeamCreated(uint team_id);

    event EventCreated(uint challenge_id, uint team1, uint team2);
    event ChallengePoolCreated(uint challenge_id, uint amount, uint team_id, uint challenged_team_id);
    event ChallengePoolClosed(uint challenge_id);
    event NewTeamMate(uint team_id, address user);
    event MembershipRequestSent(uint team_id);

    ///Team[] public teams; //List of all the teams on chain
    ChallengePool[] public challengePools; //List of all the teams on chain

    /*
      Cases for sportmanship reduction
      1. Did not show up for a challege
     
    */
    mapping(address => uint256) public sportsmanship; //the sportsmanship of each users
    mapping (uint => TeamMate[]) public team_membership_request;
    mapping (uint => address) public team_owner;
    mapping (uint => uint) public team_sportsmanship;
    mapping (uint => uint) public challenged_team_pool;
    mapping (uint => TeamMate[]) teamMembers;
    mapping (uint => uint) teamCount;
    mapping (uint => address[] )  challengPoolTeamMembers;
    mapping (uint => uint )  challengPoolVote;


    uint team_id = 0;

    uint counter = 0;

    constructor (address _sportsVybeToken) public {
        sportsVybeToken = IERC20(_sportsVybeToken);
    }

    function createTeam () external 
      newSportsmanship () 
      returns (uint) {

      //teams.push(Team(_name, msg.sender,_game)) ;

      //uint team_id = teams.length - 1;
      uint _team_id = team_id+1;

      team_owner[_team_id] = msg.sender;

      teamCount[_team_id] = 1;

      team_sportsmanship[_team_id] = 100;
      emit TeamCreated(_team_id);
      
      //increment the team id
      team_id++;
      return _team_id;

    }

    //TODO: Time bond(lock)

    function closeChallenge(uint challenge_id) internal {
 
      ChallengePool memory _challenge_pool = challengePools[challenge_id];

      //close the challenge
      _challenge_pool.isClosed = true;

      //team owner
      address _owner = team_owner[_challenge_pool.team1];

      //move ether back to the challenge pool creator
      sportsVybeToken.transfer(_owner, _challenge_pool.amount);

      emit ChallengePoolClosed(challenge_id);
    }

    function delineChallenge(
      uint challenge_id,
      uint team_id) external 
      teamOwner(team_id) 
      returns(bool){

        closeChallenge(challenge_id);
        return true;
       
    }

    function acceptChallenge(
      uint challenge_id,
      uint team_id) 
      teamOwner(team_id) 
      external payable 
      returns(bool) {
       //Ensure msg.sender is the owner of the team
      //  if(team_owner[team_id] != msg.sender){
      //    revert Unauthorized(team_id);
      //  }

       //Ensure that team id has been challenged to participate in the challenge pool
       if(challenged_team_pool[challenge_id] == team_id){
         revert NotAllowed(challenge_id, team_id);
       }

       //Ensure the team owner has the required amount for participation
       uint challenge_amount = challengePools[challenge_id].amount;
       if(msg.value >= challenge_amount){
          revert InsufficientBalance(challenge_id,challenge_amount);
       }

       //Receive SVT token of the challenge
       sportsVybeToken.transfer(msg.sender, challenge_amount);

       challengePools[challenge_id].team2 = team_id;
     
       emit EventCreated(challenge_id, challengePools[challenge_id].team1, challengePools[challenge_id].team2 );
      
      return true;


       //emit event created

    }

    function createChallengePool(
       uint team_id, 
       uint challenged_team_id, 
       uint amount) external 
       newSportsmanship () 
       teamOwner(team_id) 
       returns (uint) {

       uint _interval = 5;
       challengePools.push(ChallengePool(
         team_id, 
         challenged_team_id,
         amount,
         false,
         false,
         block.timestamp,
         _interval
        ));
       uint id = challengePools.length - 1;

       //the challenged team
       challenged_team_pool[id] = challenged_team_id;


       emit ChallengePoolCreated(id, amount, team_id, challenged_team_id);
       
       return id;

    }

    function sendTeamMembershipRequest(uint team_id, address user) external 
      newSportsmanship ()
      teamOwner(team_id) 
      returns(bool) {
      //TODO: Check if team members reached max for the game

      //ENSURE that the team belongs to msg.sender
      // if(team_owner[team_id] != msg.sender){
      //   revert sendTeamMembershipRequest_Unauthorized(team_id, user);
      // }

      team_membership_request[team_id].push(TeamMate(user));
      emit MembershipRequestSent(team_id);
      return true;
       
    }


    function acceptMembershipTeamRequest(uint team_id) public 
      newSportsmanship (){
      
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
      team_sportsmanship[team_id] = team_sportsmanship[team_id] + 100;

      emit NewTeamMate(team_id, msg.sender);

    }

    // function hh() public returns(address) {
    //    return team_membership_request[0][0].user;
    // }

    function getTeamMate(uint team_id) view public 
      returns(TeamMate[] memory)  {
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
    // function joinChallengePool(
    //   uint team_id, 
    //   uint challenge_id) external payable 
    //   returns (bool)  {
     
    //  //TODO:Ensure that the Challenge exist
     

    //  //Ensure that the Challenge is still open
    //  if(challengePools[challenge_id].isClosed == true){
    //    revert FailedEventCreation_ChallengePoolClosed(challenge_id);
    //  }

    //  //Ensure that the new team joinin the challenge is not creator
    //  if(team_owner[team_id] == msg.sender){
    //    revert FailedEventCreation_DuplicateTeam(challenge_id);
    //  }

    //  //Ensure that the new team has sufficient balance to join the challenge
    //  if(msg.value < challengePools[challenge_id].amount){
    //     revert FailedEventCreation_InsufficientBalance(challenge_id,msg.value);
    //  }

    //  //move ether to sportsVybe Token contract
    //  sportsVybeToken.transfer(msg.sender, challengePools[challenge_id].amount);

    //  challengePools[challenge_id].team2 = team_id;
     
    //  emit EventCreated(challenge_id, challengePools[challenge_id].team1, challengePools[challenge_id].team2 );
      
    //   return true;

    // }


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

    function voteForWinner(uint challenge_id) external returns(bool){
      ChallengePool memory _challenge_pool = challengePools[challenge_id];

      address[] memory members = challengPoolTeamMembers[_challenge_pool.team1];
       //Vote must be casted by members of the team in the challenge
      bool is_member = false;
      for (uint i=0; i < members.length; i++) {
          if (msg.sender == members[i]) {
              is_member = true;
          }
      }

      if(is_member != true){
         revert Vote_Unauthorized(challenge_id);
      }

      //TODO: check if msg.sender has cast a vote   
     
      
      //Timelock the reward if a team's vote exceeds the total number of player from both team(TNP)/2
      //Giveout reward after Timelock expiration
      challengPoolVote[challenge_id] += 1;

      if(challengPoolVote[challenge_id] == (challengPoolTeamMembers[challenge_id].length/2 )) {
        //Reduce their sportmansip.
        //Give back the challenge reward to team owner
      }

      if(challengPoolVote[challenge_id] > challengPoolTeamMembers[challenge_id].length/2 ) {
        //Give team owner their reward.
      }


    }

 

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory  performData ) {
      
       for(uint i = 0; i < challengePools.length; i++){
          upkeepNeeded = challengePools[i].createdAt + challengePools[i].interval > block.timestamp;
          performData = abi.encode(i);
       }
      //upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;

      // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata performData ) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
       uint _id = abi.decode(performData, (uint256));
        if (challengePools[_id].createdAt + challengePools[_id].interval > block.timestamp ) {
            counter = counter + 1;
            closeChallenge(_id);
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }


    modifier newSportsmanship(){
      if(sportsmanship[msg.sender] == 0){
        sportsmanship[msg.sender] = 100;
      }
       _;
    }

    modifier teamOwner(uint team_id){
      if(team_owner[team_id] != msg.sender){
         revert Team_Unauthorized(team_id);
       }
       _;
    }

    
 
}
