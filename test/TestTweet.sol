pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Tweet.sol";

contract TestTweet {
    TweetContract tweetContract;

    function beforeAll() public {
        tweetContract = TweetContract(DeployedAddresses.TweetContract());
    }

    function testItCanTweet() public {
        tweetContract.tweet("Welcome to  Twitter!");

        Assert.equal(tweetContract.tweetCount(), 1, "Tweet count should be 1");

        (uint tweetId,
            string memory content,
            uint timeOfPosting
            ) = tweetContract.tweets(1);

        Assert.equal(tweetId, 1, "Tweet ID should be 1");

        Assert.equal(
            content,
            "Welcome to  Twitter!",
            "Tweet content should match"
        );

        Assert.equal(
            timeOfPosting,
            block.timestamp,
            "Time of posting should match the block timestampt"
        );
    }
}
