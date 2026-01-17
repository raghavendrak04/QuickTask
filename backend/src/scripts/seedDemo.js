const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './.env' });

const seedDemoUser = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

        const demoUser = {
            fullName: 'Demo User',
            email: 'demo@quicktask.com',
            password: 'demo123456'
        };

        const userExists = await User.findOne({ email: demoUser.email });

        if (userExists) {
            console.log('Demo user already exists.'.yellow);
            process.exit(0);
        }

        await User.create(demoUser);
        console.log('Demo User Created Successfully!'.green.inverse);
        console.log(`Email: ${demoUser.email}`);
        console.log(`Password: ${demoUser.password}`);

        process.exit(0);
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

seedDemoUser();
