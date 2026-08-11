import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../types.js";
import { askOpenAI } from "../services/ask.js";

export const ask: Command = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask the AI a question")
    .addStringOption((option) => option.setName("question").setDescription("Your question").setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();
    const question = interaction.options.getString("question", true);
    const answer = await askOpenAI(question);
    await interaction.editReply(answer || "(no response)");
  },
};
