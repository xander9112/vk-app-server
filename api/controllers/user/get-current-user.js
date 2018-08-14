const VkUtils = require('../../utils/VkUtils');

module.exports = {


  friendlyName: 'GetCurrentUser',


  description: 'Get current user.',


  inputs: {
    token: {
      type: 'string',
      required: true
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    const {token} = inputs;

    try {
      let user = await User.findOne({token})
        .populate('profile');

      user.counters = await VkUtils.getAccountCounters(token);

      return exits.success(user);
    } catch ({message}) {
      sails.log(message);
    }
  }
};
