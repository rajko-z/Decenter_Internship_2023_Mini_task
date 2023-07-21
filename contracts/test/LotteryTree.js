const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("LotteryTree", function() {
    async function deploy() {
        const lotteryTree = await ethers.deployContract("LotteryTree");
        return lotteryTree;
    }

    it("Should treeAdd and treeRemove entries", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeAdd(500);
        await lotteryTree.treeAdd(600);
        await lotteryTree.treeAdd(1200);
        await lotteryTree.treeAdd(800);
        expect(await lotteryTree.treeSum() == 3100);
        await lotteryTree.treeRemove(2);
        expect(await lotteryTree.treeSum() == 1900);
        await lotteryTree.treeAdd(100);
        expect(await lotteryTree.treeSum() == 2000);
    });

    it("treeSum should work in an empty tree", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeSum() == 0);
    });

    it("Should properly handle bad treeRemove calls", async function () {
        const lotteryTree = await loadFixture(deploy);
        await expect(lotteryTree.treeRemove(2)).to.be.reverted;
        await lotteryTree.treeAdd(100);
        await expect(lotteryTree.treeRemove(1)).not.to.be.reverted;
        await expect(lotteryTree.treeRemove(1)).to.be.reverted;
    });

    it("Should properly choose the treeGetWinnerIndex for given roll", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeAdd(500);
        await lotteryTree.treeAdd(600);
        await lotteryTree.treeAdd(1200);
        await lotteryTree.treeAdd(800);
        expect(await lotteryTree.treeGetWinnerIndex(250)  == 0);
        expect(await lotteryTree.treeGetWinnerIndex(510)  == 1);
        expect(await lotteryTree.treeGetWinnerIndex(1300) == 2);
        expect(await lotteryTree.treeGetWinnerIndex(3000) == 3);
        expect(await lotteryTree.treeGetWinnerIndex(499)  == 0);
        expect(await lotteryTree.treeGetWinnerIndex(500)  == 1);
        expect(await lotteryTree.treeGetWinnerIndex(501)  == 1);
        expect(await lotteryTree.treeGetWinnerIndex(1099) == 1);
        expect(await lotteryTree.treeGetWinnerIndex(1100) == 2);
        expect(await lotteryTree.treeGetWinnerIndex(0)    == 0);
        expect(await lotteryTree.treeGetWinnerIndex(3099) == 3);
    });

    it("Should properly choose the treeGetWinnerIndex in edge cases", async function () {
        const lotteryTree = await loadFixture(deploy);
        await expect(lotteryTree.treeGetWinnerIndex(0)).to.be.reverted;
        await lotteryTree.treeAdd(500);
        await lotteryTree.treeAdd(600);
        await lotteryTree.treeAdd(1200);
        await lotteryTree.treeAdd(800);
        await expect(lotteryTree.treeGetWinnerIndex(3100)).to.be.reverted;
    });

    it("Should reuse empty spaces left after withdrawing", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeAdd(500)  == 1);
        expect(await lotteryTree.treeAdd(600)  == 2);
        expect(await lotteryTree.treeAdd(1200) == 3);
        expect(await lotteryTree.treeAdd(800)  == 4);
        await lotteryTree.treeRemove(3);
        await lotteryTree.treeRemove(1);
        expect(await lotteryTree.treeAdd(400)  == 1);
        expect(await lotteryTree.treeAdd(700)  == 3);
        expect(await lotteryTree.treeSum() == 2500);
    });

})