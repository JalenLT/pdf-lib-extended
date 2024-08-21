# PDF-lib-Extended

PDF-lib-Extended is a JavaScript library that extends the functionality of the popular [pdf-lib](https://github.com/Hopding/pdf-lib) library. This extension adds several useful methods for working with PDF documents, making it easier to manipulate text, images, tables, and other elements within your PDFs.

## Installation

To install PDF-lib-Extended, use npm:

```bash
npm install pdf-lib-extended
```

## Usage
Here’s a basic example of how to use PDF-lib-Extended in your project:

```javascript
import PDFExtended from 'pdf-lib-extended';

async function createPDF() {
    const pdf = new PDFExtended();
    await pdf.init();

    // Add a new page
    pdf.addNewPage();

    // Draw some text
    pdf.drawText('Hello, World!', {
        align: 'center',
        size: 24,
        color: pdf.getColor(),
    });

    // Draw a circle with text inside
    pdf.drawCircleText(100, 100, 'A', {
        size: 12,
        color: pdf.getColor(),
    });

    // Generate and download the PDF
    const pdfUrl = await pdf.generatePDFURL();
    window.open(pdfUrl);
}

createPDF();
```

## Features
PDF-lib-Extended includes several custom methods to enhance your PDF creation experience:

* **Text Handling:**

    * **`drawText(text, options)`:** Draws text on the current page with alignment, color, and size options.
    * **`drawParagraph(text, options)`:** Automatically wraps text to the next line within specified bounds.

* **Shape Drawing:**

    * **`drawCircleText(x, y, text, options)`:** Draws a circle with text centered inside.

* **Tables:**
    * **`drawTable(header, data, options)`:** Draws a table with customizable borders, alignment, and size.

* **Images:**

    * **`addImage(x, y, base64Image, imageScale)`:** Adds an image to the PDF document at specified coordinates with optional scaling.
* **Watermarks:**

    * **`drawWatermark(text, size)`:** Draws a watermark on each page of the document.

* **Document Management:**

    * **`addNewPage(dimensions)`:** Adds a new page to the PDF document.
    * **`fetchPDF(url)`:** Fetches an existing PDF from a URL and loads it into the document.
    * **`mergePDF(urls)`:** Merges multiple PDFs from URLs into the current document.

* **HTML Parsing:**

    * **`htmlParser(text, parser, options)`:** Parses HTML and draws it on the PDF.

## API Reference
**`init()`**
Initializes the PDF document and embeds fonts.

**`setTextSize(number)`**
Sets the text size for the document.

**`setCircleScale(number)`**
Sets the scale for circles drawn on the document.

**`setMargin(arr)`**
Sets the margins for the document.

**`setCurrentPage(page)`**
Sets the current page of the document.

**`setColor(color)`**
Sets the color for text and shapes.

**`getPDF()`**
Returns the current PDF document instance.

**`generatePDFURL()`**
Generates a URL for downloading the PDF document.

**`drawText(text, options)`**
Draws text on the current page.

**`drawCircleText(x, y, text, options)`**
Draws a circle with text centered inside.

**`drawTable(header, data, options)`**
Draws a table with the specified header and data.

**`addImage(x, y, base64Image, imageScale)`**
Adds an image to the PDF document.

**`drawWatermark(text, size)`**
Draws a watermark on each page of the document.

## Contributing
If you find a bug or have a feature request, feel free to open an issue or submit a pull request. Contributions are welcome!

## License
This project is licensed under the MIT License.