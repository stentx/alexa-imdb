var alexa = require('alexa-app');
var omdb = require('omdb');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('alexa-imdb');
app.launch(function(req,res) {
	res.say("Hello World!!");
});
app.intent('NameIntent', {
		"slots":{"MOVIE":"LITERAL"}
		,"utterances":["{Informationen} {über} {-|MOVIE}"]
	},function(req,res) {
		var movie = req.slot('MOVIE');
		omdb.search(movie, function(err, movies) {
		    if(err) {
		        return console.error(err);
		    }

		    if(movies.length < 1) {
		        return console.log('No movies were found!');
		    }

		    movies.forEach(function(movie) {
		        console.log('Film '+movie.title+' ist aus dem Jahr '+movie.year+' .');
		        res.say('Film '+movie.title+' ist aus dem Jahr '+movie.year+' .').shouldEndSession(false);
		    });

		    // Saw (2004)
		    // Saw II (2005)
		    // Saw III (2006)
		    // Saw IV (2007)
		    // ...
		});
	}
);

module.exports = app;
