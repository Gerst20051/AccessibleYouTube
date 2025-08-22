AccessibleYouTube
========

Welcome to Accessible YouTube, an interface to YouTube designed for people who access their computers via either 2 switches or a mouse.

It allows the user to use two keys/switches or a mouse to navigate through a list of videos, and watch any or all of them.

Currently the list of videos can be a playlist, the results of a video search, the related videos for a particular video, or YouTube's most popular videos.

-------------------------------

`Creator: Andrew Gerst`

`Based on OldYouTube`

To Do:

* Speech on Back and Next
* Reset selected video when home button is pressed

Bugs:

* application.js:191 Uncaught TypeError: Cannot read properties of undefined (reading 'id') `this.aC.currentVideoId = this.aC.playlistArr[vIndex].id;`
* application.js:441 Uncaught ReferenceError: ytplayer is not defined `if (ytplayer) {` the function `onYouTubePlayerReady` is not being called
* Update YouTube API - 404 Not Found - GET https://gdata.youtube.com/feeds/api/videos?q=kittens&max-results=25&v=2&alt=jsonc&callback=dojo.io.script.jsonp_dojoIoScript1._jsonpCallback
