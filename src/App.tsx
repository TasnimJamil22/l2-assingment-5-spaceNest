import React from "react";

import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes/Routes";

function App() {
  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
