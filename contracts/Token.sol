// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is Ownable, ERC20 {

    constructor() ERC20("Token", "TOK") {

    }
    
    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function getAddress() public view returns (address) {
        return address(this);
    }

}