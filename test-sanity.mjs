import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'hrnqyow5',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
})

async function testConnection() {
  try {
    console.log('Testing Sanity connection...')
    
    // Test basic connection
    const result = await client.fetch('*[_type == "hero"]')
    console.log('Sanity connection test result:', result)
    
    // List all document types
    const types = await client.fetch('array::unique(*[]._type)')
    console.log('Available document types:', types)
    
    // Get all documents
    const allDocs = await client.fetch('*')
    console.log('All documents:', allDocs)
    
  } catch (error) {
    console.error('Sanity connection test failed:', error)
  }
}

testConnection()
