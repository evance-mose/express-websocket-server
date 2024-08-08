import request from 'supertest';

import app from '../../app';
import { Users } from './users.model';

beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error) {
    console.error(error);
  }});

describe('GET /api/v1/users', () => {
  it('responds with a empty json array of users',  async () => 
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then ((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }
    )
  );
});

describe('POST /api/v1/users', () => {
  it('responds with an error if invalid user is inserted',  async () => 
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({username: ''})
      .expect('Content-Type', /json/)
      .expect(422)
      .then ((response) => {
        console.log(response.body.message);
        expect(response.body).toHaveProperty('message');
      }
    ) );
});