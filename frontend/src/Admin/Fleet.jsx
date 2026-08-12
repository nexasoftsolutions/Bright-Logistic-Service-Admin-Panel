import { PlusCircle, UploadCloud, Save, Trash2, Truck } from 'lucide-react';

const Fleet = () => {

  const fleetAssets = [
    {
      id: 1,
      title: '40ft Flatbed Trailer',
      capacity: '30 Tons',
      idealFor: 'Heavy Mach.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuChgCuTL-UjlWOYv2YEvKOW2oH1XI-y9zlyyVHHESh4tv8ogv_P5j6Dca6TUlj-fgDH-yvFggUatklL2hr7pFL6ctcJDQsgemxBmOxhmy-cMZVkL08ESgT2aJJYBdW7c7xhalveCBioY-OG0YCWgFJRS3sFIjMMhavWZHm-_D7VretbgkuezQbwHt5XuVTVs7AYrLIFu5MWOLLP_vn0oYWlsCoDU84wD1tP4G679GNnHq7F8Yn1W7282jTblyGdrcl3V0Y',
    },
    {
      id: 2,
      title: 'Refrigerated Truck',
      capacity: '15 Tons',
      idealFor: 'Perishables',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7GoJla3utS136SLgBMGGC6cNNglIvZ8IRwR0NmEddgo23iDiqrnlR8wzSu74hDqWY4pO536xUVZGjon7WnX0jW4-gKDviewSUEK32AMrQOY0AKxIu9rI023ZYpt3aSfM602ycwnbsA8swUoV_pZE8ay_IZ4VpaOlZvRQv94C3kBZcflWOgNiVIRvFut3ERxZqzvYLJWUTQIa33w7TM6sCwD9erAyeuOnJn43_AbucqK-X8C1pDYTQfg',
    },
    {
      id: 3,
      title: 'Panamax Vessel',
      capacity: '5000 TEU',
      idealFor: 'Global Freight',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUKXivaTpassz1VXLS49iFJzlnafrSAKMf50fKKvX8cFXVj3pxFJy13YuM86mCPy9wZ0WNMOtiQighuRx4jLIhsCWkV9uikdlK7gj2SK0a-gOMdruNB7-x-138V3xNBCclKMrit93U4Kmy5KN7tuJdHOpzuqDAVkwmwHKffJqITwEQxMXrJq3GXjFnTcwHsRvgj5Gs1sZzkzMBsoRZxbGftyylna1VWKnqGZVtMBUq20dcSigBHa9IA',
    },
    {
      id: 4,
      title: 'Boeing 747 Freighter',
      capacity: '112 Tons',
      idealFor: 'Express Delivery',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAyxyFoa_bDEMrD6bqA7XH8ZAEzfkOKY43Ek0TRDOJIUlCtOV4djAV5iZRoj3N7QKnydSu_xmZOFPktssGYv2vvCF3TR4aJIEcdI_HaCi2Ntl6egf-xf6wnqAcalDcADSEjc7jZpcoXvYzHKCx4o2oP11jZnDLxCdr2snhmfp7h0IxeheYEuXMn7VOKkekY4axNCCbgB5g8N4mVeZNocnOq-a_IS6CIU9UPjwuR0JjKg3lQBZGJetOJ5Q',
    },
  ];

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000613] tracking-tight mb-1">
              Fleet Management
            </h1>
            <p className="text-sm sm:text-base text-[#43474e]">
              Oversee and expand your operational assets.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#e8f0fe] border border-[#d2e3fc] rounded-full px-5 py-2 sm:px-6 sm:py-2.5 flex items-center gap-3 shadow-sm">
              <Truck className="w-5 h-5 text-[#0b57d0]" />
              <span className="font-bold text-[#0b57d0] text-base sm:text-lg">124</span>
              <span className="font-bold text-[#0b57d0] text-xs uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Asset Registration Form Sidebar */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <h2 className="mb-6 flex items-center gap-3">
              <PlusCircle className="w-6 h-6 text-[#904d00] shrink-0" />
              <span className="font-bold text-[#000613] text-lg sm:text-xl">Register Asset</span>
            </h2>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2 relative">
                <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                  Asset Designation
                </label>
                <input
                  className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                  placeholder="e.g. 40ft Flatbed"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                  Operational Capacity
                </label>
                <input
                  className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                  placeholder="e.g. 30 Tons"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                  Optimal Cargo
                </label>
                <input
                  className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                  placeholder="e.g. Heavy Machinery"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                  Specifications
                </label>
                <textarea
                  className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-24"
                  placeholder="Detailed structural notes..."
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                  Asset Imagery
                </label>
                <div className="bg-[#e8f0fe] border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group">
                  <UploadCloud className="w-10 h-10 text-[#001f3f] group-hover:text-[#904d00] transition-colors" />
                  <p className="font-sans text-xs text-center text-[#43474e] group-hover:text-[#000613] transition-colors leading-relaxed">
                    Drag &amp; drop<br />
                    schematics or<br />
                    click to browse<br />
                    files.
                  </p>
                </div>
              </div>

              <button
                className="mt-2 bg-[#904d00] text-white font-semibold py-4 rounded-lg shadow-md hover:bg-[#7d4200] hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <Save className="w-5 h-5" />
                <span>Deploy to Fleet</span>
              </button>
            </form>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fleetAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 group relative flex flex-col"
                >
                  <button
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
                    aria-label="Delete Asset"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                    <img
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={asset.image}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <h3 className="font-bold text-[#000613] text-base sm:text-lg mb-3 group-hover:text-[#904d00] transition-colors">
                      {asset.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#5c606a] uppercase text-[10px] font-bold tracking-widest">
                          Capacity
                        </p>
                        <p className="text-[#000613] font-bold text-sm sm:text-base mt-1">
                          {asset.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#5c606a] uppercase text-[10px] font-bold tracking-widest">
                          Ideal For
                        </p>
                        <p className="text-[#000613] font-bold text-sm sm:text-base mt-1">
                          {asset.idealFor}
                        </p>
                      </div>
                    </div>
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

export default Fleet;