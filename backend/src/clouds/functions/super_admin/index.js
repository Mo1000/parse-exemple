const logger = require("../../../logger");
const UserClass = require("../../../classes/UserClass");
const { setRolesBySuperAdmin } = require("../../../functions/super_admin");
const { ROLES } = require("../../../constants");
Parse.Cloud.define(
  "createRole",
  async (req) => {
    logger.info("=== Create Role===");
      console.log(req.user, "=== User===");
    const body = req?.params;
    return await setRolesBySuperAdmin();
  },
  {
    requireUserKeys: {
      roles: {
        options: (roles)=> roles.includes(ROLES.SUPERADMIN),
        error: "Only super admin can perform this action",
      },
    },
      // requireAnyUserRoles: [ROLES.SUPERADMIN],
    requireUser: true,
  }
);
