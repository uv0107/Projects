// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//Here we start the actual contract;
contract VotingSystem {
    address public admin;
    bool public votingStarted;
    bool public votingEnded;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint vote;
    }

    mapping(address => Voter) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    constructor() {
        admin = msg.sender;
        votingStarted = false;
        votingEnded = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier whenVotingActive() {
        require(votingStarted && !votingEnded, "Voting is not active");
        _;
    }

    // Admin only can add the candidates before the voting.
    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Active the VotingPhase
    function startVoting() public onlyAdmin {
        require(candidatesCount > 0, "Add candidates first");
        votingStarted = true;
        votingEnded = false;
    }

    // Deactive the votingphase
    function endVoting() public onlyAdmin {
        require(votingStarted, "Voting has not started yet");
        votingEnded = true;
    }

    //Any wallet can vote once:
    function vote(uint _candidateId) public whenVotingActive {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        voters[msg.sender] = Voter(true, _candidateId);
        candidates[_candidateId].voteCount++;
    }

    //single candidate’s data
    function getCandidate(uint _id) public view returns (string memory, uint) {
        require(_id > 0 && _id <= candidatesCount, "Candidate does not exist");
        Candidate memory c = candidates[_id];
        return (c.name, c.voteCount);
    }

    //All candidates and vote counts 
    function getResults() public view returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            result[i - 1] = candidates[i];
        }
        return result;
    }
}
