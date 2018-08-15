const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Get history',


  description: '',


  inputs: {
    offset: {
      type: 'number'
    },
    count: {
      type: 'number'
    },
    peer_id: {
      type: 'number'
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    const {offset, count, peer_id} = inputs;


    try {
      const history = await VkUtils.messagesGetHistory(this.req.headers['x-token'], {
        extended: 1,
        offset,
        count,
        peer_id
      });

      return exits.success(history);
    } catch (e) {
      return exits.notFound({error: e.message});
    }
  }
};
