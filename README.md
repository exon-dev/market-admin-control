# Market Admin Control

A market administration system with authentication and profile management features using Supabase as the backend.

## Features

- User authentication (Sign up, Sign in, Sign out)
- User profile management
- Role-based access (Customer and Vendor roles)
- Secure data handling with Supabase

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Supabase project at [https://supabase.com](https://supabase.com)
4. Create a `profiles` table in your Supabase database with the following schema:

   - `id`: uuid (primary key, references auth.users.id)
   - `username`: text
   - `full_name`: text
   - `avatar_url`: text
   - `email`: text
   - `phone`: text
   - `bio`: text
   - `created_at`: timestamp with time zone
   - `updated_at`: timestamp with time zone
   - `role`: text
   - `status`: text
   - `store_name`: text

5. Create a `.env` file in the root directory with your Supabase credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_PUBLIC_ANON_KEY=your_supabase_anon_key_here
   ```

6. Run the development server:
   ```
   npm run dev
   ```

## Authentication Flow

1. **Sign Up**: New users can register with email and password. A profile will be created automatically.
2. **Sign In**: Existing users can log in with their credentials.
3. **Profile Management**: Users can view and edit their profile information.
4. **Sign Out**: Users can log out of their account.

## Tech Stack

- React
- TypeScript
- TanStack Query (React Query)
- Supabase (Authentication and Database)
- React Router
- Tailwind CSS

## Project Structure

- `/src/components`: UI components
  - `/auth`: Authentication-related components
  - `/profile`: Profile-related components
- `/src/contexts`: React contexts
  - `AuthContext.tsx`: Authentication state management
- `/src/hooks`: Custom React hooks
  - `/mutations`: TanStack Query mutations
  - `/queries`: TanStack Query queries
- `/src/lib`: Utility functions and libraries
  - `supabase.ts`: Supabase client configuration
  - `auth.ts`: Authentication service functions
- `/src/pages`: Application pages
- `/src/types`: TypeScript type definitions

## License

MIT
