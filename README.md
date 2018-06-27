# NgSmartHomeDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.^

## Widgets

### clock

```json
    {
          "type": "clock",
          "name": "Clock",
          "sizeX": 2,
          "sizeY": 1,
          "color": "#4CAF50",
          "actions": []
    }
```

### line graph

#### Single Series Line Graph

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


#### Multi Series Line Graph

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
        }, 
```


### image

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

### image status

```json
    {
        "type": "statusImage",
        "name": "harmony_activity",
        "title": "TV",
        "statusValues": [
        "netflix",
        "tv"
        ],
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

### number

```json
    {
          "type": "number",
          "name": "LightsOn",
          "title": "Lights on",
          "subtitle": "",
          "dataPrefix": "",
          "dataSuffix": "",
          "sizeX": 1,
          "sizeY": 1,
          "cardColor": "#FFF",
          "headerColor": "#4CAF50",
          "actions": [
            {
              "type": "primary",
              "tabDestinationIndex": 1,
              "socketTopic": "",
              "socketMessage": {}
            }
          ]

        }
```

### status

```json
    {
        "type": "status",
        "name": "total_power",
        "title": "Lights",
        "icons": [
            "power",
            "power_off"
        ],
        "subtitle": "",
        "sizeX": 1,
        "sizeY": 1,
        "cardColor": "#FFF",
        "headerColor": "#4CAF50",
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

### switch

```json
    {
        "type": "switch",
        "name": "lights_Desklamp",
        "deviceName": "lights_Desklamp",
        "title": "Desklamp",
        "sizeX": 1,
        "sizeY": 1,
        "cardColor": "#4CAF50"
    }
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
