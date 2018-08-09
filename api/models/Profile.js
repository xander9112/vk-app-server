/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'profiles',

  attributes: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    screen_name: {
      type: 'string'
    },
    sex: 'number',
    bdate: {
      type: 'string'
    },
    home_town: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    phone: {
      type: 'string'
    }
  }

};

