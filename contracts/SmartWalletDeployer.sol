// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";
import "./Wallet.sol"; 
contract SmartWalletDeployer {
     /**
     * Deploy a SmartWallet contract and return its address.
     * If a SmartWallet with the same parameters has already been deployed, it returns the existing address.
     */
    event SmartWalletDeployed(address smartWalletAddress);
    function deploySmartWallet(address owner, uint salt) public returns (address smartWalletAddress) {
        // Calculate the counterfactual address of the SmartWallet contract
        smartWalletAddress = getAddress(owner, salt);

        // Check if there is code deployed at the calculated address
        uint codeSize;
        assembly {
            codeSize := extcodesize(smartWalletAddress)
        }

        if (codeSize == 0) {
           
            smartWalletAddress = address(new SmartWallet(owner));
        }
        emit SmartWalletDeployed(smartWalletAddress);
        return smartWalletAddress;
    }

    /**
     * Calculate the counterfactual address of a SmartWallet contract.
     */
    function getAddress(address owner, uint salt) public view returns (address) {
        return Create2.computeAddress(bytes32(salt), keccak256(abi.encodePacked(
                type(SmartWallet).creationCode,
                owner
            )));
    }
}
