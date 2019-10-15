/* eslint-disable  func-names */
/* eslint-disable  no-console */

// # Require the Ask SDK

const Alexa = require('ask-sdk-core');

// # `launch request handler`
// The launch request handler is used to start the skill

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = "Welcome to the Linux Academy Alexa Lab, you can say 'I\'m glad to be here.'";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Linux Academy Alexa Lab', speechText)
      .getResponse();
  },
};

// WelcomeIntent 
// Welcomes user to the linux academy lab
const WelcomeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WelcomeIntent';
  },
  handle(handlerInput) {
    const speechText = "Let's get learning!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hurry Back!', speechText)
      .getResponse();
  },
};

// Fairy Godmother
// Triggers the fairy godmother to grant a wish
const FairyGodmotherIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FairyGodmotherIntent';
  },
  handle(handlerInput) {
    const speechText = "I am your fairy godmother and I can turn you into an animal. You can say 'I wish to be an animal.'";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

// Make Animal
// Turns the user into animal
const MakeAnimalIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MakeAnimalIntent';
  },
  handle(handlerInput) {
    const speechStartText = "Poof! You are a super-duper ";
    const animal = handlerInput.requestEnvelope.request.intent.slots.animal.value + '!'
    const speechText = speechStartText + animal

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};


// # `HelpIntentHandler`
// The help intent handler will helpe the user when they ask for help
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say thank you to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hurry Back!', 'I look forward to seeing you later!')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest';
  },
  handle(handlerInput) {
      const intentName = handlerInput.requestEnvelope.request.intent.name;
      const speechText = `You just triggered ${intentName}`;

      return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler,
    // IntentReflectorHandler,
    WelcomeIntentHandler,
    FairyGodmotherIntentHandler,
    MakeAnimalIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
