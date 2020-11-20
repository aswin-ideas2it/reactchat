const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { ChatGrant, VideoGrant } = AccessToken;
const { getToken } = require('./getToken');
const { getLambdaToken } = require("./getLambdaToken");

const getLamdaToken = async (identity, config) => {
  
  const chatGrant = new ChatGrant({
    serviceSid: config.twilio.chatService
  });

   const token = await getLamdaToken(identity);
   console.log("Lambda Token JWT"+ token);

   token.identity = identity;
   const jwtToken = token.token;
   console.log("identity" + identity);
   console.log("Lambda Chat Token" + JSON.stringify(token));
 
   return {
     token,
     jwtToken
   }

};


const getChatToken = async (identity, config) => {
  
  const chatGrant = new ChatGrant({
    serviceSid: config.twilio.chatService
  });

  const token = await getToken(identity);
  console.log("Lambda Token JWT"+ JSON.stringify(token.tokenJWT));

  token.identity = identity;
  const jwtToken = token.tokenJWT;
  console.log("identity" + identity);
  console.log("Lambda Chat Token" + JSON.stringify(token));

  return {
    token,
    jwtToken
  }
};

const chatToken = (identity, config) => {
  const chatGrant = new ChatGrant({
    serviceSid: config.twilio.chatService
  });
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
  console.log("token" + JSON.stringify(token));
  token.addGrant(chatGrant);

  token.identity = identity;
  console.log("identity" + identity);
  console.log("chat token" + JSON.stringify(token));
  return token;
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

module.exports = { chatToken, videoToken, getChatToken , getLambdaToken};
