import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import { initializeDatabase } from "./db/databaseConnection";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// tsoa generated routes
RegisterRoutes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8000;

initializeDatabase();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
  console.log(`swagger-ui is running on http://localhost:${port}/api-docs`);
});
