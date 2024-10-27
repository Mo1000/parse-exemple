const  logger  = require("../../../logger");
const UserClass = require("../../../classes/UserClass");

Parse.Cloud.define("register", async (req) => {
  logger.info("===register start===");

  const body = req?.params;
  return await UserClass.register(body);
});

Parse.Cloud.define("login", async (req) => {
  logger.info("===login start===");
  const { email, password } = req?.params;
  return await UserClass.loginWithEmail(email, password);
});
