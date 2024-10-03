import "./App.css";
import { SimpleCard } from "./SimpleCard"; // Ensure this component is correctly implemented
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]); // Use camelCase for state variables

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://arxiv.org/search/?query=Hardware+architecture&searchtype=all&abstracts=show&order=-announced_date_first&size=50",
          {
            method: "GET",
          }
        );

        // Check if the response is okay (status code in the range 200-299)
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await res.text();

        // Create a DOM parser to parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // Extract titles and abstracts
        const articles = Array.from(
          doc.querySelectorAll("li.arxiv-result")
        ).map((article) => {
          const datetag = article.getElementsByTagName("p");
          const datelement = Array.from(datetag).filter((p) => {
            return p.classList.contains("is-size-7");
          })[0].childNodes[1].data;
          const dateText=datelement.trim().replace(';','')
          const titleElement = article.querySelector(".title");
          const abstractElement = article.querySelector(".abstract-full").textContent
          const abstractText=abstractElement.trim().replace('       △ Less','')
          return {
            title: titleElement
              ? titleElement.textContent.trim()
              : "No title available",
            date: dateText ? dateText : "Dates Not found",
            abstract: abstractText
              ? abstractText.trim()
              : "No abstract available",
          };
        });

        setData(articles);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="App">
      <h1>Articles Fetched</h1>
      <ul className="flex flex-wrap justify-center justify-evenly">
        {data.map((article, index) => (
          <li key={index}>
            <SimpleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
