export class User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  token: string;
  role: string;

  constructor(username: string, token: string, role: string) {
    this.username = username;
    this.token = token;
    this.role = role;
  }
}
