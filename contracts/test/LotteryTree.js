const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("TreeTesting", function() {
    async function deploy() {
        const lotteryTree = await ethers.deployContract("TreeTesting");
        return lotteryTree;
    }

    it("Should insert and remove entries", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        expect(await lotteryTree.treeSum()).to.equals(3100);
        await lotteryTree.treeRemove(2);
        expect(await lotteryTree.treeSum()).to.equals(2500);
        await lotteryTree.treeInsert(100);
        expect(await lotteryTree.treeSum()).to.equals(2600);
    });

    it("Sum should work in an empty tree", async function () {
        const lotteryTree = await loadFixture(deploy);
        expect(await lotteryTree.treeSum()).to.equals(0);
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
        expect(await lotteryTree.treeGetWinnerIndex(250 )).to.equals(1);
        expect(await lotteryTree.treeGetWinnerIndex(510 )).to.equals(2);
        expect(await lotteryTree.treeGetWinnerIndex(1300)).to.equals(3);
        expect(await lotteryTree.treeGetWinnerIndex(3000)).to.equals(4);
        expect(await lotteryTree.treeGetWinnerIndex(499 )).to.equals(1);
        expect(await lotteryTree.treeGetWinnerIndex(500 )).to.equals(2);
        expect(await lotteryTree.treeGetWinnerIndex(501 )).to.equals(2);
        expect(await lotteryTree.treeGetWinnerIndex(1099)).to.equals(2);
        expect(await lotteryTree.treeGetWinnerIndex(1100)).to.equals(3);
        expect(await lotteryTree.treeGetWinnerIndex(0   )).to.equals(1);
        expect(await lotteryTree.treeGetWinnerIndex(3099)).to.equals(4);
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
        expect(await lotteryTree.treeInsert(500 )).to.emit(lotteryTree, "ReturnIndex").withArgs(1);
        expect(await lotteryTree.treeInsert(600 )).to.emit(lotteryTree, "ReturnIndex").withArgs(2);
        expect(await lotteryTree.treeInsert(1200)).to.emit(lotteryTree, "ReturnIndex").withArgs(3);
        expect(await lotteryTree.treeInsert(800 )).to.emit(lotteryTree, "ReturnIndex").withArgs(4);
        await lotteryTree.treeRemove(3);
        await lotteryTree.treeRemove(1);
        expect(await lotteryTree.treeInsert(400 )).to.emit(lotteryTree, "ReturnIndex").withArgs(1);
        expect(await lotteryTree.treeInsert(700 )).to.emit(lotteryTree, "ReturnIndex").withArgs(3);
        expect(await lotteryTree.treeSum()).to.equals(2500);
    });

    it("Handle everyone withdrawing", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        await lotteryTree.treeRemove(1);
        await lotteryTree.treeRemove(2);
        await lotteryTree.treeRemove(3);
        await lotteryTree.treeRemove(4);
        expect(await lotteryTree.treeSum()).to.equals(0);
    });

    it("Add to existing entries", async function () {
        const lotteryTree = await loadFixture(deploy);
        await lotteryTree.treeInsert(500);
        await lotteryTree.treeInsert(600);
        await lotteryTree.treeInsert(1200);
        await lotteryTree.treeInsert(800);
        expect(await lotteryTree.treeSum()).to.equals(3100);;
        await lotteryTree.treeAdd(900, 4);
        expect(await lotteryTree.treeSum()).to.equals(4000);;
        await lotteryTree.treeInsert(100);
        expect(await lotteryTree.treeSum()).to.equals(4100);;
        await lotteryTree.treeRemove(4);
        expect(await lotteryTree.treeSum()).to.equals(2400);;
    });

})