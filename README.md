Express Server with Mongoose
=====
This is an end-to-end (E2E) tested HTTP server written using Node, Express, Mongoose/MongoDB and tested with Mocha/Chai.

## Get Started
1. Fork and clone the repo.
1. Run `npm i` inside the directory to install all the necessary packages.
1. In a new terminal window, run your Mongo server.
1. Run `start:watch` to start the server.
1. Run `test:unit:watch` to run the unit tests.
1. Run `test:e2e:watch` to run the end-to-end tests. 
1. Navigate to `localhost:<yourPort></api/tvshows` to view in browser.

## API
### Paths:
* `/api/tvshows` - response will be an array of tv shows.
* `/api/tvshows/:id` - response will be a single tv show with the corresponding id.

### Methods:
* `POST` - will post an object
* `GET` - will get an array of all objects
* `GET<id>` - will get an object with specified id
* `PUT<id>` - will update a specified object
* `DELETE<id>` - will delete a specified object