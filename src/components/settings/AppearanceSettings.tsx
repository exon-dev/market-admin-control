
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize how the admin dashboard looks on your device
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Switch 
          id="dark-mode" 
          checked={isDark}
          onCheckedChange={toggleTheme}
        />
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode">Dark mode</Label>
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
