const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

describe("LotteryTree", function() {
    async function deploy() {
        const lottery_tree = await ethers.deployContract("LotteryTree");
        return lottery_tree;
    }

    it("Should add and remove entries", async function () {
        const lottery_tree = await loadFixture(deploy);

        await lottery_tree.add(500);
        await lottery_tree.add(600);
        await lottery_tree.add(1200);
        await lottery_tree.add(800);
    
        expect(await lottery_tree.sum() == 3100);

        await lottery_tree.remove(2);

        expect(await lottery_tree.sum() == 1900);

        await lottery_tree.add(100);

        expect(await lottery_tree.sum() == 2000);
    });
})