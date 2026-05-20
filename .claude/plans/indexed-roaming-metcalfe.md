# Migrate from SWR to Hybrid Server Components + Server Actions

## Overview

Migrate from client-side SWR data fetching to a hybrid approach using Server Components for initial data loads, Server Actions for mutations with cache revalidation, and removing unnecessary API routes. This follows Next.js 15 best practices.

## Current Architecture

- Root layout wraps app in `SWRConfig` with fallback data
- Client components use `useSWR('/api/user')` and `useSWR('/api/team')`
- API routes at `/api/user` and `/api/team` serve JSON
- Mutations call `mutate()` to refresh SWR cache

## Target Architecture

- Server Components fetch data directly via `getUser()` and `getTeamForUser()`
- Props passed down to client components
- Server Actions include `revalidatePath()` for cache invalidation
- No API routes needed (except Stripe webhooks)
- SWR removed entirely

## Benefits

- Simpler architecture (no SWR config, no API routes, no client fetching)
- Better TypeScript safety (direct function calls vs HTTP)
- Smaller client bundle (remove SWR dependency)
- Better SEO (server-rendered data)
- Automatic request deduplication via Next.js
- Faster initial page loads

## Implementation Plan

### Phase 1: Convert Dashboard Layout to Server Component

**Goal:** Fetch user data in layout, pass to header components

**Files to modify:**

1. `app/(dashboard)/dashboard/layout.tsx`
   - Convert from "use client" to Server Component
   - Add `async` and fetch user data: `const user = await getUser()`
   - Render new `DashboardClientLayout` wrapper (client component)
   - Pass user prop down

2. Create `app/(dashboard)/dashboard/dashboard-client-layout.tsx` (already created)
   - Client component wrapper for SidebarProvider
   - Accepts `user` prop and `children`
   - Renders AppSidebar, DashboardHeader with user prop

3. `app/(dashboard)/dashboard-header.tsx`
   - Update to accept `user` prop: `export function DashboardHeader({ user }: { user: User | null })`
   - Pass user prop to UserMenu
   - Keep as client component (needs SidebarTrigger interactivity)

4. `components/user-menu.tsx`
   - Remove `useSWR` hook and fetcher
   - Update signature: `export function UserMenu({ user }: { user: User | null })`
   - Remove `mutate('/api/user')` call from handleSignOut
   - Keep client component (dropdown interactivity needed)

**Data flow:**

```
layout.tsx (SERVER) → fetch user
  ↓ prop
dashboard-client-layout.tsx (CLIENT) → SidebarProvider context
  ↓ prop
dashboard-header.tsx (CLIENT) → SidebarTrigger
  ↓ prop
user-menu.tsx (CLIENT) → dropdown menu
```

### Phase 2: Convert Dashboard Page to Server Component

**Goal:** Fetch team data once in page, pass to child components

**Files to modify:**

1. `app/(dashboard)/dashboard/page.tsx`
   - Convert to Server Component (remove "use client")
   - Add `async` and fetch both user and team:
     ```ts
     const user = await getUser();
     const teamData = await getTeamForUser();
     ```
   - Extract client components to separate file
   - Render client components with props

2. Create `app/(dashboard)/dashboard/page-client.tsx`
   - Move `ManageSubscription`, `TeamMembers`, `InviteTeamMember` here
   - Update each to accept props instead of using `useSWR`:
     - `ManageSubscription({ teamData })`
     - `TeamMembers({ teamData, user })`
     - `InviteTeamMember({ user, teamData })`
   - Remove all `useSWR` hooks and fetcher
   - Keep as client components (forms, interactivity)

**Data flow:**

```
page.tsx (SERVER) → fetch user + team
  ↓ props
page-client.tsx (CLIENT) → forms and interactive UI
```

### Phase 3: Convert General Settings Page

**Goal:** Fetch user data in page, pass to form component

**Files to modify:**

1. `app/(dashboard)/dashboard/general/page.tsx`
   - Convert to Server Component (remove "use client")
   - Add `async` and fetch user: `const user = await getUser()`
   - Extract form to client component
   - Render `AccountFormClient` with user prop

2. Create `app/(dashboard)/dashboard/general/account-form.tsx`
   - Move form logic from page
   - Update to accept user prop
   - Remove `useSWR` hook
   - Keep as client component (form interactivity)

### Phase 4: Add Cache Revalidation to Server Actions

**Goal:** Invalidate Next.js cache after mutations

**File to modify:** `app/(auth)/actions.ts`

Add import at top:

```ts
import { revalidatePath } from 'next/cache';
```

Update these Server Actions:

1. **signOut** - Clear all caches:

   ```ts
   revalidatePath('/', 'layout'); // Revalidate entire app
   ```

2. **updateAccount** - Refresh user data:

   ```ts
   revalidatePath('/dashboard/general');
   revalidatePath('/dashboard', 'layout'); // Refresh header
   ```

3. **updatePassword** - Refresh security page:

   ```ts
   revalidatePath('/dashboard/security');
   ```

