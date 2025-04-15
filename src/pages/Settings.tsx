
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="max-w-2xl">
          <AppearanceSettings />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
