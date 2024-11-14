# Project sections

- [x] I have followed the atomic design system to add the components
- [x] Used Tailwind for css
- [x] Pinia for store (All actions are in store /services and /service/:id)
- [x] Typescript to add the required types
- [x] Added reusable components (Links, buttons, Status pills, loader, author profile) etc so that we could use into the entire project and can be modified as per requirements

# Header `(src/components/organisms/Header.vue)`

**All the sections are responsive**

1.  Added logo, linked to dashboard always
2.  Added `HeaderLink` component for the links `@/components/molecules/Link.vue`
3.  For the mobile, **Added the drawer** `@/components/molecules/Header/Drawer.vue`
    and the drawer also includes the **search** (for mobile search)
4.  For mobile search I have used the shared composable `@/composables/useSearch`, which will be **shared for both desktop search and mobile search**

# Services catalog`Views/Service/Listing.vue`

1.  Added **name and description**
2.  Added **components for search & Button** `@/components/organisms/SearchBox.vue` and for buttons`@/components/molecules/Button.vue
3.  For search - `@/composables/useSearch`Added the **?q=keyword to the endpoint**, and updated the route as well so that on refresh we will get results as per search keyword,
4.  Added **debounce to the search**, so that it will wait for the user to stop
5.  Added the **links for all the actions** like for (links, button, cards) etc
6.  Added the **loader**, As the response is fast, could be it has less visibility
7.  **Error message** `No services found`if no search results found

# Services Cards

1.  Added **component for cards** which includes (name, description,status and other details) `@/components/organisms/Services/Card.vue`
2.  Added **authors profile** from the /services endpoint, and added logic like `if versions.length > 2 ? show two images + count of rest of the images : show versions profiles (else case may contain one or two images only)`
3.  Added **pill component for versions** `@/components/molecules/Pill.vue`
4.  Card is linked to **service details page** `Views/Service/Details.vue` and added the details for the each service
5.  **Created endpoint /service/:id** for **serviceByID** (that I included into the server folder), so that I could use into services details page and added the details there

# Pagination

1. it will be navigated to next and prev page `@/components/organisms/Pagination.vue`it will also update the **query into the route**, so that on refresh it will get results according to route ?page=currentPage
2. Suppose am on page 3, **when I search again with new keyword, it will be navigated to first page** ?page=1,

# Refresh the services popup `(@/components/molecules/InfoPopup.vue)`

1.  This popup, **I added to refresh the services list,** default: true, after 1min of timeInterval it will be disappeared and it will toggle the visibility after every 5mins
2.  On Click on refresh, I called the the /services endpoint to update the list of services

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string
  name: string
  description: string
  type: string
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
