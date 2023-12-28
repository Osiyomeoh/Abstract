import React from 'react';
import WalletDisplay from './Components/WalletDisplay';
import CreateWallet from './Components/CreateWallet';
import SendFunds from './Components/SendFunds';
import DepositFunds from './Components/depositFunds';

function App() {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>Smart Wallet</h1>
      <CreateWallet />
      <WalletDisplay />
      <DepositFunds />
      <SendFunds />
    </div>
  );
}

export default App;
