const moment = require('moment-timezone'); // will help us do all the birthday math
const axios = require('axios');

module.exports = {
    getAdjustedDateData(timezone) {
        const today = moment().tz(timezone).startOf('day');

        return {
            day: today.date(),
            month: today.month() + 1
        }
    },
    async getApiCall() {
        const endpoint = 'https://query.wikidata.org/sparql';
        console.log(endpoint);
        const res = await axios.get(endpoint);
        return res.data;
    },
    callDirectiveService(handlerInput, msg) {
        // Call Alexa Directive Service.
        const {
            requestEnvelope
        } = handlerInput;
        const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();
        const requestId = requestEnvelope.request.requestId;
        const {
            apiEndpoint,
            apiAccessToken
        } = requestEnvelope.context.System;

        // build the progressive response directive
        const directive = {
            header: {
                requestId,
            },
            directive: {
                type: 'VoicePlayer.Speak',
                speech: msg
            },
        };
        // send directive
        return directiveServiceClient.enqueue(directive, apiEndpoint, apiAccessToken);
    }
}