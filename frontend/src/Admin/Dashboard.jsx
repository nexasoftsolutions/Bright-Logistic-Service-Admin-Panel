import { Truck, Package, Building2, FileText, Plus, ArrowRight, Mail, ExternalLink, MapPin, PlusSquare, Edit3 } from 'lucide-react';

const Dashboard = () => {

  return (
        <main className="p-4 sm:p-8 lg:p-12 space-y-8 lg:space-y-12">
          {/* Welcome Banner & System Status */}
          <section className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-[#43474e] font-bold text-xs uppercase tracking-widest">
                Administrator Console
              </span>
              <h1 className="text-[#0d1c2f] font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight">
                Welcome Back, Ibrar.
              </h1>
            </div>
          </section>

          {/* KPI Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* KPI 1 */}
            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <a href="#" className="text-[#904d00] font-bold text-xs hover:underline flex items-center gap-1 group/link">
                  Check <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Total Quotes Received</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">1,482</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Active Fleet Count</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">347</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <Edit3 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Published Blogs</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">86</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Total Clients</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">1,204</span>
              </div>
            </div>
          </section>

          {/* Main Activity & Quick Actions Split */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Feed */}
            <div className="lg:col-span-2 bg-[#e6eeff] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#0d1c2f] text-xl font-bold">Recent Quote Requests</h2>
                <a href="#" className="text-[#43474e] font-bold text-xs hover:text-[#000613] transition-colors flex items-center gap-1">
                  View All <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-3 bottom-3 w-px bg-[#c4c6cf]/40 hidden sm:block" />

                {/* Activity Item 1 */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative group">
                  <div className="w-12 h-12 rounded-full bg-white shrink-0 hidden sm:flex items-center justify-center z-10 shadow-sm border border-slate-200 group-hover:border-[#904d00] transition-colors">
                    <Mail className="w-5 h-5 text-[#904d00]" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-5 shadow-sm w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-[#0d1c2f] font-bold text-base">Acme Corp Logistics Need</h3>
                        <p className="text-[#43474e] text-xs mt-0.5">
                          Requested by <span className="text-[#000613] font-semibold">Sarah Jenkins</span>
                        </p>
                      </div>
                      <span className="text-[#43474e] text-xs font-bold bg-[#dde9ff] px-3 py-1 rounded-full whitespace-nowrap">
                        10 mins ago
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#43474e]">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#904d00]" /> NYC to LDN</span>
                      <span className="flex items-center gap-1"><Package className="w-4 h-4 text-[#904d00]" /> 12 TEU</span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative group">
                  <div className="w-12 h-12 rounded-full bg-white shrink-0 hidden sm:flex items-center justify-center z-10 shadow-sm border border-slate-200 group-hover:border-[#904d00] transition-colors">
                    <Mail className="w-5 h-5 text-[#904d00]" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-5 shadow-sm w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-[#0d1c2f] font-bold text-base">Heavy Machinery Transport</h3>
                        <p className="text-[#43474e] text-xs mt-0.5">
                          Requested by <span className="text-[#000613] font-semibold">Marcus Vance</span>
                        </p>
                      </div>
                      <span className="text-[#43474e] text-xs font-bold bg-[#dde9ff] px-3 py-1 rounded-full whitespace-nowrap">
                        1 hour ago
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#43474e]">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#904d00]" /> HAM to DXB</span>
                      <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-[#904d00]" /> Oversized Load</span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative group">
                  <div className="w-12 h-12 rounded-full bg-white shrink-0 hidden sm:flex items-center justify-center z-10 shadow-sm border border-slate-200 group-hover:border-[#904d00] transition-colors">
                    <Mail className="w-5 h-5 text-[#904d00]" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-5 shadow-sm w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-[#0d1c2f] font-bold text-base">Standard Container Freight</h3>
                        <p className="text-[#43474e] text-xs mt-0.5">
                          Requested by <span className="text-[#000613] font-semibold">Global Retail Inc.</span>
                        </p>
                      </div>
                      <span className="text-[#43474e] text-xs font-bold bg-[#dde9ff] px-3 py-1 rounded-full whitespace-nowrap">
                        3 hours ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#0d1c2f] text-xl font-bold mb-1">Quick Actions</h2>

              <a
                href="#"
                className="group block bg-[#000613] rounded-xl overflow-hidden shadow-sm relative h-36 p-6 flex-col justify-end"
              >
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvk9i_KHQt9L3OF6NFl7lAFR-YTkAE-WPwPCzKJN4WT-5Lq1TVe0ux-q61cQxKdF6MdvfznVVnxfXC07DVHmIVLJOmIyl1hVH2LTTTG_ZQLLOr2CfqUi4IvkQXeh0r9RNNs6MrhRcyafT5MRfzCRH5eYsqI9XDMGOV0qfa2--QaMhZLu7XIbT1Z3i45i9rakytnSJmdfXSxGp0o8Au5vPoqSwrd2_Q3Ubf1OaN5898x2oyi5xq9bHgHw')`,
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#000613] via-[#000613]/80 to-transparent z-10" />
                <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="w-9 h-9 bg-[#fd8b00] text-[#2f1500] rounded-full flex items-center justify-center shadow-md">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Add New Fleet</h3>
                    <p className="text-white/80 text-xs mt-0.5">Register new vehicles or vessels.</p>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="group block bg-[#e6eeff] rounded-xl overflow-hidden shadow-sm relative h-36 p-6 hover:bg-[#dde9ff] transition-colors"
              >
                <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="w-9 h-9 bg-white border border-slate-200 text-[#000613] rounded-full flex items-center justify-center shadow-sm group-hover:border-[#000613] transition-colors">
                    <PlusSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1c2f] font-bold text-lg group-hover:text-[#000613] transition-colors">
                      Upload Gallery Image
                    </h3>
                    <p className="text-[#43474e] text-xs mt-0.5">Update media assets.</p>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="group block bg-[#e6eeff] rounded-xl overflow-hidden shadow-sm relative h-36 p-6 hover:bg-[#dde9ff] transition-colors"
              >
                <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="w-9 h-9 bg-white border border-slate-200 text-[#000613] rounded-full flex items-center justify-center shadow-sm group-hover:border-[#000613] transition-colors">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#0d1c2f] font-bold text-lg group-hover:text-[#000613] transition-colors">
                      Post New Blog
                    </h3>
                    <p className="text-[#43474e] text-xs mt-0.5">Draft or publish articles.</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </main>
  );
}

export default Dashboard