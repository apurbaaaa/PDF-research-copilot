
import { CheckCircle, Sparkles, Quote, Tag, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProcessingResultsProps {
  document: any;
}

export const ProcessingResults = ({ document }: ProcessingResultsProps) => {
  // Handle both 'tags' and 'keywords' from different sources
  const keywords = document.keywords || document.tags || [];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
            Processing Complete!
          </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your document has been analyzed and is ready for review
        </p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="citations">Citations</TabsTrigger>
          <TabsTrigger value="tags">Keywords</TabsTrigger>
          <TabsTrigger value="methodology">Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">AI-Generated Summary</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">{document.summary}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="citations" className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Key Citations</h2>
            </div>
            <div className="space-y-4">
              {document.citations && document.citations.length > 0 ? (
                document.citations.map((citation: string, index: number) => (
                  <div key={index} className="p-4 bg-slate-50/80 rounded-xl border-l-4 border-emerald-500">
                    <p className="text-slate-700 italic text-lg">"{citation}"</p>
                    <p className="text-sm text-slate-500 mt-2">Citation {index + 1} • AI Extracted</p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50/80 rounded-xl">
                  <p className="text-slate-600">No citations extracted from this document.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Tag className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Auto-Generated Keywords</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {keywords && keywords.length > 0 ? (
                keywords.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm">
                  No keywords extracted
                </span>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Research Methodology</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                {document.methodology || "No methodology information was extracted from this document."}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
