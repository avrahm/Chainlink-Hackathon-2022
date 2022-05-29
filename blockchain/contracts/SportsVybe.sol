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
error NotAllowed_For_Challenge(uint, uint);
error Unauthorized(uint);
error Team_Unauthorized(uint);
error InsufficientBalance(uint,uint);
error Vote_Unauthorized(uint);
error Duplicate_Vote(uint);
error Invalid_Team(uint);


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

    struct ChallengeVote{
        uint challenge_id;
    }

    struct ChallengePool{
        uint team1;
        uint team2; 
        uint256 amount;
        bool isClosed; 
        bool isCompleted;
        uint createdAt;
        uint interval;
        uint team1_count;
        uint team2_count;  
    }
    
    //emit this event when ever a team joins a challenge
    event TeamCreated(uint team_id);

    event EventCreated(uint challenge_id, uint team1, uint team2);
    event ChallengePoolCreated(uint challenge_id, uint amount, uint team_id, uint challenged_team_id);
    event ChallengePoolClosed(uint challenge_id);
    event NewTeamMate(uint team_id, address user);
    event MembershipRequestSent(uint team_id);

    ///Team[] public teams; //List of all the teams on chain
    //ChallengePool[] public challengePools; //List of all the teams on chain



    /*
      Cases for sportmanship reduction
      1. Did not show up for a challege
     
    */
    mapping (address => ChallengeVote[]) votes;

    mapping(address => uint256) public sportsmanship; //the sportsmanship of each users
    mapping (uint => TeamMate[]) public team_membership_request;
    mapping (uint => address) public team_owner;
    mapping (uint => uint) public team_sportsmanship;
    //mapping (uint => uint) public challenged_team_pool;
   // mapping (uint => TeamMate[]) teamMembers;
    mapping (uint => uint) public teamCount;
    mapping (uint => address[] ) public  teamMembers;
    mapping (uint => uint ) public challengPoolVote;
    mapping (uint => ChallengePool) public challengePools;
    mapping (uint => address[]) public challengPoolTeamMembers;

    uint[] public pending_challenge_pool_ids;


    uint team_id = 0;

    uint new_challenge_id = 889;

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

      teamMembers[team_id].push(msg.sender);
      
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
       if(challengePools[challenge_id].team2 != team_id){
         revert NotAllowed_For_Challenge(challenge_id, team_id);
       }

       //Ensure the team owner has the required amount for participation
       uint challenge_amount = challengePools[challenge_id].amount;
       if(msg.value >= challenge_amount){
          revert InsufficientBalance(challenge_id,challenge_amount);
       }

       //Receive SVT token of the challenge
       //sportsVybeToken.transfer(address(this), challenge_amount);

       challengePools[challenge_id].team2 = team_id;
     
       emit EventCreated(challenge_id, challengePools[challenge_id].team1, challengePools[challenge_id].team2 );
      
      return true;


       //emit event created

    }

    function createChallengePool(
       uint team_id, 
       uint challenged_team_id
       ) public payable
       newSportsmanship () 
       teamOwner(team_id) 
       returns (uint) {

       uint _interval = 5;
       uint id = new_challenge_id;
       challengePools[id] = ChallengePool(
         team_id, 
         challenged_team_id,
         msg.value,
         false,
         false,
         block.timestamp,
         _interval,
         0,
         0
         
        );

      //TODO: Ensure that team owned by team owner cannot compeet with it self. 
      //Ensure that team owner has  funds to create challenge
      // if(amount >= msg.value ){
      //   revert InsufficientBalance(0,amount);
      // }

      //move funds to smart contract
      sportsVybeToken.transfer(address(this),msg.value);

      //TODO: Add the members of the team      

      pending_challenge_pool_ids.push(id);

     //create variable and increment id
      new_challenge_id += 1;

     

       //the challenged team
       //challenged_team_pool[new_challenge_id] = challenged_team_id;

       
       emit ChallengePoolCreated(id, msg.value, team_id, challenged_team_id);
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


      teamMembers[team_id].push(msg.sender);
      teamCount[team_id] = teamCount[team_id] + 1;
      team_sportsmanship[team_id] = team_sportsmanship[team_id] + 100;

      emit NewTeamMate(team_id, msg.sender);

    }

    // function hh() public returns(address) {
    //    return team_membership_request[0][0].user;
    // }

    function getTeamMate(uint team_id) view public 
      returns(address[] memory)  {
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

    function increaseVoteFor(uint challenge_id, uint team_id) public  returns ( uint) {
        //TODO: Close vote when challenge is closed
        ChallengeVote[] memory _address_votes  = votes[msg.sender];
        for(uint i =0; i < _address_votes.length; i++ ){
            //lookup for the challenge
            if(_address_votes[i].challenge_id == challenge_id){
                //revert, Already voted!
                revert Duplicate_Vote(challenge_id);
            }
        }

        //increase vote count for team ID
        if(challengePools[challenge_id].team1 == team_id){
          challengePools[challenge_id].team1_count +=1;
        }else if(challengePools[challenge_id].team2 == team_id){
          challengePools[challenge_id].team2_count +=1;
        }else{
          revert Invalid_Team(team_id);
        }

      //=======check if it's due to give out reward========
      //team a -> 2
      //team b -> 2
      //total -> 3
      //vote team a = 3
      //vote team b = 1
      
      
      // if(totalchallengPoolVote == (challengPoolTeamMembers[challenge_id].length/2 )) {
      //   //Reduce their sportmansip.
      //   //Give back the challenge reward to team owner
      //   address team_1_owner = team_owner[challengePools[challenge_id].team1];
      //   address team_2_owner = team_owner[challengePools[challenge_id].team2];

      //   //sportsVybeToken.transfer(team_1_owner, challengePools[challenge_id].amount/2);
      //  // sportsVybeToken.transfer(team_2_owner, challengePools[challenge_id].amount/2);

      //   challengePools[challenge_id].isClosed = true;
      //   emit ChallengePoolClosed(challenge_id);
      //   return 0;
      // }
      uint totalchallengPoolVote = challengePools[challenge_id].team1_count + challengePools[challenge_id].team2_count;

      //for in team = 1 > 0.5
      //vote = 2
      //member = 2
      if(totalchallengPoolVote == challengPoolTeamMembers[challenge_id].length ) {
        //Give team owner their reward.

        //check for winner
        uint winner = 0;
        if(challengePools[challenge_id].team1 == challengePools[challenge_id].team2){
        //Reduce their sportmansip.
        //Give back the challenge reward to team owner
        address team_1_owner = team_owner[challengePools[challenge_id].team1];
        address team_2_owner = team_owner[challengePools[challenge_id].team2];

        //sportsVybeToken.transfer(team_1_owner, challengePools[challenge_id].amount/2);
       // sportsVybeToken.transfer(team_2_owner, challengePools[challenge_id].amount/2);

        //challengePools[challenge_id].isClosed = true;
       // emit ChallengePoolClosed(challenge_id);
       // return 0;
        }else if(challengePools[challenge_id].team1_count > challengePools[challenge_id].team2_count){
            winner = challengePools[challenge_id].team1;
        }else{
            winner = challengePools[challenge_id].team2;
        }

        //move ether back to the challenge pool creator
        if(winner != 0){
        //sportsVybeToken.transfer(team_owner[winner], challengePools[challenge_id].amount);

        }
        challengePools[challenge_id].isClosed = true;
        emit ChallengePoolClosed(challenge_id);
        return winner;

      }  

      return 10;

    }


    function totalchallengPoolVote (uint challenge_id) public returns(uint){
      return challengePools[challenge_id].team1_count + challengePools[challenge_id].team2_count;

    }

    function challengPoolTeamMemberCount(uint challenge_id) public returns (uint){
      return challengPoolTeamMembers[challenge_id].length;
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory  performData ) {
       //TODO: Only check open challenge pool
       for(uint i = 0; i < pending_challenge_pool_ids.length; i++){
          
          upkeepNeeded = challengePools[pending_challenge_pool_ids[i]].createdAt + challengePools[pending_challenge_pool_ids[i]].interval > block.timestamp;
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
