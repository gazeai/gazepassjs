# GazepassJS

This library allows you to integrate [Gazepass](https://gazepass.com/) into your website.

## How does it work?

1. You acquire an access token for the user account by using this library (and your API key)
2. You send that access token to you server/backend
3. Your server/backend calls Gazepass API with your API key, API Secret Key and the acquired access token to get valdiated user account information (email, user ID, etc.)

***Do not share your API secret key with anyone or expose it in your frontend/website code***

## Installation

    npm install --save gazepassjs

## Sample Code

    const gazepass = require('gazepassjs');
    const API_KEY = "<your API key here>";

    // Instantiate gazepass object with API_KEY
    var gp = new gazepass.Gazepass(API_KEY);

    // Acquire access token from user
    var access_token = gp.getAccessToken();

    // Send access_token to your backend server