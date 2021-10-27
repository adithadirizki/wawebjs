module.exports = {
  qrCode: async (req, res, next) => {
    const { has_scan, qrcode_base64 } = res.locals;
    if (has_scan) {
      return res.json({
        status: 200,
        message: "Has been scanned",
      });
    } else if (qrcode_base64 === null) {
      return res.json({
        status: 200,
        message: "QR code is loading",
      });
    }

    return res.json({
      status: 200,
      message: "OK",
      qrcode: qrcode_base64,
    });
  },
};
