const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const sampleHeadlines = [
  "Why {name} is {location}'s Favorite Local Spot!",
  "Discover the Charm of {name} in {location}",
  "{name} in {location} – A Hidden Gem for Locals",
  "Top Reasons {name} is Trending in {location}",
  "Explore What Makes {name} Shine in {location}"
];

function generateHeadline(name, location) {
  const template = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
  return template.replace("{name}", name).replace("{location}", location);
}

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  const data = {
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300 + 20),
    headline: generateHeadline(name, location),
  };
  res.json(data);
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  res.json({ headline: generateHeadline(name, location) });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
