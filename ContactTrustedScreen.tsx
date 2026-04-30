import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface ContactTrustedScreenProps {
  onNotify: () => void;
  onBack: () => void;
}

const contacts = [
  { name: "Amma", initial: "A", color: "#7c3aed" },
  { name: "Raj", initial: "R", color: "#0891b2" },
  { name: "Priya", initial: "P", color: "#db2777" },
  { name: "Arun", initial: "A", color: "#059669" },
  { name: "Neha", initial: "N", color: "#d97706" },
];

export function ContactTrustedScreen({ onNotify, onBack }: ContactTrustedScreenProps) {
  return (
    <div className="flex flex-col h-full px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
          className="rounded-full flex items-center justify-center"
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "#1e1e1e",
            border: "1px solid #2a2a2a",
          }}
        >
          <ArrowLeft size={18} color="#aaa" />
        </motion.button>
        <div
          className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "#ef4444" }}
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span style={{ fontSize: "12px", color: "#555" }}>1 / 2</span>
      </div>

      {/* Title section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "10px",
          }}
        >
          Contact trusted{"\n"}people first
        </h1>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
          This helps prevent accidental alerts and ensures faster response
        </p>
      </motion.div>

      {/* Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-8"
      >
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "16px", letterSpacing: "0.08em" }}>
          FREQUENT CONTACTS
        </p>
        <div className="flex justify-between gap-2">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="rounded-full flex items-center justify-center relative"
                style={{
                  width: "54px",
                  height: "54px",
                  backgroundColor: contact.color + "22",
                  border: `2px solid ${contact.color}55`,
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: contact.color,
                  }}
                >
                  {contact.initial}
                </span>
                {/* Online dot */}
                <div
                  className="absolute bottom-0 right-0 rounded-full border-2"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#22c55e",
                    borderColor: "#0a0a0a",
                  }}
                />
              </div>
              <span style={{ fontSize: "11px", color: "#888" }}>{contact.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Alert preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-4 mb-6"
        style={{
          backgroundColor: "#161616",
          border: "1px solid #242424",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ width: "36px", height: "36px", backgroundColor: "#ef444420" }}
          >
            <span style={{ fontSize: "18px" }}>📍</span>
          </div>
          <div>
            <p style={{ fontSize: "13px", color: "#ccc", fontWeight: 600, marginBottom: "3px" }}>
              Alert will include
            </p>
            <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.5 }}>
              Your current location • Time • Emergency type
            </p>
          </div>
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-3"
      >
        <motion.button
          onClick={onNotify}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          className="w-full rounded-2xl flex items-center justify-center gap-3 py-4"
          style={{
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            boxShadow: "0 4px 24px rgba(220,38,38,0.35)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <span style={{ fontSize: "18px" }}>📲</span>
          <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: 700, letterSpacing: "0.02em" }}>
            Notify 5 Frequent Contacts
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
