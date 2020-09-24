# Checkout Shopping App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app is a checkout page, where user able to select products, insert a promotion code (if any available), and being show the payable amount.

## Requirements

Since promotion codes come and go, we want the pricing rules to be as flexible as possible so that could be changed in the future with little notice

* User should select products from a given list
* Once product is added, he can add more units/quantity of that product to his list
* A single promotional code can be applied any given time to give discount of the total price

The user will be shown his final cost in `$` at the bottom

## Notes

This project will need the following enhancements to the given solution to make it production ready:

* Responsiveness across different screens using native CSS3 design layout (flexbox)
* Accessability for WAI/ARIA tags and testing across with tools like lighthouse , React-Axe, etc...

## NPM modules used

In this project, the main npm modules used are

* Node 10.x
* React 16.8+ with React hooks
* Typescript 4
* Jest + Testing-library
* Styled Components for CSS-In-JS styling
* [immer](https://immerjs.github.io/) for immutable data management
* Zustand state management library with support of React hooks and middlewares for Immer + Logging (https://github.com/pmndrs/zustand)
* ESLint + Prettier + Stylelint
* husky + lint-staged (for commiting)

## Pre-Requirements

* Node version 10+
* Yarn package manager (<https://classic.yarnpkg.com/en/docs/install#mac-stable>)
* .env - add support to extend the default CRA application ESLint settings

***

## Install

Clone the project locally in your machine and run the following command and use either `yarn` package manager:

``` node
yarn install
```

***


## Project structure

This project was written with TypeScript and its seetings are configured in the main `tsconfig.json`

``` json

{
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "build",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext",
      "esnext.AsyncIterable"
    ],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "downlevelIteration": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "module": "esnext"
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.js"
  ],
  "include": [
    "src"
  ]
}

```

## State management

This project using the Zustand state management solution with its native `create` hook function to store all given products, promotions and user activities in  the page (list of avilable products, list of available promotions, shopping cart items with quantities, selectable discount code user has input, and total cost ).

## Application Structure

The application uses a .json file to serve as the main datastore and loads the initial list of products as well as list of promotional codes in the system. That file is located under `src/store/db.json` and has an array for products as well as promotions

The main project folders are located inside the `src` folder:

* App.tsx - main page holding all React Components required to render the checkout page

* components - React functional components for Displaying, Viewing, Editing and rendering items in the page.
  * Cart - Render a section in the main screen with the user selectable items for shopping and number of units per item. User can click the buttons +/- to add/remove a single unit of the product at any given tim
  * Discounts - Section for user to put his promotion code, and given a feedback in an `alert` box whether his code was applied or denied.
  * Products - Renders a section in the screen of all available products in the system. If all products have been added to the cart then user will see a message on screen that no more products are available to be added to the page
  * Total - Renders a single `$` value of user total cost for his items, and with a possible discount code from the transaction
* mocks - collection of mock objects used throughout the unit/integration tests
* store - state management across the app exposed in a single hook in useStore.ts. It has the following modules:
  * The store/app default list of products and promotions list from a db.json file (serves as the database). 
  * It support a middleware extensions (currenly only support for an Immer proxy and a log function were added)
* shared - collection of shared utilitiy functions, types on different Typescript interfaces used in the app, pricing calculator engine for the default list of pricings in the system.

## Note

### When there's a change in the pricing engine rules and new/deleted pricings are added then the file `src/store/pricing` will need to be modified accordingly with new values. In order to solve performance issues, a usage of built-in React hooks `useMemo` and `useCallback` have been applied throughout the application.

***

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. The app will reload if you make edits.

### `yarn test`

Launches the test runner. It takes all files with `.spec.*` or  `.test.*` extensions and executes all coding assertions.

### `yarn test:debug`

launches the Jest testing in debug mode

### `yarn coverage`

produces a test coverage report under coverage folder

### `yarn build`

Builds the app for production to the `build` folder.

You can then deploy the app to your production environment and/or add this as part of your CI/CD pipeline

### `yarn lint`

Run all sub liniting scripts

### `yarn lint-fix`

Runs ESLint in fix mode

### `yarn lint:ts`

Runs ESList and provide feedback back to the console without modifying any warnings/errors

### `yarn lint:css`

Runs Stylelint on given source files and report on any known issues found not matching the config settings in `.stylelintrc.json`

***

## References

* [React Context API](<https://reactjs.org/docs/context.html>)
* [Jest CLI](<https://jestjs.io/docs/en/configuration>)
* [Testing Library](<https://testing-library.com/docs/intro>)
* [Zustand](<https://github.com/pmndrs/zustand>)
