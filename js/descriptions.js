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

	// let tableBody = $('#tweetTable')
	// for (let i = 0; i < written_tweet_array.length; i++) {
	//  	tableBody.append(written_tweet_array[i].getHTMLTableRow(i+1))
	// }
}	

function addEventHandlerForSearch() {
	let tableBody = $('#tweetTable')
	$('#textFilter').on('keyup', function(event) {
		tableBody.empty()
		let searchText = $(this).val()
		
		$('#searchText').text(searchText)

		let filteredArray = []
		if (searchText !== "") {
			filteredArray = written_tweet_array.filter(tweet => {
				if ((tweet.text).toLowerCase().includes(searchText.toLowerCase()))
					return tweet;
			})
		}

		$('#searchCount').text(filteredArray.length);

		for (let i = 0; i < filteredArray.length; i++) {
			tableBody.append(filteredArray[i].getHTMLTableRow(i+1))
		}
	})
		
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});