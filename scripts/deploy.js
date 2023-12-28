async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy SmartWalletDeployer
    const SmartWalletDeployer = await ethers.getContractFactory("SmartWalletDeployer");
    const smartWalletDeployer = await SmartWalletDeployer.deploy();
    await smartWalletDeployer.deployed();
    console.log("SmartWalletDeployer deployed to:", smartWalletDeployer.address);

    // Deploy SmartWallet using the deployer contract
    // Replace 'ownerAddress' with the desired owner of the SmartWallet
    const ownerAddress = deployer.address; // Example: using the deployer as the owner
    const tx = await smartWalletDeployer.deploySmartWallet(ownerAddress, 2); // '1' is an example salt
    const receipt = await tx.wait();

    // The address of the newly deployed SmartWallet can be extracted from the transaction receipt
    // This assumes that the deploySmartWallet function emits an event with the wallet address
    const smartWalletAddress = receipt.events[0].args[0];
    console.log("SmartWallet deployed to:", smartWalletAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
