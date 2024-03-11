import conf from "../Conf/conf";
// here we import appwrite this refrence is taken from appwrite auth
import { Client, Account, ID } from "appwrite";
// console.log(conf, Client, Account, ID);

// Here we use the comperical way for auth
export class AuthService {
  client = new Client();
  account;

  // Here we made a constructor
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call unother method
        return this.login(email, password);
      } else {
        // userAccount = 0
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const login = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log(login);
    } catch (error) {
      throw error;
    }
  }

  async getCorrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      const getUser = await this.account.get();
      if (getUser) {
        return getUser;
      } else {
        console.log("getUser not found");
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// we make a object of class AuthService
const authService = new AuthService();

// export the object of AuthService
export default authService;
