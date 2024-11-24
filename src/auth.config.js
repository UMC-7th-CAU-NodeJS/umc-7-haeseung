import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "./db.config.js";

dotenv.config();

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/github",
    scope: ["user.email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return githubVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const githubVerify = async (profile) => {
  const email = profile._json.email !== null 
      ? profile._json.email
      : profile._json.login + "@github.com";
  console.log(email);
  
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id.toString(), email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile._json.login,
      gender: "non",
      birth: new Date(1970, 0, 1),
      address: "non",
      phoneNumber: "non",
    },
  });

  return { id: created.id.toString(), email: created.email, name: created.name };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id.toString(), email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "non",
      birth: new Date(1970, 0, 1),
      address: "non",
      phoneNumber: "non",
    },
  });

  return { id: created.id.toString(), email: created.email, name: created.name };
};