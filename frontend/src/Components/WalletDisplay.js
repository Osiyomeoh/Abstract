import React, { useState } from 'react';
import Web3 from 'web3';
import SmartWalletABI from './abi/SmartWallet.json'; // Import Smart Wallet contract ABI

const smartWalletAddress = "0xe73bc5BD4763A3307AB5F8F126634b7E12E3dA9b"; // Replace with your Smart Wallet contract's address

const WalletDisplay = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const fetchBalance = async () => {
        try {
            
            const web3 = new Web3(window.ethereum);
    
            
            const contract = new web3.eth.Contract(SmartWalletABI.abi, smartWalletAddress);
    
          
            const result = await contract.methods.getBalance(address).call();
    
            
            const balanceInEther = web3.utils.fromWei(result, 'ether');
            setBalance(balanceInEther);
        } catch (error) {
            console.error('Error fetching balance:', error);
            
            
            if (error.message.includes('Failed to fetch')) {
                alert('Failed to connect to the Ethereum network. Check your provider or network connection.');
            } else {
                alert('Failed to fetch balance. Check the console for more details.');
            }
        }
    };
    
   
    const inputStyle = {
        padding: '10px',
        margin: '10px',
        fontSize: '16px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        background: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Ethereum Address"
                style={inputStyle} 
            />
            <button onClick={fetchBalance} style={buttonStyle}>Check Balance</button> 
            {balance && <p>Balance: {balance} ETH</p>}
        </div>
    );
};

export default WalletDisplay;
