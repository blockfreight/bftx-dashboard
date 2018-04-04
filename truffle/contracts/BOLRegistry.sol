pragma solidity 0.4.18;

import "./adapters/StorageAdapter.sol";
import "./base/AddressChecker.sol";
import './adapters/MultiEventsHistoryAdapter.sol';
import "./adapters/RolesLibraryAdapter.sol";


contract BOLRegistry is RolesLibraryAdapter, AddressChecker, StorageAdapter, MultiEventsHistoryAdapter {

    address public controller;

    StorageInterface.AddressesSet allBOLs;
    StorageInterface.AddressBoolMapping bolExists;

    /// EVENTS ///

    event BOLRegistered(address self, address addr);
    event BOLRemoved(address self, address addr);


    /// CONSTRUCTOR ///

    function BOLRegistry(
        Storage _store,
        bytes32 _crate,
        address _controller,
        address _rolesLibrary
    ) StorageAdapter(_store, _crate) RolesLibraryAdapter(_rolesLibrary) {
        assert(_controller != address(0));
        controller = _controller;

        allBOLs.init("allBOLs");
        bolExists.init("bolExists");
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



    /// MAIN FUNCTIONS ///

    function register(address _bol) public only(controller) notNull(_bol) returns(bool) {
        if (registered(_bol) || includes(_bol)) {
            return false;
        }

        store.add(allBOLs, _bol);
        store.set(bolExists, _bol, true);

        _emitBOLRegistered(_bol);
        return true;
    }

    function remove(address _bol) public only(controller) notNull(_bol) returns(bool success) {
        if (registered(_bol)) {
            store.set(bolExists, _bol, false);
            success = true;
        }
        if (includes(_bol)) {
            store.remove(allBOLs, _bol);
            success = true;
            _emitBOLRemoved(_bol);
        }
    }


    /// GETTERS ///

    function registered(address _bol) public constant returns(bool) {
        return store.get(bolExists, _bol);
    }

    function includes(address _bol) constant returns(bool) {
        return store.includes(allBOLs, _bol);
    }

    function count() constant returns(uint256) {
        return store.count(allBOLs);
    }

    function getAll() public constant returns(address[]) {
        return store.get(allBOLs);
    }


    /// MULTI EVENTS HISTORY ///

    function _emitBOLRegistered(address _bol) internal {
        BOLRegistry(getEventsHistory()).emitBOLRegistered(_bol);
    }

    function _emitBOLRemoved(address _bol) internal {
        BOLRegistry(getEventsHistory()).emitBOLRemoved(_bol);
    }

    function emitBOLRegistered(address _bol) {
        BOLRegistered(_self(), _bol);
    }

    function emitBOLRemoved(address _bol) {
        BOLRemoved(_self(), _bol);
    }

    /// RESTRICTIONS & DISASTER RECOVERY ///

    function kill() public auth {
        selfdestruct(msg.sender);
    }

    // FIXME: Add maintenance mode

}
