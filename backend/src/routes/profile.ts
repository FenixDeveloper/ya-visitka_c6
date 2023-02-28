import { Router } from 'express';

import {
  isPatchProfileValid,
  validateIdParam,
  validateProfileQuery,
  validateReactionsQuery,
} from '../validators/profile';
import {
  getProfileById, getProfiles, getReactionsById, patchProfile,
} from '../controllers/profile';

const router = Router();

router.get('/', validateProfileQuery, getProfiles);
router.get('/:id', validateIdParam, getProfileById);
router.get('/:id/reactions', validateReactionsQuery, getReactionsById);

router.patch('/:id', isPatchProfileValid, patchProfile);

export default router;
