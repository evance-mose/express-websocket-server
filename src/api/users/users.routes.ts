import { Router} from "express";
import * as UserHanders from "./users.handlers";  

const router = Router();

router.get('/', UserHanders.findAll);
router.post('/', UserHanders.createOne);


export default router;