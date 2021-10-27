import { hash, verify, argon2id } from 'argon2';

import CredentialsError from '@/api/errors/credentialsError';

export interface PasswordManagerInterface {
  hash(password: string): Promise<string>
  verify(password: string, hash: string): Promise<void>
}

export default class PasswordManager implements PasswordManagerInterface {
  public async hash(password: string): Promise<string> {
    const passwordHash = await hash(password, {
      type: argon2id
    });

    if (!password) {
      throw new Error('Unable to hash password');
    }

    return passwordHash;
  }

  public async verify(password: string, hash: string): Promise<void> {
    if (!await verify(hash, password)) {
      throw new CredentialsError();
    }
  }
}