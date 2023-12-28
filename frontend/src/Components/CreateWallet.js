import React, { useState } from 'react';
import Web3 from 'web3';
import SmartWalletDeployer from './abi/SmartWalletDeployer.json'; 

const smartWalletDeployerAddress = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1"; 

const CreateWallet = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [web3Instance, setWeb3Instance] = useState(null);
    const [newWalletAddress, setNewWalletAddress] = useState(''); // State to store the new wallet address

    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);
            setIsWalletConnected(true);
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Failed to connect wallet!");
        }
    };

    const createWallet = async () => {
        if (!isWalletConnected) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            const contract = new web3Instance.eth.Contract(
                SmartWalletDeployer.abi,
                smartWalletDeployerAddress
            );

            const accounts = await web3Instance.eth.getAccounts();
            const ownerAddress = accounts[0];
            const salt = Date.now(); 

            contract.methods.deploySmartWallet(ownerAddress, salt).send({ from: ownerAddress })
            .on('receipt', (receipt) => {
                console.log(receipt)
                //Access the deployed wallet address from the event
                const deployedAddress = receipt.events.SmartWalletDeployed.returnValues.smartWalletAddress;
        
                console.log('Deployed address:', deployedAddress);
        
                if (deployedAddress) {
                    setNewWalletAddress(deployedAddress);
                    alert(`New wallet created at address: ${deployedAddress}`);
                } else {
                    console.error('Wallet address not found in the event');
                }
            });
        
        } catch (error) {
            console.error("Error creating wallet:", error);
            alert("Failed to create wallet!");
        }
    };

   
    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        background: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div>
            {!isWalletConnected && (
                <button style={buttonStyle} onClick={connectWallet}>Connect Wallet</button>
            )}
            <button style={buttonStyle} onClick={createWallet} disabled={!isWalletConnected}>Create New Wallet</button>
            {newWalletAddress && <p>New Wallet Address: {newWalletAddress}</p>} 
        </div>
    );
};

export default CreateWallet;
