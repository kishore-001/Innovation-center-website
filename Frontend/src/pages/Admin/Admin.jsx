import './admin.css'
import { Helmet } from "react-helmet"
import Sidebar from "../../components/sidebar"
import Header from "../../components/header"
import icons from '../../assets/icons'

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin - Innovation Center</title>
      </Helmet>
      <div className="ad-body">
        {/* SIDEBAR */}
        <Sidebar />
        <div className="ad-container">
          {/* HEADER */}
          <Header />
          {/* CONTENT */}
          <div className="ad-content">
            <div className="ad-card ad-card-1">
              <img src={icons.icon13} alt="icon" />
              <h2>Sync</h2>
              <p>To Sync Server to latest Upload the Sheet</p>
              <button className="ad-button-blue" type="button">Upload</button>
            </div>
            <div className="ad-card ad-card-2">
              <img src={icons.icon14} alt="icon" />
              <h2>Add staff</h2>
              <input type="text" placeholder='User Name'/>
              <div className='ad-content-card-box-3'>
                <button className="ad-button-blue" type="button">Add</button>
                <button className="ad-button-red" type="button">Remove</button>
              </div>
            </div>
            <div className="ad-card ad-card-3" >
                <img src={icons.icon15} alt="icon" />
                <h2>Excel</h2>
                <p>To Download the excel upto date</p>
                <button className="ad-button-blue" type="button">Download</button>
            </div>
            <div className="ad-card-4">
              <div className="ad-card-4-box1">
                  <img src={icons.icon16} alt="icons" />
                  <h2>Review</h2>
              </div>
              <div className="ad-card-4-box2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}