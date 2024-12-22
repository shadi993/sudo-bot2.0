#!/bin/bash

# Fail on any error
set -e

# Check if PostgreSQL is available
if [ "$POSTGRES_HOST" ] && [ "$POSTGRES_PORT" ]; then
  echo "Waiting for PostgreSQL to be available..."
  until nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 1
  done
  echo "PostgreSQL is up!"
fi

# Check if Redis is available
if [ "$REDIS_HOST" ] && [ "$REDIS_PORT" ]; then
  echo "Waiting for Redis to be available..."
  until nc -z "$REDIS_HOST" "$REDIS_PORT"; do
    echo "Redis is unavailable - sleeping"
    sleep 1
  done
  echo "Redis is up!"
fi

# Run the command provided to the container
exec "$@"
