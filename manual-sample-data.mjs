import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'hrnqyow5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-07-01',
  // Remove token for read-only operations
})

async function createSampleData() {
  try {
    console.log('Creating sample data...')
    
    // Create hero document
    const heroDoc = {
      _type: 'hero',
      title: 'こんにちは、私のブログへようこそ！',
      subtitle: 'フロントエンド開発者',
      description: 'React、Next.js、TypeScriptを使用したモダンなウェブ開発について書いています。',
      ctaText: 'もっと見る',
      ctaUrl: '/about'
    }

    // Create about document
    const aboutDoc = {
      _type: 'about',
      title: '私について',
      content: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'こんにちは！私は熱心なフロントエンド開発者です。React、Next.js、TypeScriptを使用してモダンなウェブアプリケーションを構築することに情熱を注いでいます。',
              marks: []
            }
          ]
        }
      ],
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']
    }

    // Note: We can't create documents without proper authentication
    // These are the sample documents that need to be created manually in Sanity Studio
    
    console.log('Sample hero document structure:')
    console.log(JSON.stringify(heroDoc, null, 2))
    console.log('\nSample about document structure:')
    console.log(JSON.stringify(aboutDoc, null, 2))
    
    console.log('\nTo create these documents:')
    console.log('1. Open Sanity Studio at http://localhost:3335')
    console.log('2. Create a new "Hero Section" document')
    console.log('3. Create a new "About" document')
    console.log('4. Fill in the fields as shown above')
    
  } catch (error) {
    console.error('Error creating sample data:', error)
  }
}

createSampleData()
