pragma solidity ^0.5.16;

contract TweetContract {
    address public userAddress;

    constructor() public {
        userAddress = tx.origin;
    }

    struct Tweet {
        uint tweetId;
        string content;
        uint timeOfPosting;
    }

    mapping (uint => Tweet) public tweets;

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
            tweets[tweetCount] = Tweet(
                tweetCount,
                _content,
                block.timestamp
            );
            emit TweetPosted(userAddress, tweetCount, _content, block.timestamp);
        } else {
            revert("Tweet is too long");
        }
    }
}
