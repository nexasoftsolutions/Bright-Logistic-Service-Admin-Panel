import { MapPinPlus, Building, Layers, ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Coverage = () => {
  const [locations, setLocations] = useState([
    { id: 1, city: 'Karachi', speciality: 'Primary Gateway' },
    { id: 2, city: 'Lahore', speciality: 'Distribution Hub' },
    { id: 3, city: 'Islamabad', speciality: 'Customs Clearance Point' },
  ]);

  const [cityName, setCityName] = useState('');
  const [speciality, setSpeciality] = useState('');

  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!cityName.trim() || !speciality) return;

    const newLoc = {
      id: Date.now(),
      city: cityName.trim(),
      speciality: speciality,
    };

    setLocations([...locations, newLoc]);
    setCityName('');
    setSpeciality('');
  };

  const handleDecommission = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
        {/* Title Header */}
        <div className="flex items-end justify-between w-full mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000613] tracking-tight mb-1">
              Coverage Management
            </h1>
            <p className="text-sm sm:text-base text-[#43474e] max-w-2xl">
              Manage and monitor active service locations, gateways, and distribution hubs across the global network.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Left Column: Form Section */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#904d00] transition-opacity" />
              <h2 className="mb-6 flex items-center gap-2.5">
                <MapPinPlus className="text-[#904d00]" size={22} />
                <span className="font-bold text-[#000613] text-lg sm:text-xl">Add New Location</span>
              </h2>
              <form onSubmit={handleAddLocation} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="city-name"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    City / Location Name
                  </label>
                  <div className="relative">
                    <Building
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                    />
                    <input
                      id="city-name"
                      type="text"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      placeholder="e.g. Frankfurt, Shanghai"
                      className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm py-3 pl-10 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="city-speciality"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    Operational Speciality
                  </label>
                  <div className="relative">
                    <Layers
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                    />
                    <select
                      id="city-speciality"
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm py-3 pl-10 pr-4 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#904d00]/30 cursor-pointer transition-all"
                    >
                      <option value="" disabled>
                        Select facility type...
                      </option>
                      <option value="Primary Gateway">Primary Gateway</option>
                      <option value="Distribution Hub">Distribution Hub</option>
                      <option value="Customs Clearance Point">Customs Clearance Point</option>
                      <option value="Last-Mile Center">Last-Mile Center</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[#050f1d] hover:bg-[#0c2444] text-white font-semibold py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group/btn text-sm"
                >
                  <span>Add Location</span>
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Grid Section */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-bold text-[#000613] text-lg sm:text-xl">
                Active Facilities Grid
              </h2>
            </div>

            {/* Active Facilities Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {locations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="p-6 flex flex-col grow justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-[#000613] text-lg">
                        {item.city}
                      </h3>
                      <p className="text-[#5c606a] text-sm font-medium">
                        {item.speciality}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDecommission(item.id)}
                      className="w-fit mt-2 py-2 flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer group/remove"
                    >
                      <Trash2
                        size={15}
                        className="group-hover/remove:scale-110 transition-transform"
                      />
                      Decommission
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Coverage;