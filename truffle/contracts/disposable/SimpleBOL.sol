pragma solidity 0.4.18;

import "../base/Owned.sol";


contract SimpleBOL is Owned {
    address public shipment;
    uint256 public price;
    address public seller;
    address public buyer;
    mapping (uint8 => mapping(bytes32 => bytes32)) public data;

    event DataProvided(
        uint8 move, uint party, address who, bytes32 key, bytes32 value
    );

    function SimpleBOL(
        address _shipment,
        uint256 _price,
        address _seller,
        address _buyer,
        bytes32[] _keys,
        bytes32[] _values)
    {
        require(
            _shipment != 0 &&
            _price != 0 &&
            _seller != 0 &&
            _buyer != 0 &&
            _keys.length == _values.length &&
            _seller != _buyer
        );
        shipment = _shipment;
        price = _price;
        seller = _seller;
        buyer = _buyer;
        for (uint8 i = 0; i < _keys.length; i++) {
            require(data[1][_keys[i]] == bytes32(0));
            data[1][_keys[i]] = _values[i];
            DataProvided(1, 0, 0, _keys[i], _values[i]);
        }
    }
}
