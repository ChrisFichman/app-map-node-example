# app-map-node-example
Basic node service utilizing app map.

# Architecture
## Stack
- node-ts serverless code running on lambdas (see express branch for express code WIP)
- angular front-end
- jest for testing
- containerized psql

## Development
- Uses serverless to run locally
  - may prefer AWS SAM for a longer lived project
- VSCode development containers to limit local dependencies

## Pipeline
- GH actions (TBD)

## Deployed Arch (May not get around to this for the purposes of the exercise)
- Terraform
- Lambdas for node API routes
- API gateway
- Static code served from R53 (angular app)

## Security
- AWS Secrets for PSQL account creds
- CORS locked down on server to only allow requests from angular app host (WIP)
- AWS IAM

# Installation and Local Development Environment Setup (MacOS - Intel)
## Clean environment setup
### Install xcode
```bash
xcode-select --install
```

### [Install brew](https://docs.brew.sh/Installation) and utils
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew install wget
```

### [Install vscode]
```bash
brew install --cask visual-studio-code
```

### Install rancher (any container engine will work - may not need with codespaces)
- May have to ensure docker-cli is not installed
- Go here and follow [installation instructions](https://docs.rancherdesktop.io/getting-started/installation/)
- Select latest, non-experimental build (with auto updater)
- On install choose to enable kubernetes and dockerd (moby) runtime, and automatic path configuration
- When prompted, run with administrator access

### Install nvm
```bash
brew install nvm &&
echo -e "export NVM_DIR=\"$HOME/.nvm\"\n[ -s \"/usr/local/opt/nvm/nvm.sh\" ] && \. \"/usr/local/opt/nvm/nvm.sh\"  # This loads nvm\n[ -s \"/usr/local/opt/nvm/etc/bash_completion.d/nvm\" ] && \. \"/usr/local/opt/nvm/etc/bash_completion.d/nvm\"  # This loads nvm bash_completion" >> ~/.bashrc &&
source ~/.bashrc
nvm install 16
nvm alias default 16
nvm use default
```

### Install homebrew packages for development
```bash
brew install typescript yarn angular-cli
```

## Developing and running the server

### Start the database (first time only)
```
echo "PG_USER=\"postgres\"\nPG_PASS=\"super-appMapFtw\"" >> .env
docker compose up
```

### Add .env file for local server user (to be replaced by AWS secrets)
```
cd server
echo "PG_USER=\"us_server\"\nPG_PASS=\"appMapFtw\"" >> .env
```

### Watch and compile
```bash
cd server && tsc --watch
```

### Run Serverless api offline
```bash
cd server && serverless offline start
```

### Test API using postman (collection included)
Load the included postman collection (server/postman) into your postman client to test the API

# Original Prompt

## A URL Shortener
Your task is to build an application which creates short URLs from long ones.
### Background
We often run into situations where long URLs aren't easy to email, tweet, or otherwise send to others. The most basic
function of a URL shortener is to take long URLs as input and give shorter ones in return.
The design of URL shorteners presents a number of challenges, and we look forward to seeing how you address
them.
### What you'll deliver
  1. A web service that allows users to POST a long URL and receive a short URL in return, or GET a short URL
and be redirected to the original long URL.
  2. A web app for users to access the service's features.
  3. AppMaps for the backend service which you built in step 1, and any insights AppMap helped reveal.

Feedback on the AppMap UX - and what you’d do to improve it - will be helpful.

## The details
  - The backend should be written for Node, but use any Node frameworks you’d like.
  - Use any frontend UI framework you’d like.
  - Use a database of your choice to store the service's state. SQLite is fine.
  - Take as much time as you need to complete the assignment, but somewhere between 3 and 8 hours of time
sounds about right. Keep track of the time spent so that we know how to calibrate our expectations when we
review your work.
  - We use GitHub, so if you can do your work in a GitHub repo, that will be a lot better than emailing us
archives of code files.
  - If you have any questions about the assignment, please contact Brian @ brian@appmap.io.
### Showing off!
To show off your vision and mastery of the assignment, feel free to add some additional features and capabilities.
Here are some suggestions to spark your creativity, but please don't hesitate to surprise and delight us.
  - tailor the service to protect privacy, since some users require anonymity
  - package the service for easy deployment in the cloud
  - include preventative measures against use of the service for nefarious purposes
