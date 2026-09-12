import { Route, Routes, Navigate, useParams } from "react-router"
import ContactDetail from "../Admin/ContactDetail"
import Industries from "../Admin/Industries"
import Sidebar from "../components/Sidebar"
import Dashboard from "../Admin/Dashboard"
import Navbar from "../components/Navbar"
import Services from "../Admin/Services"
import Coverage from "../Admin/Coverage"
import Gallery from "../Admin/Gallery"
import Quotes from "../Admin/Quotes"
import Fleet from "../Admin/Fleet"
import { useState } from "react"

const TokenGuard = ({ storedToken, children }) => {
  const { token } = useParams();

  if (!storedToken || token !== storedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const storedToken = localStorage.getItem("adminAuthToken")

  if (!storedToken) {
    return <Navigate to="/" replace />
  }

  return (
    <>
        <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0d1c2f]">
           <div className="lg:pl-72 transition-all duration-300">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
              <Routes>
                <Route index element={<Navigate to={`dashboard/${storedToken}`} replace />} />

                {/* Tokenized Routes */}
                <Route path="dashboard/:token" element={<TokenGuard storedToken={storedToken}><Dashboard /></TokenGuard>} />
                <Route path="add-gallery/:token" element={<TokenGuard storedToken={storedToken}><Gallery /></TokenGuard>} />
                <Route path="add-fleet/:token" element={<TokenGuard storedToken={storedToken}><Fleet /></TokenGuard>} />
                <Route path="add-services/:token" element={<TokenGuard storedToken={storedToken}><Services /></TokenGuard>} />
                <Route path="add-coverage/:token" element={<TokenGuard storedToken={storedToken}><Coverage /></TokenGuard>} />
                <Route path="add-industries/:token" element={<TokenGuard storedToken={storedToken}><Industries /></TokenGuard>} />
                <Route path="quotes/:token" element={<TokenGuard storedToken={storedToken}><Quotes /></TokenGuard>} />
                <Route path="contact-detail/:token" element={<TokenGuard storedToken={storedToken}><ContactDetail /></TokenGuard>} />

                {/* Fallbacks if accessed without token */}
                <Route path="dashboard" element={<Navigate to={`dashboard/${storedToken}`} replace />} />
                <Route path="add-gallery" element={<Navigate to={`add-gallery/${storedToken}`} replace />} />
                <Route path="add-fleet" element={<Navigate to={`add-fleet/${storedToken}`} replace />} />
                <Route path="add-services" element={<Navigate to={`add-services/${storedToken}`} replace />} />
                <Route path="add-coverage" element={<Navigate to={`add-coverage/${storedToken}`} replace />} />
                <Route path="add-industries" element={<Navigate to={`add-industries/${storedToken}`} replace />} />
                <Route path="quotes" element={<Navigate to={`quotes/${storedToken}`} replace />} />
                <Route path="contact-detail" element={<Navigate to={`contact-detail/${storedToken}`} replace />} />

                <Route path="*" element={<Navigate to={`dashboard/${storedToken}`} replace />} />
              </Routes>
            </div>
        </div>
    </>
  )
}

export default Layout
