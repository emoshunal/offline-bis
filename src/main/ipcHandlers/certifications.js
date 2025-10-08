import { ipcMain } from "electron";
import db from "../database";

ipcMain.handle("certification:add", async (event, { resident_id, control_number, purpose, user_id }) => {
	try{
        const stmt = db.prepare("INSERT INTO certifications (resident_id, control_number, purpose, issued_by_user_id) VALUES (?, ?, ?, ?)")
        const result = stmt.run(resident_id, control_number, purpose, user_id);
        return { success: true, id: result.lastInsertRowid}
    }catch(error){
        console.error("Error adding certifications: ", error);
        return { success: false, error: "Failed to add certifications"};
    }
});

