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
- To compile the TS to JS
    - npm run-script build (or just 'tsc' [typescript compiler])
- To run in localhost
    - npm serve --only functions
- To execute two previous steps in a row
    - npm run serve
- To deploy the application
    - firebase deploy
