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

    it("Sum should work in an empty tree", async function () {
        const lottery_tree = await loadFixture(deploy);
        expect(await lottery_tree.sum() == 0);
    });

    it("Should properly handle bad remove calls", async function () {
        const lottery_tree = await loadFixture(deploy);
        await expect(lottery_tree.remove(2)).to.be.reverted;
        await lottery_tree.add(100);
        await expect(lottery_tree.remove(1)).not.to.be.reverted;
        await expect(lottery_tree.remove(1)).to.be.reverted;
    });

    it("Should properly choose the getWinnerIndex for given roll", async function () {
        const lottery_tree = await loadFixture(deploy);
        await lottery_tree.add(500);
        await lottery_tree.add(600);
        await lottery_tree.add(1200);
        await lottery_tree.add(800);
        expect(await lottery_tree.getWinnerIndex(250)  == 0);
        expect(await lottery_tree.getWinnerIndex(510)  == 1);
        expect(await lottery_tree.getWinnerIndex(1300) == 2);
        expect(await lottery_tree.getWinnerIndex(3000) == 3);
        expect(await lottery_tree.getWinnerIndex(499)  == 0);
        expect(await lottery_tree.getWinnerIndex(500)  == 1);
        expect(await lottery_tree.getWinnerIndex(501)  == 1);
        expect(await lottery_tree.getWinnerIndex(1099) == 1);
        expect(await lottery_tree.getWinnerIndex(1100) == 2);
        expect(await lottery_tree.getWinnerIndex(0)    == 0);
        expect(await lottery_tree.getWinnerIndex(3099) == 3);
    });

    it("Should properly choose the getWinnerIndex in edge cases", async function () {
        const lottery_tree = await loadFixture(deploy);
        await expect(lottery_tree.getWinnerIndex(0)).to.be.reverted;
        await lottery_tree.add(500);
        await lottery_tree.add(600);
        await lottery_tree.add(1200);
        await lottery_tree.add(800);
        await expect(lottery_tree.getWinnerIndex(3100)).to.be.reverted;
    });

    it("Should reuse empty spaces left after withdrawing", async function () {
        const lottery_tree = await loadFixture(deploy);
        expect(await lottery_tree.add(500)  == 1);
        expect(await lottery_tree.add(600)  == 2);
        expect(await lottery_tree.add(1200) == 3);
        expect(await lottery_tree.add(800)  == 4);
        await lottery_tree.remove(3);
        await lottery_tree.remove(1);
        expect(await lottery_tree.add(400)  == 1);
        expect(await lottery_tree.add(700)  == 3);
        expect(await lottery_tree.sum() == 2500);
    });

})