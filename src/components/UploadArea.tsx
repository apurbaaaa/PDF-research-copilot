import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProcessingResults } from "./ProcessingResults";
import { useToast } from "@/hooks/use-toast";

interface UploadAreaProps {
  onDocumentSelect: (doc: any) => void;
}

export const UploadArea = ({ onDocumentSelect }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedDocument, setProcessedDocument] = useState<any>(null);
  const { toast } = useToast();

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
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file:', file.name);
      
      const response = await fetch('http://localhost:4000/api/papers/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Processing result:', result);

      // Check if there was an AI processing error but file was still saved
      if (result.error) {
        toast({
          title: "Partial Success",
          description: "File uploaded but AI processing failed. You can still view the document.",
          variant: "destructive",
        });
      }

      const processedDoc = {
        id: result.id || Date.now(),
        title: result.title || file.name.replace('.pdf', ''),
        author: "Unknown Author", // Backend doesn't extract author yet
        year: new Date().getFullYear(),
        summary: result.summary || "No summary available",
        citations: result.citations || [],
        tags: result.keywords || [], // Map keywords to tags for frontend compatibility
        keywords: result.keywords || [],
        methodology: result.methodology || "Not specified",
        uploadDate: result.uploadDate,
        fileSize: result.fileSize,
        file: file
      };
      
      setProcessedDocument(processedDoc);
      
      if (!result.error) {
        toast({
          title: "Success!",
          description: "Your document has been processed successfully.",
        });
      }
      
    } catch (error) {
      console.error('Error processing file:', error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process the document. Make sure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        processFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveToLibrary = () => {
    if (processedDocument) {
      onDocumentSelect(processedDocument);
      setProcessedDocument(null);
    }
  };

  const handleProcessAnother = () => {
    setProcessedDocument(null);
  };

  if (processedDocument) {
    return (
      <div>
        <ProcessingResults document={processedDocument} />
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={handleSaveToLibrary}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save to Library
          </button>
          <button 
            onClick={handleProcessAnother}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Process Another
          </button>
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent mb-4">
          Research Copilot
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload your research papers and get AI-powered summaries, citations, and intelligent organization
        </p>
      </div>
      
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
    </div>
  );
};
