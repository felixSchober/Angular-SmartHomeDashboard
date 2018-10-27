# Smarthome Dashboard for Tablets

This project is a modular smart home dashboard application based on Angular 6. It is configurable with json files. The dashboard connects to a separate [Express Server](https://github.com/felixSchober/Express-SmartHomeServer) via [Socket.io](https://socket.io/).

This is a private side project that I created to control my own smart home.

![Home 1](https://w43via.am.files.1drv.com/y4mOhtk5dFzXjNbGCwVCBKKUnkFVDsOfKOM828Fq6Ktshh7x1mpEzbRI6KfYpYkAM8Q6cadBH4F64fbucUfXV0Vm3Gt0KnlA4vx8lEPzI4h4L9NEf2kW_oKO9HchO81gf_-XYit00P72d9ZwFd7jA075tBh0qHJlb2SOyGED789Hw2EkE6PsQj1KVnqID1bc0-8?width=1282&height=803&cropmode=none)

![Home 2](https://w42klq.am.files.1drv.com/y4mhhNFeaLA72DXG7E90KhG2pXcE8bKziBXgnjetRgZ5CA5YqXstl3tJdZp0KG2wdnHvnp8OjS3Fvvm8_YyMzEFUX9k3Ah10sNUhkgIS59aka7veFma_7j_2_RA-jAOWi12I9Fq6cuZxyRzj3ri4DsXZjgQ3PKdKo507t8ac-BhvQtZI9kisVlJQ9D4WZAvHfHj?width=1281&height=803&cropmode=none)

![Home 3](https://w42r3a.am.files.1drv.com/y4mkDt5mwj1Q1vD37tMD_SQj1sFKaUzh5trqu38z1chW6tviIFI-MBIyuphfhmWfN2OIBDPV939jIAMZt3MVd0S5sTG9Os73WPvhLY-7FnByrRHF-228yNaomxql6SaTxf8yihikw5vLzn-BHld4--vfLPUfxdeTBcGxr-NbZFHtXnC2Xwegppqju89_qQ0kmia?width=1284&height=803&cropmode=none)

## Current state

Currently it is able to control the following systems in my home:

* Hue Ecosystem
    * Lights
    * Scenes
    * Plugs
    * Temperature Readings from Hue Motion Sensors
* TP-Link Smart Plugs with energy monitoring (only HS110)
* Logitech Harmony Bridge with support for activities and commands
    * TV
    * AV-Receiver
    * Xbox
    * Apple TV
* Custom DIY Ambilight
* Custom iTunes-Controller ([Repo](https://github.com/felixSchober/iTunesController))
   * Playlist selection
   * Play / Pause
   * Skip / Prev (*TODO*)

### Planned

* Connection to Apple Health to display steps, heartrate, sleep, weitht, etc...
* [Nuki](https://nuki.io/de/) support
* [IFTTT](https://ifttt.com/discover) support
* Dynamic configuration file support (controlled by server based on current situation)
* Action chaining
* [Magic Mirror](https://magicmirror.builders/) support
* More widgets to display data

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.^

## Widgets

The layout of the dashboard is customizable with json files.

### Clock widget

Displays a digital clock widget

![Clock Widget](https://kbmfrg.am.files.1drv.com/y4mhAj0Fk8DRlaehoZ2nvmHdyaWJ4dUaSWslCpz9G_dm9eSbxo_I8OnTXyCT9JGEtTtRUiZxtzDr8BYaD8OLHuNFDXifyOrxOLJ0HRLRFfPFCj9y3hanhyQ3MzqzydsNOvL5ymIdQqJYc_dpcsNfBRbS9VrcyAqt_Rtbfd_oe7ksCrbWRdFcw5sp2NAoMilaiWT?width=354&height=173&cropmode=none)

```json
    {
          "type": "clock",
          "name": "Clock",
          "sizeX": 2,
          "sizeY": 1,
          "actions": []
    }
```

### Line graph widget

The dashboard currently supports two different graph widgets based on the fantastic [d3](https://d3js.org/) library.

#### Single series line graph widget

Displays a d3 graph with a single line series.

![Single line graph widget](https://w425nw.am.files.1drv.com/y4mDyg4QB1tfMSNLD723HTDHgONjD7Aw4yPy3NiFVh6GjOMd6kp2fMQoRXl_yMcZQDeDoKqP64-CijK-ieZXMSq4DqdHwsHN3qLQCEQ8Viw64GOusPWfZ0ZHWG7ZJD1L5aBuP9ZoWZIM4oE7-4J8hBJol33aMvIQ8K7A_T37orzc6n_Z93CXHUmLcbcqGkq98GF?width=348&height=173&cropmode=none)

```json
    {
          "type": "lineGraph",
          "name": "powerLevelHistory_Computer",
          "title": "Computer",
          "parameters": {
            "scaleType": "linear",
            "singleSeriesColorFunction": true,
            "ticks": 4,
            "ticksFormatterFunctionType": null,
            "areaOpacity": 0.2
          },
          "margins": {
            "top": 4,
            "bottom": 0,
            "left": 0,
            "right": 0
          },
          "dataPrefix": "",
          "dataSuffix": "W",
          "sizeX": 1,
          "sizeY": 1,
          "cardColor": "#FFF",
          "headerColor": "#4CAF50",
          "showLegend": false,
          "actions": [
            {
              "type": "primary",
              "tabDestinationIndex": 3,
              "socketTopic": "",
              "socketMessage": {}
            }
          ]
    }
```

#### Multi series line graph widget

Displays a d3 graph with multiple line series.

![Multi line graph widget](https://w40lcg.am.files.1drv.com/y4mHOr-FBp7H5L3qZZV3rWCvWr8cfBJ_ZycKqb9SEy-BVCFTqjIdgFsgAZ05x6y674zok673sTymlI-XntkisvYRP2BRt--3eEVKBwGcttcw9nAfRpTaIWypaARK0Mv7SiBAQOc74xkCm8A-vELyCtuGQ5P97i2uBcRAg1IQQX2Z7lNzkOuFRBc3rT6WpuQPuKK?width=1252&height=531&cropmode=none)

```json
    {
          "type": "lineGraph",
          "name": "powerLevelHistory_Total",
          "title": "Power History",
          "parameters": {
            "scaleType": "date",
            "singleSeriesColorFunction": false,
            "ticks": 5,
            "ticksFormatterFunctionType": null,
            "areaOpacity": 0.2
          },
          "margins": {
            "top": 4,
            "bottom": 20,
            "left": 28,
            "right": 4
          },
          "dataPrefix": "",
          "dataSuffix": "",
          "sizeX": 1,
          "sizeY": 2,
          "cardColor": "#FFF",
          "headerColor": "#4CAF50",
          "showLegend": true,
          "actions": [
            {
              "type": "primary",
              "tabDestinationIndex": 3,
              "socketTopic": "",
              "socketMessage": {}
            }
          ]
    }
```

### Image widget

Displays a dynamic image like an album cover.

![Images](https://w40eww.am.files.1drv.com/y4mRhna3qXhxqtOrmsWHW6Jhon9eaQBMbWHBSnk-xnTgDaxo2mUjupw3OIPACS2vy0iQ0wlo51Z3if2hnFwDy7trrXz--CfZ0wDE2g_HcG-_QuCsLBRI-BCWipN92tH3hv43OD5X3qpb5P2Cwf0u21sIIfsBSOt6jO00ieJwRXQzlzPfW2DmHs4NHE5x5X7Cgx-?width=538&height=183&cropmode=none)

### Example 1

Displays the current harmony activity. A tap on the widget navigates to a specific page to control the harmony devices.

```json
    {
        "type": "image",
        "name": "harmony_activity",
        "sizeX": 1,
        "sizeY": 1,
        "actions": [
            {
                "type": "primary",
                "tabDestinationIndex": 2,
                "socketTopic": "",
                "socketMessage": {}
            }
        ]
    }
```

### Example 2

Displays a generated cover for a playlist. A tap on the widget sends a message to the server to play this playlist.

```json
    {
          "type": "image",
          "name": "music_playlist_1_cover",
          "sizeX": 1,
          "sizeY": 1,
          "actions":
          [
            {
              "type": "Primary",
              "socketTopic": "music_playlist",
              "socketMessage":
                {
                    "folder": "Dashboard",
                    "index": 1
                }
            }
          ]
    }
```

### Switch widget

There are three different switches:

1. A Hue-Switch (type `switch`)
2. A TP-Link switch (type `switchPlug`)
3. A music player switch to control playback (type `switchMusicPlayer`)

However, all widgets behave and look exactly the same.

![Switch](https://kbnqoq.am.files.1drv.com/y4mBr1BHTq3lTP7FI9cHDttz9XzssKvjqkM5_HZPWR9RdAuJiGZq3cx1jYgJJXe5Gp8r9AsRqxmioMKSVgl9V6N6Rj-wqbPHitxj7eHz3z1fwGw6m4dEGvy8IRMd0JFl5cvWROJUnDHNMrG2g0lrzUhwghizFwSanoc0lZeuP7-c03iP4A-P41paku6dG1PwOXb?width=176&height=175&cropmode=none)

#### Hue switch widget

```json
    {
          "type": "switch",
          "name": "lights_Ambilight",
          "deviceName": "Ambilight",
          "title": "Ambilight",
          "sizeX": 2,
          "sizeY": 1
    }
```

#### TP-Link switch widget

```json
    {
          "type": "switchPlug",
          "name": "power_Computer",
          "sizeX": 1,
          "sizeY": 1,
          "deviceName": "Computer",
          "title": "Computer"
    }
```

#### Music player switch widget

```json
    {
          "type": "switchMusicPlayer",
          "name": "music_player_mute",
          "deviceName": "Skip",
          "title": " ",
          "startStatus": "volume_mute",
          "sizeX": 1,
          "sizeY": 1
    }
```

### Number widget

This widget displays a dynamic number like a live power consumption.

![Number widget](https://w41ura.am.files.1drv.com/y4mDQaMteyPqmiSW452ze8CkDMyLYd3mTAATXV_GHUBEffu631qfOce9pKaZgBhQEYlPVs-j36hkiOPE4rmUO59CUmcW59olg9u6d3sAYlvx2rS1CPhuTC-Cqh39JLDmVaXj9OVgnMoBkoMInetibXplQUsYtZoICeDljWvxKox53_T_7juQqEx7ZuQbNzb1Aqd?width=350&height=171&cropmode=none)

```json
    {
          "type": "number",
          "name": "powerLevelValue_Total",
          "title": "Total Power",
          "subtitle": "",
          "dataPrefix": "",
          "dataSuffix": "W",
          "sizeX": 2,
          "sizeY": 1,
          "showHighLow": true
    }
```

### Image Switch widget

Depending on the value this widget can take on two different image states.

![Image Switch](https://w43afg.am.files.1drv.com/y4mWiew3pj4ldLFFRRUp_Zo2wIBRyzUjbpPKMFRQYud20T0N8bgsFA2ady_sbmsKz-5NneyECcPri9FjU2iUD5GVWshZoLbYX-b5gtqiZC5-avc70-aTloLT-y2cQsSA8Yqa19GmL8BQzpHCz1fLrYwou9Vm76NeoVhyfmm_NMo5daVpdZ1g6bnaq7qacTPahBq?width=177&height=174&cropmode=none)

```json
    {
          "type": "imageSwitch",
          "name": "harmony_activity_Continue Netflix_state",
          "deviceName": "Continue Netflix",
          "imageUrl": "Continue Netflix.png",
          "imageUpdatePrefix": "harmony/activities/",
          "sizeX": 1,
          "sizeY": 1
    }
```