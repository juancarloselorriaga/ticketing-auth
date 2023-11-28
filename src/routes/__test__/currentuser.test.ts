import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/setup'

it( 'should respond with details about the current user', async function() {
  const cookie = await signin()
  const response = await request( app )
  .get( '/api/users/currentuser' )
  .set( 'Cookie', cookie )
  .send()
  .expect( 200 )

  expect( response.body.currentUser.email ).toEqual( 'test@test.com' )
} )


it( 'should respond with null if not authenticated', async function() {
  const response = await request( app )
  .get( '/api/users/currentuser' )
  .send()
  .expect( 200 )

  expect( response.body.currentUser ).toBeNull()
} )