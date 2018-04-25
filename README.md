For app and tests to work you must create the file /server/config/config.json with data like
{
  "test": {
    "PORT": X,
    "MONGODB_URI": "mongodb://localhost:27017/XTest",
    "JWT_SECRET": "X"
  },
  "development": {
    "PORT": X,
    "MONGODB_URI": "mongodb://localhost:27017/X",
    "JWT_SECRET": "X"
  }
}