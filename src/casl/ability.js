import { defineAbility } from "@casl/ability";

export function defineAbilitiesFor(userPermissions) {
  return defineAbility((can) => {
    userPermissions.forEach((permission) => {
      if (permission.type === "api") {
        can(permission.method.toLowerCase(), permission.endpoint);
      } else if (permission.type === "page") {
        can("view", permission.pagePath);
      }
    });
  });
}
