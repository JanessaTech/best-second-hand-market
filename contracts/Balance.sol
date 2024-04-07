// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Balance is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    event transferInBatch_tracer(address[] tos, uint256[] values);

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function transferInBatch(address[] memory tos, uint256[] memory values) public {
        require(tos.length == values.length, 'The size of tos must be equal to the size of values');
        for (uint i = 0; i < tos.length; i++) {
            address to = tos[i];
            uint256 value = values[i];
            transfer(to, value);
        }
        emit transferInBatch_tracer(tos, values);
    }
}