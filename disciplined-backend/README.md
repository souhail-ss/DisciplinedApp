## disciplined app


## Overview
Disciplined App is a simple yet powerful tool designed to help you stay accountable to your daily and weekly goals. Instead of relying on pen and paper, this app allows you to set, track, and manage tasks with ease. It supports recurring daily goals (e.g., "Workout every day") and persistent weekly goals (e.g., "Review finances weekly"), with features like automatic reminders, resets for unfinished daily tasks at midnight (French time), and easy marking as done. The backend is built with NestJS for efficient API management, making it easy to extend or integrate with a frontend.
This README provides clear instructions for setting up, running, and contributing to the app. If you're new to NestJS, it's a Node.js framework for building scalable server-side applications. 


## Features

Goal Creation: Add daily or weekly goals with title, description, and type.
Goal Tracking: Mark goals as done; daily goals are deleted upon completion.
Daily Resets: Unfinished daily goals reset at midnight (Europe/Paris timezone).
Reminders: Hourly console reminders for unfinished daily goals (expandable to notifications).
API Endpoints: Simple REST API for frontend integration.


## Prerequisites

Node.js (v14 or higher)
npm or yarn
Postman (optional, for testing APIs)

## Installation

Clone the repository:
bashgit clone https://[github.com/souhail-ss/DisciplinedApp.git]
cd disciplined-backend

##Install dependencies:
bashnpm install

This sets up NestJS, @nestjs/schedule for cron jobs, and luxon for time handling.



## Running the App
bash# Development mode (with hot-reloading)
npm run start:dev

# Production mode
npm run start:prod

The app runs on http://localhost:3000 by default.
Test with GET http://localhost:3000/goals to see stored goals.

## Usage
Use Postman or a frontend to interact with the API:

Add Goal: POST /goals with body { "title": "Workout", "description": "Daily exercise", "type": "daily" }.
View Goals: GET /goals.
Mark Done: PUT /goals/:id/complete (deletes daily goals).
Reminders and resets run automatically (check console logs).

# Testing
bash# Unit tests
npm run test

# End-to-End tests
npm run test:e2e

# Test coverage
npm run test:cov
Deployment
For production:

# Build the app:
bashnpm run build

Start it:
bashnpm run start:prod


For cloud deployment, consider Heroku or Mau (NestJS's official platform):
bashnpm install -g @nestjs/mau
mau deploy

See NestJS Deployment Docs for more options.

# Contributing

Fork the repository.
Create a branch: git checkout -b feature/new-feature.
Commit changes: git commit -m "Add new feature".
Push to the branch: git push origin feature/new-feature.
Open a Pull Request.

# Resources

NestJS Documentation – Learn more about the framework.
NestJS Courses – Hands-on learning.
NestJS Devtools – Visualize your app graph.

# Support
Nest is MIT-licensed and community-driven. For enterprise help, visit NestJS Enterprise Support.
Stay in Touch

