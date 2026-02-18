# DermAssist AI - Frontend

Production-ready React frontend for AI-based skin cancer screening using smartphone images.

## 🏥 Overview

DermAssist AI is a healthcare screening web application that uses deep learning to analyze skin lesion images and provide risk assessment. This is the frontend interface built with modern web technologies.

## 🛠 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar
│   ├── Footer.jsx              # Footer with disclaimers
│   ├── UploadCard.jsx          # Image upload interface
│   ├── ProcessingLoader.jsx   # AI processing animation
│   ├── ResultCard.jsx          # Risk assessment display
│   ├── ExplainableAI.jsx       # AI explanation panel
│   └── RecommendationPanel.jsx # Medical recommendations
├── pages/
│   ├── Home.jsx                # Main screening page
│   ├── HowItWorks.jsx          # Process explanation
│   ├── About.jsx               # Mission & impact
│   └── Safety.jsx              # Medical disclaimers
├── layout/
│   └── Layout.jsx              # Main layout wrapper
├── App.jsx                     # Router configuration
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://127.0.0.1:8000`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 🔌 Backend Integration

The frontend connects to a FastAPI backend at `http://127.0.0.1:8000/predict`

### API Endpoint

**POST** `/predict`

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (image file - JPEG or PNG)

**Response:**
```json
{
  "diagnosis": "mel",
  "risk_level": "High Risk",
  "confidence": 0.87
}
```

### Diagnosis Codes

- `mel` - Melanoma (High Risk)
- `bcc` - Basal Cell Carcinoma (High Risk)
- `akiec` - Actinic Keratosis (High Risk)
- `bkl` - Benign Keratosis (Moderate Risk)
- `df` - Dermatofibroma (Moderate Risk)
- `vasc` - Vascular Lesion (Moderate Risk)
- `nv` - Melanocytic Nevus (Low Risk)

## 🎨 Design System

### Color Palette

- **Primary Blue:** `#3B82F6` - Trust, medical professionalism
- **Light Blue:** `#EFF6FF` - Backgrounds, cards
- **Green:** `#10B981` - Low risk, positive outcomes
- **Yellow:** `#F59E0B` - Moderate risk, caution
- **Red:** `#EF4444` - High risk, urgent attention

### Typography

- Font: System font stack (optimized for readability)
- Headings: Bold, 2xl-5xl sizes
- Body: Regular, base-lg sizes

### Spacing

- Large spacing throughout (p-6, p-8, p-10)
- Consistent gaps (gap-4, gap-6, gap-8)
- Generous padding in cards and sections

## 📱 Features

### Home Page

1. **Hero Section** - Value proposition and CTA
2. **Upload Interface** - Drag & drop image upload
3. **Processing Animation** - Step-by-step AI pipeline visualization
4. **Results Display** - Risk level with confidence score
5. **Explainable AI** - Feature detection explanation
6. **Recommendations** - Risk-based medical guidance
7. **ABCDE Guide** - Melanoma awareness education

### How It Works

- Step-by-step process explanation
- Technical architecture details
- Model training information
- Classification categories

### About

- Problem statement
- Solution approach
- Social impact
- Future vision and roadmap

### Safety

- Medical disclaimers
- Tool limitations
- Responsible use guidelines
- When to seek immediate care
- Data privacy information

## 🔒 Medical Compliance

**CRITICAL:** This application includes comprehensive medical disclaimers:

- Not a diagnostic tool
- Screening assistance only
- Must consult dermatologist
- FDA not approved
- Image quality dependent
- Known limitations documented

## 🎭 Animations

All animations use Framer Motion with:
- Fade-in effects (0.5s duration)
- Slide-up transitions (0.6s duration)
- Staggered reveals for lists
- Smooth progress indicators

## 📐 Responsive Design

- Desktop-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes

## 🧪 State Management

Using React hooks:
- `useState` for local component state
- `useRef` for file input handling
- Form data management with FormData API
- Error handling and loading states

## 🌐 Routing

Routes configured with React Router v6:

- `/` - Home (screening interface)
- `/how-it-works` - Process explanation
- `/about` - Mission and impact
- `/safety` - Medical disclaimers

## ⚡ Performance

- Code splitting with React lazy loading (can be added)
- Optimized image handling
- Efficient re-renders with proper key usage
- Tailwind CSS purging in production

## 🔧 Configuration Files

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `package.json` - Dependencies and scripts

## 📝 License

Educational and screening purposes only. Not for commercial medical use.

## ⚠️ Important Notes

1. **Backend Required:** Frontend expects backend at `http://127.0.0.1:8000`
2. **CORS:** Backend must enable CORS for frontend origin
3. **Medical Use:** Include all disclaimers when deploying
4. **Image Format:** Supports JPEG and PNG only
5. **File Size:** Recommend max 10MB uploads

## 🆘 Troubleshooting

### Backend Connection Failed
- Ensure backend server is running
- Check CORS configuration
- Verify endpoint URL matches

### Upload Not Working
- Check file format (JPEG/PNG only)
- Verify file size under limit
- Check browser console for errors

### Styling Issues
- Run `npm install` to ensure Tailwind is installed
- Check PostCSS configuration
- Clear browser cache

## 🚀 Deployment

For production deployment:

1. Update API endpoint in `src/pages/Home.jsx`
2. Build: `npm run build`
3. Deploy `dist/` folder to hosting service
4. Configure environment variables for API URL
5. Ensure HTTPS for production
6. Add proper error tracking

## 📞 Support

For issues or questions:
- Check backend logs first
- Review browser console errors
- Verify all dependencies installed
- Ensure Node.js version compatibility

---

**Remember:** This is a screening tool, not a diagnostic tool. Always include proper medical disclaimers and encourage users to consult healthcare professionals.
