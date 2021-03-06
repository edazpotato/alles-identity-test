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
		.getProfile(req.query.code) // Returns a JSON object with user profile data, using a code in the URL parameters
		.then((profile) => {
			res.render("profile", {
				// Render Profile Page
				title: "Profile Information", // Set Page Title
				id: profile.id || "Unknown", // Provide ID to rendered page
				name: profile.name || "Unknown", // Provide name to rendered page
				avatar: profile.avatar || "Unknown", // Provide avatar to rendered page
				email: profile.email || "Unknown", // Provide email to rendered page
				country: profile.country || "Unknown" // Provide country to rendered page
			});
		})
		.catch((error) => {
			// Catch any errors
			return res.status(500).render("error", {
				// Set status to 500 and render error page
				title: "Error getting user profile!", // Set Page Title
				message: error // Provide error message to rendered page
			});
		});
};
