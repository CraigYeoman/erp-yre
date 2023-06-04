# YRE-ERP

## Description

An application built to track work orders and store information on parts, customers, vendors, and labor.

> See it live on [https://yre-erp.onrender.com/](https://yre-erp.onrender.com/)

The demo is on render.com on the free tier.  Please give time for the app to spin up.  

## Objectives & Outcomes

The main objectives were to reduce time spent searching through paper work orders and the ability to better visualize the volume and types of work orders.  

- Easily see the volume and type of work orders
- Filter through work orders by date, customer name, job type, price
- Store customer, parts, vendors, and labor information in one location  
- Styled Components

## Development

### Front-End Framework

- [React](https://github.com/facebook/create-react-app)

### Back-End

- [Node.js](https://nodejs.org/en)

### Libraries, extensions and tools

- Express
- Mongoose
- MongoDB
- Material UI
- [ESLint](https://eslint.org/) - A linter tool to standardize code
- [Prettier](https://prettier.io/) - Code formatter

<img src="https://github.com/CraigYeoman/erp-yre/blob/main/diagram.png" width="90%" height="90%"/>

### Screenshots
![login_AdobeExpress_c6g1vg](https://github.com/CraigYeoman/erp-yre/assets/25626421/99dcd1f1-8934-4e55-8c91-28baf1b3ef35)

![newworkorder_AdobeExpress_cqaw1h](https://github.com/CraigYeoman/erp-yre/assets/25626421/5ac0c61d-b806-4458-8137-e0751f0150c2)

## Getting Started

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone git@github.com:CraigYeoman/erp-yre.git

# Enter the created folder
$ cd yre-erp

# Install dependencies in client and server directory
$ cd client && npm install
$ cd server && npm install

# Run the app
$ cd server && npm start

# Visit http://localhost:3000/
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
