# Aghanim

**Aghanim** is a Command Client to create **_Discord_** bots with [Eris](https://github.com/abalabahaha/eris) in NodeJS based on [Yuuko](https://geo1088.github.io/yuuko).

**Version**: `v0.3.0`

## Features

- Add commands/subcommands and Components from files or directories
- Add interaction commands from files or directories
- Add components from files or directories
- Builtin commands requirements or define and register custom requirements
- Define methods to run in some Eris events automatically with your Components

## Using the bot

Usage information for the bot (the usable commands, default configuration, and other help topics) can be found [here](https://desvelao.github.io/aghanim/).

## Using the package

**Aghanim's core** is only available at [Github repository](https://github.com/Desvelao/aghanim). It extends [Eris](https://github.com/abalabahaha/eris) and is basically an alternative to its CommandClient class.

### Installation

```bash
$ npm install --save Desvelao/aghanim # npm
$ yarn add Desvelao/aghanim # yarn
```

### Usage

```js
//index.js
const Aghanim = require('aghanim');
const { Command, Component } = require('aghanim');

// Create bot
const client = new Aghanim(
  'your_bot_token', // Token used to auth your bot account
  {
    prefix: 'a!' // Used by the commands manager based on text context. Use the interaction commands are the new way to interact
  }
);

// Add interaction command. Use slash commands (/ping)
const pingGlobalInteractionCommand = {
  name: 'ping',
  description: 'About',
  type: Aghanim.Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
  customOptions: {
    defer: true
  }
  scope: {
    type: 'global',
  },
  run: async function (interaction, client, command) {
    // interaction command logic
    // Ensure to reply the interaction
    return interaction.createMessage('Pong');
  }
};

client.addInteractionCommand(pingGlobalInteractionCommand);

// Add category
client.addCategory('Fun', 'Fun commands');

// Add command
const pingCommand = new Command(
  'ping',
  {
    category: 'Fun',
    help: 'Get Pong!',
    args: ''
  },
  async function (msg, args, client, command) {
    await msg.channel.createMessage('Pong!');
  }
);

client.addCommand(pingCommand);

// Add component:
class MyComponent extends Component {
  constructor(client, options) {
    super(client); // this.client is Aghanim Client instance. You can use in other methods
  }
  ready(client) {
    // method fired in client.on('ready', handler) by default of this component. Each component can add handlers for events.
    console.log('My component is ready');
  }
  messageCreate(msg, args, client, command) {
    // method fired in client.on('messageCreate', handler).
    console.log(`Message: ${msg.content}`);
    // this.client is Aghanim Client instance. You can use it here
  }
}

client.addComponent(MyComponent);

// Bot connent
client.connect();
```

Run the script:

```bash
$ node index.js
```

# Load Aghanim configuration

The Aghanim client can load configuration from a file in the current directory:

- aghanim.config.json
- aghanim.config.js

or define the `AGHANIM_CONFIG_FILE` environment variable to define the absolute path to the configuration file (like .js or .json)
