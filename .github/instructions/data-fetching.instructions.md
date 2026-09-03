---
description: Read this to understand how to fetch data from the database.
---
# This document outlines best practices for fetching data from the database in this project. It is important to follow these guidelines to ensure efficient and secure data retrieval.

## 1. Use Server Components for Data Fetching

In Next.js, server components are the recommended way to fetch data from the database. Server components allow you to fetch data on the server side, which can improve performance and reduce the amount of data sent to the client.

## 2. Data fetching methods

ALWAYS use the helper functions in the /data directory to fetch data.  NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database instructions.
