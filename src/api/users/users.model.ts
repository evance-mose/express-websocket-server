import { WithId } from 'mongodb';
import * as z from 'zod';
import {db} from '../../db';

export const User = z.object({
  username: z.string().min(3).max(20),
  status: z.enum(['online', 'offline']),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('users');