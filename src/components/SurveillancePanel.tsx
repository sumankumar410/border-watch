import React, { useState, useEffect } from "react";
import { useSurveillance } from "@/context/SurveillanceContext";
import { useAuth } from "@/context/AuthContext";
import { villages } from "@/data/villages";
import { Camera } from "@/data/surveillance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Wifi, WifiOff, Maximize2, X, Shield, Eye } from "lucide-react";

const CameraFeed: React.FC<{ camera: Camera; villageName: string; onExpand: () => void }> = ({
  camera, villageName, onExpand,
}) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOnline = camera.status === "online";

  return (
    <Card className={`overflow-hidden border ${isOnline ? "border-primary/30" : "border-destructive/30"} bg-card/80`}>
      <div className="relative aspect-video bg-background flex items-center justify-center overflow-hidden cursor-pointer group" onClick={onExpand}>
        {isOnline ? (
          <>
            {/* Simulated feed with noise effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-background to-muted/60" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.05) 2px, hsl(var(--primary) / 0.05) 4px)`,
            }} />
            {/* Scanline animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-1 bg-primary/10 animate-pulse" style={{ top: `${(time.getSeconds() * 100 / 60)}%` }} />
            </div>
            {/* Simulated detection overlays */}
            <div className="absolute top-1/3 left-1/4 w-16 h-20 border border-primary/40 rounded-sm">
              <span className="absolute -top-4 left-0 text-[10px] font-mono text-primary/70">Person</span>
            </div>
            {Math.random() > 0.5 && (
              <div className="absolute bottom-1/4 right-1/4 w-24 h-12 border border-warning/40 rounded-sm">
                <span className="absolute -top-4 left-0 text-[10px] font-mono text-warning/70">Vehicle</span>
              </div>
            )}
            {/* LIVE indicator */}
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] font-mono text-destructive font-bold tracking-widest">LIVE</span>
            </div>
            {/* Timestamp */}
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-muted-foreground/70">
              {time.toLocaleTimeString()} | {camera.id}
            </div>
            {/* Expand */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-primary" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <WifiOff className="w-8 h-8" />
            <span className="text-xs font-mono">NO SIGNAL</span>
          </div>
        )}
      </div>
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Video className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs font-mono truncate">{camera.label}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isOnline ? (
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-mono text-muted-foreground">{camera.signalStrength}%</span>
              </div>
            ) : (
              <Badge variant="destructive" className="text-[10px] px-1 py-0">OFFLINE</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SurveillancePanel: React.FC = () => {
  const { cameras } = useSurveillance();
  const { village } = useAuth();
  const [expandedCam, setExpandedCam] = useState<Camera | null>(null);
  const [filter, setFilter] = useState<"all" | "mine">("mine");

  if (!village) return null;

  const filtered = filter === "mine"
    ? cameras.filter(c => c.villageId === village.id)
    : cameras;

  const onlineCams = filtered.filter(c => c.status === "online").length;

  return (
    <div className="space-y-4">
      {/* Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary tracking-wider">🛰️ SURVEILLANCE MODE ENABLED</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">🔒 AI MONITORING ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">
            {onlineCams}/{filtered.length} ONLINE
          </Badge>
          <div className="flex border border-border rounded overflow-hidden">
            <button
              onClick={() => setFilter("mine")}
              className={`px-3 py-1 text-[10px] font-mono transition-colors ${filter === "mine" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >MY POST</button>
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-[10px] font-mono transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >ALL FEEDS</button>
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map(cam => {
          const v = villages.find(v => v.id === cam.villageId);
          return (
            <CameraFeed
              key={cam.id}
              camera={cam}
              villageName={v?.name || "Unknown"}
              onExpand={() => setExpandedCam(cam)}
            />
          );
        })}
      </div>

      {/* Fullscreen Overlay */}
      {expandedCam && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col" onClick={() => setExpandedCam(null)}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="font-mono text-sm text-primary tracking-wider">LIVE — {expandedCam.label}</span>
              <span className="font-mono text-xs text-muted-foreground">{expandedCam.id}</span>
            </div>
            <button className="p-2 hover:bg-muted rounded" onClick={() => setExpandedCam(null)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-8" onClick={e => e.stopPropagation()}>
            <div className="relative w-full max-w-5xl aspect-video bg-muted/30 rounded border border-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/80 via-background to-muted/60" />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--primary) / 0.05) 3px, hsl(var(--primary) / 0.05) 6px)`,
              }} />
              {/* Detection boxes */}
              <div className="absolute top-[20%] left-[15%] w-24 h-32 border-2 border-primary/50 rounded">
                <span className="absolute -top-5 left-0 text-xs font-mono text-primary bg-background/80 px-1">Person 94%</span>
              </div>
              <div className="absolute top-[40%] right-[20%] w-40 h-20 border-2 border-warning/50 rounded">
                <span className="absolute -top-5 left-0 text-xs font-mono text-warning bg-background/80 px-1">Vehicle 87%</span>
              </div>
              <div className="absolute bottom-[15%] left-[40%] w-20 h-28 border-2 border-primary/30 rounded">
                <span className="absolute -top-5 left-0 text-xs font-mono text-primary/70 bg-background/80 px-1">Person 72%</span>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="text-sm font-mono text-destructive font-bold tracking-widest">LIVE</span>
              </div>
              <FullscreenTimestamp cameraId={expandedCam.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FullscreenTimestamp: React.FC<{ cameraId: string }> = ({ cameraId }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute bottom-3 left-3 text-sm font-mono text-muted-foreground/80">
      {time.toLocaleString()} | {cameraId}
    </div>
  );
};

export default SurveillancePanel;
