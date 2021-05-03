// Copyright (C) 2021 Trevor Thalacker

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const path = require("path"); // Pulls in Path module
const express = require("express"); // Pulls in Express module

require("dotenv").config(); // Load enviroment variables

const app = express(); // Initializes Server
app.set("views", path.resolve("templates")); // Set Template Directory
app.set("view engine", "pug"); // Set Template Engine

app.get("/", require("./routes/home")); // Homepage

app.get("/login", require("./routes/login")); // Login Page

app.get("/callback", require("./routes/callback")); // Callback Page

if (!process.env.PORT) process.env.PORT = 9876; // Set the server port if it's not currently set
const port = process.env.PORT; // Get the server port

app.listen(port, () => {
	// Start Server
	console.log(`🚀 Server Started, listening on port ${port}`); // Show Start Message
});
