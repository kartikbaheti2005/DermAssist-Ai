import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

const ResultCard = ({ result }) => {
  const getRiskConfig = (riskLevel) => {
    if (riskLevel.includes('Low')) {
      return {
        color: 'green',
        bgColor: 'bg-medical-lightGreen',
        borderColor: 'border-medical-green',
        textColor: 'text-medical-green',
        icon: CheckCircle,
      }
    } else if (riskLevel.includes('Moderate')) {
      return {
        color: 'yellow',
        bgColor: 'bg-medical-lightYellow',
        borderColor: 'border-medical-yellow',
        textColor: 'text-medical-yellow',
        icon: AlertTriangle,
      }
    } else {
      return {
        color: 'red',
        bgColor: 'bg-medical-lightRed',
        borderColor: 'border-medical-red',
        textColor: 'text-medical-red',
        icon: AlertCircle,
      }
    }
  }

  const config = getRiskConfig(result.risk_level)
  const Icon = config.icon

  const getLesionName = (diagnosis) => {
    const names = {
      'mel': 'Melanoma',
      'bcc': 'Basal Cell Carcinoma',
      'akiec': 'Actinic Keratosis',
      'bkl': 'Benign Keratosis',
      'df': 'Dermatofibroma',
      'nv': 'Melanocytic Nevus',
      'vasc': 'Vascular Lesion'
    }
    return names[diagnosis] || diagnosis
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8"
    >
      <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-2xl shadow-xl p-8`}>
        <div className="text-center">
          <Icon className={`w-16 h-16 mx-auto mb-4 ${config.textColor}`} />
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
          
          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">Classification</p>
            <p className="text-xl font-semibold text-gray-800">{getLesionName(result.diagnosis)}</p>
          </div>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">Risk Assessment</p>
            <p className={`text-4xl font-bold ${config.textColor}`}>{result.risk_level}</p>
          </div>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">Confidence Score</p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-3 rounded-full bg-${config.color}-600`}
                  style={{ 
                    backgroundColor: config.color === 'green' ? '#10B981' : 
                                    config.color === 'yellow' ? '#F59E0B' : '#EF4444' 
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultCard
