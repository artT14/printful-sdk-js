import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_MOCKUP_TASK } from "../data/mockup-generator";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})


// Wait 100 mili before each test to prevent from getting blocked
beforeEach(async ()=>{
	await new Promise((r) => setTimeout(r, 100));
});

describe("MockupGeneratorAPI Tests", ()=>{
    /* createMockupTask() */
    it("Creates an asynchronous mockup generation task.", async ()=>{
        const {result, error, code} = await client.mockupGenerator.createMockupTask(71, EXAMPLE_MOCKUP_TASK);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })
    it("Creates an asynchronous mockup generation task. INVALID", async ()=>{
        const {result, error, code} = await client.mockupGenerator.createMockupTask(22, EXAMPLE_MOCKUP_TASK);
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
    })

    /* getProductVariantPrintFiles() */
    it("List of printfiles available for products variants.", async ()=>{
        const {result, error, code} = await client.mockupGenerator.getProductVariantPrintFiles(71);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    });
    it("List of printfiles available for products variants. INVALID", async ()=>{
        const {result, error, code} = await client.mockupGenerator.getProductVariantPrintFiles(111111111111);
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
    });

    /* getMockupTaskResult() */
    it("Returns asynchronous mockup generation task result.", async ()=>{
        await new Promise((r) => setTimeout(r, 60000));
        const {result: taskToCheck} = await client.mockupGenerator.createMockupTask(71, EXAMPLE_MOCKUP_TASK);
		await new Promise((r) => setTimeout(r, 100));
        const {result, error, code} = await client.mockupGenerator.getMockupTaskResult(taskToCheck.task_key);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    }, 70000)
    it("Returns asynchronous mockup generation task result. INVALID", async ()=>{
        const {result, error, code} = await client.mockupGenerator.getMockupTaskResult("over9000");
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
    })

    /* getLayoutTemplates() */
    // TODO: needs more tests
    it("Retrieve list of templates that can be used for client-side positioning.", async ()=>{
        const {result, error, code} = await client.mockupGenerator.getLayoutTemplates(71);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
    })
    it("Retrieve list of templates that can be used for client-side positioning. INVALID ID", async ()=>{
        const {result, error, code} = await client.mockupGenerator.getLayoutTemplates(111111111111);
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
    })
})