export class ConnectionRefusedException extends Error {
  constructor(message: string) {
    super(message);
  }
}
