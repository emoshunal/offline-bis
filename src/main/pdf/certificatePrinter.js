import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";

const fonts = {
    Roboto: {
        normal: path.join(process.cwd(), "src/renderer/src/assets/Fonts/TTF/Satoshi-Variable.ttf"),
        bold: path.join(process.cwd(), "src/renderer/src/assets/Fonts/TTF/Satoshi-Variable.ttf"),
        italics: path.join(process.cwd(), "src/renderer/src/assets/Fonts/TTF/Satoshi-Variable.ttf"),
        bolditalics: path.join(process.cwd(), "src/renderer/src/assets/Fonts/TTF/Satoshi-Variable.ttf"),
    },
};

const printer = new PdfPrinter(fonts);

export async function generateCertificatePDF(data) {
    const docDefinition = {
        content: [
            { text: "Republic of the Philippines", style: "header" },
            { text: "Barangay Clearance", style: "title", margin: [0, 10, 0, 20] },
            { text: `To whom it may concern:`, margin: [0, 0, 0, 10] },
            {
                text: `This is to certify that ${data.resident_name} is a resident of this barangay and has no pending case.`,
                alignment: "justify",
                margin: [0, 0, 0, 10],
            },
            {
                text: `Purpose: ${data.purpose}`,
                bold: true,
                margin: [0, 10, 0, 20],
            },
            {
                text: `Issued this ${new Date(data.date_issued).toLocaleDateString()} at Barangay Hall.`,
            },
            {
                text: `\n\n________________________\n${data.issued_by}\nBarangay Captain`,
                alignment: "center",
            },
        ],
        styles: {
            header: { fontSize: 12, alignment: "center" },
            title: { fontSize: 16, bold: true, alignment: "center" },
        },
        pageMargins: [50, 60, 50, 60],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const filePath = path.join(process.cwd(), `certificate_${data.resident_name}.pdf`);
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();

    return filePath;
}
