'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getAll, beasttracker, updateData } from "./services/beasttracker";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [longest, setLongest] = useState(0);
  const [lastCheck, setLastchek] = useState("");
  const [history, setHistory] = useState([]);
  useEffect(() => {
    localStorage.clear("beasttracker")
    getAll();
    setHistory(beasttracker.history);
    setLastchek(beasttracker.lastCheck);
    setLongest(beasttracker.longest);
    setStreak(beasttracker.streak);
  }, []);
  const checkInToday = () => {
    const today = new Date().toISOString().split("T")[0];

    if (!history.includes(today)) {
      setStreak((prev) => prev + 1);
      setLastchek(today);
      beasttracker.streak = beasttracker.streak + 1;
      beasttracker.history.push(today);
      beasttracker.longest = Math.max(beasttracker.longest, beasttracker.streak)
      setLongest(beasttracker.longest)
      updateData(beasttracker);
    }
  }
  const undoCheckIn = () => {
    const today = new Date().toISOString().split("T")[0];
    if(history.includes(today)){
      setStreak((prev) => prev - 1);
    beasttracker.streak = beasttracker.streak - 1;
    beasttracker.history.pop();
    updateData(beasttracker);
    }
  }
  const resetStreak = () => {
    setStreak(beasttracker.streak = 0);
    setHistory(beasttracker.history =[]);
    setLongest(beasttracker.longest = 0);
    setLastchek(beasttracker.lastCheck ="");
    updateData(beasttracker);
  }
  return (
    <div className="font-sans grid grid-rows-[auto_1fr] h-screen bg-gray-900">
      <Header />
      <main className="overflow-auto [&::-webkit-scrollbar]:hidden w-full text-white max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center"> Status</h1>

          <div className="space-y-2 mb-6">
            <p>Current streak: <span className="font-mono" id="currentStreak">{streak}</span></p>
            <p>Longest streak: <span className="font-mono" id="longestStreak">{longest}</span></p>
            <p>Last check-in: <span className="font-mono" id="lastCheck">{lastCheck}</span></p>
          </div>

          <div className="flex gap-2">
            <button onClick={checkInToday} className="flex-1 bg-green-500 py-2 rounded" id="checkInBtn">
              Check in today
            </button>
            <button onClick={undoCheckIn} className="flex-1 bg-yellow-500 py-2 rounded" id="undoBtn">
              Undo
            </button>
            <button onClick={resetStreak} className="flex-1 bg-red-600 py-2 rounded" id="resetBtn">
              Reset
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">

          <div>
            <button>Chech in</button>
            <button>Undo</button>
            <button>Reset</button>
          </div>
        </div>
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2>History</h2>
          <div className="space-x-1">
            {history.map((date,index) => (
              <span key={index} className="bg-yellow-400 px-1 rounded">{date}</span>
            ))}
          </div>
        </div>
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="font-cursive">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis nobis accusantium corporis dolorum veritatis reprehenderit laborum vel porro suscipit delectus!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
