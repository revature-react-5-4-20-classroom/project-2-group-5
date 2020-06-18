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
<<<<<<< HEAD
      this.  profilePic=profilePic
=======
      this.profilePic=profilePic
>>>>>>> fa7a10639d5d79dce20646c20e8f312271a39156
    }
  }

