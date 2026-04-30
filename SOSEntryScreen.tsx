import { motion } from "motion/react";
import { Lock, ShieldAlert } from "lucide-react";

interface SOSEntryScreenProps {
  onSOSPress: () => void;
}

export function SOSEntryScreen({
  onSOSPress,
}: SOSEntryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-10">
      {/* Top Status */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ShieldAlert size={16} className="text-red-500" />
          <span
            style={{
              fontSize: "12px",
              color: "#ef4444",
              letterSpacing: "0.08em",
            }}
          >
            EMERGENCY MODE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-[3px] items-end">
            {[3, 5, 7, 9].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "3px",
                  height: `${h}px`,
                  backgroundColor: i < 3 ? "#ffffff" : "#444",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "12px", color: "#aaa" }}>
            9:41
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mt-4">
        <p
          style={{
            fontSize: "13px",
            color: "#888",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Press to activate
        </p>
      </div>

      {/* Central SOS Button */}
      <div className="flex flex-col items-center gap-8 flex-1 justify-center">
        <div className="relative flex items-center justify-center">
          {/* Pulse rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-red-500/30"
              style={{
                width: `${140 + i * 48}px`,
                height: `${140 + i * 48}px`,
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.1, 0.4],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Outer glow ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "160px",
              height: "160px",
              background:
                "radial-gradient(circle, rgba(239,68,68,0.25) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main SOS button */}
          <motion.button
            onClick={onSOSPress}
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.03 }}
            className="relative z-10 rounded-full flex items-center justify-center cursor-pointer select-none"
            style={{
              width: "140px",
              height: "140px",
              background:
                "linear-gradient(145deg, #dc2626, #991b1b)",
              boxShadow:
                "0 0 40px rgba(220,38,38,0.5), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
              border: "2px solid rgba(239,68,68,0.4)",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span
                style={{
                  fontSize: "42px",
                  fontWeight: "900",
                  color: "#ffffff",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                SOS
              </span>
              <div
                style={{
                  width: "28px",
                  height: "2px",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.1em",
                }}
              >
                TAP
              </span>
            </div>
          </motion.button>
        </div>

        {/* Emergency Call Buttons (Locked) */}
        <div className="w-full flex flex-col gap-3 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              disabled
              className="w-full rounded-2xl flex items-center justify-between px-5 py-4 cursor-not-allowed"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                opacity: 0.5,
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "22px" }}>🚔</span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    fontWeight: 600,
                  }}
                >
                  Call Police
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={15} className="text-gray-600" />
              </div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              disabled
              className="w-full rounded-2xl flex items-center justify-between px-5 py-4 cursor-not-allowed"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                opacity: 0.5,
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "22px" }}>🚑</span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    fontWeight: 600,
                  }}
                >
                  Call Ambulance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={15} className="text-gray-600" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center px-4"
          style={{
            fontSize: "12px",
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Emergency call will be enabled after contacting
          trusted people
        </motion.p>
      </div>

      {/* Bottom hint */}
      <div className="text-center">
        <p
          style={{
            fontSize: "11px",
            color: "#333",
            letterSpacing: "0.06em",
          }}
        >
          SWIPE UP FOR OPTIONS
        </p>
      </div>
    </div>
  );
}
