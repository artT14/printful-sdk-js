import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_FILE, FAULTY_EXAMPLE_FILE } from "../data/file-library";
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

describe("FileLibraryAPI Tests", ()=>{
	/* addFile() */
	it("Adds a new File to the library by providing URL of the file.", async ()=>{
		const {result, error, code} = await client.fileLibrary.addFile(EXAMPLE_FILE); 
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});		
	it("Fails adding a a new File to the library by providing URL of the file.", async ()=>{
		const {result, error, code} = await client.fileLibrary.addFile(FAULTY_EXAMPLE_FILE); 
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
	});	

	/* getFile() */
	it("Returns information about the given file.", async ()=>{
		const {result: fileToFetch} = await client.fileLibrary.addFile(EXAMPLE_FILE); 
		const {result, error, code} = await client.fileLibrary.getFile(fileToFetch.id);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	});
	it("Given invalid file id, tries to return information about the given file.", async ()=>{
		const {result, error, code} = await client.fileLibrary.getFile("@invalid_id");
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
	});

	/* getThreadColors() */
	it("Returns colors in hexadecimal format.", async ()=>{
		const {result, error, code} = await client.fileLibrary.getThreadColors(EXAMPLE_FILE.url);
		expect(error).toBeNull();
		expect(result).toBeDefined();
		expect(code).toBeLessThan(400);
	})
	it("Fails to return colors in hexadecimal format.", async ()=>{
		const {result, error, code} = await client.fileLibrary.getThreadColors("invalid_url");
		expect(result).toBeNull();
		expect(error).toBeDefined();
		expect(code).toBeGreaterThanOrEqual(400);
	})

})