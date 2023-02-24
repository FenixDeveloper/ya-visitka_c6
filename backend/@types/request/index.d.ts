// eslint-disable-next-line no-unused-vars
import express from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      token?: string;
    };
  }
}
