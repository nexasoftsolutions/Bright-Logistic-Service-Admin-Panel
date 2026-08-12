import { PlusCircle, CloudUpload, Trash2, Save, Layers, Syringe, Car, Cpu, Shirt } from 'lucide-react';

const Industries = () => {
 

  // Industry Cards Data
  const industries = [
    {
      id: 1,
      title: 'Pharmaceuticals',
      badge: 'High Priority',
      badgeIcon: Syringe,
      description:
        'Temperature-controlled logistics for sensitive medical supplies and vaccines globally.',
      routes: '24 Active Routes',
      statusColor: 'bg-secondary animate-pulse',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCmrMzB8brOVi-FRqAs6NUOWWAIM1Lyv4xRS8Yg_dG3um58Ogi5EzA7toj2Ugo4qwu-WTXfLHVMjxTxIJXc1opKFldeOhAoHmTLXFkDwMHXmSbyos3QjyztNgAUNCT-Ii_1xmwmos89OdErHBGYd3Fwu1iNJtzf_kqTOOxsIrAcCizCM5-1xDhTEPY73LuH2ljy5NyI1ArkyqY8biwWpEdIFbb6vzkzfc044oFCPJOKxGcYuC6TJBaLJg',
    },
    {
      id: 2,
      title: 'Automotive',
      badge: 'Heavy Load',
      badgeIcon: Car,
      description:
        'RoRo shipping and parts distribution network for major global automotive manufacturers.',
      routes: '12 Active Routes',
      statusColor: 'bg-secondary animate-pulse',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-PzkZFTDqmPf0SX01Vr1f2k704fGRE3Y4mT2ruCXzO6vyhKEKJ345PBrbtUmQVfls4WO-i2DU4ZMV8TLEzz0Y1m3cpb1aES8hzt1X0oT1Mn57FQ_iX-EwY-MJbpx5AoGxmV2bZIvjdDco4jTJ5D__lxVUbzfGFx8NeVdioGZiaIRVyr0n6yTpE-grgQcgwA12WqOXme4-q7Wc_j7c-FUxdwbocV9LtVM4xyEFZbWXotiF9rehBcpXuQ',
    },
    {
      id: 3,
      title: 'Consumer Electronics',
      badge: 'Express',
      badgeIcon: Cpu,
      description:
        'High-security, express air freight for high-value technological components and devices.',
      routes: '48 Active Routes',
      statusColor: 'bg-secondary animate-pulse',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDhwTM9vBDWVjggAxvPdxVfAbinF_v16cvl3OZAgTkjDUozyUuihfZb_fAsJk0qVpEyGrrprwYiPOoTCtBAUrJjNGl8C04Qtf2BjbGg-VkvFBexJtkFBpN0nO0T3mbK5B4iYtf5NrSSccF0adFip179pjVJgcPJgDN26XUxvUtwpNfIdFpmNHQ1qFbE0vGjqICVCk2IrnW_rrM0BRGmBA4pZzBMKm08u-ImVYqJ77H6TZUd9FQph9-h1g',
    },
    {
      id: 4,
      title: 'Retail & Fashion',
      badge: 'Standard',
      badgeIcon: Shirt,
      description:
        'Global distribution networks optimizing seasonal inventory flow for major retail brands.',
      routes: '86 Active Routes',
      statusColor: 'bg-surface-container-highest',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZhcCPub0QzdKtLoiLQvoFmU4JJ31MhIiyTXYXoAzOn2Fb7y3Z8c5gSf-ltL9KTJJEXiJoF_ep4gnv7PeorhE0SknJ_zFkzgh0BH0dyw40svt95JK-VDZ6rVxxwgG9yKlPBcA1WTgUPhlJV18v82pa7_4cuoE4qrABk7JUfO-Ubiz_aJLDkxnsvYd-PxTdsXf-J6JCFBveu6IhA8ensLFLMdd1iPtGtX52t8u06uG877t30B27Mudng',
    },
  ];

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-75 lg:max-w-7xl mx-auto">
        {/* Page Title Header */}
        <div className="flex flex-col gap-2 relative z-10 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000613] tracking-tight">
            Industries Management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Add New Industry Form */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="mb-6">
                <h2 className="flex items-center gap-2 mb-2">
                  <PlusCircle className="w-6 h-6 text-[#904d00] shrink-0" />
                  <span className="font-bold text-[#000613] text-lg sm:text-xl">Add New Industry</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#43474e]">
                  Create a new industry category for the logistics network.
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                {/* Industry Type Input */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="industry-type"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    Industry Type
                  </label>
                  <input
                    id="industry-type"
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f] border-none"
                    placeholder="e.g. Automotive, Pharmaceuticals..."
                    type="text"
                  />
                </div>

                {/* Description Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="description"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-24 placeholder-[#74777f] border-none"
                    placeholder="Brief description of cargo requirements..."
                  />
                </div>

                {/* Image Dropzone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block">
                    Cover Image
                  </label>
                  <div className="bg-[#e8f0fe] border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer group p-6 text-center">
                    <CloudUpload className="w-8 h-8 text-[#001f3f] group-hover:text-[#904d00] transition-colors" />
                    <p className="font-bold text-[#43474e] text-xs group-hover:text-[#000613] transition-colors">
                      Click to upload or drag and drop
                    </p>
                    <p className="font-sans text-[10px] text-[#5c606a] leading-tight">
                      SVG, PNG, JPG or GIF (max. 800&times;400px)
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="mt-2 w-full bg-[#050f1d] hover:bg-[#0c2444] text-white font-semibold py-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                  type="button"
                >
                  <Save className="w-4 h-4" />
                  <span>Add Industry</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Existing Active Industries Grid */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#5c606a] shrink-0" />
                <span className="font-bold text-[#000613] text-lg sm:text-xl">Active Industries</span>
              </h2>
            </div>

            {/* Industries Responsive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {industries.map((item) => {
                const BadgeIcon = item.badgeIcon;
                return (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 relative flex flex-col h-full"
                  >
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors z-10 opacity-0 group-hover:opacity-100 shadow-sm flex items-center justify-center cursor-pointer"
                      aria-label="Delete Industry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div
                      className="h-36 w-full bg-cover bg-center relative bg-slate-100"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        <BadgeIcon className="w-3.5 h-3.5 text-white" />
                        <span className="font-bold text-white text-[10px] tracking-wider uppercase">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#43474e] leading-relaxed mb-4 flex-1 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-[#5c606a]">
                          {item.routes}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.statusColor.includes('bg-secondary')
                              ? 'bg-[#904d00] shadow-[0_0_6px_rgba(144,77,0,0.4)] animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Industries;