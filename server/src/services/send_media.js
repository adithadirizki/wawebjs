/**
 * Send Media
 * @param {*} client - instance of whatsapp-web.js
 * @param {*} phoneNumber - contact number with code area (ex: 62 for Indonesian)
 * @param {*} media - media to send
 * @returns void
 */
const send_media = (client, phoneNumber, media, caption) => {
  client.isRegisteredUser(phoneNumber + "@c.us").then(function (isRegistered) {
    if (isRegistered) {
      client.sendMessage(phoneNumber + "@c.us", media, { caption });
    }
  });
};

module.exports = send_media;
