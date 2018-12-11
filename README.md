# React Table view!
React table module to add a dynamic table on your react page.

## Installation
- To install just git clone this repository and install dependencies using `yarn instal`
- To start the app use `yarn start` and to test this app use `yarn test`

## API Flow
The API is hosted on http://personio-fe-test.herokuapp.com and it might not reply for first request since heroku span the instance afresh if the API is idle for some time.
So if you are not getting the response on first go just hit refresh on your browser.

## Code flow
App has following folder structure.
- src/
	- Actions
	- Components
		- `__test__`
		- Table
	- Reducers
	- Store
- public/

Key components we are using in this app.
- For CSS we are using [reactstrap](https://github.com/reactstrap/reactstrap), It's using bootstrap for its working.
- For state management we are using [redux](https://github.com/reduxjs/redux) along with [redux-thunk](https://github.com/reduxjs/redux-thunk) and [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) for aync requests. 
- For testing we are using [react-testing-library](https://github.com/kentcdodds/react-testing-library)
