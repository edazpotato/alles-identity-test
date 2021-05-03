<div align="center">
<h1 align="center">Alles Identity Test</h1>
<p align="center">An example app that uses Alles Identity</p>
</div>

---

# Usage

In Terminal:
```bash
$ yarn start
```

In Browser:
```
http://localhost:9876/login
```

# How does this work?

### index.js
- Starts the [Express](https://expressjs.com) server to listen for requests

### routes/index.js
- Displays a nice Welcome message, explaining what to do

### routes/login.js
- Creates a new flow using the [Alles Identity SDK](https://www.npmjs.com/package/@alleshq/identity)
- Redirects the user to the flow URL to sign in

### routes/callback.js
- Gets the profile information using a code in the URL parameters
- Displays a rendered Profile Information page

### lib/state.js
- Generates a State, which could be used to verify requests

# License

This project is licensed under the [GNU APGL v3 License](LICENSE)
