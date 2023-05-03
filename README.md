# app-map-node-example
Basic node service utilizing app map.

# Architecture
## Stack
- node-ts serverless code running on lambdas
- angular front-end
- jest for testing
- sqLite

## Development
- Uses serverless to run locally
  - may prefer AWS SAM for a longer lived project
- VSCode development containers to limit local dependencies

## Pipeline
- GH actions

## Deployed Arch (May not get around to this for the purposes of the exercise)
- Terraform creates cloud-formation yaml
- Lambdas for node API routes
- API gateways
- Static code served from s3

## Security
- Very basic url shortener. No accounts or sensitive data to worry about.
- AWS Secrets


## Original Prompt

### A URL Shortener
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
