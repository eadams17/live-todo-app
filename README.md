A small todo app that allows users to add, update and delete todos across teams in real time.

## Setup

1. Run `yarn run setup`
2. Run `yarn start`

The app should now be accessible from `http://localhost:3000/`

To run tests, run `yarn test` in a separate terminal.

## Overview

This application uses **React** on the frontend and **Socket**/**Express** on the backend. The client can emit actions (`add`, `update`, `delete`, `updateAll`, `deleteAll`) to interact with the socket server. The socket server processes these actions and updates the "database", and then sends a response back to the client. The todos are stored in the "database" hash like so:

```
"8d9f99c1-9873-4db3-9ab5-5c88acd09efd": {
    "uuid": "8d9f99c1-9873-4db3-9ab5-5c88acd09efd",
    "title": "Fazer um rolê",
    "completed": false
  }
}
```

## Technology

I chose to use **React** (specifically bootsrapped with `create-react-app`) for building out the UI. I chose **React** because it's fast, well-documented and I love the component structure. For styling, I decided to use `CSS Modules`. I like that all styles are scoped locally, helping to keep things more organized. For the backend, I used **Socket** for real-time todo updates across sessions with an **Express** server. As for testing, I used `Enzyme` and `Jest` for the frontend and `Mocha` for the backend.
