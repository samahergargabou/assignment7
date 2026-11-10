#  Online Shop — Assignment 7

A multi-page React application demonstrating client-side routing, modular state management, custom hooks, and offline persistence.

---

## 📁 Project Structure

```text
/assignment7
 ├─ src/
 │   ├─ api/
 │   │   ├─ productsApi.js       # Native fetch calls with AbortSignal support
 │   │   └─ authApi.js           # Mock authentication with simulated network delay
 │   ├─ hooks/
 │   │   ├─ useFetch.js          # Async data fetching state machine via useReducer
 │   │   └─ useLocalStorage.js   # Local storage synchronization hook
 │   ├─ context/
 │   │   └─ AuthContext.jsx      # Global authentication provider and safe useAuth hook
 │   ├─ store/
 │   │   └─ cartStore.js         # Zustand store with out-of-React persistence
 │   ├─ components/
 │   │   ├─ Layout.jsx           # App shell with dynamic theme styling and Outlet
 │   │   ├─ NavBar.jsx           # NavLink routing, cart badge, and theme switch
 │   │   ├─ ProductCard.jsx      # Individual product preview component
 │   │   └─ ProtectedRoute.jsx   # UX redirect guard for authenticated views
 │   ├─ pages/
 │   │   ├─ Home.jsx             # Landing view
 │   │   ├─ ProductList.jsx      # Product catalogue with URL-driven filtering
 │   │   ├─ ProductDetail.jsx    # Single product view reading URL params
 │   │   ├─ Cart.jsx             # Shopping cart with total calculations
 │   │   ├─ Login.jsx            # Controlled credentials form with redirect history
 │   │   └─ NotFound.jsx         # Catch-all 404 page
 │   ├─ App.jsx                  # Route definitions and nested route hierarchy
 │   └─ main.jsx                 # React root and BrowserRouter wrapper
 ├─ index.html
 └─ package.json



## Reasoning Questions (Section 10)

### 1. State Choices
- **Signed-in user (`AuthContext` + `useReducer`):** Kept in Context because authentication status is global application metadata that changes infrequently (only on login/logout), making broad Context distribution optimal.
- **Cart (`cartStore.js` with Zustand):** Managed in an external Zustand store because cart actions occur frequently across many components; Zustand prevents excessive tree re-renders via fine-grained selectors.
- **Filter values (`useSearchParams`):** Stored in the URL search query string so that active searches and categories are bookmarkable, shareable via link, and preserved on refresh.
- **Product list (`useFetch`):** Kept as local component state driven by an async lifecycle hook since it represents fetched server data relevant only to the product view.
- **Theme (`useLocalStorage`):** Kept in local component/hook state synced with `localStorage` so user aesthetic preferences persist across browser sessions.

### 2. Context versus Store
The user session is in Context because login/logout triggers rare, application-wide updates where re-rendering the app shell is expected. In contrast, the cart changes frequently (quantities, item additions, removals); placing the cart in standard Context would trigger re-renders across all consumer components on every small quantity change. Zustand allows individual components (like the NavBar item counter) to subscribe only to specific slices of state.

### 3. Custom Hooks
`useFetch` shares the asynchronous loading logic, state transition machine (`useReducer`), and cleanup/cancellation mechanisms (`AbortController`) between `ProductList` and `ProductDetail`. It deliberately does *not* share the cached data itself; each component maintains an independent state instance for its own query lifecycle.

### 4. Route Parameters
The `id` parameter read from `useParams()` is always a `string`. This matters when fetching or comparing against API data where IDs might be numbers, requiring explicit type conversion or string-safe matching.

### 5. Protected Routes
Client-side protection in `ProtectedRoute` is purely a user-experience mechanism that hides or redirects UI views in the browser; it is not security because all client-side JavaScript code can be inspected, manipulated, or bypassed. Real security requires backend enforcement where API endpoints validate credentials, session cookies, or JWT tokens on every protected request.

### 6. Deep Links
On a plain static file server, refreshing a client-side route like `/products/3` causes the server to search for a physical file named `/products/3/index.html`, resulting in a 404 HTTP error. On the Vite development server, an SPA fallback rewrite rule redirects all non-file GET requests back to `/index.html`, allowing React Router to read the browser URL path and render the matched route on the client.

## Self-Study Notes
- **Query Parameter Preservation:** Used `URLSearchParams` instances within `updateParam` to selectively modify or delete specific keys without wiping existing search or filter parameters.
- **Safe Store Initialization:** Wrapped `localStorage.getItem` reads inside `try...catch` blocks to guard against corrupted or invalid JSON payloads.
