require('dotenv').config();
const mongoose = require('mongoose');

// boot your existing DB connection
require('../connections/connection');

// modals
const User = require('../models/users');
const {encryptPassword} = require("../helpers/functions");

async function seedUsers(name) {
    try {
        startSeeding(name)
        const payload = [
            {
                name: "Admin",
                email: "admin@gmail.com",
                phone: "0000000000",
                picture: "https://res.cloudinary.com/dyhw94ngc/image/upload/v1752352074/21104_adut1e.png",
                country: "United Kingdom",
                role: 0,
                type: "admin",
                age: 35,
                password: encryptPassword("admin@12345"),
                isVerified: true,
                verifyCode: null
            }
        ];

        for (const data of payload) {
            const exists = await User.findOne({email: data.email});
            if (!exists) {
                await User.create(data);
                console.log(`✅ Created ${name}: ${data.email}`);
            } else {
                console.log(`⚡ Skipped (already exists): ${data.email}`);
            }
        }
        finishSeeding(name)
    } catch (e) {
        console.error('Seeding failed:', e);
    }
}

function startSeeding(name= ""){
    name?console.log(`---------------- ${name} Seeding Started ----------------`):console.log(`-------- ${name} Seeding Started --------`)
    !name && console.log("")
}

function finishSeeding(name=""){
    !name && console.log("")
    name?console.log(`---------------- 🎉 ${name} Seeding finished! ----------------`):console.log(`-------- 🎉 ${name} Seeding finished! --------`)
    name && console.log("")
}

async function run() {
    try {
        startSeeding()

        await seedUsers('Users');

        finishSeeding()
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.disconnect()
    }
}

run();