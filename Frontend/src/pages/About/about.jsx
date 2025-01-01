import './About.css'
import { Helmet } from 'react-helmet'
import Sidebar from '../../components/sidebar'
import Header from '../../components/header'
// import Footer from '../../components/footer'
import images from '../../assets/images'
// import icons from '../../assets/icons'
import Footer from '../../components/footer'

export default function About() {
  return (
    <div>
      <>
        <Helmet>
          <title> About us  - Innovation Center</title>
        </Helmet>
        <div className="au-body">
          {/* SIDEBAR */}
          <Sidebar />
          <div className="au-container">
            {/* HEADER */}
            <Header />
            {/* CONTENT */}
            <div className="au-content">
              <p className="au-title-1">Innovation&nbsp;Center</p>
              <div className="au-title-container">
                <img src={images.img6} alt="image" />
                <p>&quot;What we envision today becomes the foundation for tomorrow&apos;s innovations and the world’s transformation.&quot;</p>
              </div>
              <div className="au-wwr-container">
                <div className="au-wwr-box">
                  <p className="au-wwr-title">Who we are</p>
                  <p className="au-wwr-text"> we are a dedicated hub for fostering creativity, collaboration, and forward-thinking solutions. Our mission is to empower individuals and teams to transform their ideas into impactful innovations. With a commitment to excellence, we bring together talented professionals, cutting-edge technology, and a vibrant community to tackle real-world challenges. By nurturing a culture of inclusivity and continuous improvement, we aim to be a catalyst for progress and a beacon of inspiration for innovators everywhere.
                  </p>
                </div>
                <img src={images.img7} alt="image" />
              </div>
              <p className="au-title-1">Our Misson</p>
              <div className="au-body-container">

                <div className="au-body-items au-body-items-text">
                  <p>our mission is to empower creativity and collaboration by providing a dynamic platform where ideas flourish and innovation thrives. We are committed to enabling individuals and organizations to address challenges with cutting-edge solutions, fostering an environment where groundbreaking concepts can be transformed into reality.</p>
                </div>
                <div className="au-body-items">
                  <img src={images.img8} alt="images" />
                </div>
                <div className="au-body-items">
                  <img src={images.img9} alt="images" />
                </div>
                <div className="au-body-items au-body-items-text">
                  <p>
                    As a driving force for innovation, we are dedicated to bridging the gap between vision and action. By embracing new technologies, nurturing talent, and fostering partnerships, we aim to deliver solutions that address pressing societal needs and unlock potential across industries. Together, we can create transformative change and lead the way toward a more innovative and sustainable future.
                  </p>
                </div>
              </div>
              
              {/* Footer */}

              <Footer />

            </div>
          </div>
        </div>

      </>
    </div>
  )
}