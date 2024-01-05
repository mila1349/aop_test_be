#!/bin/bash

# Run migrations
echo "Running migrations..."
yarn knex migrate:latest

# Run seeders
echo "Running seeders..."
yarn knex seed:run

echo "Migration and seeding complete."
