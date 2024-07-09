const { Model } = require('objection');

class Contract extends Model {
  static get tableName() {
    return 'contracts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['filePath', 'summary', 'signedDate', 'validUntil', 'partiesInvolved'],

      properties: {
        id: { type: 'integer' },
        filePath: { type: 'string' },
        summary: { type: 'string' },
        signedDate: { type: 'string' },
        validUntil: { type: 'string' },
        partiesInvolved: { type: 'string' },
        status: { type: 'string', enum: ['active', 'expired'], default: 'active' },
      },
    };
  }
}

module.exports = Contract;
