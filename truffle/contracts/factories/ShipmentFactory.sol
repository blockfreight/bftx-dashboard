pragma solidity 0.4.18;

import "../disposable/Shipment.sol";
import "../base/AddressChecker.sol";
import "../adapters/MultiEventsHistoryAdapter.sol";
import "../adapters/RolesLibraryAdapter.sol";


contract ShipmentFactory is RolesLibraryAdapter, AddressChecker, MultiEventsHistoryAdapter {

    address public controller;
    address public proxy;

    /// EVENTS ///

    event ShipmentCreated(address self, address shipmentAddress);


    /// CONSTRUCTOR ///

    function ShipmentFactory(address _controller, address _proxy, address _rolesLibrary)
        RolesLibraryAdapter(_rolesLibrary)
    {
        assert(_controller != address(0) && _proxy != address(0));
        controller = _controller;
        proxy = _proxy;
    }

    /// SETTINGS ///

    function setupEventsHistory(address _eventsHistory) auth returns(bool) {
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

    function setProxy(address _proxy)
        auth
        notNull(_proxy)
    returns(bool) {
        proxy = _proxy;
        return true;
    }


    /// MAIN FUNCTIONS ///

    function createShipment(
        address _previousVersion, address _owner, string _name, string _physicalAddress, uint8 _areaType, uint256 _area
    )
        only(controller)
    returns(address) {
        // FIXME : Check physical address?
        address shipment = new Shipment(_previousVersion, _owner, _name, _physicalAddress, _areaType, _area);
        Shipment CreatedShipment = Shipment(shipment);
        assert(CreatedShipment.forceChangeContractOwnership(proxy));
        _emitShipmentCreated(shipment);
        return shipment;
    }

    /// MULTI EVENTS HISTORY ///

    function _emitShipmentCreated(address _shipment) internal {
        ShipmentFactory(getEventsHistory()).emitShipmentCreated(_shipment);
    }

    function emitShipmentCreated(address _shipment) {
        ShipmentCreated(_self(), _shipment);
    }


    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public auth {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
