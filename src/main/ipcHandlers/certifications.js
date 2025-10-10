import { ipcMain, BrowserWindow, dialog, app } from "electron";
import db from "../database";
import * as fs from 'fs';
import path from 'path';


ipcMain.handle('print-to-pdf', async (event, options = {}) => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        // Ask user where to save:
        const { canceled, filePath } = await dialog.showSaveDialog(win, {
            defaultPath: path.join(app.getPath('desktop'), options.filename || 'export.pdf'),
            filters: [{ name: 'PDF', extensions: ['pdf'] }],
        });
        if (canceled || !filePath) return { canceled: true };

        const pdfOptions = {
            marginsType: 0,
            printBackground: true,
            pageSize: options.pageSize || 'A4',
            landscape: !!options.landscape,
        };

        const data = await win.webContents.printToPDF(pdfOptions);
        await fs.writeFile(filePath, data);
        return { canceled: false, filePath };
    } catch (err) {
        console.error('print-to-pdf error', err);
        return { error: err.message || String(err) };
    }
});

ipcMain.handle('print-element-to-pdf', async (event, payload = {}) => {
    const parentWin = BrowserWindow.fromWebContents(event.sender);
    let tmpWin;

    try {
        tmpWin = new BrowserWindow({
            show: false,
            webPreferences: {
                contextIsolation: true,
                sandbox: true
            }
        });

        // Load a blank page first
        await tmpWin.loadURL('about:blank');

        // Build your HTML
        const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              html, body {
                margin: 0;
                padding: 0;
                background: white;
                -webkit-print-color-adjust: exact;
              }
              ${payload.css || ''}
            </style>
          </head>
          <body>${payload.html || ''}</body>
        </html>
      `;

        // Inject the HTML into the hidden window
        await tmpWin.webContents.executeJavaScript(`
        document.open();
        document.write(${JSON.stringify(htmlContent)});
        document.close();
      `);

        // Wait for rendering to finish
        await tmpWin.webContents.executeJavaScript(`
        new Promise((resolve) => {
          if (document.readyState === "complete") resolve();
          else window.addEventListener("load", () => resolve());
        });
      `);

        // Optional render delay for complex CSS
        await new Promise(resolve => setTimeout(resolve, 500));

        // Show save dialog
        const { canceled, filePath } = await dialog.showSaveDialog(parentWin, {
            defaultPath: path.join(app.getPath('desktop'), payload.filename || 'certificate.pdf'),
            filters: [{ name: 'PDF', extensions: ['pdf'] }]
        });

        if (canceled || !filePath) {
            tmpWin.destroy();
            return { canceled: true };
        }

        // Generate the PDF
        const pdfBuffer = await tmpWin.webContents.printToPDF({
            printBackground: true,
            pageSize: payload.pageSize || 'A4',
            landscape: !!payload.landscape
        });

        // Save the file
        await fs.promises.writeFile(filePath, pdfBuffer);

        tmpWin.destroy();
        return { canceled: false, filePath };
    } catch (err) {
        console.error('print-element-to-pdf error:', err);
        if (tmpWin) tmpWin.destroy();
        return { error: err.message || String(err) };
    }
});

// ipcMain.handle('print-element-to-pdf', async (event, payload = {}) => {
//     const parentWin = BrowserWindow.fromWebContents(event.sender);
//     let tmpWin;

//     try {

//         tmpWin = new BrowserWindow({
//             show: false,
//             webPreferences: {
//                 contextIsolation: true,
//                 sandbox: true,
//             },
//         });

//         const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="utf-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1" />
//             <style>
//               html, body {
//                 margin: 0;
//                 padding: 0;
//                 background: white;
//                 -webkit-print-color-adjust: exact;
//               }
//               ${payload.css || ''}
//             </style>
//           </head>
//           <body>${payload.html || ''}</body>
//         </html>
//       `;

//         const encodedHtml = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);

//         console.log('🧾 Loading temporary print window...');
//         await tmpWin.loadURL(encodedHtml);

     
//         await new Promise((resolve) => {
//             tmpWin.webContents.once('did-finish-load', resolve);
           
//             setTimeout(resolve, 4000);
//         });

//         console.log('✅ Loaded print window, creating PDF...');

//         const { canceled, filePath } = await dialog.showSaveDialog(parentWin, {
//             defaultPath: path.join(app.getPath('desktop'), payload.filename || 'export.pdf'),
//             filters: [{ name: 'PDF', extensions: ['pdf'] }],
//         });
//         if (canceled || !filePath) {
//             tmpWin.destroy();
//             return { canceled: true };
//         }

//         const pdfBuffer = await tmpWin.webContents.printToPDF({
//             printBackground: true,
//             pageSize: payload.pageSize || 'A4',
//             landscape: !!payload.landscape,
//         });

//         await fs.writeFile(filePath, pdfBuffer);
//         tmpWin.destroy();

//         console.log('📄 PDF saved:', filePath);
//         return { canceled: false, filePath };
//     } catch (err) {
//         console.error('❌ print-element-to-pdf error:', err);
//         if (tmpWin) tmpWin.destroy();
//         return { error: err.message || String(err) };
//     }
// });
  
  

ipcMain.handle("certificate:print", async (event, data) => {
    try {
        const filePath = await generateCertificatePDF(data);
        return { success: true, filePath };
    } catch (error) {
        console.error("Error generating certificate:", error);
        return { success: false, error: error.message };
    }
});



ipcMain.handle("certification:add", async (event, { resident_id, certification_type, purpose, issued_by_user_id }) => {
    try {
        const prefixes = {
            "Barangay Clearance" : "BC",
            "Certificate of Indigency" : "COI",
            "Certificate of Residency" : "COR",
            "Certificate of Good Moral" : "CGM",
            "Certificate of Low Income" : "CLI",
            "First Time Job Seeker" : "FTJS"
        };
        const prefix = prefixes[certification_type] || "GEN";
        const year = new Date().getFullYear();
        
        const stmtLast = db.prepare(`
            SELECT control_number
            FROM certifications
            WHERE certification_type = ?
                AND control_number LIKE ?
            ORDER BY certification_id DESC
            LIMIT 1
            `);
        const last = stmtLast.get(certification_type, `${prefix}-${year}-%`);

        let nextNum = 1;
        if(last && last.control_number){
            const match = last.control_number.match(/-(\d+)$/);
            if(match) nextNum = parseInt(match[1]) + 1;
        }

        const padded = String(nextNum).padStart(4,"0")
        const control_number = `${prefix}-${year}-${padded}`; 

        const date_issued = new Date().toLocaleString()

        const stmt = db.prepare("INSERT INTO certifications (resident_id, purpose, issued_by_user_id, certification_type, control_number,date_issued) VALUES (?, ?, ?, ?, ?, ?)")
        const result = stmt.run(resident_id,  purpose, issued_by_user_id, certification_type, control_number, date_issued);

        const residentStmt = db.prepare(`
            SELECT resident_since, house_no_st, sitio, dob, marital_status
            FROM residents
            WHERE resident_id = ?
          `);
        const residentInfo = residentStmt.get(resident_id);
        return { success: true, id: result.lastInsertRowid, control_number, ...residentInfo }
    } catch (error) {
        console.error("Error adding certifications: ", error);
        return { success: false, error: "Failed to add certifications" };
    }
});

ipcMain.handle("certification:getAll", async (event, type = null) => {
    try {
        let query = `
        SELECT 
          c.certification_id,
          c.control_number,
          c.certification_type,
          c.purpose as purpose,
          c.date_issued as date_issued,
          c.issued_by_user_id,
          c.created_at,
          r.resident_id,
          r.first_name || ' ' || IFNULL(r.middle_name || ' ', '') || r.last_name || 
            CASE WHEN r.suffix IS NOT NULL AND r.suffix != '' THEN ' ' || r.suffix ELSE '' END 
            AS resident_name
        FROM certifications c
        LEFT JOIN residents r ON c.resident_id = r.resident_id
      `;

        if (type) {
            query += ` WHERE c.certification_type = ?`;
        }

        query += ` ORDER BY c.date_issued DESC`;

        const stmt = db.prepare(query);
        const result = type ? stmt.all(type) : stmt.all();

        return { success: true, certs: result };
    } catch (error) {
        console.error("Error fetching certifications:", error);
        return { success: false, error: "Failed to fetch certifications" };
    }
});
  
