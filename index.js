const fs = require('fs')
require('dotenv').config()

var words = []

try {
  const data = fs.readFileSync('./nounlist.csv', 'utf8')
  data.split('\n').map(word => {
    words.push(word)
  });
} catch (err) {
  console.error(err)
}

const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
 
client.on("ready", () => {
  console.log("I am ready!");
});

// Set the prefix
const prefix = "!";
 
client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix}bully`) && message.mentions.members.size !== 0) {
    let mentioned = message.mentions.members.first()

    message.channel.send(`@everyone how do you think ${mentioned} is related to ${words[Math.floor(Math.random() * words.length)]}?`);
  }

  if (message.content.startsWith(`${prefix}icebreak`) && message.mentions.members.size !== 0) {
    let mentioned = message.mentions.members.first()
    let randomWord = words[Math.floor(Math.random() * words.length)]

    message.author.send(`So you want to break ice with ${mentioned}\nhow do you think ${mentioned} is related to ${randomWord}?\nReply with !reply command and I'll forward your message :wink:`).
    catch(console.error);
    
    mentioned.send(`${message.author} wants to break ice!\nI asked them how are you related to ${randomWord}\nLet's wait for their reply :wink:`).
    catch(console.error)
  }
});
 
client.login(process.env.BOT_TOKEN);