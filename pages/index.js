import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '2xyud6tz',
  dataset: 'production',
  useCdn: true // set to `false` if you want to disable CDN
})

function App() {
  const [images, setImages] = useState([])
  const [copiedImage, setCopiedImage] = useState("")

  useEffect(() => {
    client
      .fetch('*[_type == "imageurl"]{ _id, url }')
      .then((data) => {
        setImages(data.map((item) => item.url))
      })
      .catch((error) => console.error(error))
  }, [])

  const handleCopyToClipboard = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl)
    setCopiedImage(imageUrl)
    setTimeout(() => {
      setCopiedImage("")
    }, 2500)
  }

  return (
    <>
      <div>
        <div className="text-center py-10 bg-gray-900">
          <h1 className="text-4xl font-bold text-white">Copy Stunning Images to Your Clipboard with a Click!</h1>
        </div>

        <div className="flex flex-wrap justify-center">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="w-64 h-64 relative rounded-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 m-4"
              onClick={() => handleCopyToClipboard(imageUrl)}
            >
              <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {copiedImage && (
          <div className="fixed bottom-0 left-0 right-0 p-4 text-center bg-blue-900 text-white">
            <p>Copied to Clipboard!</p>
          </div>
        )}

        <div className="fixed bottom-0 right-0 p-4">
          <a href="https://assetsbackend.vercel.app/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-cog text-gray-100 hover:text-gray-200"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default App
