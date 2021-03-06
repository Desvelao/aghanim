# Aghanim

**Aghanim** is a Command Client for create ***Discord*** bots with [Eris](https://github.com/abalabahaha/eris) in NodeJS based on [Yuuko](https://geo1088.github.io/yuuko)

__Author__ : [Desvelao^^](https://desvelao.github.io/profile/)  __Version__: `v0.2.0`

## Features
- Add Commands/Subcommands and Components from files or directories
- Support for Subcommands (Command should be exist)
- Builtin commands requirements or define yours
- Define Commands as objects or use Command class
- Define Components as object or a class that extends of Component class
- Define methods to run in some Eris events automatically with your Components

## Using the bot

Usage information for the bot (the usable commands, default configuration, and other help topics) can be found [here](https://desvelao.github.io/aghanim/).

## Using the package

**Aghanim's core** is only available at [Github repository](https://github.com/Desvelao/aghanim). It extends [Eris](https://github.com/abalabahaha/eris) and is basically an alternative to its CommandClient class.

### Installation

```bash
$ npm install --save Desvelao/aghanim # npm
$ yarn add Desvelao/aghanim # yarn

# Dev branch
$ npm install --save Desvelao/aghanim#dev # npm
$ yarn add Desvelao/aghanim#dev # yarn

```

### Usage

```js
//index.js
const Aghanim  = require('aghanim')
const { Command, Component }  = require('aghanim')

const client = new Aghanim(
	'your_bot_token', // Token used to auth your bot account
    {
  		prefix: 'a!', // Prefix used to trigger commands
	}
)

client.addCategory('Fun','Fun commands')

const pingCommand = new Command('ping', {
  category : 'Fun', help : 'Get Pong!', args : ''},
  async function(msg, args, client, command) {
  	msg.channel.createMessage('Pong!')
})

client.addCommand(pingCommand)

// Component:
class MyComponent extends Component{
	constructor(client, options) {
		super(client) // this.client is Aghanim Client instance. You can use in other methods
	}
	ready(client){ // method fired in client.on('ready', handler) by default of this component. Each component can add handlers for events.
		console.log('My component is ready')
	}
	messageCreate(msg, args, client, command){ // method fired in client.on('messageCreat', handler).
		console.log(`Message: ${msg.content}`)
		// this.client is Aghanim Client instance. You can use it here
	}
}

client.addComponent(MyComponent)

// Bot connent
client.connect()
```

```bash
$ node index.js
```
