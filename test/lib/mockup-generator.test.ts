import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_MOCKUP_TASK } from "../data/mockup-generator";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("MockupGeneratorAPI Tests", ()=>{
    /* createMockupTask() */
    it("Creates an asynchronous mockup generation task.", async ()=>{
        const {task, error} = await client.mockupGenerator.createMockupTask(71, EXAMPLE_MOCKUP_TASK);
        expect(error).toBeNull();
        expect(task).toBeDefined();
    })
    it("Creates an asynchronous mockup generation task. INVALID", async ()=>{
        const {task, error} = await client.mockupGenerator.createMockupTask(22, EXAMPLE_MOCKUP_TASK);
        expect(task).toBeNull();
        expect(error).toBeDefined();
    })

    /* getProductVariantPrintFiles() */
    it("List of printfiles available for products variants.", async ()=>{
        const {files, error} = await client.mockupGenerator.getProductVariantPrintFiles(71);
        expect(error).toBeNull();
        expect(files).toBeDefined();
    });
    it("List of printfiles available for products variants. INVALID", async ()=>{
        const {files, error} = await client.mockupGenerator.getProductVariantPrintFiles(111111111111);
        expect(files).toBeNull();
        expect(error).toBeDefined();
    });

    /* getMockupTaskResult() */
    it("Returns asynchronous mockup generation task result.", async ()=>{
        const {task: taskToCheck} = await client.mockupGenerator.createMockupTask(71, EXAMPLE_MOCKUP_TASK);
        const {task, error} = await client.mockupGenerator.getMockupTaskResult(taskToCheck.task_key);
        expect(error).toBeNull();
        expect(task).toBeDefined();
    })
    it("Returns asynchronous mockup generation task result. INVALID", async ()=>{
        const {task, error} = await client.mockupGenerator.getMockupTaskResult("over9000");
        expect(task).toBeNull();
        expect(error).toBeDefined();
    })

    /* getLayoutTemplates() */
    // TODO: needs more tests
    it("Retrieve list of templates that can be used for client-side positioning.", async ()=>{
        const {templates, error} = await client.mockupGenerator.getLayoutTemplates(71);
        expect(error).toBeNull();
        expect(templates).toBeDefined();
    })
    it("Retrieve list of templates that can be used for client-side positioning. INVALID ID", async ()=>{
        const {templates, error} = await client.mockupGenerator.getLayoutTemplates(111111111111);
        expect(templates).toBeNull();
        expect(error).toBeDefined();
    })
})