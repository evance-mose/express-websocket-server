import { Router } from 'express';
import * as UserHanders from './users.handlers';  
import { User } from './users.model';
import { validateRequest } from '../../middlewares';

const router = Router();

router.get('/', UserHanders.findAll);
router.post('/', validateRequest({ body: User }), UserHanders.createOne);


export default router;