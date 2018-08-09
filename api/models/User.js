/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  tableName: 'users',

  attributes: {

    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    },

    token: {
      type: 'string'
    },

    profile: {
      model: 'profile'
    }

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  verifyPassword: async function (password, modelPassword) {
    return sails.helpers.verifyToken(modelPassword);


    // bcrypt.compare(password, modelPassword, (error, valid) => {
    //   if (error) {
    //     reject(error);
    //   } else if (valid) {
    //     resolve(valid);
    //   } else {
    //     reject({message: 'Не правильно указан логин или пароль'});
    //   }
    // });
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.password = await sails.helpers.generateToken(valuesToSet.password);

    proceed();
  },

  beforeUpdate: async function (valuesToSet, proceed) {
    if (valuesToSet.password) {
      valuesToSet.password = await sails.helpers.generateToken(valuesToSet.password);
    }

    return proceed();
  }

};

