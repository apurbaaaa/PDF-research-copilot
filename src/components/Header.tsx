
import { Search, Bell, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/60 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search papers, authors, or topics..."
              className="w-full pl-10 pr-4 py-2 bg-white/80 border border-slate-200/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
