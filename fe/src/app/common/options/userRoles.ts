export const UserRoles = {
  Admin: {
    id: 1,
    name: 'Admin',
  },
  Editor: {
    id: 2,
    name: 'Editor',
  },
  Viewer: {
    id: 3,
    name: 'Viewer',
  },
};

export const UserRoleOptions = [
  UserRoles.Viewer,
  UserRoles.Editor,
  UserRoles.Admin,
].map(item => ({
  text: item.name,
  value: item.id,
}));
