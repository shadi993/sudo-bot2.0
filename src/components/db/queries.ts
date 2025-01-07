import pool from "./index";

export async function ensureGuildTableExists(
  guildId: string,
  guildName: string
): Promise<boolean> {
  try {
    const guildCheckQuery = `SELECT * FROM guilds WHERE id = $1`;
    const guildCheckResult = await pool.query(guildCheckQuery, [guildId]);

    if (guildCheckResult.rows.length === 0) {
      const insertGuildQuery = `INSERT INTO guilds (id, name) VALUES ($1, $2)`;
      await pool.query(insertGuildQuery, [guildId, guildName]);
      console.log(`Inserted guild ${guildId} into the guilds table.`);

      const createGuildTableQuery = `
        CREATE TABLE IF NOT EXISTS guild_${guildId} (
          id SERIAL PRIMARY KEY,
          event_date DATE NOT NULL,
          member_joins INT DEFAULT 0,
          member_leaves INT DEFAULT 0,
          messages_sent INT DEFAULT 0
        );
      `;
      await pool.query(createGuildTableQuery);

      console.log(`Created table for guild ${guildId}`);
      return true; // New table created
    } else {
      console.log(`Table for guild ${guildId} already exists.`);
      return false; // Table already exists
    }
  } catch (error) {
    console.error("Error ensuring guild table:", error);
    throw error;
  }
}