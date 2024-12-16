# How to Run the Backend

## Prerequisites

- Node.js (v14 or later) [installation steps](node-install.md)
- npm (v6 or later) (it'll be already installed with Node.js)
- MySQL (v8.2 or later) [installation steps](mysql-install.md)
- Learn how to set up push notifications [firebase and expo setup](push-notification.md)

## Setting Up `nodemon.json` Environment

1. **Create a MySQL Database**:
Create a MySQL database and note down the host, database name, port, username, and password.

2. **Run the database migration**:
Migrate the `database.sql` file. For example, if you have MySQL installed, you can run the following command:

```shell
mysql -u root -p < database.sql
```

3. **Create or Update `nodemon.json`**:
Ensure you have a `nodemon.json` file in for each  root directory of your project. This file should contain the necessary
environment variables for your application.

```json
{
	"watch": [
		"src"
	],
	"ext": "ts,json",
	"exec": "npx ts-node src/index.ts",
	"env": {
		"NODE_ENV": "nodemon",
		"PORT": 3001,
		"HOST": "",
		"DB_DATABASE": "",
		"DB_PORT": "",
		"DB_USER": "",
		"DB_PASSWORD": "",
		"PER_PAGE": 10,
		"SERVICE_REGION": "ap-northeast-1",
		"ACCESS_KEY": "",
		"SECRET_ACCESS_KEY": "",
		"PARENT_POOL_ID": "",
		"PARENT_CLIENT_ID": "",
		"ADMIN_POOL_ID": "",
		"ADMIN_CLIENT_ID": "",
        "SNS_ARN": "",
		"USE_MOCK_COGNITO": "true"
	}
}
```
Example of `nodemon.json` file:

```json
{
  "watch": [
    "src"
  ],
  "ext": "ts,json",
  "exec": "npx ts-node src/index.ts",
  "env": {
    "NODE_ENV": "nodemon",
    "PORT": 3000,
    "HOST": "localhost",
    "DB_DATABASE": "Parents",
    "DB_PORT": "3306",
    "DB_USER": "root",
    "DB_PASSWORD": "password",
    "PER_PAGE": 10,
    "SERVICE_REGION": "ap-northeast-1",
    "ACCESS_KEY": "access_key",
    "SECRET_ACCESS_KEY": "secret_access_key",
    "PARENT_POOL_ID": "parent_pool_id",
    "PARENT_CLIENT_ID": "parent_client_id",
    "ADMIN_POOL_ID": "admin_pool_id",
    "ADMIN_CLIENT_ID": "admin_client_id",
        "SNS_ARN": "sns_arn",
    "USE_MOCK_COGNITO": "true"
  }
}
```
**Warning**: You can use single nodemon.json files for both admin-panel-backend and mobile-backend, but use different PORTS for admin-panel-backend and mobile-backend.
Best practice is to use 3000 for admin-panel-backend and 3002 for mobile-backend.

4. **Environment "Variables"**:

- `PORT`: The port number on which the server will run.
- `HOST`: The host of the MySQL database.
- `DB_DATABASE`: The name of the MySQL database.
- `DB_PORT`: The port of the MySQL database.
- `DB_USER`: The username of the MySQL database.
- `DB_PASSWORD`: The password of the MySQL database.
- `PER_PAGE`: The number of items to display per page.
- `SERVICE_REGION`: The region of the AWS service.
- `ACCESS_KEY`: The access key of the AWS service.
- `SECRET_ACCESS_KEY`: The secret access key of the AWS service.
- `PARENT_POOL_ID`: The pool ID of the parent user.
- `PARENT_CLIENT_ID`: The client ID of the parent user.
- `ADMIN_POOL_ID`: The pool ID of the admin user.
- `ADMIN_CLIENT_ID`: The client ID of the admin user.
- `SNS_ARN`: The ARN of the SNS topic.
- `USE_MOCK_COGNITO`: Whatever hasn't aws services to use mock cognito. **true** or **false** in string.

5. **Install Dependencies**: Run the following command to install the required dependencies:

```shell
npm install
```

6. **Run the Server**:
Run the following command to start the server:
For admin-panel-backend:
```shell
npm run 'admin dev'
```
For mobile-backend:
```shell
npm run 'mobile dev'
```

7. **Login Credentials**:
Use the following credentials to log in to admin panel:

  - **Email**: `admin@gmail.com`
  - **Password**: `password`

Use the following credentials to log in to the mobile app:

  - **Email**: `parent@gmail.com`
  - **Password**: `password`
