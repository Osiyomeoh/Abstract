import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import smartWalletABI from './abi/SmartWallet.json';

const smartWalletAddress = "0xe73bc5BD4763A3307AB5F8F126634b7E12E3dA9b";

const SendFunds = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [sender, setSender] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                try {
                    // Request account access if needed
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

    const sendEther = async () => {
        if (!isWalletConnected) {
            alert("Please connect your wallet first!");
            return;
        }
    
        try {
            const contract = new web3.eth.Contract(smartWalletABI.abi, smartWalletAddress);
            const amountInWei = web3.utils.toWei(amount, 'ether');
    
           
            const recipientAddressHex = web3.utils.toChecksumAddress(recipient);
            const senderAddressHex = web3.utils.toChecksumAddress(sender);
    
            await contract.methods.sendEther(senderAddressHex, recipientAddressHex, amountInWei)
                .send({ from: accounts[0] });
    
            alert(`Sent ${amount} ETH to ${recipient}`);
        } catch (error) {
            console.error('Error sending Ether:', error);
            alert('Failed to send Ether. Check the console for more details.');
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
            {isWalletConnected ? (
                <div>
                    <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="Sender Address"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Recipient Address"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount in Ether"
                        style={inputStyle} 
                    />
                    <button onClick={sendEther} style={buttonStyle}>Send Ether</button> 
                </div>
            ) : (
                <p>Please connect your wallet to use this feature.</p>
                
            )}
        </div>
    );
};

export default SendFunds;
