export function getSecretKey(): string {
  return process.env.privateKey || 'private';
}