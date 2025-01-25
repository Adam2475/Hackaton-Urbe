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

function releaseAmount(address buyer, address arbiter) public returns (bool) {
    require(msg.sender == buyer || msg.sender == arbiter, "Not Authorized!");
    return (true);
}

// function refundAmount(address seller, address arbiter) public returns (bool) {
//     require(msg.sender == seller || msg.sender == arbiter, "Not Authorized!");
//     return (true);
// }

function pre_payment(uint256 amount, address seller, address arbiter) public {
    // require(amount > 0, "Amount must be greater than 0");
    // require(seller != address(0) && arbiter != address(0), "Invalid seller or arbiter");
	// payer[msg.sender] = amount;
	// totalFunds += amount;
    // bool releaseFunds = releaseAmount(msg.sender, arbiter);
    // if (releaseFunds == true) {
        bool success = IERC20(usdcTokenAddress).transferFrom(msg.sender, address(this), amount);
        require(success, "USDC transfer failed");
        emit PaymentMade(msg.sender, amount, seller);
    // }
    
}
}