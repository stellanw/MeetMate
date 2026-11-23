# MeetMate

**Easy meetups with friends.** MeetMate is a mobile-first web app that lets groups of friends suggest activities, plan them and sign up – without endless back-and-forth in group chats.

## About this project

MeetMate started as the **capstone project of our web development bootcamp** (March – May 2024), built by a team of three:

- [Stellan Wetzig](https://github.com/stellanw) – UI implementation & styling, calendar, activity form (date & time pickers), category colors, navigation, toasts, login page, Zustand state refactor
- Alexander Stracke ([alex96dev](https://github.com/alex96dev)) – friends & friend requests, search, weather, refactoring
- Timur Sakalli ([justincaze](https://github.com/justincaze)) – original app design, filters, user profile, friends page, sorting & hiding expired activities, navigation

The original team repository lives at [alex96dev/MeetMate](https://github.com/alex96dev/MeetMate). This repository contains the full shared history.

**Team work ends at the tag [`team-final`](../../tree/team-final).** Everything after that tag is my own continued development. See [all changes since then](../../compare/team-final...main).

## Features

- Sign in with GitHub
- Create, edit, delete and join activities (name, date, time, location, category, description)
- Color-coded categories: sports, outdoor, food & drinks, culture, party, cozy, other
- Feed of your friends' upcoming activities, sorted by date; expired ones are hidden
- Search and filter by category or author
- "Next activity" highlight and current weather
- Calendar view with all activities per day
- Friends list with fuzzy search, friend requests (send / accept / deny) and removing friends

## Tech stack

Next.js 13 (Pages Router) · React 18 · Styled Components · SWR · Zustand · MongoDB with Mongoose · NextAuth (GitHub provider) · Fuse.js · react-day-picker · Jest & React Testing Library

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your own values
npm run dev
```

You need:

| Variable | Where to get it |
| --- | --- |
| `MONGODB_URI` | A MongoDB database, e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster |
| `GITHUB_ID`, `GITHUB_SECRET` | A [GitHub OAuth App](https://github.com/settings/developers) with callback URL `http://localhost:3000/api/auth/callback/github` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` (or your production URL) |
| `WEATHER_API_KEY` | A free key from [weatherapi.com](https://www.weatherapi.com) |

## Scripts

- `npm run dev` – start the development server
- `npm run build` – build for production
- `npm run start` – start the production server
- `npm run test` – run the tests
- `npm run lint` – run the linter
