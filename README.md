# Kanban Web Application

[![View Live - Demo](https://img.shields.io/badge/View_Live-Demo-2ea44f)](https://kanban-app-leonseet.vercel.app/)

An open source Kanban-style project management application, taking advantage of modern web technologies such as Next.js 13, Tailwind CSS, and PostgreSQL.

## About this project

This project serves as an exploration into modern web application built using Next.js 13. Complete with features like OAuth authentication, interactive drag-n-drop interface, and data persistency.

## Features

- Interactive drag-n-drop interface using **dnd-kit**
- Kanban tasks ordering based on **LexoRank** algorithm
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **Vercel**
- UI styling with **Tailwind CSS**
- UI components using **Radix UI**
- Validations using **Zod**
- Deployed on **Vercel**
- Written in **TypeScript**

## Running Locally

1. Install dependencies using npm:
    ```sh
    npm install
    ```
2. Update `.env.example` and copy to `.env` to bootstrap variables.
    ```sh
    cp .env.example .env
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

<!-- ## License

Licensed under the [MIT license](https://github.com/YourGithubHandle/kanban-app/blob/main/LICENSE.md). -->
