const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Generate token',


  description: '',


  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {}
  },


  fn: async function (inputs, exits) {
    const {password} = inputs;

    return exits.success(jwt.sign({password}, sails.config.crypto.tokenSecret));
  }
};

