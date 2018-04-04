pragma solidity ^0.4.10;

import "../base/Owned.sol";
import "./Shipment.sol";
import "../tokens/ERC20.sol";

contract BOL is Owned {

  enum Status {
    reserve,
    sellerInvited,
    agentInvited,
    verifed,
    purchaseAgreement,
    payment,
    paymentDone,
    titleBOLAppoved,
    titleTransferDone,
    withdrawalDone
  }

  enum TitleTransferStatus{
    notRegistered,
    approved,
    rejected
  }

  modifier onlySuperUsers() {
    if (contractOwner == msg.sender || bolCreatorAddress == msg.sender) _;
  }

  address bolCreatorAddress;


  bool public invitedSeller;
  bool public invitedEscrowAgent;

  bool public buyerSigned;
  bool public sellerSigned;
  bool public brokerSigned;

  address public selledId;
  address public buyerId;
  address public brokerId;
  address public agentId;
  address public inspectorId;//
  address public shipmentId;

  address blockfreightContractAddress;
  ERC20 blockfreightToken;
  address blockfreightCompanyWallet;
  address blockfreightNetworkGrowthPoolWallet;

  address public seller_wallet;
  address public buyer_wallet;

  Status public status;
  TitleTransferStatus public titleTransferStatus;

  string public notaryActionDate;
  string public distributed;

  string public metaAC; // hash of Agent Contract
  string public metaPA; // hash of Purchase Agreement
  string public metaTD; // hash of Title BOL
  string public metaTDLocal; // hash of Title BOL Local

  uint public createdAt;
  uint public updatedAt;

  uint public price;

  mapping (address => uint) public pendingWithdrawals;

  string public rejectDescription;

}