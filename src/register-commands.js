require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "group",
    description: "Create link to roblox group",
  },
  {
    name: "new",
    description: "Create new merch embed",
  },
  {
    name: "stats",
    description: "Show server stats",
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    if (!process.env.TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
      throw new Error("Missing environment variables");
    }

    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error reloading application (/) commands:", error);
  }
})();
