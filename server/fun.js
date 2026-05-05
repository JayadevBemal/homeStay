let sum = 0;
const requesthandler = (req, res) => {
  if (req.url === "/calculation" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => body.push(chunk));
    req.on("end", () => {
      const fullbody = Buffer.concat(body).toString();
      const parsedbody = new URLSearchParams(fullbody);
      const bodyObj = Object.fromEntries(parsedbody);
      const { first, second } = bodyObj;
      const final = Number(first) + Number(second);
      console.log(final);
      sum = final;

      console.log(sum);
      res.statusCode = 302;
      res.setHeader("Location", "/result");
      return res.end();
    });
    return;
  }

  if (req.url === "/result") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(`<h2>sum is ${sum} </h2>`);
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>my calculator</title></head>");
  res.write(
    '<body><form action="/calculation" method="POST"><input type="number" name="first" placeholder="enter the digit"><br><input type="number" name="second" placeholder="enter the second digit"><br><input type="submit" value="sum"></form></body>',
  );
  res.write("</html>");
  return res.end();
};
module.exports = requesthandler;
