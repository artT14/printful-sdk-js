import OAuthAPI from './lib/oauth';
import CatalogAPI from './lib/catalog';
import ProductsAPI from './lib/products';
import ProductTemplatesAPI from './lib/product-templates';
import OrdersAPI from './lib/orders';
import FileLibraryAPI from './lib/file-library';
import ShippingRateAPI from './lib/shipping-rate';
import EcommerceSyncAPI from './lib/ecommerce-sync';
import CountryCodesAPI from './lib/country-codes';
import TaxRateAPI from './lib/tax-rate';
import WebhookAPI from './lib/webhook';
import StoreInformationAPI from './lib/store-information';
import MockupGeneratorAPI from './lib/mockup-generator';
import WarehouseProductsAPI from './lib/warehouse-products';
import ReportsAPI from './lib/reports';
import ApprovalSheetsAPI from './lib/approval-sheets';
import type { Headers } from './types/headers';

export class PrintfulStoreClient{
    protected origin = "https://api.printful.com";
    protected headers: Headers;

    //SUB APIs
    public oauth: OAuthAPI;
    public catalog: CatalogAPI;
    public products: ProductsAPI;
    public orders: OrdersAPI;
    public fileLibrary: FileLibraryAPI;
    public shippingRate: ShippingRateAPI;
    public ecommerceSync: EcommerceSyncAPI;
    public countryCodes: CountryCodesAPI;
    public taxRate: TaxRateAPI;
    public webhook: WebhookAPI;
    public storeInformation: StoreInformationAPI;
    public mockupGenerator: MockupGeneratorAPI;
    public warehouseProducts: WarehouseProductsAPI;
    public reports: ReportsAPI;
    public approvalSheets: ApprovalSheetsAPI;

    constructor(auth: string | undefined){
        this.headers = {Authorization: "Bearer " + (auth || "")};
        
        this.oauth = new OAuthAPI(this.headers, this.origin);
        this.catalog = new CatalogAPI(this.headers, this.origin);
        this.products = new ProductsAPI(this.headers, this.origin);
        this.orders = new OrdersAPI(this.headers, this.origin);
        this.fileLibrary = new FileLibraryAPI(this.headers, this.origin);
        this.shippingRate = new ShippingRateAPI(this.headers, this.origin);
        this.ecommerceSync = new EcommerceSyncAPI(this.headers, this.origin);
        this.countryCodes = new CountryCodesAPI(this.origin);
        this.taxRate = new TaxRateAPI(this.origin);
        this.webhook = new WebhookAPI(this.headers, this.origin);
        this.storeInformation = new StoreInformationAPI(this.headers, this.origin);
        this.mockupGenerator = new MockupGeneratorAPI(this.headers, this.origin);
        this.warehouseProducts = new WarehouseProductsAPI(this.headers, this.origin);
        this.reports = new ReportsAPI(this.headers, this.origin);
        this.approvalSheets = new ApprovalSheetsAPI(this.headers, this.origin);
    }
}

export function createPrintfulStoreClient(auth: string | undefined){
    return new PrintfulStoreClient(auth);
}