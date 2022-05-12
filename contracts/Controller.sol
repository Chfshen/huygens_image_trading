// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "./Image.sol";
import "./Store.sol";

contract Controller {

    Token token;
    Image image;
    Store store;
    address contractOwner;

    constructor () {
        token = new Token();
        image = new Image();
        store = new Store();
        contractOwner = msg.sender;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

    function getImageContract() public view returns (address) {
        return image.getAddress();
    }

    function getTokenContract() public view returns (address) {
        return token.getAddress();
    }

    function getStoreContract() public view returns (address) {
        return store.getAddress();
    }

    function getBalance() public view returns (uint256) {
        return getAddress().balance;
    }

    //Token Operations

    function getTokenBalance(address target) public view returns (uint256) {
        return token.balanceOf(target);
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

    function withdraw(uint256 amount) public returns (bool) {
        if (getTokenBalance(msg.sender) < amount)
            return false;
        token.burn(msg.sender, amount);
        address payable receiver = payable(msg.sender);
        receiver.transfer(amount);
        return true;
    }

    //Store Operations

    function tradeImage(uint256 id) payable public returns (bool) {
        address owner = image.ownerOf(id);
        if (owner == msg.sender)
            return false;
        uint256 price = store.getPrice(id);
        image.safeTransferFrom(owner, msg.sender, id);
        token.transferFrom(msg.sender, owner, price);
        store.removeProduct(id);
        return true;
    }

    function startSell(uint256 id, uint256 price) public returns (bool) {
        if (!image.exists(id))
            return false;
        if (image.ownerOf(id) != msg.sender)
            return false;
        if (image.getApproved(id) != address(this))
            return false;
        store.addProduct(id, price);
        return true;
    }

    fallback() external payable{
    // this function enables the contract to receive funds
    }

    receive() external payable {

    }
}