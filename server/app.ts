import redisClient from "./Server/database/redis";
import app from "./index";

app.listen(process.env.PORT, () => {
  redisClient.connect()
  console.log(`App listening on port ${process.env.PORT}!`);
});

