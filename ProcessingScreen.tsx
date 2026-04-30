import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface ProcessingScreenProps {
  onCallPolice: () => void;
  onCallAmbulance: () => void;
}

export function ProcessingScreen({ onCallPolice, onCallAmbulance }: ProcessingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "success">("loading");
  const [notifiedCount, setNotifiedCount] = useState(0);

  useEffect(() => {
    // Simulate counting up contacts
    let count = 0;
    const countInterval = setInterval(() => {
      count++;
      setNotifiedCount(count);
      if (count >= 5) {
        clearInterval(countInterval);
        setTimeout(() => setPhase("success"), 400);
      }
    }, 260);
    return () => clearInterval(countInterval);
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-10">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: phase === "success" ? "#22c55e" : "#ef4444" }}
            initial={{ width: "50%" }}
            animate={{ width: phase === "success" ? "100%" : "75%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span style={{ fontSize: "12px", color: "#555" }}>2 / 2</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 gap-6">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Spinner ring */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="rounded-full"
                  style={{
                    width: "90px",
                    height: "90px",
                    border: "3px solid #1e1e1e",
                    borderTopColor: "#ef4444",
                    borderRightColor: "#ef4444",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
                <div
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    width: "68px",
                    height: "68px",
                    backgroundColor: "#161616",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>📲</span>
                </div>
              </div>

              <div className="text-center">
                <motion.p
                  style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}
                >
                  Notifying contacts
                  <LoadingDots />
                </motion.p>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  {notifiedCount} of 5 contacted
                </p>
              </div>

              {/* Contact pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["Amma", "Raj", "Priya", "Arun", "Neha"].map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0.3, scale: 0.9 }}
                    animate={{
                      opacity: notifiedCount > i ? 1 : 0.3,
                      scale: notifiedCount > i ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{
                      backgroundColor: notifiedCount > i ? "#22c55e15" : "#1a1a1a",
                      border: `1px solid ${notifiedCount > i ? "#22c55e50" : "#2a2a2a"}`,
                    }}
                  >
                    {notifiedCount > i && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ fontSize: "10px" }}
                      >
                        ✓
                      </motion.span>
                    )}
                    <span
                      style={{
                        fontSize: "12px",
                        color: notifiedCount > i ? "#22c55e" : "#444",
                        fontWeight: 500,
                      }}
                    >
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col items-center gap-5 w-full"
            >
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                className="relative"
              >
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${72 + i * 28}px`,
                      height: `${72 + i * 28}px`,
                      top: `${-i * 14}px`,
                      left: `${-i * 14}px`,
                      backgroundColor: `rgba(34,197,94,${0.06 / i})`,
                      border: `1px solid rgba(34,197,94,${0.15 / i})`,
                    }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
                <div
                  className="relative z-10 rounded-full flex items-center justify-center"
                  style={{
                    width: "72px",
                    height: "72px",
                    backgroundColor: "#22c55e18",
                    border: "2px solid #22c55e55",
                  }}
                >
                  <CheckCircle2 size={36} color="#22c55e" />
                </div>
              </motion.div>

              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ fontSize: "22px", fontWeight: 700, color: "#22c55e", marginBottom: "6px" }}
                >
                  Contacts notified ✅
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontSize: "14px", color: "#555" }}
                >
                  You can now proceed to emergency services
                </motion.p>
              </div>

              {/* Enabled emergency buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full flex flex-col gap-3 mt-4"
              >
                <motion.button
                  onClick={onCallPolice}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full rounded-2xl flex items-center justify-between px-5 py-4"
                  style={{
                    background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                    boxShadow: "0 4px 28px rgba(220,38,38,0.4)",
                    border: "1px solid rgba(239,68,68,0.35)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "22px" }}>🚔</span>
                    <span style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Call Police</span>
                  </div>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>📞</span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={onCallAmbulance}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full rounded-2xl flex items-center justify-between px-5 py-4"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2e2e2e",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "22px" }}>🚑</span>
                    <span style={{ fontSize: "16px", color: "#ddd", fontWeight: 600 }}>Call Ambulance</span>
                  </div>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#2a2a2a",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>📞</span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1 items-end" style={{ verticalAlign: "middle" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
          }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
