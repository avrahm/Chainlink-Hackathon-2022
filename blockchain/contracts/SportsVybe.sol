// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
@Description: DAPP token
*/
contract SportsVybe is Ownable {

    IERC20 public sportsVybeToken;

    struct Team{
        uint id; //Identifier
        string name; //The name of the team
        address owner; //The team creator, 
    }

    struct TeamMate {
        uint team_id;
        address member;
    }


    struct ChallengePool{
        address team1;
        address team2; 
        uint256 amount;
        bool isClosed; 
        bool isCompleted;
    }
    
    //emit this event when ever a team joins a challenge
    event EventCreated(uint challenge_id, uint team1, uint team2);

    Team[] public teams; //List of all the teams on chain

    /*
      Cases for sportmanship reduction
      1. Did not show up for a challege
    */
    mapping(address => uint256) public sportsmanship; //the sportsmanship of each users
 
    constructor(address _sportsVybeToken) public {
        sportsVybeToken = IERC20(_sportsVybeToken);
    }

    function createTeam (string name) external {

    }

    function createChallengePool(uint amount) external returns (bool){

    }

    /*
      @description: Team owner can join a challenge created by another team creator
      @params: challenge_id -The challenge pool id
      @returns: bool
    */
    function joinChallengePool(uint challenge_id) external payable returns (bool) {


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

    /*
      @description: return a sinlge user sportmanship
      
      @params: _user -The user wallet address
      @returns: uint
    */
    function getUserSportsmanship(address _user) public returns ( uint){

    }
 
}
