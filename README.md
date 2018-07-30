# Aghanim

**Aghanim** is a Command Client for create ***Discord*** bots with [Eris](https://github.com/abalabahaha/eris) in NodeJS based on [Yuuko](https://geo1088.github.io/yuuko)

__Author__ : [Desvelao^^](https://desvelao.github.io/profile/)  __Version__: `v0.0.1`

## Features
- Support for Subcommands (Command should be exists)
- Commands with user cooldown
- Load commands, events and extensions from directories or files directly.
- Can extends Eris or your bot client with Extensions
- Can add custom functionality to some Eris events. You always can listen the event.

## Using the bot

Usage information for the bot (the usable commands, default configuration, and other help topics) can be found in the wiki [here](https://github.io/Desvelao/aghanim/wiki).

## Using the package

**Aghanim's core** is only available at [Github repository](https://github.com/Desvelao/aghanim). It extends [Eris](https://github.com/abalabahaha/eris) and is basically an alternative to its CommandClient class.

### Installation

```bash
$ yarn add Desvelao/aghanim#dev # yarn
$ npm install --save Desvelao/aghanim#dev # npm
```

### Usage

```js
//index.js
const Aghanim  = require('aghanim')
const { Command, Event }  = require('aghanim')

const bot = new Aghanim(
	'your_bot_token', // Token used to auth your bot account
    {
  		prefix: 'a!', // Prefix used to trigger commands
	}
)

bot.addCategory('Fun','Fun commands')

const pingCommand = new Command('ping', {
  category : 'Fun', help : 'Get Pong!', args : ''},
  function (msg,args,cmd) {
		//this = Aghanim.Client
  	msg.channel.createMessage('Pong!')
})

bot.addCommand(pingCommand)

// Event: executed for no commands actions. Same Eris.
const simpleEvent = new Event(
  'simpleEvent', // Event's name
  'messageCreate', // Event's event (same ErisJS)
  function(msg,args,command){
		//this = Aghanim.Client
	  if(msg.channel.type === 0){console.log('Message received from a guild!')}
	})

bot.addEvent(simpleEvent)

bot.connect()
```

```bash
$ node index.js
```
