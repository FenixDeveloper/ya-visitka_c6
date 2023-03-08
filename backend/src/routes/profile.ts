import { Router } from 'express';

import {
  getProfileById,
  getProfiles,
  getReactionsById,
  patchProfile,
  postReaction,
} from '../controllers/profile';

import {
  isPatchProfileValid,
  validateIdParam,
  validateProfileQuery,
  validateReactionsQuery,
} from '../validators/profile';
import { postReactionValidator } from '../validators/reaction';

const router = Router();

router.get('/', validateProfileQuery, getProfiles);
router.get('/:id', validateIdParam, getProfileById);
router.get('/:id/reactions', validateReactionsQuery, getReactionsById);

router.patch('/:id', isPatchProfileValid, patchProfile);
router.post('/:id/reactions', postReactionValidator, postReaction);

export default router;
