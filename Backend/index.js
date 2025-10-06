import dotenv from "dotenv";
// Importing the 'app' named export using destructuring {}
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
