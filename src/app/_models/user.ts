export class User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  token: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }
}
