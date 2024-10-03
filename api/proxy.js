export default async function handler(req, res) {
    const response = await fetch('https://arxiv.org/search/?query=Hardware+architecture&searchtype=all&abstracts=show&order=-announced_date_first&size=50');
    const data = await response.text(); // Use .text() for HTML responses
    res.status(200).send(data);
  }
  