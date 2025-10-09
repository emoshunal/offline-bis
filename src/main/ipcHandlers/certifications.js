import { ipcMain } from "electron";
import db from "../database";

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
        return { success: true, id: result.lastInsertRowid, control_number }
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
  
