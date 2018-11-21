# functions-firestore-typescript
Testing project using Cloud Functions, Firebase Firestore and Typescript

## Steps before starting code
- Install Node (recente)
- Install NPM (version 6 or more)
- Install Firebase CLI
    - npm install -g firebase-tools
    - firebase -v
- Login in firebase
    - firebase login
- Start a firebase project
    - first, create a firebase project in https://console.firebase.google.com and start a firestore database
    - firebase init
    - using arrow keys and spacebar select "functions" and "firestore", and press enter
    - choose your firebase project
    - choose "Typescript" as language
    - confirm using TSLint
    - if asked, install dependencies with npm
- Install Firebase Admin and Functions Modules
    - cd functions
    - npm install firebase-admin@latest firebase-functions@latest

## Additional instructions
- To run TSLint
    - npm run lint
- To compile the TS to JS
    - npm run build (or just 'tsc' [typescript compiler])
- To run in localhost
    - firebase serve --only functions
- To execute two previous steps in a row
    - npm run serve
- To deploy the application
    - npm run deploy

## Things to teach - annotations
- Steps before starting code
- HTTP Triggers - send a response at the end
- How to create a endpoint with a get
- Using variable to save the Promise
- Using Promise without variable
- It's important to return a response to client in all cases and all code paths
- How to test in local server
- How to deploy to Cloud Functions
- Background triggers (by firestore or others services) - return a promise
    - onCreate: Triggered when a document is written to for the first time.
    - onUpdate: Triggered when a document already exists and has any value changed.
    - onDelete: Triggered when a document with data is deleted.
    - onWrite:  Triggered when onCreate, onUpdate or onDelete is triggered.
- FCM (Firebase Cloud Messaging) requires all the values to be Strings
- Async/await
    - Async keyword forces the function to return a promise
    - Await keyword
        - Temporary pause the execution of an async function until some other promise is fulfilled or rejected
        - Yield teh value of a fulfilled promise
        - Throw an exception from a rejected promise
        - Can only be used inside an async function
    - To capture errors using async/await use a try-catch block
    - If the use of async/await doesn't improve the readability of your code, just skip it