4. **removeTeamMember** - Refresh team data:

   ```ts
   revalidatePath('/dashboard');
   ```

5. **inviteTeamMember** - Refresh team data:
   ```ts
   revalidatePath('/dashboard');
   ```

### Phase 5: Remove SWR Infrastructure

**Goal:** Clean up unused SWR code

**Files to modify:**

1. `app/layout.tsx`
   - Remove `SWRConfig` import and wrapper
   - Remove fallback data (no longer needed)
   - Keep ThemeProvider

2. **Delete these files:**
   - `app/api/user/route.ts` (no longer needed)
   - `app/api/team/route.ts` (no longer needed)

3. `package.json` (optional)
   - Remove `swr` dependency
   - Run `pnpm remove swr`

## Migration Sequence (Recommended Order)

Execute in this order to minimize risk:

1. **Phase 4 first** - Add revalidatePath to Server Actions
   - Low risk, can be tested alongside SWR
   - Ensures cache invalidation works before removing SWR

2. **Phase 3** - Convert General Settings (simplest)
   - Single page, single component
   - Good proof of concept

3. **Phase 2** - Convert Dashboard Page
   - Most complex, multiple components
   - Test thoroughly

4. **Phase 1** - Convert Dashboard Layout + Header
   - Affects all dashboard pages
   - Test across all routes

5. **Phase 5** - Remove SWR infrastructure
   - Final cleanup after everything works

## Critical Files

**Must modify (9 files):**

- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/layout.tsx`
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/dashboard-client-layout.tsx` (create)
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard-header.tsx`
- `/Users/jasonhwang/src/base/saas-starter/components/user-menu.tsx`
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/page.tsx`
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/page-client.tsx` (create)
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/general/page.tsx`
- `/Users/jasonhwang/src/base/saas-starter/app/(dashboard)/dashboard/general/account-form.tsx` (create)
- `/Users/jasonhwang/src/base/saas-starter/app/(auth)/actions.ts`

**Cleanup (3 files):**

- `/Users/jasonhwang/src/base/saas-starter/app/layout.tsx`
- `/Users/jasonhwang/src/base/saas-starter/app/api/user/route.ts` (delete)
- `/Users/jasonhwang/src/base/saas-starter/app/api/team/route.ts` (delete)

## Potential Issues & Solutions

### Issue 1: Client Component Boundaries

**Problem:** Can't nest Server Component inside Client Component

**Solution:** Use wrapper pattern

- Layout (Server) → fetches data
- ClientLayout (Client) → provides context
- Child pages (Server) → render with data

### Issue 2: Parallel Data Fetching

**Problem:** Sequential fetches slow down page load

**Solution:** Use Promise.all() when fetching multiple independent data:

```ts
const [user, teamData] = await Promise.all([getUser(), getTeamForUser()]);
```

### Issue 3: Form State During Mutations

**Problem:** Need loading/error states

**Solution:** Already using `useActionState` - keep this pattern

### Issue 4: Suspense and Loading States

**Problem:** Server Components suspend during data fetching

**Solution:** Add Suspense boundaries with skeleton fallbacks:

```tsx
<Suspense fallback={<DashboardSkeleton />}>
  <DashboardPage />
</Suspense>
```

## Verification Steps

After each phase, verify:

1. **User data loads correctly**
   - Avatar shows in header
   - User menu displays email
   - Sign out works and redirects

2. **Team data loads correctly**
   - Team members list displays
   - Subscription info shows
   - Invite form appears for owners

3. **Mutations work**
   - Update account → data refreshes
   - Add team member → list updates
   - Remove team member → list updates
   - Change password → success message

4. **Performance**
   - Initial page load is fast
   - No waterfall requests
   - Check Network tab for reduced API calls

5. **No regressions**
   - Dark mode toggle still works
   - Sidebar toggle works
   - All navigation works
   - Forms submit correctly

## Testing Checklist

- [ ] Phase 4: Test revalidatePath calls work
- [ ] Phase 3: General settings page loads and form works
- [ ] Phase 2: Dashboard page shows team members and subscription
- [ ] Phase 1: Header shows user avatar across all pages
- [ ] Phase 5: App works without SWR or API routes
- [ ] Sign out clears data and redirects
- [ ] Update account refreshes header
- [ ] Invite team member refreshes list
- [ ] Remove team member refreshes list
- [ ] Change password shows success
- [ ] All pages load without errors
- [ ] Network tab shows no /api/user or /api/team calls

## Rollback Plan

If issues arise, rollback is simple:

1. Revert commits in reverse order
2. Each phase is independent
3. SWR can coexist during migration (both patterns work simultaneously)

## Why This Is Best Practice

This hybrid approach is recommended by:

- **Next.js documentation** - Server Components as default
- **Vercel** - "Server-first" data fetching
- **React team** - Server Components for data fetching
- **SWR maintainers** - Acknowledge Server Components reduce need

Benefits over pure SWR:

- Less client-side JavaScript
- Better SEO and initial load
- Simpler architecture
- Type-safe server-to-client data flow
