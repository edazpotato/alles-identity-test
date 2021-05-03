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

const { Identity } = require("@alleshq/identity"); // Pulls in Alles Identity SDK

module.exports = async (req, res) => {
	const identity = new Identity(process.env.APP_ID, process.env.APP_SECRET); // Creates new Identity constructor, with credentials

	await identity
		.createFlow({
			callback: `http://localhost:${process.env.PORT}/callback`, // Callback URL that the Identity server redirects users to, which we set up in the index file
			state: require("../lib/state") // User State
		})
		.then((response) => {
			res.redirect(response); // Redirect to Callback
		})
		.catch((error) => {
			// Catch any errors
			return res.status(500).render("error", {
				// Set status to 500 and render error page
				title: "Error creating login flow!", // Set Page Title
				message: error // Provide error message to rendered page
			});
		});
};
