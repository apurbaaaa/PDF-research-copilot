
import { useState } from "react";
import { Bookmark, Tag, Share2, Download, Sparkles, Quote } from "lucide-react";

interface DocumentViewerProps {
  document: any;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(document.tags || []);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Document Info & Actions */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{document.title}</h1>
          <p className="text-slate-600 mb-4">{document.author} • {document.year}</p>
          
          <div className="flex gap-2 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary & Citations */}
      <div className="lg:col-span-2 space-y-6">
        {/* AI Summary */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">AI Summary</h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{document.summary}</p>
        </div>

        {/* Key Citations */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Quote className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Key Citations</h2>
          </div>
          <div className="space-y-4">
            {document.citations.map((citation: string, index: number) => (
              <div key={index} className="p-4 bg-slate-50/80 rounded-xl border-l-4 border-emerald-500">
                <p className="text-slate-700 italic">"{citation}"</p>
                <p className="text-xs text-slate-500 mt-2">Page {index + 1} • Confidence: High</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Document Preview</h2>
          <div className="bg-slate-100 rounded-xl p-8 text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">PDF preview would be displayed here</p>
            <p className="text-sm text-slate-500 mt-2">Full document viewer integration coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};
