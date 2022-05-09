// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CCNHandler {
    function getAddress() public view returns (address) {
        return address(this);
    }
    
    function getContractBalance() public view returns (uint256) {
        return getAddress().balance;
    }

    function transfertest(uint256 amount) payable public returns(uint256) {
        address address1 = 0xe37ACD7279a44758B5B7de03141B4Ca69D49B9Df;
        address payable payable1 = payable(address1);
        payable1.transfer(amount);
        return getContractBalance();
    }

    fallback() external payable{
    // this function enables the contract to receive funds
    }

    receive() external payable {

    }
}