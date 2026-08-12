import { ContactRound, MapPin, Phone, MessageSquare, User, BadgeCheck, Save, Smartphone } from 'lucide-react';
import { useState } from 'react';

const ContactDetail = () => {

  // Form State initialized with your design values
  const [formData, setFormData] = useState({
    hqLocation: 'Karachi, Pakistan',
    mainOfficeNumber: '0300-0641482',
    whatsappNumber: '0300-0641482',
    directorName: 'Ibrar Khan',
    directorNumber: '0300-0641481',
  });

  const [savedData, setSavedData] = useState({ ...formData });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  console.log(savedData);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedData({ ...formData });
    alert('Contact details updated successfully!');
  };

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
        {/* Header Title Section */}
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000613] tracking-tight">
            Contact Details
          </h1>
          <p className="text-sm sm:text-base text-[#43474e] max-w-2xl">
            Manage and update the primary contact information displayed across the Lumina Freight platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl overflow-hidden relative">
            <div className="p-6 sm:p-8">
              {/* Form Header */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#0b57d0] shrink-0">
                  <ContactRound size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-[#000613] text-lg sm:text-xl">
                    Headquarters Information
                  </h2>
                  <p className="text-xs sm:text-sm text-[#43474e]">
                    Update primary office and support details.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="hqLocation"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Headquarters Location
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        id="hqLocation"
                        type="text"
                        value={formData.hqLocation}
                        onChange={handleChange}
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="mainOfficeNumber"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Main Office Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        id="mainOfficeNumber"
                        type="text"
                        value={formData.mainOfficeNumber}
                        onChange={handleChange}
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="whatsappNumber"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      WhatsApp Support Number
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        id="whatsappNumber"
                        type="text"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-8" />

                {/* Director Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#5c606a] shrink-0">
                    <User size={20} />
                  </div>
                  <h3 className="font-bold text-[#000613] text-base sm:text-lg">
                    Director Contact
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="directorName"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Director Name
                    </label>
                    <div className="relative">
                      <BadgeCheck
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        id="directorName"
                        type="text"
                        value={formData.directorName}
                        onChange={handleChange}
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="directorNumber"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Director Contact Number
                    </label>
                    <div className="relative">
                      <Smartphone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        id="directorNumber"
                        type="text"
                        value={formData.directorNumber}
                        onChange={handleChange}
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Action Submit */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#050f1d] hover:bg-[#0c2444] text-white font-semibold text-xs uppercase tracking-wider py-4 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Save
                      size={18}
                      className="group-hover:-translate-y-0.5 transition-transform"
                    />
                    Update Contact Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactDetail;
