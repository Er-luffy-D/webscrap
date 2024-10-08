import { Button, Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import "./App.css";
import { SimpleCard } from "./SimpleCard"; // Ensure this component is correctly implemented
import Shimmer from "./Components/Shimmer";
import Loader from "./Components/Loader";
import check from "./assets/check.svg";

function App() {
  const [data, setData] = useState([]); // Use camelCase for state variables
  const [SearchText, setSearchText] = useState("");
  const [SearchQ, setSearchQ] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track if data is loading
  const [firstLoad, setFirstLoad] = useState(true); // State to track if it is the initial load

  const fetchData = async (searchQuery) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/proxy?search=${
          encodeURIComponent(searchQuery) || "hardware+architecture"
        }`,
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
          const link = article
          .querySelector(".list-title")
          .children[0].getAttribute("href");
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
            id: link,
          };
        }
      );
      
      setData(articles);
      setIsLoading(false);
      setFirstLoad(false); // After the first load, set firstLoad to false
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(SearchQ); // Call the async function
  }, [SearchQ]); // Whenever SearchQ change the useEffect will runs 


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true for new searches
    SearchQ(SearchText)
  };
  const Cards = () => {
    return (
      <ul className="flex flex-wrap justify-center justify-evenly">
        {data.map((article, index) => (
          <li key={index}>
            <SimpleCard article={article} />
          </li>
        ))}
      </ul>
    );
  };
  const Check = () => {
    return (
      <span>
        <img className="h-9 w-9" src={check} alt="Done!"></img>
      </span>
    );
  };

  return (
    <div className="App ">
      <div className="flex justify-center align-middle border-b-4 border-blue-gray-50">
        <div className="flex-col flex-wrap justify-between align-middle mt-5">
          <div className="flex justify-evenly">
            <h1 className="inline">
              {isLoading ? <Spinner className="h-7 w-7 " /> : <Check />}
            </h1>
            <div className="search inline-block mx-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={SearchText}
                  className="border-black border p-1 rounded-md"
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
                  onClick={() => {
                    setSearchQ(SearchText);
                  }}
                >
                  Search
                </Button>
              </form>
            </div>
          </div>

          <h2 className="ml-2 font-serif font-bold text-lg m-3 text-wrap">
            Results for Search : {SearchQ}
          </h2>
        </div>
      </div>

      {isLoading ? firstLoad ? <Shimmer /> : <Loader /> : <Cards />}
    </div>
  );
}

export default App;
