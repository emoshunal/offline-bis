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

ipcMain.handle("user:update", async (event, { user_id, username, password, user_role }) => {
    try {
        const stmt = db.prepare("UPDATE users SET username = ?, password = ?, user_role = ? WHERE user_id = ?");
        const result = stmt.run(username, password, user_role, user_id);
        return { success: result.changes > 0 };
    } catch (err) {
        console.error("Error updating user: ", err);
        return { success: false, error: "Failed to update user" };
    }

});

ipcMain.handle("user:delete", async (event, user_id) => {
    try{
        const stmt = db.prepare("DELETE FROM users WHERE user_id = ?");
        const result = stmt.run(user_id);
        return { success: result.changes > 0 };
    }catch(err){
        console.error("Error deleting user: ", err);
        return { success: false, error: "Failed to delete user" };
    }
});


ipcMain.handle("user:getAll", async () => {
    try {
        const rows = db.prepare("SELECT * FROM users").all();
        return { success: true, users: rows };
    } catch (err) {
        console.error("Error fetching users: ", err);
        return { success: false, error: "Failed to fetch users" };
    }
})