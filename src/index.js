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

const path = require('path')
const express = require('express')
const { Identity } = require("@alleshq/identity")
require('dotenv').config()

const app = express()
app.set('views', path.resolve('templates'))
app.set('view engine', 'pug')
const identity = new Identity(process.env.APP_ID, process.env.APP_SECRET)

const port = process.env.PORT || 9876

// Functions
function makeState() {
    let outString = ''
    let inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 32; i++) {
        outString += inOptions.charAt(
            Math.floor(
                Math.random() * inOptions.length
            )
        )
    }

    return outString;
}

// App
app.get('/', (req, res) => {
    res.render('index', { title: 'Alles Identity Test' })
})

app.get('/login', async (req, res) => {
    await identity.createFlow({
        callback: process.env.CALLBACK_URL,
        state: makeState()
    }).then((response) => {
        res.redirect(response)
    })
})

app.get('/callback', async (req, res) => {
    let profile = await identity.getProfile(req.query.code)
    res.render('profile', {
        title: "Profile Information",
        id: profile.id,
        name: profile.name || 'Unknown',
        avatar: profile.avatar,
        email: profile.email,
        country: profile.country || 'Unknown'
    })
})

app.listen(port, () => {
    console.log(`🚀 Server Started, listening on port ${port}`)
})