# Web-Based Magic Mirror

This is an attempt to create a web-based application to be used as a basis for a Magic Mirror type thing. Its main porpose is to **display useful data** like weather data, time, news (or similar information) to a user in his home.

>  **Disclaimer**   
> This project still is in a very early state, so structural changes might occur on a large scale.


## What's a Magic Mirror❓

A *Magic Mirror* (sometimes also referred to as a *Smart Mirror*) is a screen placed behind a semi-see-through mirror. This mirror is essentially the same type of mirror that is being used in police interrogation rooms. It allows you to see the bright contents of the screen and your reflection on the rest of the mirror.   
I personally think this looks quite dope. You can find countless different implementations of this on Pinterest or elsewhere.


## Quick Start 🛫

`git clone https://github.com/Tscheffrey/magic-mirror-web.git`

`npm install` to install dependencies

`npm start` to let the magic happen - this will start the React app and open [localhost:3000](http://localhost:3000/) in your browser


## Goals 🏁

When starting the project, I had the following goals:


### 1. Create a Web Application 🌐

For later use  on a Raspberry Pi or an Intel Compute Stick (or possibly some sort of android touch device) etc. I want to use only web technologies so that the Application could be run on any Browser.

Addionally, a Web Application can easily be packaged in an [Electron](https://github.com/electron/electron) container so it can be used as a desktop application anyway.

I chose [React](https://github.com/facebook/react) for this purpose.


### 2. User configurable - no direct interactions 👆

Because this application's primary purpose is to provide a simple and quick overview of information on amirror (or something similar), the user is not supposed to interact with the GUI. However, it should include an *Edit mode* so the user can add, remove, move, scale and configure apps.


### 3. No Backend, for now

As I do not have the time nor the ressouces nor the skills to develop a back-end for this. The idea is that all necessary data will only be stored in the WebStorage of the user's browser.


### 4. High Contrast Mode 🔲

Since I want this thing to be usable behind a spy mirror or on a projector, all UI should be minimalist and easily visible. For now, the background will remain black and most content (font colors, etc.) will remain white.



## How it works

This project works on the basis of the awsome [facebook/create-react-app](https://github.com/facebook/create-react-app) project.


### Styling
I use the [node-sass-chokidar package](https://github.com/michaelwayman/node-sass-chokidar) to be able to have the variables and modularization and all the other advantages of SCSS.

The basic styling and imports of the application can be found in `/src/style/base.scss`.

The stylesheets for the Widgets can be found in the `.scss` file with the widget name.

I am currently not happy with the way the stylesheets are modularized. Also, there is some nasty `--mm-` prefixing that I want to get rid of soon.

Most animation and a lot of visibility stuff of the UI elements (maybe a bit too much) is handled by CSS transitions as I think it provides the most solid, reliable and smooth UI for best UX.


### MagicMirror Instance

*documentation coming soon*


### WidgetsWidget Store

*documentation coming soon*


#### Widget Store

*documentation coming soon*


#### Drag a Widget

*documentation coming soon*


#### Scale a Widget

*documentation coming soon*


#### Edit Widget Settings *(back side visible)*

*documentation coming soon*


### Settings

*documentation coming soon*


### Edit Mode

*documentation coming soon*


## Make Your own Widgets

*documentation coming soon*


## Build a Magic Mirror

*documentation coming soon*


## Alternative Use Cases

*documentation coming soon*


## Upcoming changes

- [ ] store widget settings and position data in the browser and restore it at reload
- [ ] enable resizing for Widgets
- [ ] add more types of settings
- [ ] clean up SCSS
- [ ] introduce a side attachment option for widgets and re-calculate their position on window resize
- [ ] built more of those dope widgets