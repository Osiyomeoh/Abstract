// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

struct UserOperation {
    address sender;
    uint256 nonce;
    bytes callData;
    uint256 callGas;
    uint256 verificationGas;
    uint256 preVerificationGas;
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    bytes signature;
}

contract SmartWallet {
    using ECDSA for bytes32;

    uint96 private _nonce;
    address public owner;

    event TransactionProcessed(address indexed from, address indexed to, uint256 amount, bytes data);
    event DepositReceived(address indexed sender, uint256 amount);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier _onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function _validateAndUpdateNonce(UserOperation memory userOp) internal {
        require(_nonce++ == userOp.nonce, "Account: Invalid nonce");
    }

    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash) internal view returns (uint256 deadline) {
        require(userOp.signature.length == 65, "Invalid signature length");

        bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", userOpHash));
        address recovered = ecrecover(prefixedHash, uint8(userOp.signature[0]), bytes32(userOp.signature[1:33]), bytes32(userOp.signature[33:65]));

        require(recovered == owner, "Account: Wrong signature");
        return 0;
    }

    function exec(UserOperation calldata userOp) external {
        
        _validateAndUpdateNonce(userOp);
        bytes32 userOpHash = keccak256(abi.encode(userOp));
        _validateSignature(userOp, userOpHash);

        
        (bool success, ) = address(this).call(userOp.callData);
        require(success, "Call execution failed");
    }

   
    function deposit(address _owner, uint256 amount) public payable {
        require(_owner != address(0), "Invalid recipient address");
        require(amount > 0, "Deposit amount must be greater than 0");
        require(msg.value >= amount, "Insufficient value sent");

        
        payable(_owner).transfer(amount);

        emit DepositReceived(msg.sender, amount);
    }

    function sendEther(address payable to, uint256 amount) public {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
        emit TransactionProcessed(address(this), to, amount, "");
    }

    
    function getBalance(address targetAddress) public view returns (uint256) {
        return address(targetAddress).balance;
    }

    receive() external payable {
        emit DepositReceived(msg.sender, msg.value);
    }
}
