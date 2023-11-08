const Discord = require('discord.js');
const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const screenshot = require('screenshot-desktop');
const config = require('./config.json');
const Jimp = require('jimp');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});


client.once('ready', () => {
  DateLog(`[config] locked to ${config.owner}`)
  DateLog(`[config] prefix set to ${config.prefix}`)
  DateLog(`[authorization] logging in with (${config.token.substring(0, 12)}...) as authorization`)
  DateLog(`[authorization] authorization was successful`)
  DateLog(`[bot-account] authorized as ${client.user.tag} (${client.user.id.substring(0, 12)}...)`)
  DateLog(`[status] ready to listen to commands`)
});

client.on('messageCreate', async (message) => {
  if (message.author.id !== config.owner) return;

  if (message.content === `${config.prefix}shutdown`) {
    DateLog('Initiating shutdown');
    message.channel.send(':zzz: Shutting down');
    // impl. fix for msg not sending
    setTimeout(() => {
      const exec = require('child_process').exec;
      exec('shutdown /s /f /t 0', (error, stdout, stderr) => {
        if (error) {
          DateLog(`Error: ${error}`);
        } else {
          DateLog(`System shutdown initiated: ${stdout}`);
        }
      });
    }, 250)
  }

  if (message.content === `${config.prefix}lock`) {
    DateLog(`Initiating lock`)
    message.channel.send(`:unlock: Locking`);
    const exec = require('child_process').exec;
    exec('Rundll32.exe user32.dll,LockWorkStation', (error, stdout, stderr) => {
      if (error) {
        DateLog(`Error: ${error}`)
      } else {
        DateLog(`System lock initiated: ${stdout}`)
        message.channel.send(`:lock: Locked`)
      }
    })
  }

  if (message.content === `${config.prefix}screenshot`) {
    DateLog('Requesting screenshot');
    message.channel.send(`:computer: Taking screenshot`)
    try {
      const img = await screenshot({ format: 'png' });
      const image = await Jimp.read(img);
      const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      image.print(font, 10, 350, `${new Date().toISOString().slice(0, 10)} - ${client.user.tag} | ${message.guild.name}`);
      const buf = await image.getBufferAsync(Jimp.MIME_PNG)
      message.channel.send({
        files: [
          {
            attachment: buf,
            name: 'remote-screenshot.png',
          },
        ],
      });
      DateLog('Screenshot success');
    } catch (err) {
      console.log(err);
    }
  }

  if (message.content === `${config.prefix}help`) {
    message.channel.send(`Commands:\n\`${config.prefix}shutdown\` - Shut down PC\n\`${config.prefix}lock\` - Lock PC\n\`${config.prefix}screenshot\` - Take a screenshot`);
  }

  if (message.content === `${config.prefix}cleanup`) {
    message.channel.messages.fetch().then(col => {
      col.forEach(msg => {
        try {
          msg.delete()
          DateLog(`[message] [cleaner] cleaned ${msg.id}`)
        } catch (err) {
          DateLog(`[message] [cleaner] [exception] ${err}`)
        }
      })
    })
    
  }
});

function DateLog(msg) {
  console.log(`[${new Date().toISOString().slice(0, 10)}] ${msg}`);
}

client.login(config.token);
