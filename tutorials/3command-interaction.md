# Interaction commands

These commands use the slash command (`/`) to be executed.

## Definition

```ts
interface InteractionCommandDefinition {
  name: string,
  description: string,
  type: Aghanim.Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
  customOptions: {
    defer: boolean // send a signal as the bot is writing while running a long process of the command
    'dev.forceUpdate': boolean // force to update the interaction command when the bot is started
  }
  scope: {
    type: 'global' | 'guild', // global or guild
    guildIDs: number[] // used for guild type to define the specific guild IDs to register
  },
  run: (interaction, client, command) => Promise<any> { // Ensure to reply the interaction
}
```

## Create and add the interaction command

```js
const Aghanim = require('aghanim');

// Create an interaction command definition
const pingGlobalInteractionCommand = {
  name: 'ping',
  category: 'General',
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

// Add the interaction command
bot.addInteractionCommand(pingGlobalInteractionCommand)

// Create an interaction command definition specific to a guild
const pingGuildSpecificInteractionCommand = {
  name: 'ping',
  category: 'General',
  description: 'About',
  type: Aghanim.Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
  customOptions: {
    defer: true
  }
  scope: {
    type: 'guild',
    guildIDs: [123456789] // used for guild type to define the specific guild IDs to register
  },
  run: async function (interaction, client, command) {
    // interaction command logic
    // Ensure to reply the interaction
    return interaction.createMessage('Pong');
  }
};

// Add the interaction command
bot.addInteractionCommand(pingGuildSpecificInteractionCommand)
```

## Add from a directory

You can add interaction commands from a directory. The files should be named as `*.js` and
export by default the interaction command definition.

```js
const path = require('path');
bot.addInteractionCommandDir(path.join(__dirname, 'interaction_commands')))
```
