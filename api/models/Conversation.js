/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'conversations',

  attributes: {
    peer: {
      model: 'peer'
    },
    unread_count: 'number',
    last_message: 'json'
  }

};

