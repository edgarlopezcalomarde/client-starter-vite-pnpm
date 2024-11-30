export type User = { roles: Role[]; id: number };

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  admin: ["view:process"],
  user: [],
} as const;

export function hasPermission(user: User, permission: Permission) {
  return user.roles.some((role) =>
    (ROLES[role] as readonly Permission[]).includes(permission)
  );
}
