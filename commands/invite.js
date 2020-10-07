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
            let promiseArray = createPromiseArray(message, parseInt(args[0]));

            Promise.all(promiseArray).then((invites) => {
                for(var i = 0; i < invites.length; i++) {
                    message.channel.send(invites[i].url);
                }
            });
        }
    }
}

createPromiseArray = (message, inviteNumber) => {
    let promiseArray = [];

    for(var i = 0; i < inviteNumber; i++) {
        promiseArray.push(createInvite(message));
    }

    return promiseArray;
}

createInvite = (message) => {
    return message.channel.createInvite({
        options: {
            maxUses: 1,
            unique: true
        }
    });
}