# Authentication Instructions

- Use Clerk for all authentication and user session management. Do not add or use any other authentication method.
- Protect `/dashboard` so only authenticated users can access it; unauthenticated users must be sent through Clerk sign-in.
- Redirect authenticated users who visit `/` to `/dashboard`.
- Clerk sign-in and sign-out flows must always open as modals. Use Clerk's modal-capable components or APIs and do not implement standalone auth pages or custom auth flows.
- Keep authentication checks and authorization decisions aligned with Clerk's server-side APIs where route protection or user-owned data is involved.
