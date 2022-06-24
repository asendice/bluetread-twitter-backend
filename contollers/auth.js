require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi(`${process.env.BEARER_TOKEN}`);

const params = {
  query: "#cloud #webapp",
  "tweet.fields": "created_at,public_metrics,attachments",
  expansions: "author_id,attachments.media_keys",
  "user.fields": "username,profile_image_url",
  "media.fields": "height,width,url",
  max_results: "20",
};

exports.getTweets = async (req, res) => {
  await client
    .get(`https://api.twitter.com/2/tweets/search/recent`, params)
    .then((results) => {
      const tweets = results.data;
      const { users } = results.includes;
      const { media } = results.includes;
      const arrayOfTweetsWithUserAndMedia = tweets.map((tweet) => {
        const newTweet = tweet;
        if (tweet.attachments) {
          const url = media.filter((media) => {
            if (tweet.attachments.media_keys[0] === media.media_key) {
              return media;
            }
          });
          newTweet.media = url[0];
        }
        const userInfo = users.filter((user) => {
          if (tweet.author_id === user.id) {
            return user;
          }
        });
        newTweet.userName = userInfo[0].username;
        newTweet.name = userInfo[0].name;
        newTweet.profileImage = userInfo[0].profile_image_url;
        return newTweet;
      });
      return arrayOfTweetsWithUserAndMedia;
    })
    .then((listOfTweets) => {
      if (listOfTweets) {
        return res.status(200).json({
          success: true,
          results: listOfTweets,
        });
      } else {
        return res.status(400).json({
          sucess: false,
          results: "There was an error retrieving data",
        });
      }
    });
};
