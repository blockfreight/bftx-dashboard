pragma solidity 0.4.18;

import "./BaseBOL.sol";
import "./Shipment.sol";
import "../FeeCalc.sol";
import "../tokens/ERC20.sol";


contract OldBOL is BaseBOL {
/*
    bool public buyerSigned;
    bool public sellerSigned;
    bool public brokerSigned;


    string public notaryActionDate;

    string public purchaseAgreement; // hash of Purchase Agreement
    string public titleBOLLocal; // hash of Title BOL Local

    // TODO: change withdrawals
    enum TitleTransferStatus {
        NOT_SET,
        PURCHASE_AGREEMENT,
        PAYMENT,
        PAYMENT_DONE,
        TRANSFER_DONE,
        withdrawalDone,
        approved,
        rejected
    }


    // NOTE: reserve override?


    function changeSellerWallet(address _newAddress)
        onlyNotStatus(Status.withdrawalDone)
        onlySuperUsers()
        returns(bool)
    {
        uint256 withdrawalLimit = pendingWithdrawals[sellerWallet];
        pendingWithdrawals[sellerWallet] = 0;
        pendingWithdrawals[_newAddress] = withdrawalLimit;
        sellerWallet = _newAddress;
        SellerWalletChanged(sellerWallet);
        return true;
    }

    function changeBuyerWallet(address _newAddress)
        onlyNotStatus(Status.withdrawalDone)
        onlySuperUsers()
    returns(bool) {
        uint256 withdrawalLimit = pendingWithdrawals[buyerWallet];
        pendingWithdrawals[buyerWallet] = 0;
        pendingWithdrawals[_newAddress] = withdrawalLimit;
        buyerWallet = _newAddress;
        BuyerWalletChanged(buyerWallet);
        return true;
    }


    // Fallback to receive Ether from any wallet as a payment
    function () payable {
        require(msg.sender == buyerWallet);
        require(status == Status.PAYMENT);
        PaymentReceived(msg.value, msg.sender);
        if (this.balance >= price) {
            // Let buyer get the change
            //pendingWithdrawals[msg.sender] = this.balance - price;
            status = Status.PAYMENT_DONE;
            StatusUpdate(status);
        }
    }



    // sign PA
    function sign(string _hash) returns(bool) {
        if (msg.sender == seller) {
            sellerSigned = true;
            updatedAt = now;
        }
        if (msg.sender == buyer) {
            buyerSigned = true;
            updatedAt = now;
        }
        if (msg.sender == broker) {
            brokerSigned = true;
            updatedAt = now;
        }

        if (sellerSigned && buyerSigned && brokerSigned) {
            //save PA Signed Hash
            purchaseAgreement = _hash;
            status = Status.PAYMENT;
            StatusUpdate(status);

            return true;
        }
    }

    function notaryActionApprove(string _date, string _localHash)
        onlyStatus(Status.PAYMENT_DONE)
        //onlyParty(agent)
        // FIXME: move this function to the BaseBOL, implement restrictions
    returns(bool) {
        notaryActionDate = _date;
        titleBOLLocal = _localHash;
        titleTransferStatus = TitleTransferStatus.approved;

        // transfer 100 PRO tokens comission
        uint256 companyComission = comissionCalc.getCompanyComission(price);
        uint256 networkGrowthComission = comissionCalc.getNetworkGrowthComission(price);
        require(token.balanceOf(buyer) >= companyComission + networkGrowthComission);
        assert(token.transferFrom(buyer, companyWallet, companyComission));
        assert(token.transferFrom(buyer, networkGrowthPoolWallet, networkGrowthComission));
        PropyFee(address(this), companyComission, networkGrowthComission);

        // Update the owner of the shipment
        Shipment prop = Shipment(shipment);
        assert(prop.approveOwnershipTransfer(buyer));

        // Release contract money to seller
        //pendingWithdrawals[sellerWallet] += this.balance;
        status = Status.TRANSFER_DONE;
        StatusUpdate(status);
        return true;
    }

    function notaryActionReject(string _date, string _rejectDescription)
        public
        onlyStatus(Status.PAYMENT_DONE)
    returns(bool) {
        //require(msg.sender == agent);
        notaryActionDate = _date;
        rejectDescription = _rejectDescription;
        titleTransferStatus = TitleTransferStatus.rejected;
        // Cancel pending state for shipmentAddress
        Shipment prop = Shipment(shipment);
        assert(prop.rejectOwnershipTransfer());
        // Release money for buyer's account
        ///pendingWithdrawals[buyerWallet] += this.balance;
        status = Status.TRANSFER_DONE;
        StatusUpdate(status);
        return true;
    }

    function withdraw() public returns(bool) {
        uint256 amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
        status = Status.withdrawalDone;
        StatusUpdate(status);
    }
*/
}
