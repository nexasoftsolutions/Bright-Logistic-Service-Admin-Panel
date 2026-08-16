import { LayoutDashboard, Image as GalleryIcon, Truck, Package, Globe, Building2, FileText, Contact, X } from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = ({ isOpen, onClose }) => {

  const navigationItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Gallery", icon: GalleryIcon, path: "/add-gallery" },
    { label: "Fleet", icon: Truck, path: "/add-fleet" },
    { label: "Services", icon: Package, path: "/add-services" },
    { label: "Coverage", icon: Globe, path: "/add-coverage" },
    { label: "Industries", icon: Building2, path: "/add-industries" },
    { label: "Quotes", icon: FileText, path: "/quotes" },
    { label: "Contact Details", icon: Contact, path: "/contact-detail" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 sm:px-8 border-b border-[#c4c6cf]/30">
          <span className="text-[#000613] font-bold text-xl tracking-tight">
            BRIGHT <span className="text-[#904d00]">LOGISTICS</span>
          </span>
          <button
            onClick={onClose}
            className="lg:hidden text-[#43474e] hover:text-[#000613]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={`/admin${item.path}`}
                onClick={onClose}
                className={({ isActive }) => `${isActive ? "bg-[#fd8b00] text-white" : "text-[#43474e] hover:bg-[#dde9ff] hover:text-[#0d1c2f]" } flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all group`}
              >
                <Icon className="w-5 h-5 mr-3 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
