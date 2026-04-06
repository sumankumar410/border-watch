import React, { createContext, useContext, useState, useCallback } from "react";

export interface Message {
  id: string;
  from: number;
  to: number | "ALL";
  text: string;
  timestamp: number;
  type: "text" | "alert" | "file";
  fileName?: string;
}

interface CommState {
  messages: Message[];
  sendMessage: (msg: Omit<Message, "id" | "timestamp">) => void;
  getConversation: (villageA: number, villageB: number) => Message[];
  getAlertsForVillage: (villageId: number) => Message[];
}

const CommContext = createContext<CommState | null>(null);

export const CommProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = useCallback((msg: Omit<Message, "id" | "timestamp">) => {
    const newMsg: Message = {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMsg]);
  }, []);

  const getConversation = useCallback((villageA: number, villageB: number) => {
    return messages.filter(
      m => (m.from === villageA && m.to === villageB) || (m.from === villageB && m.to === villageA)
    ).sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const getAlertsForVillage = useCallback((villageId: number) => {
    return messages.filter(
      m => m.type === "alert" && (m.to === villageId || m.to === "ALL")
    ).sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  return (
    <CommContext.Provider value={{ messages, sendMessage, getConversation, getAlertsForVillage }}>
      {children}
    </CommContext.Provider>
  );
};

export const useComm = () => {
  const ctx = useContext(CommContext);
  if (!ctx) throw new Error("useComm must be used within CommProvider");
  return ctx;
};
