# liri-node-app

## Overview

 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 Thhis app uses twitter, lastfm and OMDB APIs to retrieve the data

 ## How It Works

 Make it so liri.js can take in one of the following commands:

   `my-tweets`

   `spotify-this-song`

   `movie-this`

   `do-what-it-says`

### What Each Command Should Do

1. `node liri.js my-tweets`
    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

1. `node liri.js spotify-this-song '<song name here>'`
    * This will show the the song's information
    * If no song is provided then your program will default to "The Sign" by Ace of Base.

1. `node liri.js movie-this '<movie name here>'`
    * This will output the movie's information
    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

1. `node liri.js do-what-it-says`
    * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


## How To Set Up And Run 

Download this repository. 

Open terminal and navigate to the downloaded folder. Run `npm install` in your terminal to install dependencies. 

Make a JavaScript file named keys.js. Enter following codes in it and replace `input here` with your api's keys

```javascript
exports.twitterKeys = {
  consumer_key: '<input here>',
  consumer_secret: '<input here>',
  access_token_key: '<input here>',
  access_token_secret: '<input here>',
}
exports.twitterUsername='<input here>';
exports.lastFmApiKey='<input here>';
```
 In your terminal run `node liri.js` to start the app. 

