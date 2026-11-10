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
##  Architectural Reasoning (Section 10)

---

### 1. State Choices

| State Slice | Location / Implementation | Architectural Justification |
| :--- | :--- | :--- |
| **Signed-in user** | `AuthContext` + `useReducer` | Global authentication metadata changes infrequently (only on login/logout), making broad Context propagation optimal without perf penalties. |
| **Shopping cart** | `cartStore.js` (Zustand) | High-frequency shared state (adding items, mutating quantities) requiring isolated component subscriptions via selectors to prevent full-tree re-renders. |
| **Filter values** | URL (`useSearchParams`) | Storing queries in the URL enables shareable deep links, browser history navigation (back/forward), and state persistence across page refreshes. |
| **Product list** | `useFetch` (Local Hook State) | Server data lifecycle (loading, data, error) that is tied strictly to the component displaying the catalogue. |
| **Theme** | `useLocalStorage` | Client UI preference that must be read immediately on initial mount and safely persisted across sessions. |

---

### 2. Context versus Store

* **User session in Context:** Login/logout events are rare and impact the shell of the entire application. When a user authenticates or signs out, re-rendering layout navigation and protected routes is expected.
* **Cart in Zustand:** If the cart were placed in Context, every minor state transition (e.g., clicking `+` to increment an item quantity) would trigger a re-render across all components consuming that Context—including the catalogue grid and wrappers. 
* **Granular Selectors:** Zustand allows consumers like the `NavBar` cart badge to subscribe strictly to a primitive derived count:
  ```javascript
  const totalCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );



