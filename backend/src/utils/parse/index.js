const { ROLES } = require('../../constants');
const isPrivateRoute = (req) => {
  if (!req.user) {
    throw new Error('You are not authorized to perform this action');
  }
};

const addRole = async (user, nameRole = ROLES.USER) => {
  console.log('addRole', nameRole);
  const userRole = await new Parse.Query(Parse.Role)
    .equalTo('name', nameRole)
    .first({ useMasterKey: true });

  if(userRole){
    userRole.getUsers().add(user);
    userRole?.save(null, {useMasterKey: true});
  }
};

const setRoleAcl = (nameRole) => {
  let roleACL = new Parse.ACL();

  if (nameRole === ROLES.SUPERADMIN) {
    roleACL.setPublicWriteAccess(true);
    roleACL.setPublicWriteAccess(true);
  } else if (nameRole === ROLES.ADMIN) {
    roleACL.setRoleReadAccess(ROLES.ADMIN, true);
    roleACL.setRoleWriteAccess(ROLES.ADMIN, true);
  } else if (nameRole === ROLES.SELLER) {
    roleACL.setRoleReadAccess(ROLES.SELLER, true);
    roleACL.setRoleWriteAccess(ROLES.SELLER, true);
  } else if (nameRole === ROLES.USER) {
    roleACL.setRoleReadAccess(ROLES.USER, true);
    roleACL.setRoleWriteAccess(ROLES.USER, true);
  }
  return roleACL;
};
module.exports = { isPrivateRoute, addRole, setRoleAcl };
