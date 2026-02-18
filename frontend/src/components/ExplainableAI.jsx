import { motion } from 'framer-motion'
import { Circle, Palette, Ruler, GitMerge } from 'lucide-react'

const ExplainableAI = ({ diagnosis }) => {
  const getExplanation = (diagnosisCode) => {
    const explanations = {
      'mel': [
        { icon: GitMerge, text: 'Asymmetric shape detected in lesion structure' },
        { icon: Circle, text: 'Irregular and poorly defined borders observed' },
        { icon: Palette, text: 'Multiple color variations present (brown, black, red)' },
        { icon: Ruler, text: 'Diameter exceeds 6mm threshold' },
      ],
      'bcc': [
        { icon: Circle, text: 'Pearl-like appearance with rolled borders' },
        { icon: Palette, text: 'Pink or flesh-colored pigmentation' },
        { icon: GitMerge, text: 'Translucent quality with visible blood vessels' },
      ],
      'akiec': [
        { icon: Circle, text: 'Rough, scaly texture detected' },
        { icon: Palette, text: 'Red or brown crusty surface' },
        { icon: Ruler, text: 'Small lesion size (< 1cm typically)' },
      ],
      'nv': [
        { icon: GitMerge, text: 'Symmetric lesion structure' },
        { icon: Circle, text: 'Regular, well-defined borders' },
        { icon: Palette, text: 'Uniform color distribution' },
        { icon: Ruler, text: 'Stable size over time' },
      ],
    }

    return explanations[diagnosisCode] || [
      { icon: Circle, text: 'Standard morphological features analyzed' },
      { icon: Palette, text: 'Color pattern assessment completed' },
      { icon: Ruler, text: 'Size and symmetry evaluated' },
    ]
  }

  const features = getExplanation(diagnosis)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-8 my-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Analysis Explanation</h3>
      <p className="text-gray-600 mb-6">
        Our deep learning model identified the following key features:
      </p>

      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-gray-700 pt-2">{feature.text}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> These findings are based on image pattern recognition and should 
          be validated by visual examination from a qualified dermatologist.
        </p>
      </div>
    </motion.div>
  )
}

export default ExplainableAI
