const xapi = require('xapi');

/*
Author: Robert McGonigle Jr
        Video Conferencing Services Technician
        Communication and Collaboration Services
        Harvard University Information Technology
        
Date: 04/23/2020

Updated by Jeremy Worden
Date: 04/07/2021
*/


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Store any media here that can be accessed via the Web Engine
//Be sure to test your source prior to deployment for quality, load times, etc.

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
    {
        "Title": "Calling with Webex Board",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/gibdy4/Make-a-Call-from-Cisco-Webex-Board",
        "WidgetId": "media_3",
        "Category": "Call",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
    {
        "Title": "Calling with Webex App",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/n38glho/Make-a-Call-from-Webex-Boards-and-Room-and-Desk-Devices-with-the-Webex-App",
        "WidgetId": "media_4",
        "Category": "Call",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
        {
        "Title": "Share Content Wirelessly",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/pceb9t/Webex-Share-Content-Wirelessly-to-Cisco-Webex-Devices",
        "WidgetId": "media_5",
        "Category": "Share",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
    {
        "Title": "Whiteboard on Webex Boards",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/zfhy55/Use-the-Whiteboard-on-Cisco-Webex-Boards",
        "WidgetId": "media_6",
        "Category": "Whiteboard",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
    {
        "Title": "Webex Board 55",
        "Duration": "730",
        "URL": "https://www.youtube.com/embed/vII53bnQh2k?rel=0&autoplay=1",
        "WidgetId": "media_7",
        "Category": "Videos",
        "ButtonText": "Play",
        "InteractionMode": "NonInteractive"
    },
    {
        "Title": "Webex Board Guide",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/nlbaok1/Cisco-Webex-Board-Quick-Reference-Guide",
        "WidgetId": "media_8",
        "Category": "Webex Boards",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
    {
        "Title": "Webex Room Device Guide",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/5wfsu1/Cisco-Webex-Room-Device-Quick-Reference-Guide",
        "WidgetId": "media_9",
        "Category": "Webex Room Devices",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
    {
        "Title": "Whiteboard on Desk Series",
        "Duration": "60",
        "URL": "https://help.webex.com/en-us/tzyi4v/Use-the-Whiteboard-on-Cisco-Webex-Desk-Series-Devices",
        "WidgetId": "media_10",
        "Category": "Whiteboard",
        "ButtonText": "Open",
        "InteractionMode": "Interactive"
    },
];

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

/*
This is the User Interface Constructor.
- This interface builder is simple, and is meant to help guide you in constructing your UI constructor
- I recommend, when automating in the future, to build your UI in the UI extensions editor, export it, and determine which areas should be automated in your design
*/

//This variable will be populated later in the code, please do not edit.
var pageLibrary_Categories = [];

//The 'pageLibrary_Constructor()' will review each category in your Media List above, and build a proper list pages
//Its purpose is to prevent duplicate pages from forming
function pageLibrary_Constructor() {
    for (let i = 0; i < mediaList.length; i++) {
        if (pageLibrary_Categories.includes(mediaList[i].Category)) {

        } else {
            pageLibrary_Categories.push(mediaList[i].Category);
        }
    }
    console.log("Library assembled; Categories Found => " + pageLibrary_Categories);
    console.log("Constructing UI...");
}

pageLibrary_Constructor();

//The 'page_Constructor()' function will make use of both the 'pageLibrary_Categories' array and the 'media' abject above to build your pages
//based on each 'media[n].Category' name
//This example, and all others in this script, ARE case sensitive

function page_Constructor() {
    let insertPage;
    for (let i = 0; i < pageLibrary_Categories.length; i++) {
        insertPage = insertPage + `<Page>
      <Name>${pageLibrary_Categories[i]}</Name>
      ${row_Constructor(pageLibrary_Categories[i])}<!--COMMENT: Notice we call another Constructor here, and pass along the 'pageLibrary_Categories' data as a parameter-->
</Page>`;
    }
    console.log("UI construction Complete! " + mediaList.length + " pieces of media were acquired, please review your array if this number does not reflect the expected output.");
    return insertPage;
}

//The 'row_Constructor()' has a similar role to 'page_Constructor()', but has an added step of evaluating if the 'media' belongs to this page or not
//This will be 1 row per piece of media, and format the row to include the proper widget information and text

function row_Constructor(category) {
    let insertRow;
    for (let i = 0; i < mediaList.length; i++) {
        if (category === mediaList[i].Category) {
            console.log('Adding Media => Title: "' + mediaList[i].Title + '"');
            insertRow = insertRow + `<Row>
        <Name>${mediaList[i].Title}</Name>
        <Widget>
          <WidgetId>${mediaList[i].WidgetId}</WidgetId>
          <Name>${mediaList[i].ButtonText}</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>`;
        } else {}
    }
    return insertRow;
}

//Here is where the panel button is first made, and triggers the subsequent pages and rows to be built
//We have it set to run about 5 seconds after the script initializes, to allow enough time for the library to be built (a more than generous length of time)

//This is where the 'page_Constructor()' will first be called, and return all of it's information

sleep(5000).then(() => {
    xapi.command('UserInterface Extensions Panel Save', {
        PanelId: 'media_Tutorials_v4'
    }, `<Extensions>
  <Version>1.7</Version>
  <Panel>
    <Order>2</Order>
    <PanelId>tutorial</PanelId>
    <Origin>local</Origin>
    <Type>Home</Type>
    <Icon>Lightbulb</Icon>
    <Color>#FF503C</Color>
    <Name>How To Guides</Name>
    <ActivityType>Custom</ActivityType>
    ${page_Constructor()}
  </Panel>
</Extensions>`);
});

//_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

/*
This is the Media Player itself
- It can handle anything the Room Device's Web Engine can handle, but is limited as there is no user navigation available
-- Youtube videos, Team Docs, Room Directions, anything you can think of that's accessible on the net, or your org
- This player will take in account for all the information preset in the 'media' object, and play the content appropriately
To break down a media object
"Title": The Title of your content, restricted character limit based on Row Name, title should be 20 characters or less
"Duration": How long you want your media to run for,
"URL": Location of your content, BE sure your Network permissions are open to access this content,
"WidgetId": Set the Widget ID to your button on the Touch 10,
"Category": Use in the UI construction above
"ButtonText": Play or Open depending on content type
"InteractionMode": Should the page be interactive or not?
*/

//Used to lengthen media duration, based on observing your media load speeds
var mediaTimeBuffer = 20; //seconds

//System Configuratoin Defaults
////Fill this section out to match your normal system build
var ultraSound_Default = 45;
var proximity_Default = 'On';
var halfwakeMessage_Default = "";

//used in logs
var exitMedia_log = 'x';
var count_Interupt = 0;

//counter
let count = 0;

//Sets system into a state to make use of the digital signage platform
function startMedia(mode) {
    // xapi.config.set('Proximity Mode', 'OFF'); // Depends on model?
    xapi.config.set('Audio Ultrasound MaxVolume', 0);
    xapi.config.set("Standby Signage Audio", "On");
    xapi.config.set("Standby Signage InteractionMode", mode);
    xapi.config.set('Standby Signage Mode', 'ON');
    xapi.config.set('WebEngine Mode', 'ON');
    xapi.command('Standby Halfwake');
    sleep(100).then(() => {
        mediaTimer();
    });
}

//Reverts system back to the original state of your system.
function exitMedia() {
    // xapi.config.set('Proximity Mode', 'On'); // Depends on if model supports it.
    // xapi.config.set('WebEngine Mode', 'OFF'); // Needed for webrtc calling. Disable if needed by org.
    xapi.config.set('UserInterface OSD HalfwakeMessage', halfwakeMessage_Default);
    xapi.config.set('Audio Ultrasound MaxVolume', ultraSound_Default);
    xapi.config.set("Standby Signage Audio", "Off");
    xapi.config.set("Standby Signage InteractionMode", "NonInteractive");
    xapi.config.set('Standby Signage Mode', 'OFF');
    xapi.command('Standby Deactivate');
    count_Interupt = count;
    count = -1;
}

//Timer for media playback. Used for logging and exiting the media
function mediaTimer() {
    count--;
    if (count === 0) {
        exitMedia();
        console.log('media: "' + exitMedia_log + '" finished.');
    }
    if (count <= -2) {
        if (count_Interupt > 0) {
            console.log('Media: "' + exitMedia_log + '" stopped by user. Time remaining: ' + (count_Interupt - mediaTimeBuffer) + 's.');
        }
        return;
    }
    setTimeout(mediaTimer, 1000);
}

//Detects if the standby state is interrupted, then runs exits the media if running
xapi.status.on('Standby State', (state) => {
    if (state == 'Off') {
        exitMedia();
    }
});

//UI actions, this will search through the array, and grab the proper content when the button is pressed.
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if (event.Type === 'released') {
        mediaList.find(function(item, i) {
            if (item.WidgetId === event.WidgetId) {
                let index = i;
                exitMedia_log = mediaList[index].Title;
                console.log('media: "' + mediaList[index].Title + '" started.');
                xapi.config.set('UserInterface OSD HalfwakeMessage', "Now Playing: " + mediaList[index].Title + ". Tap the touch panel to exit.");
                sleep(100).then(() => {
                    xapi.config.set('Standby Signage Url', mediaList[index].URL);
                    count = parseInt(mediaList[index].Duration) + mediaTimeBuffer;
                    startMedia(mediaList[index].InteractionMode);
                });
                return;
            } else {
                return;
            }
        });
    }
});
