import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { ArrowRight, Upload, ShieldCheck, Users, TrendingDown } from 'lucide-react'
import UploadCard from '../components/UploadCard'
import ProcessingLoader from '../components/ProcessingLoader'
import ResultCard from '../components/ResultCard'
import ExplainableAI from '../components/ExplainableAI'
import RecommendationPanel from '../components/RecommendationPanel'

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', selectedImage)

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      // Simulate processing time for better UX
      setTimeout(() => {
        setResult(response.data)
        setIsAnalyzing(false)
      }, 4800) // Show all 4 processing steps
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Failed to analyze image. Please ensure the backend server is running.'
      )
      setIsAnalyzing(false)
    }
  }

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Detect Skin Cancer Early
              <span className="block text-blue-600 mt-2">Using AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advanced artificial intelligence analyzes smartphone images of skin lesions 
              to provide instant risk assessment. Early detection can save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToUpload}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image Now</span>
              </button>
              <a
                href="/how-it-works"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">10,000+</p>
              <p className="text-gray-600">Training Images</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">7 Classes</p>
              <p className="text-gray-600">Lesion Types</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <TrendingDown className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">Early</p>
              <p className="text-gray-600">Detection Focus</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <UploadCard onImageSelect={setSelectedImage} isLoading={isAnalyzing} />
          
          {selectedImage && !isAnalyzing && !result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <button
                onClick={handleAnalyze}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Analyze Image with AI
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
            >
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {/* Processing Animation */}
      {isAnalyzing && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessingLoader />
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResultCard result={result} />
            <ExplainableAI diagnosis={result.diagnosis} />
            <RecommendationPanel riskLevel={result.risk_level} />
          </div>
        </section>
      )}

      {/* ABCDE Awareness Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The ABCDE Rule of Melanoma
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn the warning signs that may indicate melanoma, the most serious type of skin cancer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                letter: 'A',
                title: 'Asymmetry',
                description: 'One half of the mole does not match the other half',
                color: 'blue',
              },
              {
                letter: 'B',
                title: 'Border',
                description: 'Edges are irregular, ragged, notched, or blurred',
                color: 'purple',
              },
              {
                letter: 'C',
                title: 'Color',
                description: 'Color is not uniform and may include shades of brown, black, pink, red, white, or blue',
                color: 'indigo',
              },
              {
                letter: 'D',
                title: 'Diameter',
                description: 'The spot is larger than 6mm (about the size of a pencil eraser)',
                color: 'cyan',
              },
              {
                letter: 'E',
                title: 'Evolving',
                description: 'The mole is changing in size, shape, or color',
                color: 'teal',
              },
            ].map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <span className={`text-3xl font-bold text-${item.color}-600`}>{item.letter}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{item.title}</h3>
                <p className="text-sm text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl"
          >
            <p className="text-center text-gray-700">
              <strong>Important:</strong> If you notice any of these warning signs, or if a mole looks 
              different from others, consult a dermatologist immediately. Early detection significantly 
              improves treatment outcomes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
