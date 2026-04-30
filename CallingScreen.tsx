import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";

interface CallingScreenProps {
  type: "police" | "ambulance";
  onEndCall: () => void;
}

export function CallingScreen({ type, onEndCall }: CallingScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const isPolice = type === "police";
  const title = isPolice ? "Calling Police…" : "Calling Ambulance…";
  const emoji = isPolice ? "🚔" : "🚑";
  const subtitle = isPolice ? "Emergency Services" : "Ambulance Dispatch";
  const accentColor = "#ef4444";

  return (
    <div className="flex flex-col h-full px-6 py-10">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: "12px", color: "#555" }}>9:41</span>
        <motion.div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ backgroundColor: "#22c55e20", border: "1px solid #22c55e40" }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div
            className="rounded-full"
            style={{ width: "6px", height: "6px", backgroundColor: "#22c55e" }}
          />
          <span style={{ fontSize: "11px", color: "#22c55e", fontWeight: 600 }}>LIVE CALL</span>
        </motion.div>
        <span style={{ fontSize: "12px", color: "#555" }}>SOS</span>
      </div>

      {/* Main call area */}
      <div className="flex flex-col items-center flex-1 justify-center gap-6">
        {/* Ringing animation */}
        <div className="relative flex items-center justify-center">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${100 + i * 44}px`,
                height: `${100 + i * 44}px`,
                border: `1.5px solid ${accentColor}`,
                opacity: 0,
              }}
              animate={{ scale: [0.85, 1.3], opacity: [0.6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeOut",
              }}
            />
          ))}

          <motion.div
            className="relative z-10 rounded-full flex items-center justify-center"
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(145deg, #1e1e1e, #141414)",
              border: `2px solid ${accentColor}40`,
              boxShadow: `0 0 32px ${accentColor}30, 0 8px 24px rgba(0,0,0,0.5)`,
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span style={{ fontSize: "44px" }}>{emoji}</span>
          </motion.div>
        </div>

        {/* Call info */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            {title}
          </motion.h1>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>{subtitle}</p>

          {/* Timer */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "#161616",
              border: "1px solid #2a2a2a",
            }}
          >
            <motion.div
              className="rounded-full"
              style={{ width: "7px", height: "7px", backgroundColor: "#22c55e" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffffff",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.08em",
              }}
            >
              {formatTime(seconds)}
            </span>
          </motion.div>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: "3px",
                backgroundColor: i % 3 === 0 ? accentColor : "#2a2a2a",
                borderRadius: "2px",
              }}
              animate={{
                height: [
                  `${8 + Math.sin(i * 0.8) * 6}px`,
                  `${16 + Math.sin(i * 0.8) * 12}px`,
                  `${8 + Math.sin(i * 0.8) * 6}px`,
                ],
              }}
              transition={{
                duration: 0.8 + (i % 4) * 0.2,
                repeat: Infinity,
                delay: i * 0.06,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Location info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            backgroundColor: "#161616",
            border: "1px solid #242424",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "18px" }}>📍</span>
          <div>
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "1px" }}>Sharing location</p>
            <p style={{ fontSize: "13px", color: "#ccc", fontWeight: 500 }}>
              GPS coordinates sent
            </p>
          </div>
          <motion.div
            className="ml-auto rounded-full"
            style={{ width: "8px", height: "8px", backgroundColor: "#22c55e" }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Call controls */}
      <div className="flex flex-col gap-4">
        {/* Secondary controls */}
        <div className="flex justify-center gap-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMicOn((v) => !v)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: micOn ? "#1e1e1e" : "#ef444430",
                border: `1px solid ${micOn ? "#2a2a2a" : "#ef444460"}`,
              }}
            >
              {micOn ? (
                <Mic size={20} color="#aaa" />
              ) : (
                <MicOff size={20} color="#ef4444" />
              )}
            </div>
            <span style={{ fontSize: "11px", color: "#555" }}>{micOn ? "Mute" : "Unmute"}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSpeakerOn((v) => !v)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: speakerOn ? "#ef444430" : "#1e1e1e",
                border: `1px solid ${speakerOn ? "#ef444460" : "#2a2a2a"}`,
              }}
            >
              <Volume2 size={20} color={speakerOn ? "#ef4444" : "#aaa"} />
            </div>
            <span style={{ fontSize: "11px", color: "#555" }}>Speaker</span>
          </motion.button>
        </div>

        {/* End call */}
        <motion.button
          onClick={onEndCall}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full rounded-2xl flex items-center justify-center gap-3 py-4"
          style={{
            background: "linear-gradient(135deg, #dc2626, #991b1b)",
            boxShadow: "0 4px 24px rgba(220,38,38,0.45)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <PhoneOff size={20} color="#fff" />
          </motion.div>
          <span style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>End Call</span>
        </motion.button>
      </div>
    </div>
  );
}
