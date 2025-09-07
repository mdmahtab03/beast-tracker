'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import { beasttracker, updateData } from "./services/beasttracker";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [longest, setLongest] = useState(0);
  const [lastCheck, setLastCheck] = useState("");
  const [history, setHistory] = useState([]);
  // Load data on mount
  useEffect(() => {
    const stored = localStorage.getItem("beasttracker");
    if (stored) {
      Object.assign(beasttracker, JSON.parse(stored));
    } else {
      updateData(beasttracker);
    }

    setStreak(beasttracker.streak);
    setLongest(beasttracker.longest);
    setLastCheck(beasttracker.lastCheck);
    setHistory(beasttracker.history);
  }, []);
  // Check in today
  const checkInToday = () => {
    const today = new Date().toISOString().split("T")[0];

    if (!history.includes(today)) {
      const updatedHistory = [...history, today];
      const updatedStreak = streak + 1;
      const updatedLongest = Math.max(longest, updatedStreak);

      // Update React state
      setHistory(updatedHistory);
      setStreak(updatedStreak);
      setLongest(updatedLongest);
      setLastCheck(today);

      // Update beasttracker object
      beasttracker.history = updatedHistory;
      beasttracker.streak = updatedStreak;
      beasttracker.longest = updatedLongest;
      beasttracker.lastCheck = today;

      updateData(beasttracker);
    }
  }
  // Undo today's check-in
  const undoCheckIn = () => {
    const today = new Date().toISOString().split("T")[0];

    if (history.includes(today)) {
      const updatedHistory = history.slice(0, -1);
      const updatedStreak = Math.max(streak - 1, 0);

      setHistory(updatedHistory);
      setStreak(updatedStreak);

      beasttracker.history = updatedHistory;
      beasttracker.streak = updatedStreak;

      updateData(beasttracker);
    }
  }
  const resetStreak = () => {
    const emptyTracker = { streak: 0, longest: 0, lastCheck: "", history: [] };

    setStreak(0);
    setLongest(0);
    setLastCheck("");
    setHistory([]);

    Object.assign(beasttracker, emptyTracker);
    updateData(beasttracker);
  }
  return (
    <div className="font-sans grid grid-rows-[auto_1fr] h-screen bg-gray-900">
      <Header />
      <main className="overflow-auto [&::-webkit-scrollbar]:hidden w-full text-white max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center"> Status</h2>

          <div className="space-y-2 mb-6 ">
            <p>Current streak: <span className="font-mono" id="currentStreak">{streak}</span></p>
            <p>Longest streak: <span className="font-mono" id="longestStreak">{longest}</span></p>
            <p>Last check-in: <span className="font-mono" id="lastCheck">{lastCheck}</span></p>
          </div>

          <div className="flex gap-2 ">
            <button onClick={checkInToday} className="flex-1 border border-emerald-700 bg-emerald-500  py-2 rounded" id="checkInBtn">
              CheckIn
            </button>
            <button onClick={undoCheckIn} className="flex-1 border border-emerald-700 bg-emerald-500 py-2 rounded" id="undoBtn">
              Undo
            </button>
            <button onClick={resetStreak} className="flex-1 border border-emerald-700 bg-emerald-500 py-2 rounded" id="resetBtn">
              Reset
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">History</h2>
          {history.length === 0 ? "No History." : <div className="flex border border-gray-500 rounded-md p-2">
            {history.map((date, index) => (
              <span key={index} title={date} className="cursor-pointer border border-emerald-700 bg-emerald-500 px-1 rounded">✔</span>
            ))}
          </div>}
        </div>
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-center font-thin">
            <i>{`" One day or day one — the streak lives as long as you do. Don’t break it. "`}</i>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
