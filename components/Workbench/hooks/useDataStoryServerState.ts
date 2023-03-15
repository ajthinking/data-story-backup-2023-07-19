import { useEffect, useState } from "react";

export const useDataStoryServerState = (initialState: any) => {
  const [serverState, setServerState] = useState(initialState);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connect = () => {
      setShowSpinner(true);

      socket = new WebSocket("ws://localhost:3100"); // Replace with your server URL
      
      socket.onopen = () => {
        console.log("Connected to server");
        setShowSpinner(false);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error: ", error);
        setShowError(true);
      };

      socket.onmessage = (event) => {
        console.log("Received message from server: ", event.data);
        setServerState(JSON.parse(event.data));
      };
    };

    // ensure we are in the browser
    if (typeof window !== "undefined") {
      console.log("Connecting to server...")
      connect();
    }

    // Use an empty array as the second argument to ensure that the effect only runs once.
    // The cleanup function will close the WebSocket when the component unmounts.
    return () => {
      console.log("Unmounting socket")
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return [serverState, setServerState, showSpinner, showError];
};

// import { useEffect, useState } from "react";

// const useDataStoryServerState = (initialState: any) => {
//   const [serverState, setServerState] = useState(initialState);
//   const [showSpinner, setShowSpinner] = useState(false);
//   const [showError, setShowError] = useState(false);

//   useEffect(() => {
//     let socket: WebSocket | null = null;
//     setShowSpinner(true);

//     if (typeof window === "undefined") return console.log("Blocked at server rendering");

//     const connect = () => {
//       // ensure we are in the browser
//       socket = new WebSocket("ws://localhost:3100"); // Replace with your server URL
      
//       socket.onopen = () => {
//         console.log("Connected to server");
//         setShowSpinner(false);
//       };

//       socket.onerror = (error) => {
//         console.error("WebSocket error: ", error);
//         setShowError(true);
//       };

//       socket.onmessage = (event) => {
//         console.log("Received message from server: ", event.data);
//         setServerState(JSON.parse(event.data));
//       };
//     };

//     console.log("Connecting to server...")
//     connect();

//     return () => {
//       console.log("Unmounting socket????")
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

//   return [serverState, setServerState, showSpinner, showError];
// };

// export { useDataStoryServerState };