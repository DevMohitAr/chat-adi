import "./App.css";
import React from "react";
import { Form } from "./components/form";
import { GoShare, GoSearch, GoPencil } from "react-icons/go";
import { TbGridDots } from "react-icons/tb";
import { PiChatCircleDots } from "react-icons/pi";
import { CiChat1 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useMutation } from "react-query";
function App() {
  // const [search, setSearch] = React.useState("");
var myHeaders = new Headers();
myHeaders.append("authorization", "");
myHeaders.append("X-API-Key", "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJsYW5ndGFpbC1hcGkiLCJzdWIiOiJjbHB3bjJ4M3AwMDAzbDcwODhzejdmZWZkIiwianRpIjoiY2xxMHZhajRxMDAwMWxiMDhpcW1nbmFveCIsImlhdCI6MTcwMjI5NjM0Nn0.go-RsEYVU4IRA-qbDxIyd7HzfL0SmmkLPvpeN8PclcyYuv0Tpf2rGtGN3Vh2K5kyBZ8iih-zp7XQSzcuyQPy_g");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "stream": false,
  "user_id": "user_123",
  "seed": 123,
  "doNotRecord": false,
  "messages": [
    {
      "role": "user",
      "content": "hello"
    }
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
}; 
  const searchMutation = useMutation(() =>fetch("https://api.langtail.com/push-EiMrQa/langtail-playground/playground/staging",requestOptions).then((res)=>res.json()), {
    onSuccess: (data) => {
      console.log("getting", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSearch(e.target.elements.search.value);
    // searchMutation.mutate();
    // setSearch("");
    if (searchMutation.isLoading) return null;
    searchMutation.mutate();
  };
  // React.useEffect(()=>{
  //   const apiUrl =
  //     "https://api.langtail.com/push-EiMrQa/langtail-playground/playground/staging";
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "X-API-Key":
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJsYW5ndGFpbC1hcGkiLCJzdWIiOiJjbHB3bjJ4M3AwMDAzbDcwODhzejdmZWZkIiwianRpIjoiY2xxMHZhajRxMDAwMWxiMDhpcW1nbmFveCIsImlhdCI6MTcwMjI5NjM0Nn0.go-RsEYVU4IRA-qbDxIyd7HzfL0SmmkLPvpeN8PclcyYuv0Tpf2rGtGN3Vh2K5kyBZ8iih-zp7XQSzcuyQPy_g",
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       stream: false,
  //       user_id: "user_123",
  //       seed: 123,
  //       doNotRecord: false,
  //       messages: [{ role: "user", content: "Hello" }],
  //     }),
  //   };
  //     const fetchData = async (url, options) => {
  //       const resp = await fetch(url, options);
  //       if (resp.status === 200) {
  //         const data = await resp.json();
  //         if (data.error) {
  //           throw new Error("error");
  //         }
  //         return data;
  //       }
  //       throw new Error("ERROR");
  //     };
  //     fetchData(apiUrl,options)
  // },[])

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
            <div className="bg-slate-50 p-4">
              <h3>Chat details</h3>
            </div>
            <div className="p-2 bg-slate-100">
              <Form onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default App;
