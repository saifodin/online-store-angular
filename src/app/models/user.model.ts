export class User {
  constructor(
    public token: string,
    public tokenExpirationDate: Date,
    public userType: string,
  ) {
  }
}