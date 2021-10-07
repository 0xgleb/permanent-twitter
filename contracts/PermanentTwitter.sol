pragma solidity ^0.5.16;

import "./PermanentTweet.sol";

contract PermanentTwitter {
    struct User {
        address userAddress;
        uint id;
        string name;
        string bio;
        bool exists;
    }

    mapping (address => User) public users;

    uint public userCount = 0;

    mapping (uint => PermanentTweet) public tweets;

    event UserCreated(address userAddress, uint userId, string name);

    function createUser(string memory _name, string memory _bio) public {
        if (users[msg.sender].exists) {
            revert("User already exists");
        } else {
            userCount++;
            users[msg.sender] = User(msg.sender, userCount, _name, _bio, true);
            emit UserCreated(msg.sender, userCount, _name);
        }
    }

    function tweet(string memory _content) public {
        if (users[msg.sender].exists) {
            User memory user = users[msg.sender];
            tweets[user.id] = new PermanentTweet();
            tweets[user.id].tweet(_content);
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
