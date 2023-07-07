# Wonderlist

Welcome to Wonderlist, a website designed to organize and visualize a trip itinerary.

## Features

![alt text](/client/public/main-page.png)

Wonderlist is an application that empowers users to easily select and organize their trips. Users effortlessly create travel collections, adding cities and dates to create a personalized itinerary. With Wonderlist, users can plan activities for each day and keep track of the ones they've already enjoyed. They can discover the perfect spots for each city using an interactive map and categorize them for a well-organized journey.

Users stay in the loop with Wonderlist's countdown feature, which keeps them updated on the number of days left until their trip begins. ✈️🌴

## Installation

- Run `npm install` on both the Server folder and Client folder.

## Google Maps API

Go to https://developers.google.com/maps/documentation/javascript/get-api-key to get your own API key.

Include your API key in your `.env` file in your Client folder.

## MongoDB

Go to https://www.mongodb.com/docs/manual/reference/connection-string/ to get your own MongoDB URI.

The MongoDB URI follow this format:

```bash
mongodb://[username:password@]host1[:port1],...hostN[:portN]][/[defaultauthdb][?options]]
```

Include your MongoDB URI in your `.env` file in your Server folder.

## Getting started

Run `npm start` from the Client folder.
Run `nodemon index.js` from the Server folder.

## Usage

Once you have the Wonderlist running, you can start organizing your trips using the following steps:

- Register or Login
- Create a trip collection
- Choose cities and dates for the trip
- Check your trip collections
- Create and delete activities, mark activities as done
- Add new places to the list using the map
