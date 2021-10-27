const path = require("path");
const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === "/" && method === "GET") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, "OK", { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
    }
  })
  .listen(3000, () => {
    console.log("App running on http://localhost:3000");
  });
