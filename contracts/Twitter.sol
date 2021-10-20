pragma solidity ^0.5.16;

import "./Tweet.sol";

contract Twitter {
    struct User {
        address userAddress;
        uint id;
        string name;
        string bio;
    }

    mapping (uint => User) public users;

    mapping (address => uint) internal userIds;

    uint public userCount = 0;

    mapping (uint => TweetContract) public tweets;

    event UserCreated(address userAddress, uint userId, string name);

    function createUser(string memory _name, string memory _bio) public {
        address userAddress = tx.origin;

        if (userIds[userAddress] > 0) {
            revert("User already exists");
        } else {
            userCount++;
            userIds[userAddress] = userCount;
            users[userCount] = User(userAddress, userCount, _name, _bio);
            emit UserCreated(userAddress, userCount, _name);
            tweets[userCount] = TweetContract(userAddress);
        }
    }

    function tweet(string memory _content) public {
        if (userIds[tx.origin] > 0) {
            tweets[userIds[tx.origin]].tweet(_content);
        } else {
            revert("User doesn't exist");
        }
    }

    function donate(address payable _receiver) public payable {
        _receiver.transfer(msg.value);
    }

    address payable appWallet;

    function() external payable {
        appWallet.transfer(msg.value);
    }

    constructor (address payable _wallet) public {
        appWallet = _wallet;
    }
}
