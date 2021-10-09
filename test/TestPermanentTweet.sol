pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PermanentTweet.sol";

contract TestPermanentTweet {
    function testItCanTweet() public {
        PermanentTweet permanentTweet = PermanentTweet(DeployedAddresses.PermanentTweet());

        permanentTweet.tweet("Welcome to permanent Twitter!");

        Assert.equal(permanentTweet.tweetCount(), 1, "Tweet count should be 1");

        (address userAddress,
            uint tweetId,
            string memory content,
            uint timeOfPosting
            ) = permanentTweet.tweets(1);

        Assert.equal(
            userAddress,
            tx.origin,
            "The user address should be sender's address"
        );

        Assert.equal(tweetId, 1, "Tweet ID should be 1");

        Assert.equal(
            content,
            "Welcome to permanent Twitter!",
            "Tweet content should match"
        );

        Assert.equal(
            timeOfPosting,
            block.timestamp,
            "Time of posting should match the block timestampt"
        );
    }
}
