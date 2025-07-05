import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'hrnqyow5',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_api_token_here'
})

async function createSampleData() {
  try {
    console.log('Creating sample hero data...')
    
    // Create hero document
    const heroDoc = await client.create({
      _type: 'hero',
      _id: 'hero',
      title: 'Welcome to My Personal Blog',
      subtitle: 'Tech enthusiast and developer',
      description: 'I share my thoughts on technology, programming, and life.',
      ctaText: 'Read More',
      ctaUrl: '/blog'
    })
    
    console.log('Hero document created:', heroDoc)
    
    // Create about document
    const aboutDoc = await client.create({
      _type: 'about',
      _id: 'about',
      title: 'About Me',
      content: [
        {
          _type: 'block',
          _key: 'content1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'I am a passionate developer with experience in modern web technologies. I love creating beautiful and functional applications.'
            }
          ]
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python']
    })
    
    console.log('About document created:', aboutDoc)
    
    console.log('Sample data creation completed successfully!')
    
  } catch (error) {
    console.error('Error creating sample data:', error)
  }
}

createSampleData()
