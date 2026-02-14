
# Game Library Management System

Express REST API that supports CRUD operations for managing games and user collections.   

## Installation & setup


1. Clone project

```bash
git clone https://github.com/HassanAbbud/Emerging-Technologies-Lab-1.git
```
2. Install dependencies

```bash
npm install
```

3. Run the project in a development environment

```bash
npm run dev
```
    
## Environment Variables

To run this project, you will need to add your mongo db name variable to your URI in a .env file and adjust the import in the config.js file. It should look something like:

`MONGODB_URI=Your mongo db key`

For security and authentication you will also need to create a variable named `JWT_SECRET` in a .env file that should be located at root level of the project. It should look something like:

`JWT_SECRET=Your randomly generated jwt secret`





## Authors

- [@HassanAbbud](https://github.com/HassanAbbud)
- [@AndresAcevedo](https://github.com/Andresac90)
- [@XiaoweiXue](https://github.com/XaviXCC)

- Team# 8

