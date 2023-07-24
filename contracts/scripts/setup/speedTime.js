const {task} = require("hardhat/config");

task("speedTime", "Increase time")
    .addParam("days", "The number of days to increase")
    .setAction(async taskArguments => {

        const DAY = 3600 * 24;
        const numOfDays = taskArguments.days;
        console.log(DAY * numOfDays);
        //await time.increase()

    });

module.exports = async function ({getNamedAccounts, deployments}) {
    await run('speedTime');
}