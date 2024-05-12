# FE Assessment

## Installation Steps

```shell
yarn install && yarn dev
```

## Features

- [Admin Authentication](#authentication)
- [Products CRUD](#products)

## Authentication

There is a login page created to allow only a single admin account to log in.
This account is automatically created when the BE is seeder is run.

```js
email: admin@example.com
password: password
```

Authentication process is done by receiving a token from the BE and saving that token for 24hours (can be updated in the src/config/index.ts) in the cookie storage.

The token in turn used to access the neccessary routes as aside the 'login' route, all other routes are protected.

## Products

There are a total of four(4) products view

- [Home Page](http://localhost:3000/) (lists all products along with paginatin, search and categories filter)
- [Details Page](http://localhost:3000/products/1) (shows details of the product, admin delete product from here after confirmation)
- [Edit Page](http://localhost:3000/products/1/edit) (update the product's details)
- [Create Page](http://localhost:3000/products/create) (create a new product)

### Product Fields

- Image
- Name
- Category (Selected from a list of categories saved on the DB)
- Quantity
- Price
- Description

### Features available for Products

- Create Product
- Update Product
- View single product
- Delete Product
- Fetch all Product and filter by searchKeys and/or category

## Key Tools used

- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/vue/quick-start) (Query requests, caching and query storage)
- [vue3-cookies](https://www.npmjs.com/package/vue3-cookies) (Accessing and storing data in cookie)
- [Vue Simple Toast](https://www.npmjs.com/package/@vuesimple/vs-toast?activeTab=readme) (For toasts and alerts)
- [Formki Vue](https://tanstack.com/query/latest/docs/framework/vue/quick-start) {Form handling}
- TailwindCss (For UI)
