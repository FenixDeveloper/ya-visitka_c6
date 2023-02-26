import { Router } from 'express';

import {
  isPatchProfileValid,
  validateIdParam,
  validateProfileQuerry,
  validateReactionsQuerry,
} from '../validators/profile';
import {
  getProfileById, getProfiles, getReactionsById, patchProfile,
} from '../controllers/profile';

const router = Router();

router.get('/', validateProfileQuerry, getProfiles);
router.get('/:id', validateIdParam, getProfileById);
router.get('/:id/reactions', validateReactionsQuerry, getReactionsById);

router.patch('/:id', isPatchProfileValid, patchProfile);

export default router;
