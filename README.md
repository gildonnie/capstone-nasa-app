<!-- PROJECT Header -->
<br />
<div align="center">
  <h3 align="center">Fullstack Space Application</h3>
  <p align="center">
    A space app to explore some of NASA's APIs
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#wireframe">Wireframe</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
## About The Project
This is an ReactJs application. TypeScript is also implemented in it. This app is using NASAs API. It should allow the user to explore 3 of many APIs that NASA provides. THe user should be able to view a picture of the day and search previous dates. They would be able to favorite a image they like and it would be saved to their favorite page. They can also explore the asteroids that are near earth. The final feature is they can explore 4 of NASAs rovers that were sent to Mars and be able to view pictures they've taken. 

The app uses Redux Toolkit to manage state as well as ReactJs useState() to pass data needed across any components. This app has a mongodb backend. Where a users favorited images are stored and they can delete them as pleased.
Use the `BLANK_README.md` to get started.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
### Built With
A few of the frameworks/libraries that were used to build the project are:
* React.js
* Node.js
* React Redux 
* React Router
* Mongoose
* MongoDB
* EsLint and AirBnb
* json server
<p align="right">(<a href="#readme-top">back to top</a>)</p>
### wireframe
  ### Getting Started The App build out with simple wireframes using Figma.
<img width="328" alt="wirefram-space-app" src="https://www.figma.com/file/yYDTn3mQITX2WTwmuvhD2m/Untitled?node-id=0%3A1">
<!-- GETTING STARTED -->
## Getting Started
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.
### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation
_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
1. Get a free account at for MongoDB to create your own collection and add it to your .env file to connect your API to your DB
2. Clone the repo
   ```sh
   git clone https://github.com/gildonnie/capstone-nasa-app
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your mongoDB link in your `.env` file in your backend
   ```js
   DATABASE_URL = 'ENTER YOUR LINK';
   ```
5. Enter your NASA API Key in your `.env` file in your client side.
   ```js
   REACT_APP_API_KEY = 'ENTER YOUR KEY';
   ```
6. npm start for both your frontend and backend
  ```sh
   cd client 
   npm start 
   ```
  ```sh
   cd server 
   npm start 
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- USAGE EXAMPLES -->
## Usage
Can be used to explore NASAs APIs. You can:
- [x] View The Picture of The Day
- [x] Favorite Picture of The Day
- [x] View Mars Rover Images
- [x] View Near Earth Objects(Asteroids)
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- CONTACT -->
## Contact
Donnie Gil - dgil@alphaworks.tech
Project Link: [https://github.com/gildonnie/capstone-nasa-app
<p align="right">(<a href="#readme-top">back to top</a>)</p>