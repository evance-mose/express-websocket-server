import {MongoClient} from 'mongodb';
const { MONGO_URL = 'mongodb://localhost:27017/db' } = process.env;

export const client = new MongoClient(MONGO_URL)
export const db = client.db();