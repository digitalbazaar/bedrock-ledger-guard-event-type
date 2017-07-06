/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const schemas = require('bedrock-validation').schemas;

const schema = {
  title: 'Bedrock Ledger Event Type Validator Config',
  required: true,
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['EventTypeValidator2017'],
      required: true
    },
    eventTypes: {
      title: 'Acceptable Event Types',
      type: 'array',
      items: schemas.identifier(),
      required: true
    }
  },
  additionalProperties: false
};

module.exports = extend => {
  if(extend) {
    return bedrock.util.extend(true, bedrock.util.clone(schema), extend);
  }
  return schema;
};
