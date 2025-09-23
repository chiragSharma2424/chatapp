import React, { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState(['hi there']);
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
   
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col">

      <div className="flex-1 overflow-y-auto p-4 text-white">
       <div className="h-screen bg-black flex flex-col">
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map((msg, i) => (
      <div
        key={i}
        className="mb-2 p-2 rounded-md max-w-[70%] bg-gray-200 text-black"
      >
        {msg}
      </div>
    ))}
  </div>
</div>


      </div>

      <div className="flex p-2 bg-white">
        <input type="text" placeholder="Type your message..." id="ip"
          className="flex-1 p-2 rounded-l-lg outline-none"/>

        <button className="bg-purple-500 text-white px-4 rounded-r-lg"
          onClick={() => {
            const message = document.getElementById('ip')?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
            }))
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
