Online Shop - Assignment 7
A React application built with Vite, React Router, Zustand, and Context API.

Project Structure

/assignment7
 ├─ src/
 │   ├─ api/
 │   │   ├─ productsApi.js
 │   │   └─ authApi.js
 │   ├─ hooks/
 │   │   ├─ useFetch.js
 │   │   └─ useLocalStorage.js
 │   ├─ context/
 │   │   └─ AuthContext.jsx
 │   ├─ store/
 │   │   └─ cartStore.js
 │   ├─ components/
 │   │   ├─ Layout.jsx
 │   │   ├─ NavBar.jsx
 │   │   ├─ ProductCard.jsx
 │   │   └─ ProtectedRoute.jsx
 │   ├─ pages/
 │   │   ├─ Home.jsx
 │   │   ├─ ProductList.jsx
 │   │   ├─ ProductDetail.jsx
 │   │   ├─ Cart.jsx
 │   │   ├─ Login.jsx
 │   │   └─ NotFound.jsx
 │   ├─ App.jsx
 │   └─ main.jsx
 ├─ index.html
 └─ package.json




 Architectural Reasoning (Section 10)
1. State Choices
Signed-in user (AuthContext + useReducer): Authentication status changes infrequently (only on login and logout). Using Context allows global access across navigation bars and route guards without unnecessary complexity.

Cart (cartStore.js via Zustand): The cart undergoes frequent updates (item additions, quantity increments, removals). Storing it in an external Zustand store allows components to subscribe to small, specific slices of state via selectors, preventing full-tree re-renders.

Filter values (useSearchParams): Search terms and category selections are stored directly in the URL query string. This makes the current filtered view bookmarkable, shareable via link, and preserved upon page reload.

Product list (useFetch): Managed as local component state driven by an async fetch hook. This data is transient server state that only needs to exist while viewing the catalogue.

Theme (useLocalStorage): Kept in local state and synchronized with browser storage so UI preferences survive page reloads and browser restarts.

2. Context versus Store
Authentication is placed in Context because login and logout events affect the entire shell of the app, making broad tree re-renders expected and appropriate. Conversely, the cart is placed in Zustand because cart changes happen often; using standard Context would force all consuming components across the application to re-render on every single quantity increment. Zustand isolates these updates so only the specific badge or list item changes.

3. Custom Hooks (useFetch)
The useFetch hook shares the asynchronous loading workflow: state transitions (loading, data, error), action dispatching via useReducer, and request cancellation via AbortController. It does not share stored data between components; every component calling useFetch maintains its own independent state lifecycle.

4. Route Parameters
The id value retrieved using useParams() is always a string. Because backend services like DummyJSON typically use numbers for IDs, strict equality comparisons (item.id === id) will fail without explicit type conversion (Number(id)).

5. Protected Routes
The <ProtectedRoute/> component is purely a user experience guard that prevents accidental access or redirects unauthenticated users in the browser. It does not provide real application security, as client-side JavaScript can be inspected and modified. Real security must be enforced by the backend API through authenticated sessions or signed tokens on every protected request.

6. Deep Links and SPA Routing
When a user refreshes or visits a deep link like /products/3 on a traditional static web server, the server looks for a physical directory and file named /products/3/index.html and returns a 404 error if it does not exist. Under the Vite development server, an SPA rewrite rule redirects all non-asset requests back to /index.html, allowing the client-side React Router bundle to parse the URL and render the correct view.

Self-Study Notes
Query Parameter Preservation: Used native URLSearchParams mutation within the filter update handler to modify or remove specific keys without wiping other active query parameters.

Safe Storage Access: Encapsulated localStorage read and write operations inside try...catch blocks to protect against parsing failures from corrupted local data.

Theme Styling: Handled dark and light mode by binding dynamic CSS variables to root data attributes, ensuring instant updates across the layout.
