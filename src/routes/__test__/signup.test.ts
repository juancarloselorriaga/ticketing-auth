import request from 'supertest'
import { app } from '../../app'

it( 'should return a 201 on successful signup', async function() {
  return request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: 'password'
  } )
  .expect( 201 )
} )

it( 'should return a 400 with invalid email', async function() {
  return request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test',
    password: 'password'
  } )
  .expect( 400 )
} )

it( 'should return a 400 with invalid password', async function() {
  return request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: 'p'
  } )
  .expect( 400 )
} )

it( 'should return a 400 with missing email or password', async function() {
  await request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: ''
  } )
  .expect( 400 )

    await request( app )
  .post( '/api/users/signup' )
  .send( {
    email: '',
    password: 'password'
  } )
  .expect( 400 )
} )

it( 'dissallows duplicate emails', async function() {
  await request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: 'password'
  } )
  .expect( 201 )

  await request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: 'password'
  } )
  .expect( 400 )
} )

it( 'sets a cookie after successful signup', async function() {
  const response = await request( app )
  .post( '/api/users/signup' )
  .send( {
    email: 'test@test.com',
    password: 'password'
  } )
  .expect( 201 )

  expect(response.get('Set-Cookie')).toBeDefined()
} )