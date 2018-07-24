# Basic Mongoose

## Project Description
An end-to-end (e2e) tested HTTP REST API created with Express and Mongoose for a mock movies database. 

## Developer
Requires:
* Node v10 or later.

### How to get started
* Fork repository, clone locally, navigate to repository directory,
* Download all the files with `npm i`,
* To test, run `npm test`. 

### How to use API
* Create your own .env files with the .env.example files provided in the root of the project and the test folder. Enter the correct MongoDB URI. Port is currently set to 3000, you may update it to your port of choice.
* Connect to server with `npm run start`.
* Enter `http://localhost:3000/api/movies` in your browser.

The following methods are used for the paths listed:

Method | Path
---|---
`GET` |     `/movies`
`GET` |     `/movies/:id`
`POST` |     `/movies`
`PUT` |     `/movies/:id`
`DELETE` |     `/movies/:id` 

## Contributor
[Mariah Adams](https://github.com/MariahAdams)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment 
Forked from [alchemy-fullstack-js-summer-2018/basic-mongoose](https://github.com/alchemy-fullstack-js-summer-2018/basic-mongoose)