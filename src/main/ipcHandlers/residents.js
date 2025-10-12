import { ipcMain } from 'electron'
import db from '../database'

// ipcMain.handle("household:getAll", async () => {
//   try {
//     const query = `
//       SELECT 
//         h.household_id,
//         h.housing_type,
//         h.ownership_status,
//         hh.first_name || ' ' || hh.last_name AS household_head_name,
//         json_group_array(
//           json_object(
//             'family_id', f.family_id,
//             'family_head_id', f.family_head_id,
//             'family_head_name', fh.first_name || ' ' || fh.last_name,
//             'residents', (
//               SELECT json_group_array(
//                 json_object(
//                   'resident_id', r.resident_id,
//                   'first_name', r.first_name,
//                   'last_name', r.last_name,
//                   'middle_name', r.middle_name,
//                   'gender', r.gender,
//                   'age', r.age,
//                   'household_type', r.household_type,
//                   'family_type', r.family_type,
//                   'relationship_to_household_head', r.relationship_to_household_head,
//                   'relationship_to_family_head', r.relationship_to_family_head
//                 )
//               )
//               FROM residents r
//               WHERE r.family_id = f.family_id
//             )
//           )
//         ) AS families
//       FROM households h
//       LEFT JOIN families f ON f.household_id = h.household_id
//       GROUP BY h.household_id;
//     `;

//     const rows = db.prepare(query).all();
//     return rows.map(row => ({
//       ...row,
//       families: JSON.parse(row.families || '[]')
//     }));
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// });
ipcMain.handle("household:getById", async (event, householdId) => {
  try {
    const query = `
      SELECT 
        h.household_id,
        h.housing_type,
        h.ownership_status,
        h.household_head_id,
        json_group_array(
          json_object(
            'family_id', f.family_id,
            'family_head_id', f.family_head_id,
            'residents', (
              SELECT json_group_array(
                json_object(
                  'household_id', r.household_id,
                  'resident_id', r.resident_id,
                  'first_name', r.first_name,
                  'last_name', r.last_name,
                  'middle_name', r.middle_name,
                  'gender', r.gender,
                  'age', r.age,
                  'dob', r.dob,
                  'household_type', r.household_type,
                  'family_type', r.family_type,
                  'relationship_to_household_head', r.relationship_to_household_head,
                  'relationship_to_family_head', r.relationship_to_family_head
                )
              )
              FROM residents r
              WHERE r.family_id = f.family_id
            )
          )
        ) AS families
      FROM households h
      LEFT JOIN families f ON f.household_id = h.household_id
      WHERE h.household_id = ?
      GROUP BY h.household_id;
    `;

    const row = db.prepare(query).get(householdId); // ✅ Use .get() for a single result
    if (!row) return null;

    return {
      ...row,
      families: JSON.parse(row.families || '[]')
    };
  } catch (error) {
    console.error("Error fetching household by ID:", error);
    return null;
  }
});


