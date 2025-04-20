import React, { useState } from 'react';
import Web3 from 'web3';
import './AdminPanelB.css';
const contractAddress = '0xD852940c9E35663bF646Cf767136F31127306454'; 
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getResults",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "voteCount",
						"type": "uint256"
					}
				],
				"internalType": "struct VotingSystem.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingEnded",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votingStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default function AdminPanel() {
  const [candidateName, setCandidateName] = useState('');
  const [status, setStatus] = useState('');

  const addCandidate = async () => {
    if (!candidateName) return;

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      // Check if the user is the admin
      const admin = await contract.methods.admin().call();
      if (accounts[0].toLowerCase() !== admin.toLowerCase()) {
        setStatus("You are not the admin.");
        return;
      }

      // Add candidate
      await contract.methods.addCandidate(candidateName).send({ from: accounts[0] });
      setStatus("Candidate added successfully");
      setCandidateName('');
    } catch (err) {
      console.error(err);
      setStatus("Error adding candidate. Please try again.");
    }
  };

  const startVoting = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      // Check if the user is the admin
      const admin = await contract.methods.admin().call();
      if (accounts[0].toLowerCase() !== admin.toLowerCase()) {
        setStatus("You are not the admin.");
        return;
      }

      // Start voting
      await contract.methods.startVoting().send({ from: accounts[0] });
      setStatus("Voting has started");
    } catch (err) {
      console.error(err);
      setStatus(" Error starting voting");
    }
  };

  const endVoting = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      // Check if the user is the admin
      const admin = await contract.methods.admin().call();
      if (accounts[0].toLowerCase() !== admin.toLowerCase()) {
        setStatus("You are not the admin.");
        return;
      }

      // End voting
      await contract.methods.endVoting().send({ from: accounts[0] });
      setStatus("Voting has ended");
    } catch (err) {
      console.error(err);
      setStatus("Error ending voting");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <input
        type="text"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        placeholder="Candidate name"
      />
      <button onClick={addCandidate} className="add-button">
        Add Candidate
      </button>
      <div className="control-buttons">
        <button onClick={startVoting} className="start-button">
          Start Voting
        </button>
        <button onClick={endVoting} className="end-button">
          End Voting
        </button>
      </div>
      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}
