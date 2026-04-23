import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";

const SystemSettingItem = ({ id, title, description, checked, onToggle }) => (
  <>
    <div className="flex items-start sm:items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium leading-snug">{title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onToggle} className="flex-shrink-0 mt-1 sm:mt-0" />
    </div>
    <Separator />
  </>
);

const SystemSettingsForm = ({ systemSettings, onToggle }) => {
  const systemSettingItems = [
    {
      id: "autoApproveStores",
      title: "Auto-approve Stores",
      description: "Automatically approve new store registrations",
    },
    {
      id: "requireDocumentVerification",
      title: "Require Document Verification",
      description: "Mandatory document verification for store approval",
    },
    {
      id: "commissionAutoCalculation",
      title: "Auto Commission Calculation",
      description: "Automatically calculate commissions",
    },
    {
      id: "maintenanceMode",
      title: "Maintenance Mode",
      description: "Enable maintenance mode for system updates",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          System Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {systemSettingItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <SystemSettingItem
              id={item.id}
              title={item.title}
              description={item.description}
              checked={systemSettings[item.id]}
              onToggle={() => onToggle(item.id)}
            />
            {index === systemSettingItems.length - 2 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default SystemSettingsForm;