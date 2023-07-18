// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract LotteryTree {
    enum Origin { NONE, LEFT, RIGHT } 
    int[][] public tree = [new int[](0)];

    function update(uint level, uint index, int value, Origin origin) private {
        if(level >= tree.length) {
            tree.push(new int[](0));
        }

        if(index >= tree[level].length) {
            tree[level].push(value);
            if(origin == Origin.RIGHT) {
                uint level_length = tree[level].length;
                tree[level][level_length-1] += tree[level-1][index*2];
            }
        }
        else {
            tree[level][index] += value;
        }

        if(tree[level].length == 1) {
            return;
        }

        uint next_level    = level + 1;
        uint next_index    = index / 2;
        Origin next_origin = (index%2==0 ? Origin.LEFT : Origin.RIGHT);

        update(next_level, next_index, value, next_origin);
    }

    function add(int value) public {
        update(0, tree[0].length, value, Origin.NONE);
    }

    function remove(uint index) public {
        int value = tree[0][index];
        update(0, index, -value, Origin.NONE);
    }

    function sum() public view returns (int) {
        return tree[tree.length-1][0];
    }
}