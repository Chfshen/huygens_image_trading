// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Comment {
    function getAddress() public view returns (address) {
        return address(this);
    }
}