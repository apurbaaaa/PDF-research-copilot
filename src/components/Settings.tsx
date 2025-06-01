
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Bell, Download, Trash2 } from "lucide-react";

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent mb-4">
          Settings
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Customize your research experience
        </p>
      </div>

      {/* Appearance */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Appearance</h2>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <div>
              <p className="font-medium text-slate-900">Dark Mode</p>
              <p className="text-sm text-slate-600">Toggle dark theme</p>
            </div>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Notifications</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <div>
                <p className="font-medium text-slate-900">Processing Updates</p>
                <p className="text-sm text-slate-600">Get notified when documents are processed</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <div>
                <p className="font-medium text-slate-900">Weekly Summary</p>
                <p className="text-sm text-slate-600">Receive weekly research insights</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/60">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Data Management</h2>
        
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <Download className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">Export Library</p>
              <p className="text-sm opacity-80">Download all your papers and data</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
            <Trash2 className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">Clear All Data</p>
              <p className="text-sm opacity-80">Permanently delete all documents</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
