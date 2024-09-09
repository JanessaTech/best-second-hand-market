// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Demo {
    uint public unlockTime;

    struct Candiate {
        uint id;
        string name;
        address voteBy;
    } 
    Candiate[] candidates;

    constructor(uint _unlockTime) {
        require(block.timestamp < _unlockTime, 'unlock time should be in the future');
        unlockTime = _unlockTime;
    }

    function register(uint id, string memory _name) public {
        candidates.push(Candiate({id: id,  name: _name, voteBy: address(0)}));
    }
    
    function getAllCandiates() public {

    }

    function voteBy(uint _id, address _address) public {
        require(_address != address(0), 'You need to vote from a valid address');
        for (uint i = 0; i < candidates.length; i++) {
            Candiate storage canidate = candidates[i];
            if (canidate.id == _id) {
                canidate.voteBy = _address;
                return;
            }
        }
        require(false, 'something wrong, the chose the invalid id to votefor');
    }

    function checkVoteStatus(uint id) public view returns (address) {
        for(uint i = 0; i < candidates.length; i++) {
            Candiate storage candiate = candidates[i];
            if (candiate.id == id) {
                return candiate.voteBy;
            }
        }
        return address(0);
    }
}