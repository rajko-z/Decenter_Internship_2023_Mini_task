const hre = require("hardhat");

const { networkConfig } = require("../../harhat-config-helper");
const { sendWethToken } = require("./sendWethToken");
const { deployContract } = require("./deployAaveIntegrationExample");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const [ deployer ] = await hre.ethers.getSigners();
    const provider = hre.ethers.provider;
    const amountToDeposit = hre.ethers.parseEther("10");

    await sendWethToken(hre.ethers.parseEther("30"));

    const aaveIntegration = await deployContract();
    const contractAddress = await aaveIntegration.getAddress()

    const wethContract = await hre.ethers.getContractAt("IWeth", networkConfig[hre.network.config.chainId].wethToken, deployer)
    const approveTx = await wethContract.approve(contractAddress, amountToDeposit);
    approveTx.wait();

    console.log("==============Deposit call=============");
    console.log(`User ${deployer.address} funds in WETH before deposit call is: ${await wethContract.balanceOf(deployer.address)}`);
    const txDeposit = await aaveIntegration.deposit(amountToDeposit);
    await txDeposit.wait();
    console.log(`User ${deployer.address} funds in WETH after deposit call is: ${await wethContract.balanceOf(deployer.address)}`);
    console.log("==============Deposit finished=========");

    const aWethContract = await hre.ethers.getContractAt("IWeth", networkConfig[hre.network.config.chainId].aWethToken)
    console.log(`Protocol ${contractAddress} funds in aWETH just after deposit call: ${await aWethContract.balanceOf(contractAddress)}`);

    console.log("Going into future 1 year from now... :)")
    const oneYear = 12 * 30 * 24 * 3600;
    await time.increase(oneYear);

    console.log(`Protocol ${contractAddress} funds in aWETH after one year: ${await aWethContract.balanceOf(contractAddress)}`);


    console.log("Withdraw call from address " + deployer.address + "....");
    const txWithdraw = await aaveIntegration.connect(deployer).withdraw();
    const balance = txWithdraw.wait();
    console.log(`User ${deployer.address} funds in ETH after withdraw call: ${await provider.getBalance(deployer.address)}`);
    console.log(`Protocol ${deployer.address} funds in aWETH after withdraw call: ${await aWethContract.balanceOf(contractAddress)}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})