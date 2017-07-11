
var keys = require("./keys.js");


if (process.argv.length > 2) {

    switch (process.argv[2].toLowerCase()) {
        case "my-tweets": getMyTweets(); break;
        case "spotify-this-song": getSongInfo(getInputName(0)); break;
        case "movie-this": getMovieInfo(getInputName(1)); break;
        case "do-what-it-says": getRandomCmd(); break;
    }

}


//==============================

function getInputName(index) {
    var defaultVal;
    if (index == 0) defaultVal = "The+Sign+Ace+of+Base";
    if (index == 1) defaultVal = "Mr+Nobody";

    var inputName = "";
    for (i = 3; i < process.argv.length; i++)
        inputName = inputName + "+" + process.argv[i];

    if (inputName.length)
        return inputName.substring(1);
    return defaultVal;
}

function getMovieInfo(movieName) {
    var request = require("request");
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var omdbJson = JSON.parse(body)
            console.log(
                "\nTitle of the movie: " + omdbJson.Title +
                "\nYear the movie came out: " + omdbJson.Year +
                "\nIMDB Rating of the movie: " + omdbJson.Rated +
                "\nRotten Tomatoes Rating of the movie: " + omdbJson.Ratings[1].Value +
                "\nCountry where the movie was produced: " + omdbJson.country +
                "\nLanguage of the movie: " + omdbJson.Language +
                "\nPlot of the movie: " + omdbJson.Plot +
                "\nActors in the movie: " + omdbJson.Actors + "\n"
            )
        }
    });
}

function getSongInfo(songName) {
    var lastfmApiKey = keys.lastFmApiKey;

    var LastFmNode = require('lastfm').LastFmNode;

    var lastfm = new LastFmNode({
        api_key: lastfmApiKey,
        secret: 'secret'
    });

    var request = lastfm.request("track.search", {
        track: songName,
        limit: 1,
        handlers: {
            success: function (data) {
                if (data.results.trackmatches.track.length)
                    console.log(
                        "\nArtist(s): " + data.results.trackmatches.track[0].artist +
                        "\nThe song's name: " + data.results.trackmatches.track[0].name +
                        "\nA preview link of the song from Spotify: " + data.results.trackmatches.track[0].url + "\n"
                    );
            },
            error: function (error) {
                console.log("Error: " + error.message);
            }
        }
    });

}

function getMyTweets() {
    var twitterUsername = keys.twitterUsername;
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys);
    client.get('statuses/user_timeline', { screen_name: twitterUsername, count: 20 }, function (error, tweets, response) {
        if (!error && response.statusCode == 200) {
            for (i = 0; i < tweets.length; i++) {
                console.log("\n************************\n" +
                    tweets[i].text + "\nCreated at: " + tweets[i].created_at +
                    "\n************************\n");
            }
        }
    });
}

function getRandomCmd() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            var randomText = data.split(",");
            var command = randomText[0];
            if(randomText.length>1)
            var inputName = randomText[1];

            switch (command.toLowerCase()) {
                case "my-tweets": getMyTweets(); break;
                case "spotify-this-song": getSongInfo(inputName); break;
                case "movie-this": getMovieInfo(inputName); break;
            }
        }
    })
}
