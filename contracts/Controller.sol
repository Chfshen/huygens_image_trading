// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Pool.sol";
import "./Token.sol";

contract Controller {

    Pool pool;
    Token token;
    address contractOwner;

    constructor () {
        pool = new Pool();
        token = new Token();
        contractOwner = msg.sender;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getPool() public view returns (address) {
        return pool.getAddress();
    }

    function getToken() public view returns (address) {
        return token.getAddress();
    }

    function getBalance() public view returns (uint256) {
        return getAddress().balance;
    }

    function getTokenBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }

    function transferToOwner(uint256 amount) payable public returns(uint256) {
        if (msg.sender == contractOwner) {
            address payable ownerPayable = payable(contractOwner);
            ownerPayable.transfer(amount);
        }
        return getBalance();
    }

    function mintToken(address receiver, uint256 amount) public{
        if (msg.sender != contractOwner)
            return;
        token.mint(receiver, amount);
    }

    function deposit() public payable returns (bool) {
        token.mint(msg.sender, msg.value);
        return true;
    }

    function tradeImage(string memory h) public returns (bool) {
        Image memory image = pool.getImage(h);
        if (image.owner == msg.sender || image.forSale == false)
            return false;
        if (!token.transferFrom(msg.sender, image.owner, image.price))
            return false;
        pool.changeState(h, false);
        pool.changeOwner(h, msg.sender);
        return true;
    }

    fallback() external payable{
    // this function enables the contract to receive funds
    }

    receive() external payable {

    }
}