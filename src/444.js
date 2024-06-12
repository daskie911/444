require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "Your room",
    type: ActivityType.Streaming,
    url: "https://www.roblox.com/groups/33233085/444kuda#!/about",
  },
  {
    name: "Roblox",
    type: ActivityType.Playing,
  },
  {
    name: "Pornhub",
    type: ActivityType.Watching,
    url: "https://www.pornhub.com/",
  },
];

client.on("ready", () => {
  console.log(`✅OMG ${client.user.tag} is ready!✅`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.on("messageCreate", (message) => {
  if (message.content === "hallo") {
    message.reply("banned!");
  }
  if (message.content === "gyat") {
    message.reply("erm! what the sigma?🤓");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "group") {
    interaction.reply("https://www.roblox.com/groups/33233085/444kuda#!/about");
  }
  if (interaction.commandName === "new") {
    const embed = new EmbedBuilder()
      .setTitle("New Merch!")
      .setURL("https://www.roblox.com/groups/33233085/444kuda#!/store")
      .setDescription("Check out our new merch!")
      .setColor("Random")
      .setImage(
        "https://tr.rbxcdn.com/41c467009a386a90e87b875a5ba4d74d/150/150/Image/Webp"
      )
      .setFooter({ text: "444kuda" }) 
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
});


client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`Role ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`Role ${role} has been added`);
  } catch (error) {
    console.log(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    if (interaction.commandName === "stats") {
      const { guild } = interaction;

      // Fetch all members to ensure we have an updated count
      await guild.members.fetch();

      const memberCount = guild.memberCount;
      const botCount = guild.members.cache.filter(
        (member) => member.user.bot
      ).size;
      const humanCount = memberCount - botCount;

      const embed = new EmbedBuilder()
        .setTitle("Server Stats")
        .setColor("#00FF00")
        .addFields(
          { name: "Total members", value: `${memberCount}`, inline: true },
          { name: "Bots🤖", value: `${botCount}`, inline: true },
          { name: "Humans🙍🏻‍♂️", value: `${humanCount}`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
client.login(process.env.TOKEN);
