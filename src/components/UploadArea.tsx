
import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onDocumentSelect: (doc: any) => void;
}

export const UploadArea = ({ onDocumentSelect }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length > 0) {
      processFile(pdfFiles[0]);
    }
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockDocument = {
      id: Date.now(),
      title: file.name.replace('.pdf', ''),
      author: "Dr. Smith et al.",
      year: 2024,
      summary: "This research paper explores advanced machine learning techniques for natural language processing, with a focus on transformer architectures and their applications in scientific literature analysis.",
      citations: [
        "According to the findings, transformer models show 85% accuracy improvement over traditional methods.",
        "The study demonstrates that attention mechanisms are crucial for understanding context.",
        "Results indicate significant potential for automated research assistance applications."
      ],
      tags: ["Machine Learning", "NLP", "AI"],
      file: file
    };
    
    setIsProcessing(false);
    onDocumentSelect(mockDocument);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      processFile(file);
    }
  };

  if (isProcessing) {
    return (
      <div className="bg-white/80 backdrop-blur-xl border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center shadow-lg">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          <h3 className="text-xl font-semibold text-slate-900">AI Processing Your Document</h3>
        </div>
        <p className="text-slate-600">Generating summary, extracting citations, and analyzing content...</p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "bg-white/80 backdrop-blur-xl border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 shadow-lg hover:shadow-xl",
        isDragging 
          ? "border-blue-500 bg-blue-50/50 scale-105" 
          : "border-slate-300 hover:border-blue-400"
      )}
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Upload className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-semibold text-slate-900 mb-4">
        Upload Your Research Paper
      </h3>
      
      <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
        Drag and drop a PDF file here, or click to browse and select from your computer
      </p>
      
      <label className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <FileText className="w-5 h-5" />
        Choose PDF File
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
      
      <div className="mt-8 text-sm text-slate-500">
        Supported format: PDF (up to 50MB)
      </div>
    </div>
  );
};
