## Features

* Babel 7
* Environment Variables
* Express
* REST API
* MongoDB

## Requirements

* [node & npm](https://nodejs.org/en/)

## Installation

* `git clone git@github.com:jomadoye/node-mongo-api.git`
* `cd node-mongo-api`
* `npm install`
* `Start mongo`
* `npm start`
* optional: include *.env* in your *.gitignore*

### GET Routes

* visit http://localhost:3000
  * /keys
  * /keys/1

### Beyond GET Routes

#### CURL

* Create a message with:
  * `curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'`
* Delete a message with:
  * `curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/messages/1`

#### Postman

* Install [Postman](https://www.getpostman.com/apps) to interact with REST API
* Create a key with:
  * URL: http://localhost:3000/keys
  * Method: POST
  * Body: raw + JSON (application/json)
  * Body Content: `{ "key": "test key", "keyData": "test key data" }`
* Delete a key with:
  * URL: http://localhost:3000/keys/:key
  * Method: DELETE
* GET all keys with:
  * URL: http://localhost:3000/keys
  * Method: GET
* GET a key with:
  * URL: http://localhost:3000/keys/:key
  * Method: GET
