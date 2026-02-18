import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { ArrowRight, Upload, X } from 'lucide-react'
import UploadCard from '../components/UploadCard'
import ProcessingLoader from '../components/ProcessingLoader'
import ResultCard from '../components/ResultCard'
import ExplainableAI from '../components/ExplainableAI'
import RecommendationPanel from '../components/RecommendationPanel'

// ─── 7 Lesion Classes ────────────────────────────────────────────────────────
const LESION_CLASSES = [
  { code:'mel',   name:'Melanoma',             short:'MEL',  risk:'High',     riskColor:'#ef4444', bg:'#fef2f2', border:'#fecaca', icon:'🔴', desc:'Most dangerous form of skin cancer. Arises from pigment-producing melanocytes.' },
  { code:'bcc',   name:'Basal Cell Carcinoma', short:'BCC',  risk:'High',     riskColor:'#ef4444', bg:'#fef2f2', border:'#fecaca', icon:'🟥', desc:'Most common skin cancer. Rarely spreads but requires prompt treatment.' },
  { code:'akiec', name:'Actinic Keratosis',    short:'AK',   risk:'High',     riskColor:'#ef4444', bg:'#fef2f2', border:'#fecaca', icon:'⚠️', desc:'Precancerous lesion caused by UV damage. Can evolve into squamous cell carcinoma.' },
  { code:'bkl',   name:'Benign Keratosis',     short:'BKL',  risk:'Moderate', riskColor:'#f59e0b', bg:'#fffbeb', border:'#fde68a', icon:'🟡', desc:'Non-cancerous skin growth. Includes seborrheic keratoses and solar lentigines.' },
  { code:'df',    name:'Dermatofibroma',        short:'DF',   risk:'Moderate', riskColor:'#f59e0b', bg:'#fffbeb', border:'#fde68a', icon:'🟠', desc:'Benign fibrous nodule in the skin. Generally harmless and rarely needs treatment.' },
  { code:'vasc',  name:'Vascular Lesion',       short:'VASC', risk:'Moderate', riskColor:'#f59e0b', bg:'#fffbeb', border:'#fde68a', icon:'🫀', desc:'Includes cherry angiomas and hemangiomas. Generally benign but should be monitored.' },
  { code:'nv',    name:'Melanocytic Nevi',       short:'NV',   risk:'Low',      riskColor:'#10b981', bg:'#f0fdf4', border:'#bbf7d0', icon:'🟢', desc:'Common moles. Benign but should be monitored for changes in size, shape, or color.' },
]

