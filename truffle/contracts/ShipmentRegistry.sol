pragma solidity 0.4.18;

import './adapters/MultiEventsHistoryAdapter.sol';
import "./adapters/RolesLibraryAdapter.sol";
import "./adapters/StorageAdapter.sol";
import "./base/AddressChecker.sol";


contract ShipmentRegistry is AddressChecker, StorageAdapter, MultiEventsHistoryAdapter, RolesLibraryAdapter {

    address public controller;

    StorageInterface.AddressesSet relevantContracts;
    StorageInterface.AddressesSet obsoleteContracts;
    StorageInterface.AddressBoolMapping shipmentExists;


    /// EVENTS ///

    event ShipmentRegistered(address self, address shipmentAddress);
    event ShipmentRemoved(address self, address shipmentAddress);


    /// CONSTRUCTOR ///

    function ShipmentRegistry(
        Storage _store,
        bytes32 _crate,
        address _controller,
        address _rolesLibrary
    ) StorageAdapter(_store, _crate) RolesLibraryAdapter(_rolesLibrary) {
        assert(_controller != address(0));
        controller = _controller;

        relevantContracts.init("relevantContracts");
        shipmentExists.init("shipmentExists");
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
        public
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

    function register(address _shipment)
        public
        only(controller)
        notNull(_shipment)
    returns(bool) {
        if (relevant(_shipment) || includes(_shipment) || obsolete(_shipment)) {
            return false;
        }
        store.add(relevantContracts, _shipment);
        store.set(shipmentExists, _shipment, true);

        _emitShipmentRegistered(_shipment);
        return true;
    }

    function remove(address _shipment, bool _migrated)
        public
        only(controller)
        notNull(_shipment)
    returns(bool success) {
        if (relevant(_shipment)) {
            store.set(shipmentExists, _shipment, false);
            success = true;
        }
        if (includes(_shipment)) {
            store.remove(relevantContracts, _shipment);
            success = true;
            _emitShipmentRemoved(_shipment);
        }

        // If contract has migrated, add it to the obsolete list
        if (_migrated) {
            store.add(obsoleteContracts, _shipment);
        }
    }


    /// GETTERS ///

    function relevant(address _shipment) public constant returns(bool) {
        return store.get(shipmentExists, _shipment);
    }

    function obsolete(address _shipment) constant returns(bool) {
        return store.includes(obsoleteContracts, _shipment);
    }

    function includes(address _shipment) constant returns(bool) {
        return store.includes(relevantContracts, _shipment);
    }

    function count() constant returns(uint256) {
        return store.count(relevantContracts);
    }

    function getAllRelevant() public constant returns(address[]) {
        return store.get(relevantContracts);
    }

    function getAllObsolete() public constant returns(address[]) {
        return store.get(obsoleteContracts);
    }

    /// MULTI EVENTS HISTORY ///

    function _emitShipmentRegistered(address _shipment) internal {
        ShipmentRegistry(getEventsHistory()).emitShipmentRegistered(_shipment);
    }

    function _emitShipmentRemoved(address _shipment) internal {
        ShipmentRegistry(getEventsHistory()).emitShipmentRemoved(_shipment);
    }

    function emitShipmentRegistered(address _shipment) {
        ShipmentRegistered(_self(), _shipment);
    }

    function emitShipmentRemoved(address _shipment) {
        ShipmentRemoved(_self(), _shipment);
    }


    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public auth {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
