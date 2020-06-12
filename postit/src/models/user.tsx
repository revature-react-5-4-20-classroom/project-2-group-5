export class User {
    userId: number;
    username: string;
    alias: string;
    role: string;
    password?: string;
    constructor(
      userId: number,
      username: string,
      alias: string,
      role: string,
      password?: string
    ) {
      this.userId = userId;
      this.username = username;
      this.alias = alias;
      this.role = role;
      this.password = password;
    }
  }

