import http from "http";
import fs from "fs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "6O]s77VY^MO@61mQNW%M%zfsy=nQ{bp5]$Ll'A|";

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello Apache!\n");

      return;
    }

    if (req.method === "POST") {
      if (req.url === "/login") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            body = JSON.parse(body);

            // handle a login attempt

              // Read and parse the users.txt file
              const users = fs.readFileSync('./users.txt', 'utf8')
                  .trim()
                  .split('\n')
                  .map(line => {
                      const [id, username, password, role] = line.split(',');
                      return { id, username, password, role };
                  });

// Find the user
              const user = users.find(u => u.username === body.username);

              if (!user) {
                  res.writeHead(404, { "Content-Type": "text/plain" });
                  res.end(`${body.username} not found\n`);
                  return;
              }

              if (user.password !== body.password) {
                  res.writeHead(401, { "Content-Type": "text/plain" });
                  res.end("Invalid password\n");
                  return;
              }

              // Generate JWT token
              const token = jwt.sign(
                  { userId: user.id, role: user.role },
                  JWT_SECRET,
                  { expiresIn: '1h' }
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ accessToken: token }));

            // https://www.npmjs.com/package/jsonwebtoken
          } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server error\n");
          }
        });
      }

      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found\n");
  })
  .listen(8000);

console.log("listening on port 8000");
