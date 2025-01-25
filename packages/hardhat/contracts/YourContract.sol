//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract project {
//EVENTS

event PaymentMade(address contributor, uint256 amount, address receiver);

//ERRORS

error NotPayed();
error AlreadyPayed();
error InvalidAmount();
error InvalidPayer();
error NotEnoughMoney();

//VARIABLES

uint256 public totalFunds;
// address public OwnerAddress;
// address public usdcTokenAddress = 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d;
address public usdcTokenAddress;
mapping(address => uint256) public payer;

//MODIFIERS

// modifier onlyPayer() {
// 	if (payer[msg.sender] == 0)
// 		revert InvalidPayer();
// 	_;
// }

// modifier EnoughMoney(address vendor, uint256 amount) {
// 	IERC20 token = IERC20(vendor);
// 	uint256 payerFunds = token.balanceOf(vendor);
// 	if (payerFunds < amount)
// 		revert NotEnoughMoney();
// 	_;
// }

//CONSTRUCTOR

constructor(address _usdcTokenAddress)
{
    usdcTokenAddress = _usdcTokenAddress;
	// IERC20 token = IERC20(usdcTokenAddress);
	// totalFunds = token.balanceOf(this);		//ToChange: Soldi totali del conto con un check dall'address
}

//FUNCTION

function payment(uint256 amount, address vendor) public {
	// if (payer[msg.sender] > 0)
	// 	revert AlreadyPayed();
	payer[msg.sender] = amount;
	// totalFunds += amount;
	bool success = IERC20(usdcTokenAddress).transferFrom(msg.sender, address(this), amount);
   // bool success = transferFrom(client, vendor, amount);
	require(success, "USDC transfer failed");
	emit PaymentMade(msg.sender, amount, vendor);
}
}