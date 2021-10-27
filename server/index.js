const express = require("express");
const cors = require("cors");
const { Client, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const fs = require("fs");
const router = require("./src/routes");

// initialize
const app = express();
const PORT = 5000;
const SESSION_FILE_PATH = "./session.json";
let client;
let dataSession;
let qrcode_base64;
let hasScan;

const withSession = () => {
  dataSession = require(SESSION_FILE_PATH);

  client = new Client({ session: dataSession });
  client.on("ready", () => console.log("Client is ready!"));
  client.on("auth_failure", (fail) => {
    console.log("Auth failure", fail);
    fs.unlinkSync(SESSION_FILE_PATH);
  });
  client.initialize();
};

const withOutSession = () => {
  client = new Client();
  client.on("qr", async (qr) => {
    qrcodeTerminal.generate(qr, { small: true });
    qrcode_base64 = await qrcode.toDataURL(qr);
  });
  client.on("ready", () => console.log("Client is ready!"));
  client.on("auth_failure", (fail) => {
    console.log("Auth failure", fail);
    fs.unlinkSync(SESSION_FILE_PATH);
  });
  client.on("authenticated", (session) => {
    dataSession = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) console.log(err);
    });
  });
  client.initialize();
};

/**
 * Verify authentication with session or without session
 */
fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.locals.has_scan = dataSession ? true : false;
  res.locals.qrcode_base64 = qrcode_base64;
  res.locals.client = client;
  next();
});

app.use(router);

// app.get("/", async (req, res, next) => {
//   return res.json({
//     contacts: await client.getChats(),
//   });
// });

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
