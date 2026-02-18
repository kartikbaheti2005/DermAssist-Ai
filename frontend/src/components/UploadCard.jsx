import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { motion } from 'framer-motion'

const UploadCard = ({ onImageSelect, isLoading }) => {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      onImageSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const clearImage = () => {
    setPreview(null)
    onImageSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Upload Skin Lesion Image
      </h2>

      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drag and drop your image here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            disabled={isLoading}
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
          />
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPEG, PNG (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-80 object-cover rounded-xl"
            />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <ImageIcon className="w-4 h-4" />
            <span>Image ready for analysis</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UploadCard
