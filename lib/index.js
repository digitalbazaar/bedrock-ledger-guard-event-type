/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const brLedger = require('bedrock-ledger-node');
const validate = require('bedrock-validation').validate;
const BedrockError = bedrock.util.BedrockError;

require('./config');

bedrock.events.on('bedrock.start', () =>
  brLedger.use('EventTypeValidator2017', {
    type: 'validator',
    api: api
  }));

const api = {};
// NOTE: only exported for tests
module.exports = api;

api.validateConfiguration = (validatorConfig, callback) =>
  validate('ledger-validator-signature-config', validatorConfig, callback);

api.mustValidateEvent = (event, validatorConfig, options, callback) => {
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }
  // this validator must inspect all events
  callback(null, true);
};

api.validateEvent = (event, validatorConfig, callback) => {
  if(!validatorConfig.eventTypes.includes(event.type)) {
    return callback(new BedrockError(
      'The event type is not acceptable.', 'ValidationError', {
        httpStatusCode: 400,
        public: true
      }));
  }
  callback();
};
