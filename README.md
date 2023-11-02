# NodeJS Remote Control

![GitHub repo size](https://img.shields.io/github/repo-size/bongrip/node-remote-controller)
![GitHub stars](https://img.shields.io/github/stars/bongrip/node-remote-controller)
![GitHub forks](https://img.shields.io/github/forks/bongrip/node-remote-controller)
![GitHub issues](https://img.shields.io/github/issues/bongrip/node-remote-controller)
![GitHub license](https://img.shields.io/github/license/bongrip/node-remote-controller)

NodeJS Remote Control is a simple Discord bot that allows you to remotely control your computer with Discord commands. With this bot, you can perform actions like shutting down your computer, locking your PC, and taking screenshots, all from the comfort of your Discord server.

## Features

- `!shutdown` command to initiate a computer shutdown.
- `!lock` command to lock your PC.
- `!screenshot` command to take a screenshot of your desktop.

## Prerequisites

Before getting started, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Discord.js](https://discord.js.org/)
- [screenshot-desktop](https://www.npmjs.com/package/screenshot-desktop)
- [Jimp](https://www.npmjs.com/package/jimp)

## Add to startup (optional)

- You can do this via PM2,

- [Download PM2](https://www.npmjs.com/package/pm2) (``npm install pm2 -g``)
- [Download the startup PM2 script for Windows](https://www.npmjs.com/package/pm2-windows-startup) (``npm install pm2-windows-startup -g``)

- Run the following,

- ``pm2 start index.js``
- ``pm2 save``
- ``pm2-startup install``
- ``pm2 save``

