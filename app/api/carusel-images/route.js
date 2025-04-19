
// File: app/api/carusel-images/route.js
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Define the path to the public/carusel directory
    const caruselDirectory = path.join(process.cwd(), 'public', 'carusel')
    
    // Read the directory contents
    const fileNames = await fs.readdir(caruselDirectory)
    
    // Filter to include only image files (you can adjust this filter as needed)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const imageFiles = fileNames.filter(file => {
      const extension = path.extname(file).toLowerCase()
      return imageExtensions.includes(extension)
    })
    
    // Sort files alphabetically
    imageFiles.sort()
    
    // Return the list of image files
    return new Response(JSON.stringify({ images: imageFiles }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error reading carusel directory:', error)
    
    // Return an error response
    return new Response(JSON.stringify({ 
      error: 'Failed to read carusel directory',
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}