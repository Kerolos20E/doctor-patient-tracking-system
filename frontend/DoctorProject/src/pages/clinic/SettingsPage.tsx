import type { ReactNode } from "react";
import ClinicDashboardLayout from "@/layouts/ClinicDashboardLayout";
import Panel from "@/components/ui/Panel";
import {
  IdentityTab,
  SettingsPageHeader,
  SettingsTabs,
  type TabId,
} from "@/features/clinic/settings";

// TODO(logic): خليها useState<TabId>('identity') وربطها بالضغط على التابات
const activeTab: TabId = "identity";

// كل تاب ومحتواه. التابات اللي لسه ما اتصممتش بتظهر رسالة "قيد التصميم"
const tabContent: Partial<Record<TabId, ReactNode>> = {
  identity: <IdentityTab />,
};

/** SCREEN_6 — إعدادات العيادة والروشتة الإلكترونية (UI فقط، من غير لوجيك) */
export default function SettingsPage() {
  return (
    <ClinicDashboardLayout activeNav="settings">
      <SettingsPageHeader />
      <SettingsTabs activeTab={activeTab} />
      {tabContent[activeTab] ?? (
        <Panel className="text-center text-on-surface-variant">
          هذا التاب قيد التصميم
        </Panel>
      )}
    </ClinicDashboardLayout>
  );
}
