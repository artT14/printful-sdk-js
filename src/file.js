class File{
    /**
     * @constructs File
     * @param {string} url - (required) Source URL where the file is downloaded from. The use of .ai .psd and .tiff files have been depreciated, if your application uses these file types or accepts these types from users you will need to add validation.
     * @param {string} type - Role of the file
     * @param {string} filename - File name
     * @param {[FileOption]} options - Array of additional options for this file. See Examples {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options Link}
     * @param {boolean} visible - Show file in the Printfile Library (default true)
     */
    constructor(url, type, filename, options, visible){
        this.url = url;
        this.type = type || "";
        this.filename = filename || "";
        this.options = options || [];
        this.visible = visible || true;
    }
}

/**
 * Additional options for a file. See Examples {@link https://developers.printful.com/docs/?_gl=1*1sbmfdi*_ga*NDMzMTM2Mjk0LjE2ODcyMzU3MDc.*_ga_EZ4XVRL864*MTY4ODc3OTM1NC4xMi4xLjE2ODg3ODEwMzYuMTAuMC4w#section/Options Link}
 */
class FileOption{
    /**
     * @constructs FileOption
     * @param {string} id - Option id
     * @param {string} value - Option value
     */
    constructor(id,value){
        this.id = id;
        this.value = value;
    }
}

module.exports = {
    File,
    FileOption
}