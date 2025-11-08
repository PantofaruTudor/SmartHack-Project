const mongoose = require('mongoose')

const connectDB = async (url) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error('MONGO_URI is not defined in .env file'))
            return
        }

        // Check if MONGO_URI is still a placeholder
        const urlLower = url.toLowerCase()
        if (urlLower.includes('username:password') || 
            (urlLower.includes('cluster.mongodb.net') && urlLower.includes('username'))) {
            reject(new Error('MongoDB connection string is still a placeholder. Please update your .env file with a real connection string.'))
            return
        }

        const connection = mongoose.createConnection(url, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        })

        // Set timeout for connection
        const connectionTimeout = setTimeout(() => {
            connection.close()
            reject(new Error('MongoDB connection timeout. Check your connection string and network.'))
        }, 10000) // 10 second timeout

        connection.on('connected', () => {
            clearTimeout(connectionTimeout)
            console.log('✅ Connected to MongoDB!')
            resolve(connection)
        })

        connection.on('error', (error) => {
            clearTimeout(connectionTimeout)
            console.error('❌ MongoDB connection error:', error.message)
            reject(error)
        })

        connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected')
        })
    })
}

module.exports = connectDB