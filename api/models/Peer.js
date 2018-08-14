/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'peers',

  attributes: {
    peer: {
      collection: 'conversationProfile',
      via: 'peer'
    },
    conversation: {
      collection: 'conversation',
      via: 'peer'
    },
    type: 'string',
    local_id: 'string'
  }

};

