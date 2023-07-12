import GenericAPI from "./generic";
import fetch from 'cross-fetch';
import type { Headers } from "../types/headers";

//------------------------------------------------------------------------------------------------------//
// XII. MOCKUP GENERATOR API
//------------------------------------------------------------------------------------------------------//
export default class MockupGeneratorAPI extends GenericAPI{
    constructor(headers: Headers, origin: string){super(headers, origin)}

    async createMockupTask(){}

    async getProductVariantPrintFiles(){}

    async getMockupTaskResult(){}

    async getLayoutTemplates(){}
}