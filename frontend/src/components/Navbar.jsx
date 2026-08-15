import { Menu, LogOut, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { client } from "../sanityClient";
import { toast } from "react-toastify";

const Navbar = () => {

  const modalRef = useRef(null);
  const navigate = useNavigate()

  const [adminDetail, setAdminDetail] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const brandLogo = "/BrightLogo.jpg";
  const adminAvatar = adminDetail?.avatar || brandLogo;

  const { data: fetchAdminData = [] } = useQuery({
    queryKey: ['admin'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "admin"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500
  })

  useEffect(() => {
    setAdminDetail(fetchAdminData[0])
  }, [fetchAdminData])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleLogout = () => {
    setProfileOpen(false);
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <header className="sticky top-0 h-20 bg-[#f8f9ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#43474e] hover:text-[#000613] focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>

          <img
            src={brandLogo}
            alt="Bright Logistics"
            className="h-10 w-auto object-contain rounded-md"
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-[#c4c6cf]/30 cursor-pointer focus:outline-none group"
            aria-label="Open profile menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#0d1c2f] group-hover:text-[#904d00] transition-colors">
                {adminDetail?.name || "Admin"}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#43474e] font-bold">
                SYSTEM ADMIN
              </p>
            </div>
            <img
              alt="Profile"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#dde9ff] group-hover:border-[#904d00] transition-colors"
              src={adminAvatar}
            />
          </button>

          {profileOpen && (
            <div
              ref={modalRef}
              className="absolute top-14 right-0 w-72 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,31,63,0.12)] border border-slate-100 overflow-hidden z-50 animate-fade-in"
            >
              <div className="bg-[#050f1d] p-5 relative">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <img
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    src={adminAvatar}
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{adminDetail?.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-[#904d00] font-bold mt-0.5">
                      SYSTEM ADMIN
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-[#f8f9ff] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-[#e8f0fe] rounded-full flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-[#0b57d0]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#74777f] font-bold">
                      Admin Name
                    </p>
                    <p className="text-sm font-bold text-[#000613]">{adminDetail?.name || "No Name"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#f8f9ff] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-[#e8f0fe] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#74777f] font-bold">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-[#000613] truncate">{adminDetail?.email || "No Email"}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-1 w-full bg-[#050f1d] hover:bg-[#0c2444] text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
