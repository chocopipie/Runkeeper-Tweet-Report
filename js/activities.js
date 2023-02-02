// a JavaScript file which edits the DOM of activities.html to display 
// information about the activity types people posted to Twitter.


function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	
	// tweet_array.forEach(tweet => {
	//  	console.log(tweet.activityType + tweet.distance + tweet.day)
	// })

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	// nested object with form
	// { walking: {count:..,totalDistance:..}, 
	//   biking: {count:.., totalDistance:..},
    //   running: {count:.., totalDistance:..}.
    //    ...........
    //  }
	// ref: https://stackoverflow.com/questions/7942398/nested-objects-in-javascript-best-practices
	let tweetActivities = new Object();
	tweetActivities["walking"] = {count: 0, totalDistance: 0.00}
	tweetActivities["biking"] = {count: 0, totalDistance: 0.00}
	tweetActivities["hiking"] = {count: 0, totalDistance: 0.00}
	tweetActivities["mountain biking"] = {count: 0, totalDistance: 0.00}
	tweetActivities["swimming"] = {count: 0, totalDistance: 0.00}
	tweetActivities["skating"] = {count: 0, totalDistance: 0.00}
	tweetActivities["activity"] = {count: 0, totalDistance: 0.00}
	tweetActivities["chair riding"] = {count: 0, totalDistance: 0.00}
	tweetActivities["skiing"] = {count: 0, totalDistance: 0.00}
	tweetActivities["elliptical workout"] = {count: 0, totalDistance: 0.00}
	tweetActivities["MySports Freestyle"] = {count: 0, totalDistance: 0.00}
	tweetActivities["running"] = {count: 0, totalDistance: 00}
	tweetActivities["others"] = {count: 0, totalDistance: 00}

	tweet_array.forEach(tweet => {
		if (tweetActivities.hasOwnProperty(tweet.activityType)) {
			tweetActivities[tweet.activityType].count++;
			tweetActivities[tweet.activityType].totalDistance = parseFloat((tweetActivities[tweet.activityType].totalDistance + tweet.distance).toFixed(2));
		}
	})

	$('#numberActivities').text(Object.keys(tweetActivities).length)
	
	//CHECK: console.log(tweetActivities)

	// create an array of object with the form 
	// [ {type:"walking",count:..}, {type:"biking",count:..}, ...]
	// purpose: sort the count of each activitiy type easier
	// ref: https://stackoverflow.com/questions/34940099/how-to-sort-a-hashmap-with-respect-to-the-value
	let tweetActivitiesArray = []
	Object.keys(tweetActivities).forEach(key => {
		tweetActivitiesArray.push({
			type: key,
			count: tweetActivities[key].count,
			avgDistance: tweetActivities[key].totalDistance / tweetActivities[key].count
		})
	})
	// function to sort the array of object BY VALUE (by count)
	let sortedtweetActivitiesCountArray = tweetActivitiesArray.sort(function(a,b) {
		return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0)
	}) 
	//CHECK: console.log(sortedtweetActivitiesCountArray)
	let firstCountActivity = sortedtweetActivitiesCountArray[0].type
	let secondCountActivity = sortedtweetActivitiesCountArray[1].type
	let thirdCountActivity = sortedtweetActivitiesCountArray[2].type

	$('#firstMost').text(firstCountActivity)
	$('#secondMost').text(secondCountActivity)
	$('#thirdMost').text(thirdCountActivity)

	// create an array of top 3 activity
	let distanceArray = sortedtweetActivitiesCountArray.slice(0,3)
	// function to sort the array of object BY VALUE (by avgDistance)
	let sortedDistanceArray = distanceArray.sort(function(a,b) {
		return (a.avgDistance < b.avgDistance) ? 1 : ((b.avgDistance < a.avgDistance) ? -1 : 0)
	}) 

	let longestActivity = sortedDistanceArray[0].type
	let shortestActivity = sortedDistanceArray[2].type
	$('#longestActivityType').text(longestActivity)
	$('#shortestActivityType').text(shortestActivity)
	// CHECK : console.log(sortedDistanceArray)

	let weekDaysCount = 0;
	let weekEndsCount = 0;
	tweet_array.forEach(tweet => {
		if (tweet.activityType === longestActivity) {
			if (tweet.day === "Mon" || tweet.day === "Tue" || tweet.day === "Wed"
			   || tweet.day === "Thu" || tweet.day === "Fri")
			   weekDaysCount++;
			else
				weekEndsCount++;
		}
	})
	console.log(weekDaysCount + "hi" + weekEndsCount)



	// 1st chart
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweetActivitiesArray
	  },
	  //TODO: Add mark and encoding
	  // used log scale, sort by other axis 
	  "mark": "point",
	  "encoding": {
		"x": {"field": "type", "type": "nominal", "title": "activityType", "sort": "-y"},
		"y": {"field": "count", "type": "quantitative", "title": "count", "scale": {"type": "log"}}
	  },
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	let tweetActivitiesByDayArray = []
	tweet_array.forEach(tweet => {
		if (tweet.activityType === firstCountActivity ||
			tweet.activityType === secondCountActivity ||
			tweet.activityType === thirdCountActivity) {
				tweetActivitiesByDayArray.push({type: tweet.activityType, day: tweet.day, distance: tweet.distance})
			}
	})
	//CHECK: console.log(tweetActivitiesByDayArray)

	// 2nd chart
	activity_vis_dist = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
		  "values": tweetActivitiesByDayArray
		},
		"width": 200,
		//TODO: Add mark and encoding
		// used log scale, sort by other axis 
		"mark": "point",
		"encoding": {
		  "x": {"field": "day", "type": "ordinal", "title": "time(day)",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
		  "y": {"field": "distance", "type": "quantitative", "title": "distance"},
		  "color": {"field": "type"}
		},
	  };
	  vegaEmbed('#distanceVis', activity_vis_dist, {actions:false});


	  // 3nd chart
	activity_vis_dist = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
		  "values": tweetActivitiesByDayArray
		},
		"width": 200,
		//TODO: Add mark and encoding
		// used log scale, sort by other axis 
		"mark": "point",
		"encoding": {
		  "x": {"field": "day", "type": "ordinal", "title": "time(day)",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
		  "y": {"aggregate": "mean", "field": "distance", "type": "quantitative", "title": "distance"},
		  "color": {"field": "type"}
		},
	  };
	  vegaEmbed('#distanceVisAggregated', activity_vis_dist, {actions:false});
	  

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});