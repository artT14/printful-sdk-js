import {createPrintfulAcountClient} from'./src/client' 
import { File } from './src/types/file';
import { SyncVariant } from './src/types/variant';

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
    // const res = await Client.catalog.getAllProducts();
    // const res = await Client.getProduct(71);
    // const res = await Client.getVariant(4018);
    // const res = await Client.getSize(71);
    // const res = await Client.getCategory(24);
    // const res = await Client.getCategories();
    // const res = await Client.products.getAllSyncProducts();

    // const sync_product = {name: "API product custom", thumbnail: "https://picsum.photos/200/300"};
    // const files = [
    //     {
    //         type: "front",
    //         url: "https://picsum.photos/200/300"
    //     },
    //     {
    //         type: "label_inside",
    //         url: "https://picsum.photos/200/300",
    //         options: [
    //             {
    //                 id: "template_type",
    //                 value: "native"
    //             }
    //         ]
    //     }
    // ]
    // const options = [
    //     {
    //         id: "embroidery_type",
    //         value: "flat",
    //     },
    //     {
    //         id: "thread_colors",
    //         value: [],
    //     },
    //     {
    //         id: "thread_colors_3d",
    //         value: [],
    //     },
    //     {
    //         id: "thread_colors_chest_left",
    //         value: [],
    //     }
    // ]
    // const sync_variants = [
    //     {
    //         retail_price: "19.00",
    //         variant_id: 9575,
    //         files,
    //         options
    //     }
    // ]
    // const res = await Client.createSyncProduct(sync_product, sync_variants);
    // const res = await Client.deleteSyncProduct(313883666);
    // const res = await Client.getSyncProduct(313883666);
    // const res = await Client.modifySyncProduct(313883783, sync_product, sync_variants);
    // const res = await Client.deleteSyncProduct(313886836);
    // console.log(res);
}

main();