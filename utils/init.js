import User from "../models/user.model.js";
import { userTypes } from "./contants.js";

export async function init() {
  let adminIsExist = await User.findOne({ username: "aamansayyed", userType: userTypes.ADMIN });
  if (!adminIsExist) {
    let adminUser = {
      username: "aamansayyed",
      password: "admin123",
      email: "sayyedaaman9@gmail.com",
      userType : userTypes.ADMIN
    };
    await User.create(adminUser);
    console.log(`Admin Id created.`)
  }else{
    console.log(`Admin Id already Exists.`)
  }
}
