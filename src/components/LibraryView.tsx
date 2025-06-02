import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, FileText, Calendar, User, Tag, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LibraryViewProps {
  onDocumentSelect: (doc: any) => void;
}

interface Paper {
  _id: string;
  title: string;
  author?: string;
  year?: number;
  summary: string;
  citations: string[];
  keywords: string[];
  methodology?: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
}

export const LibraryView = ({ onDocumentSelect }: LibraryViewProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/papers'); // Remove trailing slash
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error('Error fetching papers:', error);
      toast({
        title: "Error",
        description: "Failed to load papers from the library. Make sure the backend server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = papers.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.author && doc.author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === "all" || 
                         doc.keywords.some(keyword => keyword.toLowerCase().includes(selectedFilter.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  const handleDownload = async (paperId: string, fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:4000/api/papers/${paperId}/download`);
      
      if (!response.ok) {
        throw new Error('Failed to download paper');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success",
        description: "Paper downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading paper:', error);
      toast({
        title: "Error",
        description: "Failed to download paper",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your research library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Research Library</h1>
        <p className="text-slate-600">Organize and explore your research collection ({papers.length} papers)</p>
      </div>

      {/* Controls */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-1 gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="all">All Topics</option>
              <option value="machine">Machine Learning</option>
              <option value="ai">Artificial Intelligence</option>
              <option value="research">Research</option>
              <option value="analysis">Analysis</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredDocuments.map((doc) => (
          <div
            key={doc._id}
            onClick={() => onDocumentSelect({
              id: doc._id,
              title: doc.title,
              author: doc.author || "Unknown Author",
              year: doc.year || new Date().getFullYear(),
              summary: doc.summary,
              citations: doc.citations,
              tags: doc.keywords,
              methodology: doc.methodology
            })}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="w-3 h-3" />
                  <span>{doc.author || "Unknown Author"}</span>
                  <span>•</span>
                  <Calendar className="w-3 h-3" />
                  <span>{doc.year || new Date().getFullYear()}</span>
                </div>
              </div>
              <button
                onClick={(e) => handleDownload(doc._id, doc.fileName, e)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{doc.summary}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {doc.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {keyword}
                </span>
              ))}
              {doc.keywords.length > 3 && (
                <span className="text-xs text-slate-500">+{doc.keywords.length - 3} more</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{doc.citations.length} citations</span>
              <span>{formatFileSize(doc.fileSize)} • {formatDate(doc.uploadDate)}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">
            {papers.length === 0 ? "No papers in your library" : "No papers found"}
          </h3>
          <p className="text-slate-500">
            {papers.length === 0 
              ? "Upload your first research paper to get started" 
              : "Try adjusting your search or filters"
            }
          </p>
        </div>
      )}
    </div>
  );
};
