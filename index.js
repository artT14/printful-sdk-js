const {createPrintfulAcountClient} = require('./src/client') 

require('dotenv').config()

const Client = createPrintfulAcountClient(process.env.API_AUTH)
//Client.products()
//Client.variant(4018)
// Client.product(71)
// Client.size(71, false)
// Client.size(71, true)
// Client.category(24)
// Client.syncProducts()