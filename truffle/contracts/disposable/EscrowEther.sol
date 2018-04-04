pragma solidity 0.4.18;

import "./EscrowBase.sol";


contract EscrowEther is EscrowBase {

    function EscrowEther(address _metaBOL, address _bol) EscrowBase(_metaBOL, _bol) {}

    // NOTE: Insist on increasing gas limit when sending ether here.
    function() public payable {
        _checkPayment(msg.sender, msg.value);
    }

    function _withdraw(address _receiver, uint256 _value) internal returns(bool) {
        _receiver.transfer(_value);
        return true;
    }


}
