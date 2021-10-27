const express = require("express");
const services = require("../services");
const waweb = require('../controllers/waweb');
const router = express.Router();

router.get("/qrcode", waweb.qrCode);
router.post("/form/upload", services.form_upload);
router.post("/send/message", services.send_message);
router.post("/send/media", services.send_media);
router.post("/group/create", services.create_group);
router.post("/group/send/message", services.group_send_message);

module.exports = router;
