require('dotenv').config()
const connectDB = require('../config/connect_database')

// Import JSON data
const jsonUsers = require('../../data/users.json')
const jsonZones = require('../../data/zone.json')
const jsonUnits = require('../../data/units.json')
const jsonSeats = require('../../data/seats.json')


const populating = async() => {
    try {
        // Connect to database
        console.log('🔌 Connecting to database...')
        const connection = await connectDB(process.env.MONGO_URI)
        console.log('✅ Connected to database')
        
        // Get models from schema
        const { Users, Zones, Units, Seats, Bookings } = require('../models/schema')(connection)
        
        // Delete existing data
        console.log('🗑️  Deleting existing data...')
        await Users.deleteMany({})
        await Zones.deleteMany({})
        await Units.deleteMany({})
        await Seats.deleteMany({})
        await Bookings.deleteMany({})
        console.log('✅ Deleted all existing data')
        
        // Create Users
        console.log('👥 Creating users...')
        await Users.create(jsonUsers)
        console.log(`✅ Created ${jsonUsers.length} users`)
        
        // Create Zones
        console.log('🏢 Creating zones...')
        await Zones.create(jsonZones)
        console.log(`✅ Created ${jsonZones.length} zones`)
        
        console.log('Creating the units database...')
        await Units.create(jsonUnits)
        console.log('Created units database')


        console.log('Creating the seats database....')
        await Seats.create(jsonSeats)
        console.log('Created seats database')

        console.log('Creating ')


        console.log('🎉 Database populated successfully!')
        
    } catch(error) {
        console.error('❌ Error populating database:', error.message)
        console.error(error)
    } finally {
        process.exit(0)
    }
}

populating()