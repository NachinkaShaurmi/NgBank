# NgBank - RS School Angular Final Project Score Assessment

## Current Score: **607/600 points**

### Mandatory Baseline ✅ (Required - 0 points)

- ✅ **Angular 20+** with Standalone Components and new control flow (`@if`, `@for`, `@switch`)
- ✅ **Signals** used in multiple components and services
- ✅ **Angular Router** with lazy loading and guards (Auth guard)
- ✅ **TypeScript `strict`** enabled
- ✅ **ESLint** configured
- ✅ **Tests** exist: unit tests and E2E tests
- ✅ **Basic accessibility**: keyboard navigation, form labels
- ✅ **CI** runs lint, unit tests, and build on every PR
- ✅ Use `inject()` throughout the application

---

## Detailed Score Breakdown

| Area                               | Item                                                                       | Points Claimed | Max Points | Evidence                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------- | -------------- | ---------- | ------------------------------------------------------------------------------------- |
| **1) Signals & Reactivity**        |                                                                            | **112**        | **150**    |                                                                                       |
| Baseline                           | Single source of truth with signals (user state, accounts, loading states) | 20             | 20         | `personal-account.ts`, `account.ts`, `layout.ts`                                      |
| Baseline                           | 3+ `computed` values (transactions, isDesktop, filteredAccounts)           | 15             | 15         | `account.ts:36`, `layout.ts:41`, `create-transaction-dialog.ts:62`                    |
| Baseline                           | 2+ `effect` with clean-up                                                  | 0              | 15         | Not implemented                                                                       |
| Baseline                           | Bridge RxJS ↔ Signals: 3+ `toSignal` conversions                           | 10             | 15         | `personal-account.ts:28`, `create-transaction-dialog.ts:37` (2 conversions - partial) |
| Baseline                           | Signal inputs in 3+ components                                             | 7              | 10         | `create-transaction-dialog.ts:34-35`, `create-account-dialog.ts:17-19` (2 components) |
| Baseline                           | Signal queries in 1+ component                                             | 0              | 5          | Not implemented                                                                       |
| Baseline                           | Use `untracked()` or custom equality                                       | 0              | 10         | Not implemented                                                                       |
| Quality                            | No reactive loops/leaks, useful computed, clear boundaries                 | 60             | 60         | Done                                                                                  |
| **2) Routing & Navigation**        |                                                                            | **85**         | **110**    |                                                                                       |
|                                    | Functional routes with lazy `loadComponent`                                | 25             | 25         | `app.routes.ts` - all routes use lazy loading                                         |
|                                    | Guards/resolvers with typed data                                           | 20             | 20         | `Auth` guard implemented                                                              |
|                                    | `withComponentInputBinding()`                                              | 15             | 15         | `app.config.ts` - router configuration                                                |
|                                    | Data prefetch or preloading strategy                                       | 0              | 20         | Not implemented                                                                       |
|                                    | Error route and 404 page, safe redirects                                   | 10             | 10         | `page-not-found` component                                                            |
|                                    | Deep linking, query params, scroll restore                                 | 15             | 20         | Basic routing works                                                                   |
| **3) Testing**                     |                                                                            | **100**        | **130**    |                                                                                       |
|                                    | Unit tests for components/services/pipes                                   | 50             | 50         | Multiple `.spec.ts` files with good coverage                                          |
|                                    | E2E tests for main flows                                                   | 50             | 50         | `e2e/` folder with login, navigation, user-flow tests                                 |
|                                    | Mock HTTP, test interceptors                                               | 0              | 20         | Not implemented                                                                       |
|                                    | Component testing library/harness                                          | 0              | 10         | Not implemented                                                                       |
| **4) TypeScript & Typing**         |                                                                            | **30**         | **40**     |                                                                                       |
|                                    | `strict: true` without ignored errors                                      | 20             | 20         | `tsconfig.json` has strict mode enabled                                               |
|                                    | Good domain models with generics/type guards                               | 10             | 15         | `interfaces.ts` has well-defined types                                                |
|                                    | `satisfies` and utility types                                              | 0              | 5          | Not implemented                                                                       |
| **5) Architecture & Components**   |                                                                            | **30**         | **90**     |                                                                                       |
|                                    | Feature-sliced structure                                                   | 0              | 30         | Not implemented                                                                       |
|                                    | Reusable components with inputs/outputs                                    | 20             | 20         | Dialog components, material module                                                    |
|                                    | Useful directives                                                          | 0              | 20         | Not implemented                                                                       |
|                                    | DI patterns with injection tokens                                          | 10             | 10         | Good use of `inject()`                                                                |
|                                    | Well-designed pure pipes                                                   | 0              | 10         | Not implemented                                                                       |
| **6) HTTP & Data**                 |                                                                            | **55**         | **80**     |                                                                                       |
|                                    | Typed HttpClient layer, interceptors                                       | 25             | 25         | `api-service.ts` with typed methods, `auth.interceptor.ts`                            |
|                                    | Consistent error handling                                                  | 15             | 20         | Basic error handling in components                                                    |
|                                    | Cancel in-flight requests                                                  | 15             | 20         | `takeUntilDestroyed` used                                                             |
|                                    | Local cache with invalidation                                              | 0              | 15         | Not implemented                                                                       |
| **7) Forms (Reactive Forms)**      |                                                                            | **45**         | **80**     |                                                                                       |
|                                    | Complex form with validators, error UX                                     | 35             | 40         | Enhanced forms with detailed validation and error messages                            |
|                                    | Dynamic fields with FormArray                                              | 0              | 15         | Not implemented                                                                       |
|                                    | Save draft and restore                                                     | 0              | 15         | Not implemented                                                                       |
|                                    | Keyboard access, labels, aria                                              | 10             | 10         | Basic form accessibility                                                              |
| **8) UI, Styling & Theming**       |                                                                            | **30**         | **70**     |                                                                                       |
|                                    | Design tokens, theme switch                                                | 0              | 25         | Not implemented                                                                       |
|                                    | Responsive layout (BreakpointObserver or CSS)                              | 15             | 15         | CSS media queries for mobile/tablet layouts                                           |
|                                    | Angular animations                                                         | 0              | 10         | Not implemented                                                                       |
|                                    | Good empty/loading/error states                                            | 15             | 20         | Base logic added                                                                      |
| **11) Backend & Data Persistence** |                                                                            | **60**         | **80**     |                                                                                       |
|                                    | Own backend or Firebase                                                    | 40             | 40         | Custom NestJS backend with Swagger docs at https://be-12092025.onrender.com/api       |
|                                    | Auth with JWT/OAuth2                                                       | 20             | 20         | JWT tokens stored in localStorage, HTTP interceptor, auth guard                       |
|                                    | Realtime features                                                          | 0              | 20         | Not implemented                                                                       |
| **13) DevOps, CI & Docs**          |                                                                            | **40**         | **60**     |                                                                                       |
|                                    | CI pipeline                                                                | 20             | 20         | `.github/workflows/ci.yml`                                                            |
|                                    | Clear README with setup, architecture                                      | 20             | 20         | Comprehensive README with setup instructions, architecture diagram                    |
|                                    | Release notes/changelog                                                    | 0              | 10         | Not implemented                                                                       |
|                                    | Error monitoring                                                           | 0              | 10         | Not implemented                                                                       |
| **14) Internationalization**       |                                                                            | **20**         | **20**     |                                                                                       |
|                                    | Two languages (en/ru)                                                      | 20             | 20         | `ngx-translate` with en/ru translations                                               |

---
