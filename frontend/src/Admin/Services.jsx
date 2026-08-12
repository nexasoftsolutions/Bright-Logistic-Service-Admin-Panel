import { PlusCircle, Package, UploadCloud, ArrowRight, Trash2 } from 'lucide-react';

const Services = () => {

  const services = [
    {
      id: 1,
      title: 'Container Transportation',
      description:
        'Global maritime shipping solutions with real-time tracking, optimized routing, and secure handling for high-volume cargo.',
      status: 'Active',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDU9D0lvI9vcTRMcwx2HepuQzAyBS6uUJASZ80_LJPwC_VqiJLKqA9i4qIdj1Gv7UHoObvFYBH2o0CzNhNGk9zSRlHM1jU8f8E8xqd1pUKhJPJCMyaz39vq0A844kB29IVonC4dOq4Ar39hQNksh8vDw5vItgoNueOY4e0uaqFRrTRZpeVuebv-NIZSLzbTdR9I9_4SIzVd4_E_uooVArqSsSB9YoxvMVYrf5cViJwzN59hMI8BIexnHA',
    },
    {
      id: 2,
      title: 'Port Transportation',
      description:
        'Seamless drayage and port-to-warehouse logistics ensuring rapid clearance and movement of goods through major global hubs.',
      status: 'Active',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA9MxLPnyxZ2jGaHebi5ACYxGmNH21I8yop9l-rfVdNGf5utT2Dx5Kj-Ggf2ypShf3mMS_KQCTiK4PGLJKDNq6jR9ul3HbvOWnCPIfn9ECgdc2zNGZMLAnjcGt1yi0hDVYoOBBwWCjUrZ1d1VTyWhI1gFCqm9tllVJZV4ct3YbvAvzj8k8CZMoQ1xZnyKsvac7gJctCOeNjNDCMQJd0pyySNyx4OONk-aYLV94NWS7Q6v462CCt2kQHfw',
    },
    {
      id: 3,
      title: 'Plant Transfer',
      description:
        'End-to-end relocation of industrial plants and oversized equipment, including dismantling, transport, and reassembly logistics.',
      status: 'Draft',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhhzFeFbt65Yu4VjG3uJWtqqOnn81DY1gJsYWrzgrrfNZjEEQQrkm7C5JLjGeCJzFxxIoJh80u6F8FPNdhv2R9L_773xMzIS3mhx-Xp9mWq-Iofr43zjps8KLALSnMffIamqZHZBEMjWOl25JQRgRw2z64yYD1PeJGKzGBvaO_tQDBaZsaDWFdQxCQXWlmk617dzcXQEkHne-BhauXp51ZC4VaMyzCD0x4trfD6w0WKiCnXUhZMvJj6Q',
    },
    {
      id: 4,
      title: 'Contract Logistics',
      description:
        'Comprehensive supply chain management including warehousing, inventory control, and distribution tailored to specific industry needs.',
      status: 'Active',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAtGbGT0EIwIR1UCZfu4vrp-tKYUTF3J9WMEr5J3n__ObsyqmLg22nPRECGRHmNEws2FIZwFjYz5_2emC95pP16TdsJvp0govCWZSrL45TF650CuX8_CFGK6ewNaEn4rb0Pv_q3hhSWP-zDEvbCQBxyRrxvFkLE6zkyu45FfDYssPQthteaCSWWc2gDSllSAhobnTTvSvxC0sWhCUzNCcScm_YZdYMiKw4FgWB6XO2JdJ2uAF1vmdjZVw',
    },
  ];

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
        <div className="flex flex-col gap-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000613] tracking-tight">
            Services Management
          </h1>
          <p className="text-sm sm:text-base text-[#43474e] max-w-2xl">
            Create and manage logistics service offerings displayed across the customer portal.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Form & Stats Sidebar Column */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            {/* Form Card */}
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl transition-all duration-700 group-hover:bg-secondary/20 group-hover:scale-150" />
              <div className="flex items-center gap-3 relative z-10">
                <PlusCircle className="w-7 h-7 text-[#904d00]" />
                <h2 className="font-bold text-[#000613] text-lg sm:text-xl">Add New Service</h2>
              </div>

              <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                {/* Service Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Title
                  </label>
                  <input
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f]"
                    placeholder="e.g., Cold Chain Logistics"
                    type="text"
                  />
                </div>

                {/* Service Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Description
                  </label>
                  <textarea
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-32 placeholder-[#74777f]"
                    placeholder="Describe the capabilities, equipment, and coverage for this service offering."
                  />
                </div>

                {/* Service Image */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Image
                  </label>
                  <div className="w-full h-40 bg-[#e8f0fe] rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors cursor-pointer group/upload p-4 text-center">
                    <UploadCloud className="w-8 h-8 text-[#001f3f] group-hover/upload:text-[#904d00] mb-2 transition-colors" />
                    <span className="font-bold text-[#43474e] text-xs group-hover/upload:text-[#000613] transition-colors">
                      DRAG &amp; DROP IMAGE
                    </span>
                    <span className="font-sans text-xs text-[#5c606a] mt-1">or click to browse</span>
                  </div>
                </div>

                <button className="mt-2 w-full bg-[#050f1d] text-white font-semibold py-4 rounded-lg hover:bg-[#0c2444] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group/btn">
                  <span>Publish Service</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Quick Stats Widget */}
            <div className="bg-[#050f1d] text-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,31,63,0.05)] border border-slate-100 flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-on-primary/10 rounded-full blur-xl" />
              <div className="relative z-10 flex flex-col">
                <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  Active Services
                </span>
                <span className="text-2xl sm:text-3xl font-bold mt-1">12</span>
              </div>
              <Package className="w-10 h-10 text-slate-500 relative z-10" />
            </div>
          </div>

          {/* Services List Main Content */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banner Card */}
              <div className="col-span-1 md:col-span-2 rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] relative group cursor-pointer h-56 md:h-64">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDu43th-byj6AjM34pUh29LFcitJLJpdiFpjByCaROY-SrekCz_H9aqW79wZVg52GaNSaZwNmYtS5HSL3JLk_KCsbsiEP4DWytI2cU0VyEDmfuEDeq9VRzfMOhab99GW-V_Nm_JpA9lWId8Zn3KVm4athxwoMnEWHgTOJXaDvewrSxFeo1-k9fiIgK1eSEA9iF6YKUyvXHLkshMcON1lktPHigDKLXMFkDuWjPqPlN39ezYzbFmAOpPx4VJTuQEmhhwMk4')",
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <h3 className="font-bold text-white text-lg sm:text-xl mb-1">
                        Fleet Overview
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-200 max-w-lg line-clamp-2">
                        A comprehensive look at our modern transportation fleet, ready to handle diverse logistics requirements.
                      </p>
                    </div>
                    <button
                      aria-label="Delete"
                      className="w-10 h-10 shrink-0 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-white cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Cards */}
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative"
                >
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg">{service.title}</h3>
                      <button
                        aria-label="Delete Service"
                        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[#5c606a] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#43474e] leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex items-center gap-2 text-[#5c606a] font-bold text-[10px] uppercase tracking-wider">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            service.status === 'Active'
                              ? 'bg-[#904d00] shadow-[0_0_8px_rgba(144,77,0,0.5)]'
                              : 'bg-slate-300'
                          }`}
                        />
                        {service.status}
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

export default Services;