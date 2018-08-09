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


  exits: {
    success: {},
    error: {}
  },


  fn: async function (inputs, exits) {
    const {token} = inputs;

    try {
      let user = await User.findOne({token})
        .populate('profile');

      return exits.success(user);
    } catch ({message}) {
      sails.log(message);
    }
  }
};
