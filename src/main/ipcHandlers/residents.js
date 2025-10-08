
import { ipcMain } from "electron";
import db from "../database";

ipcMain.handle("resident:getAllRecords", async () => {
    try {
        const stmt = db.prepare(`SELECT 
            r.resident_id,
            r.first_name || ' ' || r.last_name AS resident_name,
            hh.first_name || ' ' || hh.last_name AS household_head_name,
            fh.first_name || ' ' || fh.last_name AS family_head_name,
            r.phone,
            r.resident_since,
            r.tags,
            r.sitio,
            r.residency_status,
            r.house_no_st,
            r.marital_status,
            r.gender,
            r.age,
            r.dob,
            r.relationship_to_household_head,
            r.relationship_to_family_head,
            r.tags,
            h.household_id,
            f.family_id,
            h.housing_type,
            h.ownership_status
            FROM residents r
            LEFT JOIN households h ON r.household_id = h.household_id
            LEFT JOIN residents hh ON h.household_head_id = hh.resident_id
            LEFT JOIN families f ON r.family_id = f.family_id
            LEFT JOIN residents fh ON f.family_head_id = fh.resident_id
            ORDER BY h.household_id, f.family_id, r.relationship_to_household_head;
            `);
        const residents = stmt.all();
        return { success: true, residents };
    } catch (err) {
        console.error("Error fetching residents: ", err);
        return { success: false, error: "Failed to fetch residents" };
    }
});

ipcMain.handle("resident:updateRemarks", async (event, residents) => {
    try {
        const { resident_id, tags } = residents;
        const stmt = db.prepare("UPDATE residents SET tags = ? WHERE resident_id = ?");
        const info = stmt.run(tags, resident_id);
        if (info.changes === 0) {
            return { success: false, error: "No resident found with the given ID" };
        }
        return { success: true };
    } catch (err) {
        console.error("Error updating resident remarks: ", err);
        return { success: false, error: "Failed to update resident remarks" };
    }
});