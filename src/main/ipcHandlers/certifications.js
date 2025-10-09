import { ipcMain } from "electron";
import db from "../database";

ipcMain.handle("certification:add", async (event, { resident_id, control_number, purpose, user_id }) => {
    try {
        const stmt = db.prepare("INSERT INTO certifications (resident_id, control_number, purpose, issued_by_user_id) VALUES (?, ?, ?, ?)")
        const result = stmt.run(resident_id, control_number, purpose, user_id);
        return { success: true, id: result.lastInsertRowid }
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
  
