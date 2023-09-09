import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routesAPIV1 from "./routes/api";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", routesAPIV1);

app.listen(port, () => console.log(`Application is running on ${port}!`));

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " Reason: ", reason);
});