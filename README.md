# Thera-Web

## Clone the repository

Clone this repository and cd into the project directory:

    git clone https://pixelelitetechnologies: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@github.com/pixelelitetechnologies/thera-web.git

    cd thera-web

## Install Dependencies

Run `npm install` inside the main project folder to install all dependencies from NPM.

If you want to use `yarn` to install dependencies, first run the [yarn import](https://classic.yarnpkg.com/en/docs/cli/import/) command. This will ensure that yarn installs the package versions that are specified in `package-lock.json`.

## Make a .env file as this

```
API_URL="https://thera-backend-api.herokuapp.com/"
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Running the App locally

You will also see any linting errors in the console. Start the token server locally with

    npm run server
