pragma solidity 0.4.18;

import "./base/AddressChecker.sol";
import "./adapters/MultiEventsHistoryAdapter.sol";
import "./adapters/RolesLibraryAdapter.sol";


contract ShipmentInterface {
    function forceChangeContractOwnership(address) returns(bool);
    function setShipmentToPendingState(address) returns(bool);
    function migrate(address) returns(bool);
}

contract ShipmentProxy is RolesLibraryAdapter, AddressChecker, MultiEventsHistoryAdapter {

    address public controller;

    function ShipmentProxy(
        address _controller,
        address _rolesLibrary
    ) RolesLibraryAdapter(_rolesLibrary) {
        assert(_controller != address(0) && _rolesLibrary != address(0));
        controller = _controller;
    }

    /// SETTINGS ///

    function setupEventsHistory(address _eventsHistory) public auth returns(bool) {
        if (getEventsHistory() != 0x0) {
            return false;
        }
        _setEventsHistory(_eventsHistory);
        return true;
    }

    function setController(address _controller)
        auth
        notNull(_controller)
    returns(bool) {
        if (controller == _controller) {
            _emitError("Attempt to change to the same value");
            return false;
        }
        _emitServiceChanged("Controller", controller, _controller);
        controller = _controller;
        return true;
    }


    /// MAIN FUNCTIONS ///

    function setShipmentToPendingState(address _shipment, address _bol)
        public
        only(controller)
    returns(bool) {
        ShipmentInterface Shipment = ShipmentInterface(_shipment);
        return Shipment.setShipmentToPendingState(_bol);
    }

    // Change `_shipment` contract ownership `_to` new version of ShipmentProxy
    function forceShipmentChangeContractOwnership(address _shipment, address _to)
        public
        auth
    returns(bool) {
        // NOTE : Maybe better switch to `assert`
        if (_shipment == address(0) || _to == address(0)) {
            return false;
        }
        ShipmentInterface Shipment = ShipmentInterface(_shipment);
        return Shipment.forceChangeContractOwnership(_to);
    }

    function migrateShipment(address _shipment, address _to) public only(controller) returns(bool) {
        ShipmentInterface Shipment = ShipmentInterface(_shipment);
        return Shipment.migrate(_to);
    }


    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public auth {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
