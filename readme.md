# Launch Committees

Thinkful Unit 2 Capstone - Full Stack application to supply committee specific tools for Launch committees.

![Screenshots](https://cloud.githubusercontent.com/assets/13989985/23731100/7197c06a-0439-11e7-9cdf-374b578f98f9.jpg)

## Overview

Launch Committees is an application that caters to the specific needs of individual committees within
the Launch community. The home page simply shares the mission of the Launch Committees and gives a brief summary of each committee. The Setup committee has been provided with a setup and cleanup list. The Welcome committee has been provided with user information of new launch members so they can reach out to these people and make them feel welcome within the community. The Outreach, and Foundations committees will be provided with specific tools in a future version of the app.

##Use Case

Why is this app useful? As a member of the Launch community there are many specific needs of various members for the specific committees being built up in our local community. By providing members of Launch committees with applications catered to their needs, they can spend less time on administrative tasks and spend more time connecting with people on a personal level.

##UX

The initial wireframes can be seen below:

- Home Screen / Landing Page (fullscreen):
https://wireframe.cc/fSBuAb
- Log In Screen / Sign Up Screen (fullscreen):
https://wireframe.cc/eCixFV

The app has been designed with a focus on strong, impactful, emotional driven photography used as background images. This page has been themed around the idea of "Launch," a community build to prepare young adults to "Launch" into the next season of their lives. The home screen displays many welcoming images as well as a summary of our mission. By selecting more information on any of the committee summaries, a user will be connected to the specific committee page, allowing the user to make use of custom applications within each committee.

##Working Prototype

You can access a working prototype of the app here: https://agile-shelf-18223.herokuapp.com/

##Technical

* The app is built using the full stack. The front-end is built using html, css, and javascript, the back-end using NodeJS with ExpressJS as the web server and MongoDB as the database.
* The app draws data a custom mongo database created specifically for the Launch Committees app.
* An API to access the database has been constructed in ExpressJS with 3 key endpoints at this moment, returning user information, a setup list, and a cleanup list.
* The prototype app is deployed as a heroku app.
* The app was built to be mobile responsive.

##Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* Providing a log in system to better handle user interactions.
* Providing a prayer request list.
* Providing the Outreach committee with an updatable events list, a photo gallery, and a calendar.
* Providing the Setup Committee with an anonymous recommendation form.
* Providing the Discipleship group with a sign up questionnaire and email alerts for new signups.
