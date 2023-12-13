import "./App.css";
import React, { useRef } from "react";
import { Form } from "./components/form";
import { GoShare, GoSearch, GoPencil } from "react-icons/go";
import { TbGridDots } from "react-icons/tb";
import { PiChatCircleDots } from "react-icons/pi";
import { CiChat1 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
function App() {
  const [search, setSearch] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [results, setResults] = React.useState([]);
const resultsContainerRef = useRef(null);
  const querClient = useQueryClient();
    const scrollToLatestResult = () => {
      if (resultsContainerRef.current) {
        resultsContainerRef.current.scrollTop =
          resultsContainerRef.current.scrollHeight;
      }
    };
    React.useEffect(()=>{
        scrollToLatestResult()
    },[results])
  const searchMutation = useMutation(
    (search) =>
      fetch("https://stage-api.adinvestor.com/api/v1/chat_api/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message: search }),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        setResults((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sql: data.sql,
            data: data?.data,
            query: search,
          },
        ]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    searchMutation.mutate(search);
    e.target.reset();
    setShow(!show);
  };
  console.log("results", results);
  return (
    <section className="h-[90vh]">
      <main className="grid grid-cols-[1.5fr_5fr] h-full  px-10 gap-10 mt-10 mb-10">
        <div className="bg-slate-100 p-3">
          <h1>Context</h1>
        </div>
        <div className="grid grid-cols-[1.25fr_3fr] h-full border-2 bg-slate-100 rounded-2xl p-1 shadow-md">
          <div className="h-full bg-slate-700 text-slate-50 grid grid-rows-[auto_1fr_auto] border-2 rounded-2xl">
            <div className="flex justify-between p-4 items-center">
              <div>
                {" "}
                <h2 className="text-cyan-300 text-xl font-semibold">ChatADI</h2>
                <small>explore your data</small>
              </div>
              <div>
                <button>
                  <CiChat1 />
                </button>
              </div>
            </div>
            <div className="p-4 border-b-2 border-gray-500 border-t-2 ">
              <div className="border-2 shadow-md p-4 rounded-md border-slate-100">
                <h3>New connection</h3>
                <div className="flex justify-between">
                  <small>6 messages</small>
                  <small>21/10/2023</small>
                </div>
              </div>
            </div>
            <div className="flex justify-between p-3">
              <div>
                <button className="mr-4">
                  <PiChatCircleDots />
                </button>
                <button>
                  <GoPencil />
                </button>
              </div>
              <div>
                <button>
                  <TbGridDots />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[auto_1fr_auto] bg-slate-100 rounded-md">
            <div className="flex justify-between bg-slate-100 p-4 ">
              <div>
                <h2>New Conversation</h2>
                Suggested:
                <small className="text-cyan-500 font-medium">
                  What was the highest performing google compaign last month
                </small>
              </div>
              <div className="flex gap-4 text-slate-900">
                <button>
                  <GoPencil />
                </button>
                <button>
                  <GoShare />
                </button>
                <button>
                  <IoSettingsOutline />
                </button>
              </div>
            </div>
            <main
              ref={resultsContainerRef}
              id="main"
              className="bg-slate-50 p-4"
            >
              <h3 className="text-slate-900 font-bold">Chat details:-</h3>

              <div>
                <div>
                  {results?.map((item, i) => {
                    const { sql, data, query } = item;
                    return (
                      <article className="mb-5" key={i}>
                        <h2>Query--</h2>
                        <p>{query}</p>
                        <h2>Sql--</h2>
                        <h3>{sql}</h3>
                        <h2>Data--</h2>
                        <p>{data}</p>
                      </article>
                    );
                  })}
                </div>
                <div>{searchMutation.isLoading && <p>Fetching...</p>}</div>
              </div>
            </main>
            <div className="p-2 bg-slate-100">
              <Form onSubmit={handleSubmit} setSearch={setSearch} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default App;
