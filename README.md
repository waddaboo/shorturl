# Shorturl

Shorturl is a lightweight, TypeScript-powered URL shortener that helps you take control of your links. Shorten those cumbersome addresses into short links, perfect for sharing on social media, emails, or anywhere else space is precious.

## Key Features

- **Shorten long URLs**: Instantly generate shorter, easily shareable versions of your links.
- **Track visits**: See how many times your shortened URLs has been clicked, together with the information of where the clicks originated from.

## Built with:

- **TypeScript**: Ensure strong typing and static code analysis for a robust and reliable service.
- **Express.js**: Provides a powerful backend for managing shortened URLs and tracking visits.
- **PostgreSQL**: Handles data storage and persistence for your shortened URLs and statistics.

## Getting Started

1. Clone the repository:

```
git clone https://github.com/waddaboo/shorturl.git
```

2. Install dependencies:

```
npm install
```

3. Create your own .env.local file based on .env.sample file or follow the configuration below:

```
NODE_ENV=local
SERVER_PORT=8080
DATABASE_URL="{YOUR_POSTGRESQL_DATABASE_URL}"
```

4. Run the project in local/development:

```
npm run local
```

## API Documentation

For detailed instructions on specific API usage, please refer to the link [here](https://documenter.getpostman.com/view/15205486/2s9Ykn92ZV)

## Database

This project uses Prisma as ORM framework for PostgreSQL. Developers can use the commands below to configure their database.

- Initialize Prisma

```
npm run db:init:local
```

- Update Prisma. A migration script will be generated if there's any changes to the schema.

```
npm run db:update:local
```

- Migration. Apply the changes to the database based on the migration script generated from the step above.

```
npm run db:migrate:local
```

- Reset database. Note this will drop all entries in the database. Please exercise caution when using this command.

```
npm run db:reset:local
```

#### Hope you find Shorturl a valuable tool for managing your URLs. Happy shortening!
