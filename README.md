
# Smart Wallet App

The Smart Wallet App is a decentralized application (DApp) that allows users to manage their digital assets securely using a smart wallet contract on the Ethereum blockchain. Users can deposit, send, and check their wallet's balance through a user-friendly web interface.

## Features

- Deposit Ether into the smart wallet.
- Send Ether to other Ethereum addresses.
- Check the balance of the smart wallet.
- Secure authentication and transactions using MetaMask.

## Getting Started

Follow these instructions to set up and run the Smart Wallet App locally for testing and development.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MetaMask extension for your browser.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/smart-wallet-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd smart-wallet-app/frontend
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

### Usage

1. Start the development server:

   ```bash
   npm start
   ```

   This command starts the app locally, and you can access it in your browser at `http://localhost:3000`.

2. Make sure you have the MetaMask extension installed in your browser.

3. Connect MetaMask to your local network (e.g., Hardhat local network) and import an Ethereum account.

4. Use the Smart Wallet App to interact with the smart wallet contract:

   - Deposit Ether: Enter the owner's Ethereum address and the amount to deposit, then click "Deposit."
   - Send Ether: Enter the recipient's Ethereum address and the amount to send, then click "Send Ether."
   - Check Balance: Enter an Ethereum address and click "Check Balance" to see its Ether balance.

5. Confirm MetaMask transactions when prompted.

### Testing Locally

You can test the Smart Wallet contract locally using the Hardhat development environment and Solidity's `send` function. Follow the instructions in the [Testing Locally](#testing-locally) section of this README.

## Smart Wallet Contract

The Smart Wallet App interacts with a Solidity smart contract deployed on the Ethereum blockchain. The contract allows secure deposit and transfer of Ether.

### Smart Contract Address

- Mainnet: `0xYourSmartWalletAddress`

### Smart Contract Functions

- `deposit(address _owner, uint256 amount)`: Deposit Ether into the smart wallet. Requires specifying the owner's Ethereum address.
- `sendEther(address payable to, uint256 amount)`: Send Ether to another Ethereum address.
- `getBalance(address targetAddress)`: Check the balance of an Ethereum address.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License 
## Acknowledgments

- The Smart Wallet App uses the OpenZeppelin library for secure contract development.
- Thanks to the Ethereum community for creating and maintaining the Ethereum blockchain.
