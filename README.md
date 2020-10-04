# GazepassJS

This library allows you to integrate [Gazepass](https://gazepass.com/) into your website.

## How does it work?

1. You acquire an access token for the user account by using this library (and your API key)
2. You send that access token to you server/backend
3. Your server/backend calls Gazepass API with your API key, API Secret Key and the acquired access token to get valdiated user account information (email, user ID, etc.)

***Do not share your API secret key with anyone or expose it in your frontend/website code***

## Installation

    npm install --save gazepassjs

## Sample Code (React)
    import React from 'react';
    import Gazepass from 'gazepassjs';
    
    class YourComponent extends React.Component {
        constructor(props) {
            super(props);
            const API_KEY = "<insert API key>";
            this.gazepass = new Gazepass(API_KEY);
        }

        async gazepassSignIn() {
            var access_token = await this.gazepass.getAccessToken();
            // Send access_token to your backend server
        }

        render() {
            return (
                <>
                    <button onClick={this.gazepassSignIn.bind(this)}>Passwordless Sign In</button>
                </>
            );
        }
    }

## Sample Code (HTML/JS)
    <script type="text/javascript" src="https://unpkg.com/gazepassjs@0.9.6/dist/gazepass.js"></script>
    <script type="text/javascript">
        async function gazepassSignIn() {
            var API_KEY = "<insert API key>";
            var gp = new gazepassjs.default(API_KEY);
            var access_token = await gp.getAccessToken();
            // Send this access token to your backend
            // which then calls Gazepass API
            // (see backend section)
        }
    </script>
    <button onclick="gazepassSignIn()">Passwordless Sign In</button>