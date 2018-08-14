/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'conversation-profiles',

  attributes: {
    profile_id: 'number',
    first_name: 'string',
    last_name: 'string',
    deactivated: 'string',
    crop_photo: 'json',
    peer: {
      model: 'peer'
    }
  }

};

