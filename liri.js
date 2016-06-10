var keys = require('./keys.js') 
var Twitter = require('twitter'); 
var spotify = require('spotify'); 
var request = require('request'); 
var fs = require('fs'); 

var getArtistNames = function(artist){
	return artist.name;
}

var getMeSpotify = function(songName){

	if (songName === undefined){
		songName = 'What\'s my age again';
	}
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 	
	    var songs = data.tracks.items;

	    for(var i = 0; i < songs.length; i++){
	    	console.log(i);
	    	console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
	    	console.log('song name: ' + songs[i].name);
	    	console.log('preview song: ' + songs[i].preview_url);
	    	console.log('album: ' + songs[i].album.name);
	    	console.log('-----------------------------------');
	    }
	});
}
var getMyTweets = function(){
	 
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'Dan56781'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	   
	  	for(var i=0; i < tweets.length; i++){
	  		console.log(tweets[i].created_at);
	  		console.log('');
	  		console.log(tweets[i].text);
	  	}
	  }
	});	
}

var getMeMovie = function(movieName){

	if (movieName === undefined){
		movieName = 'Mr Nobody';
	}

	var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

	request(urlHit, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var jsonData = JSON.parse(body);

	    console.log('Title: ' + jsonData.Title);
	    console.log('Year: ' + jsonData.Year);
	    console.log('Rated: ' + jsonData.Rated);
	    console.log('IMDB Rating: ' + jsonData.imdbRating);
	    console.log('Country: ' + jsonData.Country);
	    console.log('Language: ' + jsonData.Language);
	    console.log('Plot: ' + jsonData.Plot);
	    console.log('Actors: ' + jsonData.Actors);
	   	console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
	    console.log('Rotton Tomatoes URL: ' + jsonData.tomatoURL);
	  }
	});

}

