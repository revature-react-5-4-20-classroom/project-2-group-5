export class User {
    userId: number;
    username: string;
    alias: string;
    role: string;
    password?: string;
    profilePic?:File;
    constructor(
      userId: number,
      username: string,
      alias: string,
      role: string,
      password?: string,
      profilePic?:File
    ) {
      this.userId = userId;
      this.username = username;
      this.alias = alias;
      this.role = role;
      this.password = password;
      this.  profilePic=profilePic
    }
  }

