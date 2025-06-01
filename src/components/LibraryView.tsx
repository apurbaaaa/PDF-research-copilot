
import { useState } from "react";
import { Search, Filter, Grid, List, FileText, Calendar, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface LibraryViewProps {
  onDocumentSelect: (doc: any) => void;
}

export const LibraryView = ({ onDocumentSelect }: LibraryViewProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for demonstration
  const documents = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques in Natural Language Processing",
      author: "Dr. Smith et al.",
      year: 2024,
      tags: ["Machine Learning", "NLP", "AI"],
      summary: "This research explores cutting-edge ML techniques for NLP applications...",
      citations: 3,
      dateAdded: "2024-03-15"
    },
    {
      id: 2,
      title: "Quantum Computing Applications in Cryptography",
      author: "Prof. Johnson",
      year: 2023,
      tags: ["Quantum Computing", "Cryptography", "Security"],
      summary: "An in-depth analysis of quantum algorithms and their impact on modern cryptography...",
      citations: 5,
      dateAdded: "2024-03-10"
    },
    {
      id: 3,
      title: "Sustainable Energy Systems: A Comprehensive Review",
      author: "Dr. Brown & Dr. Davis",
      year: 2024,
      tags: ["Renewable Energy", "Sustainability", "Climate"],
      summary: "A thorough examination of current sustainable energy technologies...",
      citations: 2,
      dateAdded: "2024-03-08"
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         doc.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Research Library</h1>
        <p className="text-slate-600">Organize and explore your research collection</p>
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
              <option value="ai">AI & ML</option>
              <option value="quantum">Quantum</option>
              <option value="energy">Energy</option>
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
            key={doc.id}
            onClick={() => onDocumentSelect(doc)}
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
                  <span>{doc.author}</span>
                  <span>•</span>
                  <Calendar className="w-3 h-3" />
                  <span>{doc.year}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{doc.summary}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {doc.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {doc.tags.length > 3 && (
                <span className="text-xs text-slate-500">+{doc.tags.length - 3} more</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{doc.citations} citations</span>
              <span>Added {doc.dateAdded}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No papers found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
