import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "barangay.db");
const db = new Database(dbPath)

db.prepare(`
    CREATE TABLE IF NOT EXISTS residents (
        resident_id INTEGER PRIMARY KEY AUTOINCREMENT,
        household_id INTEGER,
        family_id INTEGER,
        first_name TEXT,
        last_name TEXT,
        middle_name TEXT,
        suffix TEXT,
        age INTEGER,
        dob TEXT,
        gender TEXT,
        pob TEXT,
        citizenship TEXT,
        marital_status TEXT,
        pwd INTEGER,
        voter  INTEGER,
        residency_status TEXT,
        resident_since TEXT,
        house_no_st TEXT,
        sitio TEXT,
        phone TEXT,
        soi TEXT,
        income INTEGER,
        relationship_to_household_head TEXT,
        relationship_to_family_head TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        added_by_user_id INTEGER,
        FOREIGN KEY (household_id) REFERENCES households(household_id),
        FOREIGN KEY (family_id) REFERENCES families(family_id)

    )
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS households(
        household_id INTEGER PRIMARY KEY AUTOINCREMENT,
        household_head_id INTEGER,
        housing_type TEXT,
        ownership_status TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (household_head_id) REFERENCES residents(resident_id)
        )    
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS families(
        family_id INTEGER PRIMARY KEY AUTOINCREMENT,
        household_id INTEGER,
        family_head_id INTEGER,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (household_id) REFERENCES households(household_id),
        FOREIGN KEY (family_head_id) REFERENCES residents(resident_id)
        )`).run();
    
    db.prepare(`
        CREATE TABLE IF NOT EXISTS certifications(
        certification_id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_id INTEGER,
        control_number TEXT,
        certification_type TEXT,
        purpose TEXT,
        date_issued TEXT,
        issued_by_user_id INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
        )
        `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS blotter(
        blotter_id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_no TEXT,
        blotter_type TEXT,
        complainants TEXT,
        respondents TEXT,
        case_type TEXT,
        date_filed TEXT,
        hearing_date TEXT,
        case_status TEXT,
        created_by_user_id INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
        )`).run();
    
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        password_token TEXT,
        user_role TEXT,
        created_at TEXT DEFAULT (datetime('now'))
        )    
    `).run();
    
    db.prepare(`
        CREATE TABLE IF NOT EXISTS logs(
        log_id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT DEFAULT (datetime('now')),
        action_type TEXT,
        action_detail TEXT,
        related_id INTEGER,
        user_id INTEGER
       )
    `).run();


    