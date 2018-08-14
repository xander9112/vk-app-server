/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'messages',

  attributes: {
    date: 'number',
    from_id: 'number',
    out: 'number',
    peer: {
      model: 'peer'
    },
    text: 'string',
    // fwd_messages: [],
    random_id: 'number',
    // attachments: [
    //
    // ],
    is_hidden: 'number'
  }

};

