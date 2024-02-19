/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface JwtRequest extends Request {
  jwt?: string;
}
