import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { villages } from "@/data/villages";
import TopBar from "@/components/TopBar";
import VillageSelector from "@/components/VillageSelector";
import ChatPanel from "@/components/ChatPanel";
import AlertPanel from "@/components/AlertPanel";
import VillageOverview from "@/components/VillageOverview";
import SurveillancePanel from "@/components/SurveillancePanel";
import VehicleLogPanel from "@/components/VehicleLogPanel";
import AnomalyFeed from "@/components/AnomalyFeed";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { MessageSquare, AlertTriangle, MapPin, Video, Car, Zap, Activity } from "lucide-react";

type TabId = "comm" | "alerts" | "overview" | "surveillance" | "vehicles" | "anomalies" | "analytics";

const Dashboard: React.FC = () => {
  const { village } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("comm");
  const [receiverVillageId, setReceiverVillageId] = useState<number | null>(null);

  if (!village) return null;

  const otherVillages = villages.filter(v => v.id !== village.id);

  const tabs = [
    { id: "comm" as const, label: "COMMS", icon: MessageSquare },
    { id: "alerts" as const, label: "ALERTS", icon: AlertTriangle },
    { id: "surveillance" as const, label: "CAMS", icon: Video },
    { id: "anomalies" as const, label: "AI DETECT", icon: Zap },
    { id: "vehicles" as const, label: "ANPR", icon: Car },
    { id: "analytics" as const, label: "INTEL", icon: Activity },
    { id: "overview" as const, label: "OVERVIEW", icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col tactical-grid">
      <TopBar />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card/50">
          <div className="container flex gap-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-mono tracking-wider border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 container py-4">
          {activeTab === "comm" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-180px)]">
              <div className="lg:col-span-3">
                <VillageSelector
                  villages={otherVillages}
                  selectedId={receiverVillageId}
                  onSelect={setReceiverVillageId}
                  currentVillage={village}
                />
              </div>
              <div className="lg:col-span-9">
                <ChatPanel
                  senderVillage={village}
                  receiverVillageId={receiverVillageId}
                />
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <AlertPanel currentVillage={village} otherVillages={otherVillages} />
          )}

          {activeTab === "surveillance" && <SurveillancePanel />}
          {activeTab === "anomalies" && <AnomalyFeed />}
          {activeTab === "vehicles" && <VehicleLogPanel />}
          {activeTab === "analytics" && <AnalyticsPanel />}

          {activeTab === "overview" && (
            <VillageOverview currentVillage={village} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
