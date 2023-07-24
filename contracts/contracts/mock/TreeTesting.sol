// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TreeTesting {
    enum Origin { NONE, LEFT, RIGHT } 
    int[][] internal tree = [new int[](1)];
    uint[] internal holes = new uint[](0);

    event ReturnIndex(uint index);

    function treeUpdate(uint level, uint index, int value, Origin origin) public {
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

        treeUpdate(next_level, next_index, value, next_origin);
    }

    // adds the entry to the first hole in the tree, or expands it
    // returns index of the new entry
    function treeInsert(int value) public returns (uint) {
        require(value > 0);

        uint index;
        if(holes.length > 0) {
            index = holes[holes.length-1];
            holes.pop();
        }
        else {
            index = tree[0].length;
        }

        treeUpdate(0, index, value, Origin.NONE);

        emit ReturnIndex(index);

        return index;
    }

    // increase existing entry
    function treeAdd(int value, uint index) public {
        require(value > 0);
        require(index > 0);
        require(tree[0].length > index);
        require(tree[0][index] != 0);

        treeUpdate(0, index, value, Origin.NONE);
    }

    // removes entry with the given index
    function treeRemove(uint index) public {
        require(index > 0);
        require(tree[0].length > index);
        require(tree[0][index] != 0);

        holes.push(index);

        int value = tree[0][index];

        treeUpdate(0, index, -value, Origin.NONE);
    }

    // returns the sum of all entries
    function treeSum() public view returns (uint) {
        return uint(tree[tree.length-1][0]);
    }

    function treeGetWinnerIndex(uint roll) public view returns (uint) {
        require(roll >= 0);
        require(roll < treeSum());

        uint current_level = tree.length-1;
        uint current_index = 0;

        while(current_level > 0) {
            uint left_sum  = uint(tree[current_level-1][current_index*2]);
            if(roll < left_sum) {
                current_index = current_index * 2;
            }
            else {
                current_index = current_index * 2 + 1;
                roll -= left_sum;
            }
            current_level -= 1;
        }

        return current_index;
    }
}
