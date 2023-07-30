pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
/**
* @title TestToken is a basic ERC20 Token
*/
contract TestToken is ERC20, Ownable{

/**
    * @dev assign totalSupply to account creating this contract */
    constructor() public {

        _mint(msg.sender, 100000000000);

    }
}