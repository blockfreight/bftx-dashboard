pragma solidity ^0.4.18;


import "./Ownable.sol";


/**
 * @title Claimable
 * @dev Extension for the Ownable contract, where the ownership needs to be claimed.
 * This allows the new owner to accept the transfer.
 */
contract Claimable is Ownable {
    address public pendingOwner;

    /**
     * @dev Modifier throws if called by any account other than the pendingOwner.
     */
    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner);
        _;
    }

    /**
     * @dev Allows the current owner to set the pendingOwner address.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) onlyOwner public {
        pendingOwner = newOwner;
    }

    /**
     * @dev Allows the pendingOwner address to finalize the transfer.
     */
    function claimOwnership() onlyPendingOwner public {
        OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    mapping (bytes32 => bool) proofs;

    // store a proof of existence in the contract state
    function storeProof(bytes32 proof) {
        proofs[proof] = true;
    }

    // calculate and store the proof for a document
    function notarize(string document) {
        var proof = calculateProof(document);
        storeProof(proof);
    }

    // helper function to get a document's sha256
    function calculateProof(string document) returns (bytes32) {
        return sha256(document);
    }

    // check if a document has been notarized
    function checkDocument(string document) returns (bool) {
        var proof = calculateProof(document);
        return hasProof(proof);
    }

    // returns true if proof is stored
    function hasProof(bytes32 proof) returns (bool) {
        return proofs[proof];
    }
}