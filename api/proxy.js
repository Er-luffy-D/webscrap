export default async function handler(req, res) {
  const searchQuery = req.query.search || "Hardware+architecture";
  try {
    const response = await fetch(
      `https://arxiv.org/search/?query=${encodeURIComponent(
        searchQuery
      )}&searchtype=all&abstracts=show&order=-announced_date_first&size=50`
    );
    const data = await response.text(); // Use .text() for HTML responses
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data from arXiv" });
  }
}
