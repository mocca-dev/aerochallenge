# AeroChallenge - AI Agent Guide

## Project Overview

**AeroChallenge** is a shopping cart application built as interview practice. It demonstrates React hooks (useReducer, useContext) with Context API for state management and a Node.js/Express backend with mock data fallback.

- **Demo**: https://aerochallenge.ntoneko.vercel.app
- **Deployment**: Vercel
- **Tech Stack**: React 16.8+, Express.js, Context API, PWA (service worker)

## Getting Started

### Frontend

From the `FE/` directory:

- **Development**: `npm start` (runs on localhost:3000)
- **Build**: `npm run build`
- **Test**: `npm test`
- **Deploy**: `npm run deploy` (deploys to surge.sh)

### Backend

From the `FE/api/` directory:

- Backend API server (part of the frontend package)
- Can run in offline mode using mock data in `FE/api/mocks/`

## Project Structure

```
FE/
├── src/
│   ├── App.js              # Root component with useReducer setup
│   ├── context/            # React Context definition
│   ├── reducer/            # useReducer logic for state management
│   ├── service/            # API fetch utilities
│   ├── components/         # Feature-based component folders
│   │   ├── Header/         # App header with cart display
│   │   ├── ProductList/    # Product grid
│   │   ├── ProductItem/    # Individual product card
│   │   └── ...
│   └── index.js            # Entry point with service worker
├── public/                 # Static assets
├── api/                    # Express backend + mock data
└── package.json
```

## Key Patterns & Conventions

### State Management

- **Pattern**: Context API + useReducer hook
- **Location**: `FE/src/context/index.js` (context creation), `FE/src/reducer/index.js` (reducer logic)
- **State Shape**:
  ```js
  {
    isSynchronized: boolean,
    shopCart: { productList: [], totalCount: number, totalPrice: number },
    productList: [],
    metaData: {}
  }
  ```
- **Dispatch Actions**: `LOAD_PRODUCTS_LIST`, `LOAD_METADATA`, `ADD_PRODUCT`, `REMOVE_PRODUCT`, etc.

### Component Structure

- Each component lives in its own folder with `index.js` and `index.css`
- Feature-based organization (e.g., `ProductList/`, `ProductItem/`, `AddBtn/`)
- Nested components for granular button logic (AddBtn, Price, UnitsBtn in ProductItem)
- Using `useContext` to access global state

### API Integration

- **Fetch wrapper**: `FE/src/service/index.js` exports `fetchProductsByPage(page)`
- **Backend**: `FE/api/index.js` - Express server with request-promise for external API
- **Fallback**: Offline mode reads from `FE/api/mocks/` (categories.json, dollar.json, products.json)
- **External API**: https://challenge-api.aerolab.co/ (used in production)

### Styling

- CSS modules pattern: each component has a co-located `index.css`
- Imported in component files
- CSS variables or utility classes may be defined in main stylesheets

### PWA Features

- Service worker for offline support (`FE/src/serviceWorker.js`)
- Manifest file (`FE/public/manifest.json`)
- OfflineToast component provides feedback when offline

## Known Conventions & Quirks

- **Spelling**: Variables use `ammount` (non-standard; typically spelled "amount")
- **React Version**: React 16.8.6+ (Hooks era, but pre-React 17)
- **No TypeScript**: Project is plain JavaScript
- **camelCase naming**: All variables and functions follow camelCase
- **Price Calculations**: Handled in reducer to ensure consistency (see `calcTotalPriceAndTotalAmmount`)

## Common Tasks

### Adding a New Component

1. Create a folder under `FE/src/components/ComponentName/`
2. Create `index.js` with the React component (using hooks if needed)
3. Create `index.css` with component-specific styles
4. Import Context and dispatch actions as needed: `useContext(Context)`

### Modifying State

1. Add a new action type in the reducer (`FE/src/reducer/index.js`)
2. Handle the action case in the switch statement
3. Dispatch from components: `dispatch({ type: 'ACTION_NAME', payload: data })`

### Testing API Integration

1. Toggle offline mode in `FE/api/index.js` (change `offline` flag)
2. Mock data is in `FE/api/mocks/`
3. Update mocks to test different scenarios

## Important Notes for AI Agents

- Always preserve the `ammount` spelling convention for consistency, even though it's non-standard
- Context and reducer are tightly coupled; changes to state shape must update both
- The proxy in `package.json` points to production; be aware this affects local development
- Test changes locally with `npm start` before deploying
- Service worker caching can cause stale assets during development; hard refresh may be needed

## External References

- See [README.md](README.md) for setup details and project background
