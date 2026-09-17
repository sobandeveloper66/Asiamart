import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCamera, FiLoader } from 'react-icons/fi';

export default function ImageSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [scanStatus, setScanStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Preset mock images for evaluation
  const PRESETS = [
    {
      id: 'ramen',
      name: 'Ramen Bowl',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=80',
      matchId: 'hakata-ramen'
    },
    {
      id: 'teapot',
      name: 'Ceramic Teapot',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&auto=format&fit=crop&q=80',
      matchId: 'minimalist-tea-set'
    },
    {
      id: 'essence',
      name: 'Cosmetics Bottle',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80',
      matchId: 'cosrx-snail-mucin'
    },
    {
      id: 'keyboard',
      name: 'Mechanical Keyboard',
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=200&auto=format&fit=crop&q=80',
      matchId: 'rk61-keyboard'
    }
  ];

  const handleSelectPreset = (preset) => {
    if (isScanning) return;
    setSelectedPreset(preset);
    setIsScanning(true);
    setProgress(0);
  };

  // Handles actual file upload selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  // Handles drag & drop events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const processUploadedFile = (file) => {
    const url = URL.createObjectURL(file);
    const fileName = file.name.toLowerCase();
    
    let matchId = 'rk61-keyboard'; // Default fallback
    
    if (fileName.includes('key') || fileName.includes('board') || fileName.includes('kb')) {
      matchId = 'rk61-keyboard';
    } else if (fileName.includes('tea') || fileName.includes('cup') || fileName.includes('pot') || fileName.includes('matcha')) {
      matchId = 'minimalist-tea-set';
    } else if (fileName.includes('ramen') || fileName.includes('noodle') || fileName.includes('soup') || fileName.includes('food') || fileName.includes('samyang')) {
      matchId = 'hakata-ramen';
    } else if (fileName.includes('skin') || fileName.includes('mucin') || fileName.includes('face') || fileName.includes('mask') || fileName.includes('cream') || fileName.includes('cosrx') || fileName.includes('essence')) {
      matchId = 'cosrx-snail-mucin';
    } else {
      // Pick a random preset matches fallback
      const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      matchId = randomPreset.matchId;
    }

    setSelectedPreset({
      id: 'uploaded',
      name: file.name,
      image: url,
      matchId
    });
    setIsScanning(true);
    setProgress(0);
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!isScanning) return;

    // Phase transitions for AI simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            onClose();
            navigate(`/product/${selectedPreset.matchId}`);
            setSelectedPreset(null);
          }, 600);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning, selectedPreset, navigate, onClose]);

  // Update status labels based on progress percentage
  useEffect(() => {
    if (progress < 30) {
      setScanStatus('AI: Extracting image feature points...');
    } else if (progress < 65) {
      setScanStatus('AI: Searching neural catalog database...');
    } else if (progress < 90) {
      setScanStatus('AI: Matching product specifications...');
    } else {
      setScanStatus('AI: Match Found! Redirecting...');
    }
  }, [progress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close (disabled during scanning) */}
      <div className="absolute inset-0" onClick={() => !isScanning && onClose()} />

      <div className="relative w-full max-w-md rounded-2xl border border-[#1f1f1f] bg-[#161616] p-6 shadow-2xl z-10 space-y-6">
        
        {/* Close Button */}
        {!isScanning && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white p-1 cursor-pointer"
          >
            <FiX size={20} />
          </button>
        )}

        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <FiCamera className="text-brand-red animate-pulse" />
            Find Product by Image
          </h3>
          <p className="text-xs text-zinc-500 font-light max-w-sm mx-auto">
            Upload an image of an Asian product (e.g. ramen, teapots, skincare, keyboard) to find it instantly using mock AI detection.
          </p>
        </div>

        {/* Upload Zone / Scanning display */}
        {isScanning && selectedPreset ? (
          <div className="rounded-xl border border-dashed border-brand-red/40 bg-brand-red/5 p-6 flex flex-col items-center justify-center space-y-4">
            <img src={selectedPreset.image} alt="Scanning" className="w-24 h-24 object-cover rounded-lg border border-brand-red/20 animate-pulse" />
            <div className="w-full space-y-2 text-center">
              <span className="text-xs text-brand-peach font-semibold flex items-center justify-center gap-1.5">
                <FiLoader className="animate-spin text-brand-red" />
                {scanStatus}
              </span>
              
              {/* Progress bar */}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-red h-full rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">{progress}% Complete</span>
            </div>
          </div>
        ) : (
          <div 
            onClick={handleBrowseClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="rounded-xl border-2 border-dashed border-[#2d2d2d] hover:border-brand-red/30 hover:bg-brand-red/5 bg-zinc-950/60 p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <FiCamera size={36} className="text-zinc-600" />
            <div>
              <p className="text-xs font-bold text-zinc-300">Drag & drop your file here</p>
              <p className="text-[10px] text-zinc-600 mt-1">Accepts JPG, PNG formats up to 5MB</p>
            </div>
            <button 
              type="button"
              onClick={handleBrowseClick}
              className="text-[10px] font-bold text-white bg-zinc-800 hover:bg-zinc-700 py-1.5 px-3 rounded-md transition-colors cursor-pointer"
            >
              Browse Files
            </button>
          </div>
        )}

        {/* Preset Selector */}
        {!isScanning && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Try Demo Images</h4>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="group relative rounded-lg overflow-hidden aspect-square border border-[#2d2d2d] hover:border-brand-red/50 cursor-pointer transition-all bg-zinc-950"
                  title={`Search for ${preset.name}`}
                >
                  <img src={preset.image} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-[9px] text-white font-bold text-center leading-none">
                    {preset.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
