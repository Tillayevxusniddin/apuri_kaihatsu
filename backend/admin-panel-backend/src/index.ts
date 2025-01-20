import process from "node:process";
import serverless from "serverless-http";

import App from './utils/app';

import AuthController from './routes/auth'
import StudentController from './routes/student'
import ParentController from './routes/parent'
import PostController from './routes/post'
import AdminController from './routes/admin'
import GroupController from './routes/group'
import FormController from './routes/form'
// import SettingsController from './routes/settings'
// import ImageController from './routes/images'
import ImageController from './routes/introduction'
import MediaController from "./routes/card";

console.log('starting app');

const app = new App([
    new AuthController(),
    new StudentController(),
    new ParentController(),
    new PostController(),
    new AdminController(),
    new GroupController(),
    new FormController(),
    new ImageController(),
    new MediaController(),
]);

export const handler: serverless.Handler = serverless(app.listen());