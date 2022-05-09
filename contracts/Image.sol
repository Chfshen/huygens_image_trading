// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Image {

    struct Image {
        address owner;
        string imageHash;
        uint256 price;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
    


}