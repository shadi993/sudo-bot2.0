/**
 * Check if the user has the 'ADMINISTRATOR' or 'MANAGE_GUILD' permission
 * @param {number} permissions - The permissions bitfield returned from the Discord API
 * @returns {boolean} - True if the user is an admin or can manage the guild
 */
export function hasAdminPermissions(permissions: number) {
  const ADMINISTRATOR = 0x8;
  const MANAGE_GUILD = 0x20;
  return (
    (permissions & ADMINISTRATOR) === ADMINISTRATOR ||
    (permissions & MANAGE_GUILD) === MANAGE_GUILD
  );
}
