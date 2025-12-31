import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Render / local port support
const PORT = process.env.PORT || 3000;

// Middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Health check
server.get("/", (req, res) => {
  res.send("✅ DevFlow-IQ JSON Server is Running");
});

// API routes
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 JSON Server running on port ${PORT}`);
});
