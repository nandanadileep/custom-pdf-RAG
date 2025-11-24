import { useRef, useState } from 'react';
import { Upload, Heart, Sparkles } from 'lucide-react';
import axios from 'axios';

interface UploadCardProps {
  onUploadComplete: (filename: string) => void;
}

// Use relative URL so it works in both dev and production
const API_URL = '';

const UploadCard = ({ onUploadComplete }: UploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file || file.type !== 'application/pdf') return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('filename', file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      onUploadComplete(res.data.filename); 
    } catch (err) {
      console.error("Upload failed", err);
      alert("Oops! Couldn't upload the PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div 
        className={`
          relative w-96 h-80 bg-white dark:bg-gray-800 rounded-3xl 
          border-4 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4
          shadow-[0_10px_40px_-15px_rgba(253,164,175,0.5)]
          ${isDragging ? 'border-kawaii-400 scale-105 bg-kawaii-50' : 'border-kawaii-200'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <div className="absolute -top-6 bg-kawaii-300 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
           <Sparkles size={18} /> PDF Zone
        </div>

        <div className="p-6 bg-kawaii-100 dark:bg-gray-700 rounded-full mb-2 animate-bounce-slow">
          <Upload className="w-10 h-10 text-kawaii-500" />
        </div>

        <div className="text-center px-8">
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
            Drop your PDF here!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click the button below to browse
          </p>
        </div>

        <input 
          type="file" 
          accept=".pdf" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="mt-4 bg-gradient-to-r from-kawaii-300 to-kawaii-400 hover:from-kawaii-400 hover:to-kawaii-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <span className="animate-pulse">Processing... 🐰</span>
          ) : (
            <>Process PDF <Heart size={18} fill="currentColor" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadCard;