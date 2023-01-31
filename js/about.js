function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);

	// TWEET DATES
	let options = { weekday: "long",
					year: "numeric",
					month: "short",
					day: "numeric" };
	let firstDate = tweet_array[tweet_array.length -1].time.toLocaleDateString("en-US", options);
	let lastDate = tweet_array[0].time.toLocaleDateString("en-US", options);
	
	$('#firstDate').text(firstDate);
	$('#lastDate').text(lastDate);

	// TWEET CATEGORIES
	// create element for each categories
	let completedEvents = 0;
	let liveEvents = 0;
	let achievements = 0;
	let miscellaneous = 0;
	let tweetType;
	// count number of each category
	tweet_array.forEach(tweet => {
		tweetType = tweet.source;
		if (tweetType === 'live_event') liveEvents++;
		else if (tweetType === 'completed_event') completedEvents++;
		else if (tweetType === 'achievement') achievements++;
		else if (tweetType === 'miscellaneous') miscellaneous++;
	});
	// set HTML elements to value above
	$('.completedEvents').text(completedEvents)
	$('.liveEvents').text(liveEvents)
	$('.achievements').text(achievements)
	$('.miscellaneous').text(miscellaneous)
	// set percentage
	$('.completedEventsPct').text(`${math.round((completedEvents  / tweet_array.length) * 100,2)}%`)
	$('.liveEventsPct').text(`${math.round((liveEvents  / tweet_array.length) * 100,2)}%`)
	$('.achievementsPct').text(`${math.round((achievements  / tweet_array.length) * 100,2)}%`)
	$('.miscellaneousPct').text(`${math.round((miscellaneous  / tweet_array.length) * 100,2)}%`)
	

	// WRITTEN TEXT
	let writtenText = 0;
	tweet_array.forEach((tweet) => {
		if (tweet.written) {
			writtenText++;
			console.log(tweet.writtenText)
		}
	})
	$('.written').text(writtenText)
	$('.writtenPct').text(`${math.round((writtenText  / completedEvents) * 100,2)}%`)
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});