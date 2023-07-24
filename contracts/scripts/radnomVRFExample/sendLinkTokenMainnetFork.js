const hre = require("hardhat");

const { networkConfig } = require("../../harhat-config-helper");

async function sendLinkTokenToContract(contractAddress) {

    const addressWithLinkTokens = "0x0757e27AC1631beEB37eeD3270cc6301dD3D57D4";
    const [deployer] = await hre.ethers.getSigners();
    const tx = await deployer.sendTransaction({
        to: addressWithLinkTokens,
        value: hre.ethers.parseEther("10")
    });
    await tx.wait();
    const signer = await hre.ethers.getImpersonatedSigner(addressWithLinkTokens);

    const iLink = await hre.ethers.getContractAt(
        "IERC677", networkConfig[hre.network.config.chainId].linkToken, signer);

    const contractBalanceBefore = await iLink.balanceOf(contractAddress);
    console.log(`Before transfer -> Contract: ${contractAddress} has ${contractBalanceBefore} LINK Tokens`);
    const senderLinkBalanceBefore = await iLink.balanceOf(addressWithLinkTokens);
    console.log(`Before transfer -> Sender: ${addressWithLinkTokens} has ${senderLinkBalanceBefore} LINK Tokens`);

    const txTransfer = await iLink.transfer(contractAddress, hre.ethers.parseEther("0.1"));
    await txTransfer.wait();

    const contractBalanceAfter = await iLink.balanceOf(contractAddress);
    console.log(`After transfer -> Contract: ${contractAddress} has ${contractBalanceAfter} LINK Tokens`);
    const senderLinkBalanceAfter = await iLink.balanceOf(addressWithLinkTokens);
    console.log(`After transfer -> Sender: ${addressWithLinkTokens} has ${senderLinkBalanceAfter} LINK Tokens`);
}

module.exports = { sendLinkTokenToContract }
