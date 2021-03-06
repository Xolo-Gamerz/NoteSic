import Fastify, { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import "dotenv/config";
const server = Fastify({
  ajv:{
    customOptions: {
      jsonPointers: true,
      allErrors: true
    },
    plugins:[
      require("ajv-errors")
    ]
  }
});
import HomeRoute from "./routes/Home";
import LoginRoute from "./routes/auth/Login";
import RegisterRoute from "./routes/auth/Register";
import VerifyRoute from "./routes/auth/Verify";
import createNoteRoute from "./routes/notes/createNote";
import updateNoteRoute from "./routes/notes/updateNote";
import deleteNoteRoute from "./routes/notes/deleteNote";
import getAllNoteRoute from "./routes/notes/getAllNote";
const registerPlugin = (plugin: FastifyPluginAsync) => {
  server.register(plugin);
};
registerPlugin(HomeRoute);
registerPlugin(LoginRoute);
registerPlugin(RegisterRoute);
registerPlugin(VerifyRoute)
registerPlugin(createNoteRoute)
registerPlugin(updateNoteRoute)
registerPlugin(deleteNoteRoute)
registerPlugin(getAllNoteRoute)
const connecToMongo = async (token: string) => {
  try {
    await mongoose.connect(token);
    console.log(`Connected to MongoDb`);
  } catch (error) {
    console.log(error);
  }
};
connecToMongo(process.env.TOKEN);
server.listen(process.env.PORT, (err, adress): void => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${adress}`);
});
