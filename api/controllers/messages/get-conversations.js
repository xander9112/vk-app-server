const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'Get conversations',


  description: '',


  inputs: {
    offset: {
      type: 'number'
    },
    count: {
      type: 'number'
    }
  },


  exits: {
    notFound: {
      statusCode: 401
    }
  },


  fn: async function (inputs, exits) {
    const {offset, count} = inputs;

    try {
      const conversations = await VkUtils.messagesGetHistory(this.req.headers['x-token'], {
        offset,
        count,
        extended: 1,
        fields: 'crop_photo'
      });

      return exits.success(conversations);
    } catch (e) {
      return exits.notFound({error: e.message});
    }
  }
};
