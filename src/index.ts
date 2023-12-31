import mongoose from 'mongoose'
import { app } from './app'


const start = async () => {
  if ( !process.env.JWT_KEY ) {
    return new Error( 'JWT_KEY must be defined' )
  }

  try {
    await mongoose.connect( 'mongodb://auth-mongo-srv:27017/auth' )
    console.log( 'Connected to MongoDB...' )
  } catch ( e ) {
    console.log( e )
  }

  app.listen( 3000, () => {
    console.log( 'Listening on port 3000...' )
  } )
}

void start()
