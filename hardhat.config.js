require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337, // Use the correct chain ID for your local network  
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Use Infura Project ID from .env file
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Use private key from .env file
    }
  },
  // networks: {
  //   hardhat: {
  //     chainId: 31337, // Use the correct chain ID for your local network
  //     url: 'http://127.0.0.1:8545/', // Use the correct URL for your local network
  //   },localhost: {
  //     url: "http://127.0.0.1:8545"
  //   },
  // },
  

}
