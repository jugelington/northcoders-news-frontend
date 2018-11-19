# Northcoders News Frontend

## Background

This repo contains the frontend code for a reddit-style webapp, written in React.

This readme contains all the information you should need in order to deploy the app yourself.

A live version is currently hosted on [Netlify](https://nc-news-jbd.netlify.com/).

The backend is hosted on [Heroku](https://sheltered-sands-58798.herokuapp.com); its code is available [Github](https://github.com/jugelington/BE2-northcoders-news/).

## Setup Guide

1. Clone or fork this repository
2. Navigate to the repository, and initialise it; this will install all the dependencies you need
   ```bash
   npm i
   ```
3. If you wish to run a local version, you can run
   ```bash
   npm start
   ```
   which you will be able to view on [http://localhost:3000](http://localhost:3000).
   <br> If you edit the code while you are running the local version, your browser will automatically refresh to show you the changes.
4. When you are satisfied with the code, and wish to deploy it, run:

   ```bash
   npm run build
   ```

   React will take care of the build process for you!

5. Now you just need to deploy to netlify!
   ```bash
   npm install netlify-cli -g
   netlify deploy
   ```
