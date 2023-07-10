const {createPrintfulAcountClient} = require('./src/client') 
const {SyncProduct} = require('./src/product')
const {SyncVariant, SyncVariantOption} = require('./src/variant')
const {File, FileOption} = require('./src/file')

require('dotenv').config()

const Client = createPrintfulAcountClient(process.env.API_AUTH)
//Client.products()

//Client.variant(4018)

// Client.product(71)

// Client.size(71, false)

// Client.size(71, true)

// Client.category(24)

// Client.syncProducts()

// const sync_product = new SyncProduct("API product custom", "https://picsum.photos/200/300")
// const files = [
//     new File("https://picsum.photos/200/300", "front"),
//     new File("https://picsum.photos/200/300", "label_inside", "image", [new FileOption("template_type", "native")]),
// ]
// const options = [
//     new SyncVariantOption("embroidery_type","flat"),
//     new SyncVariantOption("thread_colors",[]),
//     new SyncVariantOption("thread_colors_3d",[]),
//     new SyncVariantOption("thread_colors_chest_left",[]),
// ]
// const sync_variants = [
//     new SyncVariant(9575,files, "19.00", options)
// ]
// Client.createSyncProduct(sync_product, sync_variants);