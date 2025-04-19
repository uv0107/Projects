// src/components/Results.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './ResultsB.css';
import contractABI from './VotingSystem.json';
const contractAddress = '0xD852940c9E35663bF646Cf767136F31127306454'; // Replace with your deployed address

export default function Results() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      const votingContract = new web3.eth.Contract(contractABI, contractAddress);
      const results = await votingContract.methods.getResults().call();

      setCandidates(results);
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Election Results</h2>
      <p className="text-sm text-gray-600 mb-4">Connected Wallet: {account}</p>

      {candidates.length === 0 ? (
        <p>Loading results...</p>
      ) : (
        <table className="mx-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td className="border px-4 py-2">{c.id}</td>
                <td className="border px-4 py-2">{c.name}</td>
                <td className="border px-4 py-2">{c.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
