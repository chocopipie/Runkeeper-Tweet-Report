// a JavaScript file which edits the DOM of description.html 
// to display an interface for searching through the Tweets.

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: Filter to just the written tweets
	written_tweet_array = tweet_array.filter(tweet => tweet.written)
	//console.log(written_tweet_array)


	written_tweet_array.forEach(tweet => {
		console.log(tweet.link)
	})
	let table = $('.table')
	for (let i = 0; i < written_tweet_array.length; i++) {
		table.append(written_tweet_array[i].getHTMLTableRow(i+1))
	}
}	

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});