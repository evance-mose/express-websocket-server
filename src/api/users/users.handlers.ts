import { Router, Response, Request, NextFunction } from "express";
import {User, Users, UserWithId} from "./users.model";   
import { InsertOneResult } from "mongodb";
import { ZodError } from "zod";

export async function findAll(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
  try {
    const users = await Users.find().toArray();
    res.json(users);
  } catch (error) {
    next(error); 
  }
}

export async function createOne(req: Request<{}, InsertOneResult<User>, User>, res: Response<InsertOneResult<User>>, next: NextFunction) {
  try {
    const result =  await User.parse(req.body);
    const insertResult = await Users.insertOne(result);
    res.json(insertResult);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
  }
} 