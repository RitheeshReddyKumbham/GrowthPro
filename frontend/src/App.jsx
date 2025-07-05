import React, { useState } from "react";
import axios from "axios";
import BusinessCard from "./components/BusinessCard";
const App = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert("All fields required.");
    setLoading(true);
    const res = await axios.post("http://localhost:3000/business-data", { name, location });
    setData(res.data);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await axios.get(`http://localhost:3000/regenerate-headline?name=${name}&location=${location}`);
    setData((prev) => ({ ...prev, headline: res.data.headline }));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
          <span role="img" aria-label="rocket">🚀</span> GrowthProAI Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              placeholder="e.g., Cake & Co"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {data && (
          <div className="mt-8">
            <BusinessCard data={data} onRegenerate={regenerateHeadline} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
