

const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_CONNECT_KEY)
        .then(() => console.log('✅ Database connected successfully'))
        .catch(err => console.log('❌ Database connection error:', err));
}

module.exports = main;