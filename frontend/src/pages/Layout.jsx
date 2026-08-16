import { Route, Routes } from "react-router"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Dashboard from "../Admin/Dashboard"
import Gallery from "../Admin/Gallery"
import Fleet from "../Admin/Fleet"
import Services from "../Admin/Services"
import Coverage from "../Admin/Coverage"
import Industries from "../Admin/Industries"
import ContactDetail from "../Admin/ContactDetail"
import Quotes from "../Admin/Quotes"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
        <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0d1c2f]">
           <div className="lg:pl-72 transition-all duration-300">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
              <Routes>
                <Route index element={<Dashboard/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="add-gallery" element={<Gallery/>}/>
                <Route path="add-fleet" element={<Fleet/>}/>
                <Route path="add-services" element={<Services/>}/>
                <Route path="add-coverage" element={<Coverage/>}/>
                <Route path="add-industries" element={<Industries/>}/>
                <Route path="quotes" element={<Quotes/>}/>
                <Route path="contact-detail" element={<ContactDetail/>}/>
              </Routes>
            </div>
        </div>
    </>
  )
}

export default Layout
