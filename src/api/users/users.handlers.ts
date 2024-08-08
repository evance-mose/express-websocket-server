import { Response, Request, NextFunction } from 'express';
import { User, Users, UserWithId } from './users.model';   
import { ZodError } from 'zod';

export async function findAll(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
  try {
    const users = await Users.find().toArray();
    res.json(users);
  } catch (error) {
    next(error); 
  }
}

export async function createOne(req: Request<{}, UserWithId, User>, res: Response<UserWithId>) {
  try {
    const insertResult = await Users.insertOne(req.body);
    if (insertResult.acknowledged) throw new Error('Failed to insert user');
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
    res.status(201);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
  }
} 