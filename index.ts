import {createPrintfulAcountClient} from'./src/client' 

require('dotenv').config()

const Client = createPrintfulAcountClient(process.env.API_AUTH)

// Client.getProducts()

//Client.getVariant(4018)

// Client.getProduct(71)

// Client.getSize(71, false)

// Client.getSize(71, true)

// Client.getCategory(24)

// Client.getSyncProducts()

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

// Client.getSyncProduct(313776218);

// Client.deleteSyncProduct(313776218);

async function main(){
    const res = await Client.getProducts();
    console.log(res);
}

main();