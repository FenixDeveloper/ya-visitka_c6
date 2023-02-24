import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User from '../models/user';

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.CLIENT_SECRET,
};

const verify = (jwtPayload: any, done: VerifiedCallback) => {
  User.findUserByEmail(jwtPayload.email.toLowerCase())
    .then((user) => done(null, user))
    .catch((err) => done(err, false));
};

const JwtStrategy = new Strategy(opt, verify);

export default JwtStrategy;
