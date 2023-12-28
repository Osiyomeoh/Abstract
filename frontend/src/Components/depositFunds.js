import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SmartWalletABI from './abi/SmartWallet.json'; 

const smartWalletAddress = "0x24B3c7704709ed1491473F30393FFc93cFB0FC34"; 

const DepositFunds = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [web3Instance, setWeb3Instance] = useState(null);
    const [depositAmount, setDepositAmount] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [ownerAddress, setOwnerAddress] = useState(''); 

    useEffect(() => {

        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3Instance(web3Instance);
                try {
                    
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accs = await web3Instance.eth.getAccounts();
                    setAccounts(accs);
                    setIsWalletConnected(true); 
                } catch (error) {
                    console.error('Error connecting to wallet:', error);
                    alert('Failed to connect wallet. Check the console for more details.');
                }
            } else {
                alert('MetaMask is not installed. Please install MetaMask to use this DApp.');
            }
        };

        initWeb3();
    }, []);

    const depositFunds = async () => {
        if (!isWalletConnected) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!depositAmount || isNaN(depositAmount)) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        if (!ownerAddress || !web3Instance.utils.isAddress(ownerAddress)) {
            alert("Please enter a valid owner address.");
            return;
        }

        try {
            
            const depositAmountWei = web3Instance.utils.toWei(depositAmount, 'ether');

            
            const contract = new web3Instance.eth.Contract(
                SmartWalletABI.abi,
                smartWalletAddress
            );

            
            await contract.methods.deposit(ownerAddress, depositAmountWei).send({
                from: accounts[0],
                value: depositAmountWei,
            });

            alert(`Successfully deposited ${depositAmount} Ether.`);
        } catch (error) {
            console.error("Error depositing funds:", error);
            alert("Failed to deposit funds. Check the console for more details.");
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
            {isWalletConnected && (
                <div>
                    <input
                        type="text"
                        value={ownerAddress}
                        onChange={(e) => setOwnerAddress(e.target.value)}
                        placeholder="Enter owner's Ethereum address"
                        style={inputStyle} 
                    />
                    <input
                        type="text"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Enter deposit amount in Ether"
                        style={inputStyle} 
                    />
                    <button onClick={depositFunds} style={buttonStyle}>Deposit</button> 
                </div>
            )}

            {!isWalletConnected && (
                <p>Please connect your wallet to deposit funds.</p>
            )}
        </div>
    );
};

export default DepositFunds;
