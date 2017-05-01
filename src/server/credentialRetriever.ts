import Constants from '../constants';

export function getSecretKey(): string {
  return Constants.app.privateKey;
}
