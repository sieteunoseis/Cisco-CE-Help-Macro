# Media Player

This script is intended for Webex Room and Board series endpoints on ce9.9.X and up. Is also compatible on cloud registered endpoints

## Getting Started

Download a copy for the script available here call mediaPlayer.js
Edit the ```mediaList``` variable to include all of the content you'd like to deliver to your users.

### How the script works

* The Script will evaluate the abject array in the Media List
```javascript
  {
    "Title": "How to Use Webex", // Title of video
    "Duration": "730", // Length media should be open before closing 
    "URL": "https://www.youtube.com/embed/uoyfxXzbJqw?rel=0&autoplay=1", // URL of video
    "WidgetId": "media_1", //This is the widget ID of the button that will be built
    "Category": "Videos", //This is the category this content belongs too. This will create a new page if it had not already existed
    "ButtonText": "Play", //Text on button, ie. play or open
    "InteractionMode": "NonInteractive" // Should media be interactive?
  }
```
* Based on the object array and it's content, the script will build the XML needed for each row and page.
  * Each Page will be based off the category provided
  * Each row will populate in their respective page, providing a button and information for the user
* After the mediaList object array has been sorted through, a new Panel will be pushed onto the Touch 10, similar to the one below.
![exampleUI.png](https://github.com/Bobby-McGonigle/Macro-Samples/blob/master/Media%20Player/exampleUI.PNG)
* From there, the UI elements should start working based on the information you have provided in the script

### Example format

```javascript
var mediaList = [{
        "Title": "How to Use Webex",
        "Duration": "730",
        "URL": "https://www.youtube.com/embed/uoyfxXzbJqw?rel=0&autoplay=1",
        "WidgetId": "media_1",
        "Category": "Videos",
        "ButtonText": "Play",
        "InteractionMode": "NonInteractive"
    },
    {
        "Title": "Calling with Touch 10",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/m9sbc1/Make-a-Call-from-Room-Devices-and-Webex-Boards-with-a-Touch-Controller",
        "WidgetId": "media_2",
        "Category": "Call",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },

```

### Prerequisites

* Cisco Webex Room Series Endpoint
* Software Version: ce9.9.X or greater
* Admin Access to system
* Knowledge on how to navigate to the Macro Editor, or loading in scripts
* Your network is open to the target media your trying to reach

### Installing

* Download the script
* Edit the mediaList variable to suit your communication needs
* load your edited script into the endpoint
* turn on the macro 
* test

## Running the tests

* Check to see if the content is playing as you expected.

* For example, if you need to play a Youtube video, be sure no ads on on this particular video, as it could disrupt the playback
* Using the embedded link will allow for the video to be full screen
* set the embed link to auto-play as well.

## Deployment

There are many flavors of deployment, but I recommend using Ce-Deploy by Christopher Norman, as it's a great tool for loading this into a whole environment quickly and easily.

* [CE-Deploy](https://github.com/voipnorm/CE-Deploy)

## Things to Consider
* This script was built on the need for my own deployment purposes
* Some edits may be required, as this may tamper with some configuration you already have set on your devices
* For example, this script assumes you do not use Digital Signage normally.
  * If you do, please make edits to limit the impact
* Test Test Test :)

## Author(s)

* **Robert McGonigle Jr**
* **Updated by Jeremy Worden**

## Acknowledgments

* Cisco Room Device Team
* My End Users
* Antoine Eduoard - *Mentor*
* Dawn Passerini - *Mentor*
* Broderic Flannery - *Assisted in testing*
* Robert McGonigle Jr - *Author of orignal code
