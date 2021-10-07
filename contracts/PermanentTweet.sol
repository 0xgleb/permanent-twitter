pragma solidity ^0.5.16;

contract PermanentTweet {
    struct Tweet {
        address userAddress;
        uint tweetId;
        string content;
        uint timeOfPosting;
    }

    mapping (address => Tweet) public tweets;

    uint public tweetCount = 0;

    event TweetPosted(
        address indexed userAddress,
        uint tweetId,
        string content,
        uint timeOfPosting
    );

    /* error TweetIsLongerThan280Characters(string _content);
       - Custom errors are not supported in the version of Solidity
       - that is supported by the latest version of Truffle
     */

    function tweet(string memory _content) public {
        if (bytes(_content).length <= 280) {
            tweetCount++;
            tweets[tx.origin] = Tweet(
                tx.origin,
                tweetCount,
                _content,
                block.timestamp
            );
            emit TweetPosted(tx.origin, tweetCount, _content, block.timestamp);
        } else {
            revert("Tweet is too long");
        }
    }
}
