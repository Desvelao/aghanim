module.exports = ({time, response, responseDM, run}) => {
	const requirement = {
		validate: (context, client, command, req) => {
			const cooldown = (req.cooldowns[context.user.id] || 0) - Math.round(new Date().getTime() / 1000)
			!context.ctx && (context.ctx = {})
			context.ctx.reqUserCooldown = { cooldown, user: context.user.username }
			return cooldown < 0
		},
		cooldowns: {},
		time,
		response,
		responseDM,
		run,
		init: (client, command, req) => {
			// Add hook to after command execute
			command.addHook('execute', (context, client, command) => {
				req.cooldowns[context.user.id] = Math.round(new Date().getTime() / 1000) + req.time
			})
		} 
	}
	if (response) {
		if (typeof(response) === 'string') {
			requirement.response = (context, client, command, req) => replacement(response, context.ctx.reqUserCooldown)
		} else if (typeof(response) === 'function') {
			requirement.response = (context, client, command, req) => replacement(response(context, client, command, req), context.ctx.reqUserCooldown)
		}
	}
	if (responseDM) {
		if (typeof(responseDM) === 'string') {
			requirement.responseDM = (context, client, command, req) => replacement(responseDM, context.ctx.reqUserCooldown)
		} else if (typeof(responseDM) === 'function') {
			requirement.responseDM = (context, client, command, req) => replacement(responseDM(context.ctx, client, command, req), context.ctx.reqUserCooldown)
		}
	}
	return requirement
}

const replacement = (response, { cooldown, user }) => response.replace(new RegExp('%cd%', 'g'), cooldown)
	.replace(new RegExp('%user%', 'g'), user)
