---
description: Use when implementing or modifying data mutations, server actions, database writes, or related client and server component code in this app.
---

# Server Action Instructions

- Implement every data mutation through a server action.
- Name server action files `actions.ts` and colocate them with the component that calls them.
- Call server actions from client components.
- Give all server-action inputs explicit TypeScript types. Do not use the `FormData` type.
- Validate every server-action input on the server with Zod.
- Check for an authenticated user before any database operation in every server action.
- Put Drizzle queries in helper functions under `/data`; server actions must call those helpers instead of using Drizzle directly.
