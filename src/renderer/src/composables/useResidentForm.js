// src/composables/useResidentForm.js
import { reactive } from 'vue'

export const form = reactive({
    // Identity
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    gender: '',
    dob: '',
    pob: '',
    citizenship: 'Filipino',
    marital_status: '',
    voter: false,
    pwd: false,

    // Address
    residency_status: '',
    resident_since: '',
    house_no_st: '',
    sitio: '',
    phone: '',

    // Household
    household_type: '',
    household_head_name: '',
    ownership_status: '',
    relationship_to_household_head: '',
    family_type: '',
    family_head_name: '',
    relationship_to_family_head: '',

    // Socio-economic
    soi: '',
    income: ''
})
