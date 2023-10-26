const Permissions = require("../enums/permissions");
const Roles = require("../enums/roles");

const allPermissions = [...Object.values(Permissions)];
const allRoles = [...Object.values(Roles)];

const forAllRoles = [
  Permissions.can_view_categories,
  Permissions.can_view_leads,
  Permissions.can_edit_leads,
  Permissions.can_create_images,
  Permissions.can_view_routes,
  Permissions.can_edit_routes,
  Permissions.can_view_acceptances,
  Permissions.can_edit_acceptances,
  Permissions.can_view_auctions,
  Permissions.can_edit_auctions,
  Permissions.can_view_ratings,
  Permissions.can_edit_ratings,
  Permissions.can_create_ratings,
];

const onlySuperAdminPermissions = [
  Permissions.can_delete_users,
  Permissions.can_delete_leads,
  Permissions.can_delete_drivers,
  Permissions.can_delete_routes,
  Permissions.can_delete_categories,
  Permissions.can_delete_faqs,
  Permissions.can_delete_ratings,
  Permissions.can_delete_auctions,
  Permissions.can_delete_acceptances,
  Permissions.can_delete_sellers,
  Permissions.can_reset_password_of_users,
  Permissions.can_view_userlogs,
  Permissions.can_edit_categories,
  Permissions.can_create_categories,
];

const rolesWithPermissions = {
  [Roles.SUPER_ADMIN]: allPermissions,
  [Roles.ADMIN]: allPermissions.filter(
    (v) => !onlySuperAdminPermissions.includes(v),
  ),
  [Roles.MANAGER]: [
    ...forAllRoles,
    Permissions.can_view_sellers,
    Permissions.can_edit_sellers,
    Permissions.can_create_sellers,
    Permissions.can_view_addresses,
    Permissions.can_edit_addresses,
    Permissions.can_create_addresses,
    Permissions.can_delete_addresses,
    Permissions.can_view_drivers,
    Permissions.can_create_leads,
    Permissions.can_create_routes,
    Permissions.can_create_acceptances,
    Permissions.can_create_auctions,
  ],
  [Roles.SUPPORT]: [
    ...forAllRoles,
    Permissions.can_view_sellers,
    Permissions.can_view_drivers,
    Permissions.can_edit_drivers,
    Permissions.can_create_drivers,
  ],
};

const roleIds = {
  0: Roles.SUPER_ADMIN,
  1: Roles.ADMIN,
  2: Roles.MANAGER,
  3: Roles.SUPPORT,
};

const getRoleId = (role) =>
  Object.keys(roleIds).find((key) => roleIds[key] === role);

const getRoleNameByRoleId = (roleId) => roleIds[roleId];

const getPermissionsByRoleId = (roleId) => {
  let roleName = roleIds[roleId];
  let permissionsOfRole = rolesWithPermissions[roleName];

  return permissionsOfRole;
};

module.exports = {
  allPermissions,
  allRoles,
  rolesWithPermissions,
  roleIds,
  getRoleId,
  getPermissionsByRoleId,
  getRoleNameByRoleId,
};
