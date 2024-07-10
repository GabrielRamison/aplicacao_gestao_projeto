// models/Contract.js
const { Model } = require('objection');

class Contract extends Model {
  static get tableName() {
    return 'contracts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'signDate', 'expirationDate', 'partiesInvolved', 'summary'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        signDate: { type: 'string', format: 'date' },
        expirationDate: { type: 'string', format: 'date' },
        partiesInvolved: { type: 'string', minLength: 1, maxLength: 255 },
        summary: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Contract;
