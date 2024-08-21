import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

class PDFLibExtended {
    // Private properties for the PDF document, font, current page, text size, circle scale, and margins
    #pdf;
    #currentFont;
    #font;
    #boldFont;
    #italicFont;
    #italicBoldFont;
    #currentPage;
    #textSize;
    #circleScale;
    #margin;
    #color;
    #currentNodes;

    constructor() {
        // Initialize the class properties with default values
        this.#pdf = null;
        this.#currentFont = null;
        this.#font = null;
        this.#boldFont = null;
        this.#italicFont = null;
        this.#italicBoldFont = null;
        this.#currentPage = null;
        this.#textSize = 12;
        this.#circleScale = 15;
        this.#color = rgb(0, 0, 0);
        this.#currentNodes = [];
        this.#margin = {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25
        };
    }

    async init() {
        // Asynchronously create the PDF document and embed the font
        this.#pdf = await PDFDocument.create();
        this.#font = await this.#pdf.embedFont(StandardFonts.Helvetica);
        this.#boldFont = await this.#pdf.embedFont(StandardFonts.HelveticaBold);
        this.#italicFont = await this.#pdf.embedFont(StandardFonts.HelveticaOblique);
        this.#italicBoldFont = await this.#pdf.embedFont(StandardFonts.HelveticaBoldOblique);
        this.#currentFont = this.#font;
    }

    /**
     *### Adds the provided node to the current nodes
     *
     * @param {string} node
     */
    addNode(node){
        try {
            if(!node) throw new Error("Please enter a valid value");
            this.#currentNodes.push(node);
        } catch (error) {
            console.error("Error in addNodes: ", error);
        }
    }

    /**
     *### Removes the provided node from the current nodes
     *
     * @param {string} node
     */
    removeNode(node) {
        try {
            if (!node) throw new Error("Please enter a valid value");

            const lastIndex = this.#currentNodes.lastIndexOf(node);

            if (lastIndex !== -1) {
                this.#currentNodes.splice(lastIndex, 1);
            }
        } catch (error) {
            console.error("Error in removeNode:", error);
        }
    }

    /**
     *### Method to set the text size, ensuring it's a valid number greater than 0
     * @param {number} number
     * @returns {boolean}
     */
    setTextSize(number) {
        try {
            if (isNaN(Number(number))) throw new Error("The value supplied is not a number: ", number);
            number = Number(number);
            if (number <= 0) throw new Error("The value provided must be larger than 0");
            this.#textSize = number;
            return true;
        } catch (error) {
            console.error("Error in setTextSize: ", error);
            return false;
        }
    }

    /**
     *### Method to set the scale of circles, ensuring it's a valid number greater than 0
     *
     * @param {number} number
     * @returns {boolean}
     */
    setCircleScale(number) {
        try {
            if (isNaN(Number(number))) throw new Error("The value supplied is not a number: ", number);
            number = Number(number);
            if (number <= 0) throw new Error("The value provided must be larger than 0");
            this.#circleScale = number;
            return true;
        } catch (error) {
            console.error("Error in setCircleScale: ", error);
            return false;
        }
    }

    /**
     *### Method to set the margins, ensuring the input is an array
     *
     * @param {object} arr
     * @returns {boolean}
     */
    setMargin(arr) {
        try {
            if (typeof arr != 'object' || arr === null || !Array.isArray(arr)) throw new Error("The value supplied is not a JSON/Array: ", arr);
            this.#margin = {
                ...this.#margin,
                ...arr
            };
            return true;
        } catch (error) {
            console.error("Error in setMargin: ", error);
            return false;
        }
    }

    /**
     *### Method to set the current page for the PDF document
     *
     * @param {page} page
     * @returns {boolean}
     */
    setCurrentPage(page) {
        try {
            if (!page) throw new Error("Please supply a valid value");
            this.#currentPage = page;
            return true;
        } catch (error) {
            console.error("Error in setCurrentPage: ", error);
            return false;
        }
    }

    /**
     *### Setter for color
     *
     * @param {import('pdf-lib').RGB} color
     * @returns {boolean}
     */
    setColor(color){
        try {
            if(!color) throw new Error("Please supply a valid color");
            this.#color = color;
            return true;
        } catch (error) {
            console.error("Error in setColor: ", error);
            return false;
        }
    }

    /**
     *### Getter for the color
     *
     * @returns {import('pdf-lib').RGB}
     */
    getColor(){
        return this.#color;
    }

    /**
     *### Getter for the current nodes being processed by the HTMLParser
     *
     * @returns {array}
     */
    getCurrentNodes(){
        return this.#currentNodes;
    }

    /**
     *### Getter for the PDF
     *
     * @returns {PDFDocument}
     */
    getPDF(){
        return this.#pdf;
    }

    /**
     *### Setter for the font
     *
     * @param {font} font
     */
    setFont(font){
        try {
            if(!font) throw new Error("Please provide a font");
            this.getCurrentPage().setFont(font);
            this.#currentFont = font;
        } catch (error) {
            console.error("Error in setFont: ", error);
        }
    }

    /**
     *### Getter for the current font
     *
     * @returns {font}
     */
    getCurrentFont(){
        return this.#currentFont;
    }

    /**
     *### Getter for the font
     *
     * @returns {StandardFonts.Helvetica}
     */
    getFont() {
        return this.#font;
    }

    /**
     *### Getter for the Bold font
     *
     * @returns {StandardFonts.HelveticaBold}
     */
    getBoldFont(){
        return this.#boldFont;
    }

    /**
     *### Getter for the Italic font
     *
     * @returns {StandardFonts.HelveticaOblique}
     */
    getItalicFont(){
        return this.#italicFont;
    }

    /**
     *### Getter for the ItalicBold font
     *
     * @returns {StandardFonts.HelveticaBoldOblique}
     */
    getItalicBoldFont(){
        return this.#italicBoldFont;
    }

    /**
     *### Getter for the current text size
     * @returns {number}
     */
    getTextSize() {
        return this.#textSize;
    }

    /**
     *### Getter for the current circle scale
     * @returns {number}
     */
    getCircleScale() {
        return this.#circleScale;
    }

    /**
     *### Getter for the current page of the PDF document
     * @returns {PDFDocument.page}
     */
    getCurrentPage() {
        return this.#currentPage;
    }

    /**
     *### Getter for the document margins
     *
     * @returns {array}
     * @example margin = {
     *      left: number,
     *      right: number,
     *      top: number,
     *      bottom: number
     * }
     */
    getMargin() {
        return this.#margin;
    }

    /**
     *### Method to create a new page in the PDF document with optional dimensions
     *
     * @param {array} dimensions
     */
    addNewPage(dimensions = null) {
        if (!dimensions) this.setCurrentPage(this.#pdf.addPage());
        else this.setCurrentPage(this.#pdf.addPage(dimensions));

        this.getCurrentPage().moveTo(this.getMargin().left, this.getCurrentPage().getHeight() - this.getMargin().top);
    }

    /**
     *### Method to fetch an existing PDF from a URL and load it into the document
     *
     * @param {string} url
     * @returns {Promise<PDFDocument>|boolean}
     */
    async fetchPDF(url) {
        try {
            if(!url) throw new Error("A URL must be provided");
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return PDFDocument.load(arrayBuffer);
        } catch (error) {
            console.error("Error in fetchPDF: ", error);
            return false;
        }
    }

    /**
     *### Fetches PDFs from the provided URLs and appends them to the end of the current document
     * @param {string|array} urls
     * @returns
     */
    async mergePDF(urls) {
        try {
            if (!urls) throw new Error("A valid URL must be provided");

            const pdfDoc = this.getPDF();

            const urlArray = typeof urls === "string" ? [urls] : urls;

            for (const url of urlArray) {
                const fetchedPdf = await this.fetchPDF(url);
                const copiedPages = await pdfDoc.copyPages(fetchedPdf, fetchedPdf.getPageIndices());

                copiedPages.forEach(page => pdfDoc.addPage(page));
            }

            const pdfBytes = await pdfDoc.save();

            return pdfBytes;

        } catch (error) {
            console.error("Error in mergePDF: ", error);
        }
    }

    /**
     *### Method to generate a URL for the PDF document
     *
     * @returns {string|boolean}
     */
    async generatePDFURL() {
        try {
            const pdfBytes = await this.getPDF().save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Error in generatePDFURL: ", error);
            return false;
        }
    }

    /**
     *### Moves the pointer to the next line of the current page
     */
    nextLine() {
        this.getCurrentPage().moveTo(this.getMargin().left, this.getCurrentPage().getY() - this.getTextSize());
    }

    /**
     *### Draws text on the current page
     *
     * @param {string} text
     * @param {object} options
     * @param {"left"|"center"|"right"} options.align
     * @param {{left: number, right: number}} options.range - The bounds in which the text is written
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the text
     * @param {number} options.opacity - The opacity of the text
     */
    drawText(text, options = {}) {
        let defaultOptions = {
            align: "left",
            range: {
                left: this.getMargin().left,
                right: this.getCurrentPage().getWidth() - this.getMargin().right
            },
            size: this.getTextSize(),
            color: this.getColor(),
            opacity: 1,
            ...options,
        };

        switch (defaultOptions.align) {
            case "left":
                this.getCurrentPage().drawText(text, {
                    size: defaultOptions.size,
                    color: defaultOptions.color,
                    opacity: defaultOptions.opacity
                });
                break;

            case "center":
                let xCenterPosition = defaultOptions.range.left +
                    ((defaultOptions.range.right - defaultOptions.range.left) / 2) -
                    (this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size) / 2);

                let currentPositionCenter = {
                    x: this.getCurrentPage().getX(),
                    y: this.getCurrentPage().getY()
                };

                this.getCurrentPage().moveTo(xCenterPosition, this.getCurrentPage().getY());
                this.getCurrentPage().drawText(text, {
                    size: defaultOptions.size,
                    color: defaultOptions.color,
                    opacity: defaultOptions.opacity
                });
                this.getCurrentPage().moveTo(currentPositionCenter.x, currentPositionCenter.y);
                break;

            case "right":
                let textWidth = this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size);
                let xRightPosition = defaultOptions.range.right - textWidth;

                let currentPositionRight = {
                    x: this.getCurrentPage().getX(),
                    y: this.getCurrentPage().getY()
                };

                this.getCurrentPage().moveTo(xRightPosition, this.getCurrentPage().getY());
                this.getCurrentPage().drawText(text, {
                    size: defaultOptions.size,
                    color: defaultOptions.color,
                    opacity: defaultOptions.opacity
                });
                this.getCurrentPage().moveTo(currentPositionRight.x, currentPositionRight.y);
                break;

            default:
                break;
        }
    }

    /**
     *### Draws text that automatically wraps to the next line
     *
     * @param {string} text
     * @param {object} options
     * @param {"left"|"center"|"right"} options.align
     * @param {{left: number, right: number}} options.range - The bounds in which the paragraph is written
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the text
     * @param {number} options.opacity - The opacity of the text
     */
    drawParagraph(text, options = {}) {
        let defaultOptions = {
            align: "left",
            range: {
                left: this.getMargin().left,
                right: this.getCurrentPage().getWidth() - this.getMargin().right
            },
            size: this.getTextSize(),
            color: this.getColor(),
            opacity: 1,
            ...options
        };
        if(options.range) this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());

        let maxWidth = defaultOptions.range.right - defaultOptions.range.left;
        let currentWidth = 0;
        let currentLine = "";

        text = text.split(" ");

        text.forEach((string, i) => {
            let wordWidth = this.getCurrentFont().widthOfTextAtSize(string, defaultOptions.size);

            // Check if adding this word would overflow
            if (currentWidth + wordWidth > maxWidth) {
                this.drawText(currentLine.trim(), {
                    size: defaultOptions.size,
                    color: defaultOptions.color,
                    opacity: defaultOptions.opacity,
                    align: defaultOptions.align,
                    range: defaultOptions.range
                });

                // Move to the next line
                this.nextLine();
                this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
                currentLine = "";
                currentWidth = 0;
            }

            currentLine += string + " ";
            currentWidth += wordWidth;

            // If it's the last word, draw the remaining line
            if (i === text.length - 1) {
                this.drawText(currentLine.trim(), {
                    size: defaultOptions.size,
                    color: defaultOptions.color,
                    opacity: defaultOptions.opacity,
                    align: defaultOptions.align,
                    range: defaultOptions.range
                });
            }
        });
    }

    /**
     *### Draws a cell on the current page
     *
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {object} options
     * @param {number} options.height - The height of the cell
     * @param {boolean|string} options.border - The border of the cell.
     *  Can be:
     *  - `true`/`false` to toggle all borders
     *  - A string with specific borders: `"t"` (top), `"r"` (right), `"b"` (bottom), `"l"` (left)
     *  - A combination of these letters to apply multiple borders, e.g., `"tb"` for top and bottom or `"tbl"` for top, bottom, and left.
     * @param {"left"|"center"|"right"} options.align
     * @param {boolean} options.newLine
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the border and text
     * @param {number} options.lineThickness - The thickness of the border
     * @param {number} options.padding
     * @param {number} options.borderOpacity
     */
    drawCell(text, x, y, width, options = {}){
        let defaultOptions = {
            height: null,
            border: false,
            align: "left",
            newLine: true,
            size: this.getTextSize(),
            color: this.getColor(),
            lineThickness: 1,
            padding: 4,
            borderOpacity: 0.3,
            ...options
        };
        let page = this.getCurrentPage();
        page.moveTo(x, y);
        let change = page.getY();
        this.drawParagraph(text, {range: {left: x, right: x + width}, align: defaultOptions.align, size: defaultOptions.size, color: defaultOptions.color});
        change -= page.getY() - defaultOptions.size;

        y += defaultOptions.size;

        /*** BORDERS ***/
        if(defaultOptions.border){
            // TOP
            if(defaultOptions.border === true || defaultOptions.border.includes("t") || defaultOptions.border.includes("T")){
                page.drawLine({
                    start: {x: x - defaultOptions.padding, y: y},
                    end: {x: x + width, y: y},
                    thickness: defaultOptions.lineThickness,
                    color: defaultOptions.color,
                    opacity: defaultOptions.borderOpacity
                });
            }
            // BOTTOM
            if(defaultOptions.border === true || defaultOptions.border.includes("b") || defaultOptions.border.includes("B")){
                page.drawLine({
                    start: {x: x - defaultOptions.padding, y: ((defaultOptions.height) ? y - defaultOptions.height : y - change - defaultOptions.padding)},
                    end: {x: x + width, y: ((defaultOptions.height) ? y - defaultOptions.height : y - change -defaultOptions.padding)},
                    thickness: defaultOptions.lineThickness,
                    color: defaultOptions.color,
                    opacity: defaultOptions.borderOpacity
                });
            }
            // LEFT
            if(defaultOptions.border === true || defaultOptions.border.includes("l") || defaultOptions.border.includes("L")){
                page.drawLine({
                    start: {x: x - defaultOptions.padding, y: y + (defaultOptions.lineThickness / 2)},
                    end: {x: x - defaultOptions.padding, y: ((defaultOptions.height) ? y - defaultOptions.height - (defaultOptions.lineThickness / 2) : y - change - defaultOptions.padding - (defaultOptions.lineThickness / 2))},
                    thickness: defaultOptions.lineThickness,
                    color: defaultOptions.color,
                    opacity: defaultOptions.borderOpacity
                });
            }
            // RIGHT
            if(defaultOptions.border === true || defaultOptions.border.includes("r") || defaultOptions.border.includes("R")){
                page.drawLine({
                    start: {x: x + width, y: y + (defaultOptions.lineThickness / 2)},
                    end: {x: x + width, y: ((defaultOptions.height) ? y - defaultOptions.height - (defaultOptions.lineThickness / 2) : y - change - defaultOptions.padding - (defaultOptions.lineThickness / 2))},
                    thickness: defaultOptions.lineThickness,
                    color: defaultOptions.color,
                    opacity: defaultOptions.borderOpacity
                });
            }
        }

        if(defaultOptions.newLine){
            this.nextLine();
            page.moveTo(page.getX(), y - Number(defaultOptions.height) - change - defaultOptions.size - defaultOptions.padding);
        }
        else page.moveTo(x + width + defaultOptions.padding, y - defaultOptions.size);
    }

    /**
     *### Draws a table
     *
     * @param {array} header
     * @param {array} data
     * @param {object} options
     * @param {boolean|string} options.border - The border of the cell.
     *  Can be:
     *  - `true`/`false` to toggle all borders
     *  - A string with specific borders: `"t"` (top), `"r"` (right), `"b"` (bottom), `"l"` (left)
     *  - A combination of these letters to apply multiple borders, e.g., `"tb"` for top and bottom or `"tbl"` for top, bottom, and left.
     * @param {{left: number, right: number}} options.range - The bounds in which the paragraph is written
     * @param {"left"|"center"|"right"} options.align
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the border and text
     * @param {number} options.headerDifference - The difference in size of the header text from the regular text size
     */
    drawTable(header = null, data = null, options = {}){
        let defaultOptions = {
            range: {
                left: this.getMargin().left,
                right: this.getCurrentPage().getWidth() - this.getMargin().right
            },
            headerDifference: 0,
            align: "center",
            border: true,
            size: this.getTextSize(),
            color: this.getColor(),
            ...options
        };
        if (options.range) this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());

        let cellWidth = (defaultOptions.range.right - defaultOptions.range.left) / 3;
        let pointer = {
            x: defaultOptions.range.left,
            y: this.getCurrentPage().getY()
        }
        this.getCurrentPage().moveTo(pointer.x, pointer.y);
        if(header){
            this.setFont(this.getBoldFont());
            header.forEach((head, i) => {
                this.drawCell(head, this.getCurrentPage().getX(), this.getCurrentPage().getY(), cellWidth, {
                    border: defaultOptions.border,
                    align: defaultOptions.align,
                    size: defaultOptions.size + defaultOptions.headerDifference,
                    color: defaultOptions.color,
                    newLine: (i === header.length - 1) ? true : false
                });
            });
        }
        if(data){
            this.setFont(this.getFont());
            this.getCurrentPage().moveTo(pointer.x, this.getCurrentPage().getY() + defaultOptions.headerDifference);
            data.forEach((row) => {
                this.getCurrentPage().moveTo(pointer.x, this.getCurrentPage().getY());
                row.forEach((string, i) => {
                    this.drawCell(string, this.getCurrentPage().getX(), this.getCurrentPage().getY(), cellWidth, {
                        border: defaultOptions.border,
                        align: defaultOptions.align,
                        size: defaultOptions.size + defaultOptions.headerDifference,
                        color: defaultOptions.color,
                        newLine: (i === header.length - 1) ? true : false
                    });
                });
            });
        }
    }

    /**
     *
     * @param {string} text - HTML text
     * @param {DomParser} parser
     * @param {object} options
     * @param {number} options.margin
     * @param {{left: number, right: number}} options.range - The bounds in which the paragraph is written
     * @param {"left"|"center"|"right"} options.align
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the border and text
     */
    htmlParser(text, parser = null, options = {}){
        let doc;
        if(!parser){
            parser = new DOMParser();
            doc = parser.parseFromString(text, "text/html");
        }else doc = text;
        let nodes = doc.childNodes;
        let defaultOptions = {
            margin: 8,
            range: {
                left: this.getMargin().left,
                right: this.getCurrentPage().getWidth() - this.getMargin().right
            },
            align: "left",
            color: this.getColor(),
            size: this.getTextSize(),
            ...options,
        }
        if (defaultOptions.range && !parser) this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
        let maxWidth = defaultOptions.range.right;

        if(nodes.length > 0){
            for(let node of nodes){
                if(node.nodeType === Node.ELEMENT_NODE){
                    this.addNode(node.nodeName);
                    switch (node.nodeName) {
                        case "P":
                            this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY() - defaultOptions.margin);
                            this.nextLine();
                            this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
                            break;
                        case "STRONG":
                            if(this.getCurrentNodes().includes("I")) this.setFont(this.getItalicBoldFont());
                            else this.setFont(this.getBoldFont());
                            break;
                        case "I":
                            if(this.getCurrentNodes().includes("STRONG")) this.setFont(this.getItalicBoldFont());
                            else this.setFont(this.getItalicFont());
                            break;
                        case "UL":
                            break;
                        case "LI":
                            this.nextLine();
                            this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
                            this.getCurrentPage().moveRight(this.getCurrentNodes().filter(value => value === "UL").length * this.getMargin().left);
                            this.drawText("• ", { size: defaultOptions.size, color: defaultOptions.color });
                            this.getCurrentPage().moveRight(this.getCurrentFont().widthOfTextAtSize("• ", defaultOptions.size));
                            break;
                        case "TABLE":
                            let tableHead = [];
                            let tableData = [];
                            node.querySelectorAll("thead th").forEach(element => {
                                tableHead.push(element.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""));
                            });
                            node.querySelectorAll("tbody tr").forEach(row => {
                                let tableRow = [];
                                row.querySelectorAll("td").forEach(col => {
                                    tableRow.push(col.innerHTML.replace(/<\/?[^>]+(>|$)/g, ""));
                                });
                                tableData.push(tableRow);
                            });
                            this.nextLine();
                            this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
                            this.drawTable(tableHead, tableData, {
                                range: {left: defaultOptions.range.left, right: defaultOptions.range.right},
                                size: defaultOptions.size,
                                color: defaultOptions.color,
                            });
                            break;
                        default:
                            break;
                    }
                }

                if(node.nodeName === "TABLE") break;

                this.htmlParser(node, parser, defaultOptions);
            }
        }else{
            if(text.data){
                /*** DRAW TEXT ***/
                let splitText = text.data.split(" ");
                splitText.forEach(string => {
                    string += " ";
                    let wordWidth = this.getCurrentFont().widthOfTextAtSize(string, defaultOptions.size);
                    if(wordWidth + this.getCurrentPage().getX() >= maxWidth){
                        this.nextLine();
                        this.getCurrentPage().moveTo(defaultOptions.range.left, this.getCurrentPage().getY());
                    }
                    this.drawText(string, {
                        size: defaultOptions.size,
                        color: defaultOptions.color
                    });
                    this.getCurrentPage().moveRight(this.getCurrentFont().widthOfTextAtSize(string, defaultOptions.size));
                });

                /*** REMOVE STYLINGS ***/
                this.checkParentHTML(text);
            }
            return;
        }
    }

    /**
     *
     * @param {string} text
     * @returns
     */
    checkParentHTML(text){
        if(!text.parentNode) return;
        switch (text.parentNode.nodeName) {
            case "STRONG":
                if(!text.nextSibling){
                    if(this.getCurrentNodes().includes("I")) this.setFont(this.getItalicFont());
                    else this.setFont(this.getFont());
                    this.removeNode(text.parentNode.nodeName);
                }
                break;
            case "I":
                if(!text.nextSibling){
                    if(this.getCurrentNodes().includes("B")) this.setFont(this.getBoldFont());
                    else this.setFont(this.getFont());
                    this.removeNode(text.parentNode.nodeName);
                }
                break;
            case "LI":
                if(!text.nextSibling){
                    this.removeNode(text.parentNode.nodeName);
                }
                break;
            case "UL":
                if(!text.nextSibling){
                    this.removeNode(text.parentNode.nodeName);
                }
                break;
            default:
                break;
        }
        if(!text.parentNode.nextSibling){
            this.checkParentHTML(text.parentNode);
        }else{
            return;
        }
    }

    /**
     *### Draws a cirlce with text in the center
     *
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {object} options
     * @param {number} options.size - The size of the text
     * @param {import('pdf-lib').RGB} options.color - The color of the text and circle
     * @param {number} options.borderWidth
     */
    drawCircleText(x, y, text, options = {}){
        let defaultOptions = {
            size: this.getTextSize(),
            color: this.getColor(),
            borderWidth: 2,
            ...options
        };
        // Calculate common values
        const centerX = x;
        const centerY = y - (this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size)) - 5;
        const textX = centerX - (this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size) / 2);
        const textY = centerY - (defaultOptions.size / 3);

        // Draw the circle
        this.getCurrentPage().drawEllipse({
            x: centerX,
            y: centerY,
            xScale: this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size),
            yScale: this.getCurrentFont().widthOfTextAtSize(text, defaultOptions.size),
            borderWidth: defaultOptions.borderWidth,
            borderColor: defaultOptions.color,
        });

        // Draw the text
        this.getCurrentPage().drawText(String(text), {
            x: textX,
            y: textY,
            color: defaultOptions.color,
            size: defaultOptions.size,
        });
    }

    /**
     *### Method to add an image to the PDF document at specified coordinates with optional scaling
     * @param {number} x
     * @param {number} y
     * @param {base64} base64Image
     * @param {number} imageScale
     */
    async addImage(x, y, base64Image, imageScale = 1) {
        if (base64Image.includes(",")) base64Image = base64Image.split(",")[1];
        let imageBytes = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0));
        let embeddedImage = await this.getPDF().embedPng(imageBytes);
        let { width, height } = embeddedImage.scale(imageScale);
        this.getCurrentPage().drawImage(embeddedImage, {
            x: x,
            y: y,
            width: width,
            height: height,
        });
    }

    /**
     *### Draws a watermark on each page of the document
     * @param {string} text
     * @param {number} size
     * @returns
     */
    drawWatermark(text, size = 30){
        try {
            if(!text) throw new Error("The text provided must be a valid value");
            this.getPDF().getPages().forEach(page => {
                page.drawText(text, {
                    x: (page.getWidth() / 2) - (this.getBoldFont().widthOfTextAtSize(text, size) * 0.36),
                    y: (page.getHeight() / 2) + (this.getBoldFont().widthOfTextAtSize(text, size) * 0.36),
                    font: this.getBoldFont(),
                    size: size,
                    color: this.getColor(),
                    opacity: 0.25,
                    rotate: degrees(-45)
                });
            });
            return true;
        } catch (error) {
            console.error("Error in drawWatermark: ", error);
            return false;
        }
    }
}

export default PDFLibExtended;