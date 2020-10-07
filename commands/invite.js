module.exports = {
    name: 'invite',
    description: 'Creates a single use invite',
    usage: '<number of invites>',
    execute(message, args) {
        if(args.length != 1) {
            message.reply('that\'s the wrong number of arguments. Use !help team for further details.');
            return;
        }
        else {
            createPromises(message, parseInt(args[0]));
            message.channel.send("Creating invites... gimme a sec");
        }
    }
}

createPromises = (message, inviteNumber) => {
    for(var i = 0; i < inviteNumber; i++) {
        createInvite(message, i);
    }
}

createInvite = (message, index) => {
    message.channel.createInvite({
        options: {
            maxUses: 1,
            unique: true,
            maxAge: 86400 - index
        }
    })
    .then((invite) => {
        message.author.send(invite.url);
    });
}