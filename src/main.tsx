import React from "react"
import ReactDOM from "react-dom/client"

import "./globals.css"
import "./index.css"

import { Badge } from "./components/ui/badge"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="h-full w-full flex flex-col justify-center items-center border-4 border-red">
      <Badge>My Template</Badge>
    </div>
  </React.StrictMode>
)
