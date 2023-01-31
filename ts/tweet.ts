class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //DONE: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        let lowercaseText = this.text.toLowerCase();
        if (lowercaseText.includes("rklive"))
            return "live_event";
        else if (lowercaseText.includes("#fitnessalerts"))
            return "achievement";
        else if (lowercaseText.startsWith("just complete") || lowercaseText.startsWith("just posted"))
            return "completed_event";
        else
            return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //DONE: identify whether the tweet is written
        let lowercaseText = this.text.toLowerCase();
        if (this.source !== "completed_event" || lowercaseText.includes("with @runkeeper. check it out!"))
            return false;
        else
            return true;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return this.text.substring(this.text.indexOf('- ') + 1, this.text.indexOf('https'));
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}