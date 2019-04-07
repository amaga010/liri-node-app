require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs")

function concert(artist) {
     //artist = process.argv[3]
        var axios = require("axios");
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
            console.log("Name of Venue: " + response.data[0].venue.name + "\nLocation of Venue: " 
                + response.data[0].venue.city + ", " + response.data[0].venue.country + "\nDate of Event: "  
                + require('moment')(response.data[0].datetime,'YYYY-MM-DDThh:mm:ss').format("MM/DD/YYYY"))
        });
};

function song(input) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    console.log("Song Title: " + data.tracks.items[0].name + "\nArtist(s): " + data.tracks.items[0].artists[0].name 
    + "\nAlbum Name: " + data.tracks.items[0].album.name + "\nLink to Song: " + data.tracks.items[0].external_urls.spotify)
    });
};

function movie(movie) {
    //movie = process.argv[3]
    var axios = require("axios");
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + 
            response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Produced: " 
            + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nCast: "  
            + response.data.Actors + ".");
    });
}
console.log(process.argv)
var request = process.argv[2]
switch(request){
    //Concert Liri
    case "concert-this":
        concert(process.argv[3])
    break;
    //Spotify Liri
    case "spotify-this-song":
        song(process.argv[3])
    break;
    //Movie Liri
    case "movie-this":
       movie(process.argv[3])
    break;
    //Do What it Says Liri
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data) {
            var content = data.split(",")
            if (content[0] == "spotify-this-song"){
                //console.log(content)
                song(content[1])
            }/*
            if (content[0] == "movie-this"){
                console.log(content)
                movie(content[1])
            }
            if (content[0] == "concert-this"){
                console.log(content)
                concert(content[1])
            }*/
            
        })
    break;
}