## Source code for the frontend of the Journey Map application
### Senior Design, Fall 2022-Spring 2023

<b>Team:</b> <br>
<i>Project Manager:</i> [Dylan Piper](https://github.com/piper-d) <br>
<i>Frontend Developer:</i> [Emin Mammadzada](https://github.com/EminMammadzada) <br>

<b><i>Setup Prerequisites:</i></b> 

1. You need certain API keys and environment variables to be able to run the application on your device. Those include:<br>
  1.1. React App API key.<br>
  1.2. React App authDomain.<br>
  1.2. Google Maps API key.<br>
  
2. All the endpoints are protected from unauthorized access and require the user to include Bearer authentication token to execute the commands. To generate the Bearer token: <br>
  STEP 1: download the [backend repository](https://github.com/piper-d/Journey-Map-Backend).<br>
  STEP 2: download the necessary packages via ```npm i``` <br>
  STEP 3: run the backend from /functions folder by executing the command ```npm run startdev```<br>
  STEP 4: Make sure that in index.js file, you comment out ```exports.app = functions.region("us-east1").https.onRequest(app);``` and uncomment ```app.listen()``` to run the localhost on port 8080.<br>
  STEP 5: To deploy the source code to Google Cloud Functions, uncomment ```exports.app = functions.region("us-east1").https.onRequest(app);```, then comment out ```app.listen()```. Afterwards, run ```npm run lint -- --fix```. Once eslint completes execution, run ```npm run deploy```<br>
  STEP 6: Upon successful completion, you should be able to see a bearer token.<br>
  STEP 7: Use that token in authorization header in Postman, Arc, or whatever API testing solution you use with every request you send.<br><br>
  
  <b>Commands:</b>
  
  1. Download the required packages via ```npm i```<br>
  2. Run the frontend by executing the command ```npm start```<br>
  
