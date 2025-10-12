import { ref } from 'vue'

const residents = ref([])
const households = ref([])
const loading = ref(false)
const error = ref(null)
export function useResidents() {
  const loadStoredUser = () => {
    const stored = localStorage.getItem('user')
    if (stored) currentUser.value = JSON.parse(stored)
  }

  const getHouseholdById = async (householdId) => {
    try {
      const response = await window.api.getHouseholdById(householdId)
      console.log('Fetched household by ID:', response)
      return response
    } catch (err) {
      console.error('Failed to fetch household by ID:', err)
    }
  }
  const fetchHouseholds = async () => {
    try {
      const response = await window.api.getAllHouseholds()
      console.log('Fetched households:', response)
      households.value = response || []
    } catch (err) {
      console.error('Failed to fetch households:', err)
    }
  }

  const fetchResidents = async () => {
    const response = await window.api.getAllResidents()
    console.log('Fetched Residents: ', response)
    if (response.success) {
      residents.value = response.residents
      console.log('Residents updated: ', residents.value)
    } else {
      console.error('Failed to fetch residents: ', response.error)
    }
  }

  const updateResidentRemarks = async (residents) => {
    const response = await window.api.updateResidentRemarks(residents)
    return response
  }

  const addResident = async (formData) => {
    loading.value = true
    try {
      const res = await window.api.addResident(formData)
      return res
    } catch (error) {
      console.error('Error adding resident: ', error)
    } finally {
      loading.value = false
    }
  }

  const searchHouseholdHead = async (query) => {
    try {
      const response = await window.api.searchHouseholdHead(query)
      return response // ✅ must return for caller to use res.success
    } catch (err) {
      console.error('Search error:', err)
      return { success: false, error: err.message }
    }
  }
  const searchFamilydHead = async (query) => {
    try {
      const response = await window.api.searchFamilyHead(query)
      return response // ✅ must return for caller to use res.success
    } catch (err) {
      console.error('Search error:', err)
      return { success: false, error: err.message }
    }
  }
  return {
    residents,
    households,
    loading,
    fetchResidents,
    loadStoredUser,
    updateResidentRemarks,
    addResident,
    searchFamilydHead,
    searchHouseholdHead,
    fetchHouseholds,
    getHouseholdById
  }
}