// ─── Radial Overlay Modal ─────────────────────────────────────────────────────
// Renders as a fixed-position fullscreen overlay — zero parent clipping possible.
// Uses a 500×500 SVG for the orbit ring + connector lines,
// and absolutely-positioned divs (inside a known-size container) for the nodes.
const RadialOverlay = ({ onClose }) => {
  const [hovered, setHovered] = useState(null)

  const SIZE = 500        // canvas square px
  const C    = SIZE / 2   // center = 250
  const R    = 185        // orbit radius px
  const NS   = 80         // node diameter px
  const NH   = NS / 2     // node half

  const nodes = LESION_CLASSES.map((cls, i) => {
    const deg = -90 + (i * 360) / 7
    const rad = (deg * Math.PI) / 180
    return { ...cls, cx: C + R * Math.cos(rad), cy: C + R * Math.sin(rad) }
  })

  const hovClass = hovered !== null ? LESION_CLASSES[hovered] : null

  // Close on Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    // Full-screen backdrop — fixed, covers everything, z-index 9999
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}  // click backdrop to close
    >
      {/* Inner container — stops backdrop click from closing when clicking nodes */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}
      >

        {/* ── SVG layer: orbit ring + connector lines ── */}
        <svg
          width={SIZE} height={SIZE}
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        >
          {/* Outer orbit circle */}
          <motion.circle
            cx={C} cy={C} r={R}
            fill="none" stroke="rgba(147,197,253,0.5)" strokeWidth="1.5" strokeDasharray="8 5"
            initial={{ opacity: 0, r: 0 }} animate={{ opacity: 1, r: R }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Connector lines */}
          {nodes.map((n, i) => (
            <motion.line key={n.code}
              x1={C} y1={C} x2={n.cx} y2={n.cy}
              stroke={n.riskColor} strokeWidth="1.5" strokeOpacity={hovered === i ? 0.7 : 0.25} strokeDasharray="5 4"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              style={{ transition: 'stroke-opacity 0.2s' }}
            />
          ))}
        </svg>

        {/* ── Center button ── */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="focus:outline-none"
          style={{
            position: 'absolute',
            top:  C - 48, left: C - 48,
            width: 96, height: 96,
            borderRadius: '50%',
            zIndex: 10,
          }}
        >
          <div className="w-full h-full rounded-full bg-blue-600 flex flex-col items-center justify-center"
            style={{ boxShadow: '0 0 0 10px rgba(59,130,246,0.15), 0 0 0 20px rgba(59,130,246,0.07), 0 8px 32px rgba(59,130,246,0.4)' }}
          >
            <p className="text-white font-black text-2xl leading-none">7</p>
            <p className="text-blue-200 text-[9px] font-bold tracking-widest mt-1">CLASSES</p>
          </div>
        </motion.button>

        {/* ── 7 Orbit nodes ── */}
        {nodes.map((n, i) => (
          <motion.div
            key={n.code}
            style={{
              position: 'absolute',
              // Anchor at canvas center
              top:  C - NH,
              left: C - NH,
              width:  NS,
              height: NS,
              cursor: 'pointer',
              zIndex: 5,
            }}
            // Animate from center outward using x/y transforms
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: n.cx - C,
              y: n.cy - C,
              opacity: 1,
              scale: hovered === i ? 1.18 : 1,
            }}
            transition={{
              x:       { delay: 0.12 + i * 0.07, duration: 0.55, type: 'spring', stiffness: 200, damping: 18 },
              y:       { delay: 0.12 + i * 0.07, duration: 0.55, type: 'spring', stiffness: 200, damping: 18 },
              opacity: { delay: 0.12 + i * 0.07, duration: 0.3 },
              scale:   { duration: 0.2 },
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-full h-full rounded-full flex flex-col items-center justify-center select-none"
              style={{
                background: n.bg,
                border: `3px solid ${hovered === i ? n.riskColor : n.border}`,
                boxShadow: hovered === i
                  ? `0 0 0 5px ${n.riskColor}30, 0 8px 28px ${n.riskColor}40`
                  : '0 4px 16px rgba(0,0,0,0.18)',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{n.icon}</span>
              <span className="text-[10px] font-black mt-1 tracking-wide" style={{ color: n.riskColor }}>
                {n.short}
              </span>
            </div>
          </motion.div>
        ))}

        {/* ── Hover tooltip — appears below a hovered node ── */}
        <AnimatePresence>
          {hovClass && (
            <motion.div
              key={hovClass.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                // Position the tooltip at the bottom of the canvas, centered
                bottom: -120,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 300,
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <div className="rounded-2xl p-4 shadow-2xl border-2"
                style={{ background: hovClass.bg, borderColor: hovClass.riskColor }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ fontSize: 28 }}>{hovClass.icon}</span>
                  <div className="flex-1">
                    <p className="font-black text-gray-800 text-sm leading-tight">{hovClass.name}</p>
                    <p className="text-[10px] font-mono text-gray-400 tracking-widest mt-0.5">{hovClass.code.toUpperCase()}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: hovClass.riskColor + '22', color: hovClass.riskColor }}
                  >
                    {hovClass.risk} Risk
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{hovClass.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Close button (top-right of canvas) ── */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="focus:outline-none"
          style={{ position: 'absolute', top: -16, right: -16, zIndex: 20 }}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
            <X className="w-5 h-5 text-gray-600" />
          </div>
        </motion.button>

        {/* ── Instruction text below canvas ── */}
        <div style={{ position: 'absolute', bottom: -52, left: 0, right: 0 }}
          className="text-center"
        >
          <p className="text-white/70 text-sm font-medium">
            Hover any node to learn more · Click center or press <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs">Esc</kbd> to close
          </p>
        </div>

        {/* ── Risk legend ── */}
        <div style={{ position: 'absolute', top: -52, left: 0, right: 0 }}
          className="flex items-center justify-center gap-4"
        >
          <p className="text-white font-bold text-sm mr-2">7 Skin Lesion Classes</p>
          {[
            { label: 'High (3)',     color: '#ef4444' },
            { label: 'Moderate (3)', color: '#f59e0b' },
            { label: 'Low (1)',       color: '#10b981' },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
              {r.label}
            </div>
          ))}
        </div>

      </motion.div>
    </motion.div>
  )
}

// ─── Card 1: Animated Dataset Ring ───────────────────────────────────────────
const DatasetRing = () => {
  const [count, setCount]       = useState(0)
  const [progress, setProgress] = useState(0)
  const target    = 10015
  const inViewRef = useRef(false)
  const ref       = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inViewRef.current) {
        inViewRef.current = true
        let start = 0
        const step      = 16
        const increment = target / (1800 / step)
        const timer = setInterval(() => {
          start += increment
          if (start >= target) { setCount(target); setProgress(100); clearInterval(timer) }
          else { setCount(Math.floor(start)); setProgress((start / target) * 100) }
        }, step)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const r = 44, circ = 2 * Math.PI * r, dash = (progress / 100) * circ

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#dbeafe" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
            style={{ transition:'stroke-dasharray 0.05s linear', filter:'drop-shadow(0 0 6px #3b82f6)' }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-blue-700 leading-none font-mono">{count.toLocaleString()}</span>
          <span className="text-[10px] text-blue-400 font-semibold mt-0.5 tracking-wide">IMAGES</span>
        </div>
      </div>
      <p className="mt-3 text-base font-bold text-gray-800">Training Dataset</p>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
        <span className="text-xs text-gray-500 font-medium">ISIC 2018 Benchmark</span>
      </div>
      <div className="mt-3 flex items-end gap-1" style={{ height: 32 }}>
        {[65,45,38,30,25,20,18].map((h,i) => (
          <motion.div key={i}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ delay: 0.5 + i*0.08, duration:0.4, ease:'easeOut' }}
            style={{ height:`${h}%`, width:10, background: i<3?'#ef4444':i<6?'#f59e0b':'#10b981',
              opacity:0.7, transformOrigin:'bottom', borderRadius:'2px 2px 0 0' }}
          />
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-1">Risk distribution across classes</p>
    </div>
  )
}

// ─── Card 2: Compact trigger (opens the overlay) ──────────────────────────────
const LesionTypesCard = ({ onOpen }) => (
  <div className="flex flex-col items-center">
    <motion.button
      onClick={onOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="focus:outline-none relative"
    >
      {/* Spinning dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ position:'absolute', width:88, height:88, top:-4, left:-4,
          border:'2px dashed #93c5fd', borderRadius:'50%', opacity:0.7, pointerEvents:'none' }}
      />
      {/* 7 colored dots on the ring */}
      {[0,1,2,3,4,5,6].map(i => {
        const a = (i/7)*2*Math.PI
        const colors = ['#ef4444','#ef4444','#ef4444','#f59e0b','#f59e0b','#f59e0b','#10b981']
        return (
          <div key={i} style={{ position:'absolute', width:7, height:7, borderRadius:'50%',
            background:colors[i], top:`${50+44*Math.sin(a)}%`, left:`${50+44*Math.cos(a)}%`,
            transform:'translate(-50%,-50%)', boxShadow:`0 0 4px ${colors[i]}`, pointerEvents:'none'
          }} />
        )
      })}
      {/* Center orb */}
      <div className="w-20 h-20 rounded-full bg-blue-600 flex flex-col items-center justify-center shadow-lg shadow-blue-200">
        <p className="text-white font-black text-2xl leading-none">7</p>
        <p className="text-blue-200 text-[9px] font-bold tracking-widest mt-0.5">CLASS</p>
      </div>
    </motion.button>

    <div className="text-center mt-3">
      <p className="text-base font-bold text-gray-800">Lesion Types</p>
      <p className="text-xs text-gray-400 mt-0.5 group-hover:text-blue-500">Click to explore in circle</p>
    </div>

    {/* Mini risk legend */}
    <div className="mt-4 flex flex-col gap-1.5 w-full">
      {[
        { label:'High Risk',     count:3, color:'#ef4444', bg:'#fef2f2' },
        { label:'Moderate Risk', count:3, color:'#f59e0b', bg:'#fffbeb' },
        { label:'Low Risk',      count:1, color:'#10b981', bg:'#f0fdf4' },
      ].map(r => (
        <div key={r.label} className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: r.bg, color: r.color }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
            {r.label}
          </div>
          <span className="font-black">{r.count} types</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── Card 3: AI Radar Scanner ─────────────────────────────────────────────────
const ScanPulse = () => (
  <div className="flex flex-col items-center">
    <div className="relative w-32 h-32">
      {[32,48,60].map((r,i) => (
        <div key={i} className="absolute rounded-full border border-blue-200"
          style={{ width:r*2, height:r*2, top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.5-i*0.12 }}
        />
      ))}
      <motion.div className="absolute inset-0" animate={{ rotate:360 }}
        transition={{ duration:2.5, repeat:Infinity, ease:'linear' }}
      >
        <div style={{ position:'absolute', width:'50%', height:1.5, top:'50%', left:'50%',
          transformOrigin:'0% 50%', background:'linear-gradient(to right, transparent, #3b82f6)',
          filter:'drop-shadow(0 0 3px #3b82f6)' }}
        />
      </motion.div>
      <motion.div className="absolute rounded-full bg-cyan-400"
        style={{ width:6, height:6, top:'28%', left:'68%' }}
        animate={{ opacity:[0,1,0], scale:[0.5,1.4,0.5] }}
        transition={{ duration:2.5, repeat:Infinity, delay:0.3 }}
      />
      <motion.div className="absolute rounded-full bg-green-400"
        style={{ width:5, height:5, top:'60%', left:'35%' }}
        animate={{ opacity:[0,1,0], scale:[0.5,1.3,0.5] }}
        transition={{ duration:2.5, repeat:Infinity, delay:1.1 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-300" />
      </div>
    </div>
    <p className="mt-3 text-base font-bold text-gray-800">AI Detection Speed</p>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="text-3xl font-black text-blue-700 font-mono">&lt;2</span>
      <span className="text-sm text-blue-500 font-semibold">seconds</span>
    </div>
    <div className="mt-2 grid grid-cols-3 gap-2 w-full text-center">
      {[
        { label:'Preprocess', val:'0.3s', color:'#60a5fa' },
        { label:'Inference',  val:'1.2s', color:'#34d399' },
        { label:'Report',     val:'0.2s', color:'#a78bfa' },
      ].map(s => (
        <div key={s.label}>
          <div className="text-[11px] font-bold" style={{ color:s.color }}>{s.val}</div>
          <div className="text-[9px] text-gray-400 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Main Home Component ──────────────────────────────────────────────────────
const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing,   setIsAnalyzing]   = useState(false)
  const [result,        setResult]        = useState(null)
  const [error,         setError]         = useState(null)
  const [showOverlay,   setShowOverlay]   = useState(false)   // ← controls radial overlay

  const handleAnalyze = async () => {
    if (!selectedImage) { setError('Please select an image first'); return }
    setIsAnalyzing(true); setError(null); setResult(null)
    const formData = new FormData()
    formData.append('file', selectedImage)
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setTimeout(() => { setResult(res.data); setIsAnalyzing(false) }, 4800)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze image. Please ensure the backend server is running.')
      setIsAnalyzing(false)
    }
  }

  const scrollToUpload = () => document.getElementById('upload-section')?.scrollIntoView({ behavior:'smooth' })

  return (
    <div className="min-h-screen">

      {/* ── Fixed overlay — renders on top of everything, no clipping ────────── */}
      <AnimatePresence>
        {showOverlay && <RadialOverlay onClose={() => setShowOverlay(false)} />}
      </AnimatePresence>

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }} className="text-center"
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
              <button onClick={scrollToUpload}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" /><span>Upload Image Now</span>
              </button>
              <a href="/how-it-works"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Learn More</span><ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* ── Stats Cards ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.3 }} className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 shadow-lg border border-blue-50 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                <DatasetRing />
              </div>

              {/* Card 2 — clicking opens the fixed-position radial overlay */}
              <div className="bg-white rounded-2xl p-7 shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col items-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md tracking-widest uppercase">
                    Interactive
                  </span>
                </div>
                <LesionTypesCard onOpen={() => setShowOverlay(true)} />
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 shadow-lg border border-blue-50 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                <ScanPulse />
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Upload Section ───────────────────────────────────────────────────── */}
      <section id="upload-section" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <UploadCard
            onImageSelect={(file) => { setSelectedImage(file); setResult(null); setError(null) }}
            isLoading={isAnalyzing}
          />
          {selectedImage && !isAnalyzing && !result && (
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mt-6">
              <button onClick={handleAnalyze}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Analyze Image with AI
              </button>
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
            >
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Processing Animation ─────────────────────────────────────────────── */}
      {isAnalyzing && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><ProcessingLoader /></div>
        </section>
      )}

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      {result && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResultCard result={result} />
            <ExplainableAI diagnosis={result.diagnosis} />
            <RecommendationPanel riskLevel={result.risk_level} />
          </div>
        </section>
      )}

      {/* ── ABCDE Awareness ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The ABCDE Rule of Melanoma</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn the warning signs that may indicate melanoma, the most serious type of skin cancer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { letter:'A', title:'Asymmetry', description:'One half of the mole does not match the other half',                       color:'blue'   },
              { letter:'B', title:'Border',    description:'Edges are irregular, ragged, notched, or blurred',                         color:'purple' },
              { letter:'C', title:'Color',     description:'Color is not uniform — shades of brown, black, pink, red, white, or blue', color:'indigo' },
              { letter:'D', title:'Diameter',  description:'The spot is larger than 6mm (about the size of a pencil eraser)',           color:'cyan'   },
              { letter:'E', title:'Evolving',  description:'The mole is changing in size, shape, or color over time',                  color:'teal'   },
            ].map((item, index) => (
              <motion.div key={item.letter}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:index*0.1 }}
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
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.5 }}
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