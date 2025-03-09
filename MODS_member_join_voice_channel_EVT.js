module.exports = {
  name: "Membro entrou no canal de voz",
  isEvent: true,

  fields: [
"Nome da variável temporária (armazena o membro que entrou no canal):",
"Nome da variável temporária (armazena o canal em que o membro entrou):",
  ],

  mod(DBM) {
    DBM.Events = DBM.Events || {};
    const { Actions, Bot } = DBM;
    DBM.Events.memberJoinVoiceChannel = function memberJoinVoiceChannel(
      oldVoiceState,
      newVoiceState
    ) {
      if (!Bot.$evts["Membro entrou no canal de voz"]) return;
      const oldChannel = oldVoiceState.channel;
      const newChannel = newVoiceState.channel;
      if (oldChannel || !newChannel) return;

      const server = newChannel.guild;
      for (const event of Bot.$evts["Membro entrou no canal de voz"]) {
        const temp = {};
        if (event.temp) temp[event.temp] = newVoiceState.member;
        if (event.temp2) temp[event.temp2] = newChannel;
        Actions.invokeEvent(event, server, temp);
      }
    };
    const { onReady } = Bot;
    Bot.onReady = function memberJoinVoiceChannelOnReady(...params) {
      Bot.bot.on("voiceStateUpdate", DBM.Events.memberJoinVoiceChannel);
      onReady.apply(this, ...params);
    };
  },
};
