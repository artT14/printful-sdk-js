import {createPrintfulStoreClient, PrintfulStoreClient} from "../../src/client";
import { EXAMPLE_FILE, FAULTY_EXAMPLE_FILE } from "../data/file-library";
require('dotenv').config()

// NOTE: These Tests are optimistic, see TODO 
// TODO: Needs more Tests, especially for negative outcomes, and bad inputs

let client: PrintfulStoreClient;

beforeAll(()=>{
    client = createPrintfulStoreClient(process.env.TEST_AUTH);
})

describe("FileLibraryAPI Tests", ()=>{
	/* addFile() */
	it("Adds a new File to the library by providing URL of the file.", async ()=>{
		const {file, error} = await client.fileLibrary.addFile(EXAMPLE_FILE); 
		expect(error).toBeNull();
		expect(file).toBeDefined();
	});		
	it("Fails adding a a new File to the library by providing URL of the file.", async ()=>{
		const {file, error} = await client.fileLibrary.addFile(FAULTY_EXAMPLE_FILE); 
		expect(file).toBeNull();
		expect(error).toBeDefined();
	});	

	/* getFile() */
	it("Returns information about the given file.", async ()=>{
		const {file: fileToFetch} = await client.fileLibrary.addFile(EXAMPLE_FILE); 
		const {file, error} = await client.fileLibrary.getFile(fileToFetch.id);
		expect(error).toBeNull();
		expect(file).toBeDefined();
	});
	it("Given invalid file id, tries to return information about the given file.", async ()=>{
		const {file, error} = await client.fileLibrary.getFile("@invalid_id");
		expect(file).toBeNull();
		expect(error).toBeDefined();
	});

	/* getThreadColors() */
	it("Returns colors in hexadecimal format.", async ()=>{
		const {thread_colors, error} = await client.fileLibrary.getThreadColors(EXAMPLE_FILE.url);
		expect(error).toBeNull();
		expect(thread_colors).toBeDefined();
	})
	it("Fails to return colors in hexadecimal format.", async ()=>{
		const {thread_colors, error} = await client.fileLibrary.getThreadColors("invalid_url");
		expect(thread_colors).toBeNull();
		expect(error).toBeDefined();
	})

})