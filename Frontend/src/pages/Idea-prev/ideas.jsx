
// Importing the Css

import "./ideas.css"

// Importing the Components 

import { Helmet } from "react-helmet"
import Sidebar from "../../components/sidebar"
import Header from "../../components/header"




export default function IdeaPrev() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Innovation Center</title>
      </Helmet>
      <div className="id-body">
        {/* SIDEBAR */}
        <Sidebar />
        <div className="id-container">
          {/* HEADER */}
          <Header />
          {/* CONTENT */}
          <div className="id-content-1"></div>
          <div className="id-content-2">Page 1 of 68</div>
        </div>
      </div>
    </>
  )
}