
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { UploadArea } from "../components/UploadArea";
import { DocumentViewer } from "../components/DocumentViewer";
import { LibraryView } from "../components/LibraryView";
import { Settings } from "../components/Settings";
import { Header } from "../components/Header";
import { ThemeProvider } from "../contexts/ThemeContext";

const Index = () => {
  const [activeView, setActiveView] = useState<'upload' | 'library' | 'document' | 'settings'>('upload');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    setActiveView('document');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex w-full transition-colors">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 flex flex-col">
          <Header />
          
          <div className="flex-1 p-6">
            {activeView === 'upload' && (
              <UploadArea onDocumentSelect={handleDocumentSelect} />
            )}
            
            {activeView === 'library' && (
              <LibraryView onDocumentSelect={handleDocumentSelect} />
            )}
            
            {activeView === 'document' && selectedDocument && (
              <DocumentViewer document={selectedDocument} />
            )}

            {activeView === 'settings' && (
              <Settings />
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
