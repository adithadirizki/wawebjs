const { MessageMedia } = require("whatsapp-web.js");
const fs = require("fs");
const waweb = require("../controllers/waweb");

module.exports = {
  get_qrcode: (req, res, next) => {},
  form_upload: (req, res, next) => {
    const { nama, email, pesan } = req.body;

    if (!(nama || email || pesan)) {
      return res.json({
        status: 403,
        message: "Field is required",
      });
    }

    const filename = Date.now();
    const stream = fs.createWriteStream(`./src/upload/${filename}.txt`);

    stream.once("open", () => {
      stream.write(`Nama Lengkap : ${nama}\n`);
      stream.write(`Email        : ${email}\n`);
      stream.write(`Pesan        : ${pesan}\n`);
      stream.end();
    });

    return res.json({
      status: 200,
      message: "OK",
      filename: `${filename}.txt`,
    });
  },
  send_media: (req, res, next) => {
    const { client } = res.locals;
    const { phone, filename, caption } = req.body;
    const file = MessageMedia.fromFilePath(`./src/upload/${filename}`);

    client.isRegisteredUser(`${phone}@c.us`).then(function (isRegistered) {
      if (isRegistered) {
        client.sendMessage(`${phone}@c.us`, file, { caption: caption });

        return res.json({
          status: 200,
          message: "OK",
        });
      } else {
        return res.json({
          status: 200,
          message: "OK",
        });
      }
    });
  },
  send_message: (req, res, next) => {
    const { client } = res.locals;
    const { phone, content } = req.body;

    client.isRegisteredUser(`${phone}@c.us`).then(function (isRegistered) {
      if (isRegistered) {
        client.sendMessage(`${phone}@c.us`, content);

        return res.json({
          status: 200,
          message: "OK",
        });
      } else {
        return res.json({
          status: 403,
          message: "OK",
        });
      }
    });
  },
  create_group: (req, res, next) => {
    const { client } = res.locals;
    const { group_name, participants } = req.body;
    let contacts = [];

    if (!group_name) {
      return res.json({
        status: 403,
        message: "group_name is required",
      });
    } else if (!participants || !Array.isArray(participants)) {
      return res.json({
        status: 403,
        message: "participants must be array type",
      });
    } else if (participants.length < 1) {
      return res.json({
        status: 403,
        message: "participants must be more than 0",
      });
    }

    participants.forEach((participant) => {
      contacts.push(`${participant}@c.us`);
    });

    client.createGroup(group_name, contacts);

    return res.json({
      status: 200,
      message: "OK",
    });
  },
  group_send_message: (req, res, next) => {
    const { client } = res.locals;
    client.sendMessage("6285609836823-1635151312@g.us", "HEELLLoooo");
    return res.json({
      status: 200,
      message: "OK",
    });
  },
};
