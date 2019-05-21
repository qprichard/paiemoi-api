# paiemoi-api
a node api for a tricount like application

# Installation

1. database installation

Using mongodb:
[Documentation](https://docs.mongodb.com/v3.6/tutorial/install-mongodb-on-debian/)

- `wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-<mongo-version>.tgz`
- `tar xfz mongodb-linux-x86_64-<mongo-version>.tgz`
- `export PATH=`pwd`/mongodb-linux-x86_64-<mongo-version>/bin:$PATH`
- `mkdir -p <db_path>` (or path where you wants to create you db)

Start mongo:
- `mongod --dbpath <db_path> --port <port> &`

Create a your mongo user on your database
- `mongo <db_name> --eval 'db.createUser({user:"<username>", pwd:"<password>", roles:["readWrite"]});'`

optional:
- `sudo service mongod stop`
- `sudo service mongod start --dbpath <db_path> --port <port> --auth`

2. application installation

Using node v12.2.0: `npm i`

- dev watch: `npm run watch`
- dev: `npm start`
- test: `npm test`
