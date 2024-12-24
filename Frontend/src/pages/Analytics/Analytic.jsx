// importing the css

import './Analytics.css'

// Importing the components 

import { Helmet } from "react-helmet"
import Sidebar from "../../components/sidebar"
import Header from "../../components/header"

// Bar Chart

import Ideatotal from "../../components/Charts/bar/idea-total"
import Deptimpr from "../../components/Charts/bar/dept-impr"
import Deptinno from "../../components/Charts/bar/dept-inno"
import Depttotal from "../../components/Charts/bar/dept-total"

// Pie Chart

import Ideainnov from '../../components/Charts/Pie/idea-innov'
import Priority from '../../components/Charts/Pie/priority'
import Staff from '../../components/Charts/bar/staff'
import Statusimpr  from '../../components/Charts/Pie/status-impr'
import Statusinnov from '../../components/Charts/Pie/status-innov'
import Ideatheme from '../../components/Charts/Pie/Idea-theme'


export default function Analytic() {
  return (
    <>
      <Helmet>
        <title>Admin - Innovation Center</title>
      </Helmet>
      <div className="al-body">
        {/* SIDEBAR */}
        <Sidebar />
        <div className="al-container">
          {/* HEADER */}
          <Header />
          {/* CONTENT */}
          <div className="al-content">

            {/* Content box 1 - type - 1 */}

            <div className="al-content-box-type-1">
              <div className="al-content-box-type-1-1">
                <p>Ideas by Month</p>
                <Ideatotal />
              </div>
              <div className="al-content-box-type-1-2">
                <p>Innovation v/s Improvement</p>
                <Ideainnov />
              </div>
            </div>

            {/* Content box 2 - type - 2 */}

            <div className="al-content-box-type-2">
              <p>Innovation Idea</p>
              <div className="al-content-box-inner">
              <div className="al-content-box-type-2-1">
                <Deptinno />
              </div>
              <div className="al-content-box-type-2-2">
                <Statusinnov />
              </div>
              </div>
            </div>

            {/* Content box 3 - type - 2 */}

            <div className="al-content-box-type-2">
              <p>Improvement Idea</p>
              <div className="al-content-box-inner">
              <div className="al-content-box-type-2-1">
              <Deptimpr />
              </div>
              <div className="al-content-box-type-2-2">
              <Statusimpr />
              </div>
              </div>
            </div>
            <div className="al-content-box-type-1 ">
              <div className="al-content-box-type-1-1">
                <p>Staff Category</p>
                <Staff />
              </div>
              <div className="al-content-box-type-1-2">
                <p>Priority Based</p>
                <Priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}