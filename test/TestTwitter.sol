pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Twitter.sol";

contract TestTwitter {
    Twitter twitter;

    function beforeAll() public {
        twitter = Twitter(DeployedAddresses.Twitter());

        string memory name = "Cool Name";

        string memory bio = "I'm a really cool big brain developer";

        twitter.createUser(name, bio);
    }

    function testItCanCreateUser() public {
        string memory name = "Cool Name";

        string memory bio = "I'm a really cool big brain developer";

        (address userAddress,
            uint id,
            string memory userName,
            string memory userBio,
            bool exists
            ) = twitter.users(tx.origin);


        Assert.equal(userAddress, tx.origin, "User address is the caller's");

        Assert.equal(id, 1, "User id is 1");

        Assert.equal(userName, name, "User name matches");
        Assert.equal(userBio, bio, "User bio matches");
        Assert.equal(exists, true, "exists is true");
    }

    event JopaBolshaya(string _penis);

    function testItCanTweet() public {
        (,,,, bool userExists) = twitter.users(tx.origin);

        Assert.equal(userExists, true, "User should exist");

        emit JopaBolshaya("enjoy your cock");

        twitter.tweet("Hello Permanent Twitter!");

        (uint tweetId,
            string memory content,
            uint timeOfPosting
            ) = twitter.tweets(tx.origin).tweets(1);

        Assert.equal(tweetId, 1, "Tweet ID should be 1");

        Assert.equal(
            content,
            "Hello Permanent Twitter!",
            "Tweet content should match"
        );

        Assert.equal(
            timeOfPosting,
            block.timestamp,
            "Time of posting should match the block timestampt"
        );
    }
}
