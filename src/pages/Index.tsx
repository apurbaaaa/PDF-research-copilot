
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { UploadArea } from "../components/UploadArea";
import { DocumentViewer } from "../components/DocumentViewer";
import { LibraryView } from "../components/LibraryView";
import { Header } from "../components/Header";

const Index = () => {
  const [activeView, setActiveView] = useState<'upload' | 'library' | 'document'>('upload');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    setActiveView('document');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex w-full">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 p-6">
          {activeView === 'upload' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent mb-4">
                  Research Copilot
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Upload your research papers and get AI-powered summaries, citations, and intelligent organization
                </p>
              </div>
              <UploadArea onDocumentSelect={handleDocumentSelect} />
            </div>
          )}
          
          {activeView === 'library' && (
            <LibraryView onDocumentSelect={handleDocumentSelect} />
          )}
          
          {activeView === 'document' && selectedDocument && (
            <DocumentViewer document={selectedDocument} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