ipcMain.handle("household:getAll", async () => {
  try {
    const query = `
      SELECT 
        h.household_id,
        h.housing_type,
        h.ownership_status,
        h.household_head_id,
        json_group_array(
          json_object(
            'family_id', f.family_id,
            'family_head_id', f.family_head_id,
            'residents', (
              SELECT json_group_array(
                json_object(
                  'household_id', r.household_id,
                  'resident_id', r.resident_id,
                  'first_name', r.first_name,
                  'last_name', r.last_name,
                  'middle_name', r.middle_name,
                  'gender', r.gender,
                  'age', r.age,
                  'dob', r.dob,
                  'household_type', r.household_type,
                  'family_type', r.family_type,
                  'relationship_to_household_head', r.relationship_to_household_head,
                  'relationship_to_family_head', r.relationship_to_family_head
                )
              )
              FROM residents r
              WHERE r.family_id = f.family_id
            )
          )
        ) AS families
      FROM households h
      LEFT JOIN families f ON f.household_id = h.household_id
      GROUP BY h.household_id;
    `;

    const rows = db.prepare(query).all();
    return rows.map(row => ({
      ...row,
      families: JSON.parse(row.families || '[]')
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
});


ipcMain.handle('household:search', async (event, query) => {
  try {
    const stmt = db.prepare(`SELECT 
            h.household_id,
            h.housing_type,
            h.ownership_status,
            r.resident_id AS household_head_id,
            r.first_name || ' ' || r.middle_name || ' ' || r.last_name AS household_head_name,
            r.gender,
            r.age,
            r.sitio,
            r.phone
            FROM households h
            JOIN residents r ON r.resident_id = h.household_head_id WHERE r.first_name || ' ' || r.middle_name || ' ' || r.last_name LIKE ? LIMIT 5;
            `)

    const residents = stmt.all(`%${query}%`)
    return { success: true, residents }
  } catch (err) {
    console.error('Error searching for residents: ', err)
    return { success: false, error: 'Failed to search for residents' }
  }
})
ipcMain.handle('family:search', async (event, query) => {
  try {
    const stmt = db.prepare(
        `SELECT 
        f.family_id,
                f.household_id,
                r.resident_id AS family_head_id,
                r.first_name || ' ' || r.middle_name || ' ' || r.last_name AS family_head_name,
                r.gender,
                r.age,
                r.sitio,
                r.phone
        FROM families f
        JOIN residents r ON r.resident_id = f.family_head_id
        WHERE r.first_name || ' ' || r.middle_name || ' ' || r.last_name
        LIKE ? LIMIT 5`
    )
    const residents = stmt.all(`%${query}%`)
    return { success: true, residents }
  } catch (err) {
    console.error('Error searching for residents: ', err)
    return { success: false, error: 'Failed to search for residents' }
  }
})
ipcMain.handle('resident:getAllRecords', async () => {
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
            r.residency_status_other,
            r.house_no_st,
            r.marital_status,
            r.gender,
            r.soi,
            r.income,
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
            `)
    const residents = stmt.all()
    return { success: true, residents }
  } catch (err) {
    console.error('Error fetching residents: ', err)
    return { success: false, error: 'Failed to fetch residents' }
  }
})

ipcMain.handle('resident:updateRemarks', async (event, residents) => {
  try {
    const { resident_id, tags } = residents
    const stmt = db.prepare('UPDATE residents SET tags = ? WHERE resident_id = ?')
    const info = stmt.run(tags, resident_id)
    if (info.changes === 0) {
      return { success: false, error: 'No resident found with the given ID' }
    }
    return { success: true }
  } catch (err) {
    console.error('Error updating resident remarks: ', err)
    return { success: false, error: 'Failed to update resident remarks' }
  }
})

ipcMain.handle('resident:add', async (event, data) => {
  try {
    const {
      first_name,
      last_name,
      middle_name,
      suffix,
      age,
      dob,
      gender,
      pob,
      citizenship,
      marital_status,
      pwd,
      voter,
      residency_status,
      residency_status_other,
      resident_since,
      house_no_st,
      sitio,
      phone,
      soi,
      income,
      household_type,
      family_type,
      relationship_to_household_head,
      relationship_to_family_head,
      added_by_user_id,
      housing_type,
      ownership_status,
      tags
    } = data

    // Begin transaction (ensures all or nothing)
    const transaction = db.transaction(() => {
      let household_id = data.household_id || null
      let family_id = data.family_id || null

      // 🏠 If this resident is a household head, create new household
      if (household_type === 'Head') {
        const result = db
          .prepare(
            `INSERT INTO households (housing_type, ownership_status)
             VALUES (?, ?)`
          )
          .run(housing_type, ownership_status)
        household_id = result.lastInsertRowid
      }

      // 👨‍👩‍👧 If this resident is a family head, create a family under that household
      if (family_type === 'Head') {
        const result = db
          .prepare(
            `INSERT INTO families (household_id)
             VALUES (?)`
          )
          .run(household_id)
        family_id = result.lastInsertRowid
      }

      // 👤 Insert the resident
      const residentInsert = db
        .prepare(
          `INSERT INTO residents (
            household_id, family_id, first_name, last_name, middle_name, suffix,
            age, dob, gender, pob, citizenship, marital_status, pwd, voter,
            residency_status, residency_status_other, resident_since,
            house_no_st, sitio, phone, soi, income, household_type, family_type,
            relationship_to_household_head, relationship_to_family_head,
            added_by_user_id, tags
          ) VALUES (
            @household_id, @family_id, @first_name, @last_name, @middle_name, @suffix,
            @age, @dob, @gender, @pob, @citizenship, @marital_status, @pwd, @voter,
            @residency_status, @residency_status_other, @resident_since,
            @house_no_st, @sitio, @phone, @soi, @income, @household_type, @family_type,
            @relationship_to_household_head, @relationship_to_family_head,
            @added_by_user_id, @tags
          )`
        )
        .run({
          household_id,
          family_id,
          first_name,
          last_name,
          middle_name,
          suffix,
          age,
          dob,
          gender,
          pob,
          citizenship,
          marital_status,
          pwd,
          voter,
          residency_status,
          residency_status_other,
          resident_since,
          house_no_st,
          sitio,
          phone,
          soi,
          income,
          household_type,
          family_type,
          relationship_to_household_head,
          relationship_to_family_head,
          added_by_user_id,
          tags
        })

      const resident_id = residentInsert.lastInsertRowid

      // 🔗 Update household and family heads if applicable
      if (household_type === 'Head') {
        db.prepare(
          `UPDATE households
           SET household_head_id = ?
           WHERE household_id = ?`
        ).run(resident_id, household_id)
      }

      if (family_type === 'Head') {
        db.prepare(
          `UPDATE families
           SET family_head_id = ?
           WHERE family_id = ?`
        ).run(resident_id, family_id)
      }

      return resident_id
    })

    const resident_id = transaction()
    return { success: true, resident_id }
  } catch (err) {
    console.error('Error inserting resident:', err)
    return { success: false, message: err.message }
  }
})

