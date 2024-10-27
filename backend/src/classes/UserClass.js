const logger = require("../logger");
const { addRole, setRoleAcl } = require("../utils/parse");
const {ROLES} = require("../constants");

class UserClass extends Parse.User {
  static parseClassName = "_User";
  firstName;
  lastName;
  email;
  password;
  gender;
  designation;
  bio;
  profilePhoto;
  location;
  phone;
  resetPasswordToken;
  resetPasswordSendAt;
  resetPasswordAt;
  website;
  twitter;
  facebook;
  linkedin;
  youtube;
  roles;
  emailConfirmed;

  constructor() {
    super(UserClass.parseClassName);
  }

  static async register(newUser) {
    const user = new UserClass();

    Object.entries(newUser).forEach(([key, value]) => {
      user.set(key, value);
    });
    let roleACL;
    if(newUser?.roles)
     roleACL = setRoleAcl(newUser?.roles?.[0]);
    else  roleACL = setRoleAcl(ROLES.USER);
    user.setACL(roleACL);
    try {
      const res = await user.signUp();

      if (newUser?.roles) {
        for (const role of newUser.roles) {
          await addRole(user, role);
        }
      } else await addRole(user);

      return res;
    } catch (e) {
      logger.error("Error: " + e.code + " " + e.message);
      throw new Error(e.message);
    }
  }

  /**
     @param {String} _email
     @param {String} _password
     */
  static async loginWithEmail(_email, _password) {
    let userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("email", _email);
    const userFound = await userQuery.first({ useMasterKey: true });
    if (!userFound) {
      throw new Error("No user found with with email address of: " + _email);
    }

    let username = userFound.toJSON().username;
    try {
      return await Parse.User.logIn(username, _password);
    } catch (e) {
      // If login fails, throw an error which will be caught in the calling function
      throw new Error(e.message);
    }
  }
}

module.exports = UserClass;
