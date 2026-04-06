import React, { useState } from "react";
import { Village } from "@/data/villages";
import { Search, MapPin, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  villages: Village[];
  selectedId: string;
  onSelect: (id: string) => void;
  currentVillage: Village;
}

const VillageSelector: React.FC<Props> = ({ villages, selectedId, onSelect, currentVillage }) => {
  const [search, setSearch] = useState("");

  const filtered = villages.filter(
    v => v.name.toLowerCase().includes(search.toLowerCase()) ||
         v.state.toLowerCase().includes(search.toLowerCase()) ||
         v.id.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Village[]>>((acc, v) => {
    if (!acc[v.state]) acc[v.state] = [];
    acc[v.state].push(v);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-3 h-3 text-primary" />
          <span className="text-xs font-mono text-muted-foreground tracking-wider">SELECT RECEIVER</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search village..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-secondary border-border font-mono"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(grouped).map(([state, vils]) => (
          <div key={state}>
            <div className="px-3 py-1.5 bg-secondary/50 text-xs font-mono text-muted-foreground tracking-wider sticky top-0">
              {state.toUpperCase()}
            </div>
            {vils.map(v => (
              <button
                key={v.id}
                onClick={() => onSelect(v.id)}
                className={`w-full text-left px-3 py-2.5 flex items-center gap-2 border-b border-border/50 transition-colors ${
                  selectedId === v.id
                    ? "bg-primary/10 border-l-2 border-l-primary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedId === v.id ? "text-primary" : "text-muted-foreground"}`} />
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${selectedId === v.id ? "text-primary" : "text-foreground"}`}>
                    {v.name}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">{v.id} • {v.sector}</p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillageSelector;
