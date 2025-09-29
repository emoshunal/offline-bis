import { ipcMain } from "electron";
import bcrypt from "bcryptjs";
import db from "../database";

ipcMain.handle("user:add", async (event, { username, password, user_role }) => {
    try {
        const existing = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
        if (existing) {
            return { success: false, error: "Username already exists" };
        }
        const hashed_password = await bcrypt.hash(password, 8);

        const stmt = db.prepare("INSERT INTO users (username, password, user_role) VALUES (?, ?, ?)");
        const result = stmt.run(username, hashed_password, user_role);

        return { success: true, id: result.lastInsertRowid };
    } catch (error) {
        console.error("Error addding user: ", err);
        return { success: false, error: "Failed to add user" };
    }
});