import axios from "axios";

import { User } from "../models/user";
// import { FailedLoginErro/r } from "../errors/DisplayErrorMessage";

const loginClient = axios.create({
  baseURL: "http://localhost:8080",
  // If you don't have the following line, your login won't work!
  withCredentials: true,
});

export async function login(un: string, pw: string): Promise<User> {
  try {
    const response = await loginClient.post("/login", {
      username: un,
      password: pw,
    });
    const { userId, username, alias, password, role } = response.data;
    //console.log("server responce api " + userId);
    return new User(userId, username, alias, password, role);
  } catch (e) {
    if (e.response.status === 401) {
      throw new Error("Failed to authenticate user "+ un);
    } else {
      throw e;
    }
  }
}
