# Printful API SDK for JavaScript Developers

## Disclaimer:
This is an unofficial SDK written by community members for the Printful API as described at the following [link](https://developers.printful.com/docs/).

The package and repository are not developed, maintained, nor supported by  Printful® Inc or its associates.

The original author of the package developed the SDK to use it in his projects that require Print-On-Demand services. He is merely sharing it with fellow developers who are looking for such a solution.

If you come across any issues while using the package, please submit an issue on [GitHub](https://github.com/artT14/printful-sdk-js/issues) first before checking with Dev Support at Printful.

## Installation
```bash
npm i printful-sdk-js
```

## Usage
Basic Example in Code
```js
import {createPrintfulStoreClient} from "printful-sdk-js";

const STORE_TOKEN = "YOUR STORE TOKEN";

const client = createPrintfulStoreClient(STORE_TOKEN);

// Must call within an async block
const {products, error} = await client.catalog.getAllProducts();

if (error){
	console.log(error);
}
else{
	console.table(products);
}
```
**QUESTION:** But where can I get an access token to the API?

**ANSWER:** Read the following guide on Prinful API Docs on [Authentication](https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#tag/Authorization).

## Documentation
*WIP* *Coming soon...* 

Documentation is in the process of being composed. I will provide a link soon.

## Testing
*WIP* *Coming soon...*

## Contribution
*WIP* *Coming soon...*

## Planned Features
*WIP* *Coming soon...*
