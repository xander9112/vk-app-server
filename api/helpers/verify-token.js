const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Verify token',


  description: '',


  inputs: {

    token: {
      type: 'string',
      required: true
    }

  },

  exits: {
    success: {},
    notFound: {
      statusCode: 401
    }
  },


  fn: async (inputs, exits) => {
    const {token} = inputs;

    jwt.verify(token, sails.config.crypto.tokenSecret, {}, (error, data) => {
      if (error) {
        return exits.notFound(error.message);
      } else if (data) {
        return exits.success(data);
      }
    });
  }
};
