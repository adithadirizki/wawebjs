/**
 * Send Message
 * @param {*} client - instance of whatsapp-web.js
 * @param {*} phoneNumber - contact number with code area (ex: 62 for Indonesian)
 * @param {*} content - content to send
 * @returns void
 */
const send_message = (client, phoneNumber, content) => {
  client.isRegisteredUser(phoneNumber + "@c.us").then(function (isRegistered) {
    if (isRegistered) {
      client.sendMessage(phoneNumber + "@c.us", content);
    }
  });
};

module.exports = send_message;
