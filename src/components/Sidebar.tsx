
import { useState } from "react";
import { Library, Upload, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: 'upload' | 'library' | 'document' | 'settings') => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col transition-all duration-300 shadow-lg",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-slate-900">Research Hub</h2>
              <p className="text-xs text-slate-500">AI-Powered Research</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                activeView === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-slate-200/60">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100/80 transition-colors"
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};
