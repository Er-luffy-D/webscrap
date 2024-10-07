import { Button } from "@material-tailwind/react";
import "./App.css";
import Shimmer from "./Components/Shimmer";
import { SimpleCard } from "./SimpleCard"; // Ensure this component is correctly implemented
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]); // Use camelCase for state variables
  const [SearchText, setSearchText] = useState("");
  const [SearchQ, setSearchQ] = useState("Hardware Architechture");
  const query = SearchText;
  useEffect(() => {
    fetchData(query); // Call the async function
  }, []); // Empty dependency array to run only once on mount
  const fetchData = async (searchQuery) => {
    try {
      const res = await fetch(
        `/api/proxy?search=${encodeURIComponent(searchQuery) || "hardware+architecture"}`,
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
      const articles = Array.from(doc.querySelectorAll("li.arxiv-result")).map(
        (article) => {
          const datetag = article.getElementsByTagName("p");
          const datelement = Array.from(datetag).filter((p) => {
            return p.classList.contains("is-size-7");
          })[0].childNodes[1].data;
          const dateText = datelement.trim().replace(";", "");
          const titleElement = article.querySelector(".title");
          const abstractElement =
            article.querySelector(".abstract-full").textContent;
          const abstractText = abstractElement
            .trim()
            .replace("       △ Less", "");
          return {
            title: titleElement
              ? titleElement.textContent.trim()
              : "No title available",
            date: dateText ? dateText : "Dates Not found",
            abstract: abstractText
              ? abstractText.trim()
              : "No abstract available",
          };
        }
      );

      setData(articles);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = SearchText;
    fetchData(query);
  };
  const Cards=()=>{
    return (
    <ul className="flex flex-wrap justify-center justify-evenly">
        {data.map((article, index) => (
          <li key={index}>
            <SimpleCard article={article} />
          </li>
        ))}
      </ul>)
  }

  return (
    <div className="App">
      <h1 className="ml-2">
        {data.length == 0 ? "Data is Fetching.." : "Data Fetched successfully"}
      </h1>
      <div className="search ml-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={SearchText}
            className="border-black border p-1"
            placeholder="Title"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Button
            className="ml-2"
            type="submit"
            color="green"
            variant="gradient"
            size="sm"
            ripple="light"
            onClick={()=>{
              setSearchQ(SearchText)
            }}
          >
            Search
          </Button>
        </form>
      </div>

      <h2 className="ml-2 font-serif font-bold text-lg">Results for Search : {SearchQ}</h2>
      {data.length==0 ? <Shimmer/> :<Cards/>}
    </div>
  );
}

export default App;
