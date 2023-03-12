import {
  JwtFromRequestFunction,
  Strategy,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';

import User from '../models/user';

import BadRequestError from '../errors/BadRequestError';
import DataNotFoundError from '../errors/NotFoundError';

import {
  MSG_USER_NOT_FOUND,
  ROLE_CURATOR,
  ROLE_STUDENT,
  TOKEN_NOT_IN_HEADER,
} from '../constants';

const { CLIENT_SECRET, CURATORS } = process.env;

const tokenExtractor: JwtFromRequestFunction = (req) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new BadRequestError(TOKEN_NOT_IN_HEADER);
  }

  return authorization.split(' ')[1];
};

const opt: StrategyOptions = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: CLIENT_SECRET,
};

interface IYandexProfileFromJwt {
  login: string;
  name: string;
  email: string;
  gender: string;
}

const verify = async (
  jwtPayload: IYandexProfileFromJwt,
  done: VerifiedCallback,
) => {
  const yaEmail = jwtPayload.email.toLowerCase();
  const curatorsList = CURATORS ? CURATORS.split(',') : [];

  if (curatorsList.includes(yaEmail)) {
    const curator = {
      role: ROLE_CURATOR,
      email: yaEmail,
    };
    return done(null, curator);
  }

  const user = await User.findOne({ email: yaEmail }).catch((err) =>
    done(err, false),
  );

  if (!user) {
    return done(new DataNotFoundError(MSG_USER_NOT_FOUND), false);
  }

  const {
    email,
    cohort,
    profile: { photo },
  } = user;

  let {
    profile: { name },
  } = user;

  if (name == null) {
    const yaName = jwtPayload.name;
    user.profile.name = yaName;
    const updatedUser = await user.save();
    name = updatedUser.profile.name;
  }

  const student = {
    _id: user.id,
    name,
    email,
    cohort,
    photo,
    role: ROLE_STUDENT,
  };

  return done(null, student);
};

const JwtStrategy = new Strategy(opt, verify);

export default JwtStrategy;
