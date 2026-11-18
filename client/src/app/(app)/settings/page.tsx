"use client";
import AccountSettings from "@/app/components/settings/AccountSettings";
import GitHubSettings from "@/app/components/settings/GitHubSettings";
import SettingsHeader from "@/app/components/settings/SettingsHeader";
import SettingsNavigation from "@/app/components/settings/SettingsNavigation";
import UsageSettings from "@/app/components/settings/UsageSettings";
import { useState } from "react";

export type SettingsSection = "account" | "github" | "usage";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  // console.log("Active section:", activeSection);

  return (
    <main className="min-h-screen px-6 py-5">
      <SettingsHeader/>

      <div className="grid grid-cols-1 gap-7 border-t border-border/60 pt-7 lg:grid-cols-[230px_minmax(0,1fr)]">
        <SettingsNavigation activeSection={activeSection} onSectionChange={setActiveSection}/>

        <section className="min-w-0">
          {activeSection === "account" && <AccountSettings/>}
          {activeSection === "github" && <GitHubSettings/>}
          {activeSection === "usage" && <UsageSettings/>}
        </section>
      </div>
    </main>
  );
};

export default SettingsPage;