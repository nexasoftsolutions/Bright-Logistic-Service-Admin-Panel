import { Truck, Package, Building2, FileText, Plus, ArrowRight, Mail, ExternalLink, MapPin, PlusSquare, Edit3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { client } from '../sanityClient';

const Dashboard = () => {

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

  const { data: fetchFleetData = [] } = useQuery({
    queryKey: ['fleet'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "fleet"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500
  })

  const { data: fetchQuotesData = [] } = useQuery({
    queryKey: ['qoute'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "quote"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500
  })

  const quotes = fetchQuotesData || [];

  return (
        <main className="p-4 sm:p-8 lg:p-12 space-y-8 lg:space-y-12">
          <section className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 relative z-10">
            <div className="space-y-2">
              <span className="text-[#43474e] font-bold text-xs uppercase tracking-widest">
                Administrator Console
              </span>
              <h1 className="text-[#0d1c2f] font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight">
                Welcome Back, {fetchAdminData?.[0]?.name || 'Admin'}.
              </h1>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <Link to={`/admin/quotes`} className="text-[#904d00] font-bold text-xs hover:underline flex items-center gap-1 group/link">
                  Check <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Total Quotes Received</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">{fetchQuotesData?.length || 0}</span>
              </div>
            </div>

            <div className="bg-[#e6eeff] rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-45 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div className="bg-[#000613] text-white p-3 rounded-lg shadow-sm">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-[#43474e] text-sm">Active Fleet Count</span>
                <span className="block text-[#000613] text-2xl sm:text-3xl font-bold mt-1">{fetchFleetData?.length}</span>
              </div>
            </div>

          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#e6eeff] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#0d1c2f] text-xl font-bold">Recent Quote Requests</h2>
                <Link to={`/admin/quotes`} className="text-[#43474e] font-bold text-xs hover:text-[#000613] transition-colors flex items-center gap-1">
                  View All <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-6 top-3 bottom-3 w-px bg-[#c4c6cf]/40 hidden sm:block" />

                {quotes.length > 0 ? (

                  (quotes.map((quote) => (
                  <div key={quote?._id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start relative group">
                    <div className="w-12 h-12 rounded-full bg-white shrink-0 hidden sm:flex items-center justify-center z-10 shadow-sm border border-slate-200 group-hover:border-[#904d00] transition-colors">
                      <Mail className="w-5 h-5 text-[#904d00]" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-5 shadow-sm w-full">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h3 className="text-[#0d1c2f] font-bold text-base">{quote?.user_company_name || 'N/A'}</h3>
                          <p className="text-[#43474e] text-xs mt-0.5">
                            Requested by <span className="text-[#000613] font-semibold">{quote?.user_fullname || 'N/A'}</span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#43474e]">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#904d00]" /> {quote?.user_pickup_location || 'N/A'} to {quote?.user_delivery_location || 'N/A'}</span>
                        <span className="flex items-center gap-1"><Package className="w-4 h-4 text-[#904d00]" />{quote?.user_estimated_weight || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  )))
                ): (
                  <div className="flex flex-col items-center justify-center gap-2 py-12">
                    <h3 className="text-[#0d1c2f] font-bold text-base">No Recent Requests</h3>
                    <p className="text-[#43474e] text-sm">There are no recent quote requests at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#0d1c2f] text-xl font-bold mb-1">Quick Actions</h2>

              <Link
                to={`/admin/add-fleet`}
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
              </Link>

              <Link
                to="/admin/add-gallery"
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
              </Link>
            </div>
          </section>
        </main>
  );
}

export default Dashboard