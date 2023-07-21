const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("LotteryTree", function() {
    async function deploy() {
        const lotteryTree = await ethers.deployContract("LotteryTree");
        return lotteryTree;
    }

    it("Should insert and remove entries", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        expect(await lotteryTree.treeSum() == 3100);
        await lotteryTree.treeRemove(2);
        expect(await lotteryTree.treeSum() == 1900);
        await lotteryTree.treeInsert(100);
        expect(await lotteryTree.treeSum() == 2000);
    });

    it("Sum should work in an empty tree", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeSum() == 0);
    });

    it("Should properly handle bad remove calls", async function () {
        const lotteryTree = await loadFixture(deploy);
        await expect(lotteryTree.treeRemove(2)).to.be.reverted;
        await lotteryTree.treeInsert(100);
        await expect(lotteryTree.treeRemove(1)).not.to.be.reverted;
        await expect(lotteryTree.treeRemove(1)).to.be.reverted;
    });

    it("Should properly choose the winner for given roll", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
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

    it("Should properly choose the winner in edge cases", async function () {
        const lotteryTree = await loadFixture(deploy);
        await expect(lotteryTree.treeGetWinnerIndex(0)).to.be.reverted;
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        await expect(lotteryTree.treeGetWinnerIndex(3100)).to.be.reverted;
    });

    it("Should reuse empty spaces left after withdrawing", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeInsert(500)  == 1);
        expect(await lotteryTree.treeInsert(600)  == 2);
        expect(await lotteryTree.treeInsert(1200) == 3);
        expect(await lotteryTree.treeInsert(800)  == 4);
        await lotteryTree.treeRemove(3);
        await lotteryTree.treeRemove(1);
        expect(await lotteryTree.treeInsert(400)  == 1);
        expect(await lotteryTree.treeInsert(700)  == 3);
        expect(await lotteryTree.treeSum() == 2500);
    });

    it("Handle everyone withdrawing", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeInsert(500)  == 1);
        expect(await lotteryTree.treeInsert(600)  == 2);
        expect(await lotteryTree.treeInsert(1200) == 3);
        expect(await lotteryTree.treeInsert(800)  == 4);
        await lotteryTree.treeRemove(1);
        await lotteryTree.treeRemove(2);
        await lotteryTree.treeRemove(3);
        await lotteryTree.treeRemove(4);
        expect(await lotteryTree.treeSum() == 0);
    });

    it("Add to existing entries", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        expect(await lotteryTree.treeSum() == 3100);
        await lotteryTree.treeAdd(900, 4);
        expect(await lotteryTree.treeSum() == 4000);
        await lotteryTree.treeInsert(100);
        expect(await lotteryTree.treeSum() == 4100);
        await lotteryTree.treeRemove(4);
        expect(await lotteryTree.treeSum() == 2400);
    });

})