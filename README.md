# SudoBot v2

This is a Discord bot that manages communities. It was written for the [sudo.gay](https://sudo.gay/) Discord community.

## Installation (for production)

### Installation pre-requisites

### Create a Discord application and Bot

TODO

### Invite the bot to your server

TODO

### Installation

- Create an .env file using the .env-prod-example as a template
- Substitute the DISCORD_SECRET and BASE_URL for your installation
- Start sudobot

```
cp .env-prod-example .env
# Edit the .env file as required
docker compose pull
docker compose up -d
```

### Login and set up your bot to be useful

TODO - SudoBot has just enough information to connect itself to your server. From there, you need to use the
web interface to set up the features of SudoBot to do things.

## Development

The project is under the MIT open source license. We would welcome contributions and feedback from the community.

Please read the CONTRIBUTING.md file for more information on contributor guidelines. The rest of this
section will be to stand up your own development environment.

First step - follow the instructions above to create your own Discord application and bot. 

Specifically you will need the following environment variables ready to use in your development .env file

```
DISCORD_SECRET=xxx
TODO
```

The start development, simply run these commands. They will build the docker image and stand up a development
environment for you to view on http://localhost:3000

```
docker compose -f docker-compose-dev.yml build
docker compose -f docker-compose-dev.yml up -d
docker compose logs -f
```

### Before committing and creating a pull request

We have a pre-commit hook to run the necessary linters, test suite and coverage checks. You should install
the *pre-commit* file so this file is run on every commit to ensure clean code.
