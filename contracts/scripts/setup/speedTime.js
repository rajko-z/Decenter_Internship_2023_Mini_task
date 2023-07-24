

const {time} = require("@nomicfoundation/hardhat-network-helpers");


async function main() {
    const DAY = 3600 * 24;
    await time.increase(DAY * 50);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

