import { GuildMember } from "discord.js";

export const handleGuildMemberAdd = (member: GuildMember) => {
  console.log(`${member.user.tag} joined ${member.guild.name}`);
};