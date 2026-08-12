import { useState } from 'react';
import { Mail, Phone, Clock, Trash2, Route, Calendar, Layers, Send, CheckCircle2 } from 'lucide-react';

const Quotes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      name: 'John Doe',
      company: 'Acme Corp',
      initials: 'JD',
      avatarBg: '#fd8b00',
      avatarText: '#2f1500',
      email: 'john@example.com',
      phone: '+1 (555) 000-0000',
      timeAgo: '10 mins ago',
      pickup: 'Port of Shanghai, CN',
      delivery: 'Rotterdam, NL',
      requiredDate: 'Oct 15, 2023',
      cargoType: 'Standard Freight',
      weight: '5,000 kg',
      container: '40ft High Cube',
      vehicle: 'N/A (Sea Freight)',
      notes: 'Requires temperature control. Fragile electronics.',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Sarah Vance',
      company: 'Global Retail Inc.',
      initials: 'SV',
      avatarBg: '#0b57d0',
      avatarText: '#ffffff',
      email: 's.vance@globalretail.com',
      phone: '+44 20 7946 0958',
      timeAgo: '1 hour ago',
      pickup: 'Hamburg, DE',
      delivery: 'Dubai, UAE',
      requiredDate: 'Nov 01, 2023',
      cargoType: 'Oversized Machinery',
      weight: '24,000 kg',
      container: 'Open Top',
      vehicle: 'Flatbed Truck',
      notes: 'Requires specialized crane for loading/unloading at both sites.',
      status: 'pending',
    },
  ]);

  const handleDelete = (id) => {
    setQuotes((prev) => prev.filter((quote) => quote.id !== id));
  };

  const handleProcess = (id) => {
    setQuotes((prev) =>
      prev.map((quote) =>
        quote.id === id ? { ...quote, status: 'processed' } : quote
      )
    );
  };

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.delivery.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-300 mx-auto flex flex-col gap-8">

        {/* Header */}
        <div>
          <p className="text-[#43474e] font-bold uppercase tracking-widest text-xs mb-1">
            Quote Management
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000613] tracking-tight">
            Recent Requests
          </h1>
        </div>

        {/* Quotes List */}
        <div className="flex flex-col gap-6">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,31,63,0.05)] border border-slate-100 overflow-hidden"
              >
                {/* Card Header Bar */}
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ backgroundColor: quote.avatarBg, color: quote.avatarText }}
                    >
                      {quote.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg flex items-center flex-wrap gap-1">
                        {quote.name}
                        <span className="font-normal text-[#43474e] text-sm">
                          • {quote.company}
                        </span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#43474e]">
                        <span className="flex items-center gap-1">
                          <Mail size={13} /> {quote.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={13} /> {quote.phone}
                        </span>
                        <span className="flex items-center gap-1 text-[#904d00] font-semibold">
                          <Clock size={13} /> {quote.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {quote.status === 'processed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <CheckCircle2 size={14} /> Processed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleProcess(quote.id)}
                        className="bg-[#050f1d] hover:bg-[#0c2444] text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={13} /> Process Quote
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(quote.id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#74777f] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Request"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Routing Section */}
                  <div>
                    <h4 className="text-[#43474e] uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2">
                      <Route size={15} className="text-[#0b57d0]" /> Routing Details
                    </h4>
                    <div className="relative pl-6 border-l-2 border-[#d2e3fc] space-y-5">
                      {/* Pickup */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b57d0] bg-white" />
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Pickup</p>
                        <p className="text-[#0b57d0] font-semibold text-sm mt-0.5">{quote.pickup}</p>
                      </div>
                      {/* Delivery */}
                      <div className="relative">
                        <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b57d0] bg-white" />
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Delivery</p>
                        <p className="text-[#0b57d0] font-semibold text-sm mt-0.5">{quote.delivery}</p>
                      </div>
                    </div>
                    {/* Date pill */}
                    <div className="mt-5 inline-flex items-center gap-2 text-[#43474e] bg-[#e8f0fe] px-3 py-1.5 rounded-lg text-xs font-semibold">
                      <Calendar size={14} className="text-[#0b57d0]" />
                      Required by: <strong className="text-[#000613]">{quote.requiredDate}</strong>
                    </div>
                  </div>

                  {/* Cargo Specifications Section */}
                  <div>
                    <h4 className="text-[#43474e] uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2">
                      <Layers size={15} className="text-[#0b57d0]" /> Cargo Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Type</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote.cargoType}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Weight</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote.weight}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Container</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote.container}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Vehicle</p>
                        <p className="text-[#0b57d0] font-semibold mt-0.5">{quote.vehicle}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider mb-1">Additional Notes</p>
                        <p className="text-[#43474e] italic text-xs sm:text-sm bg-[#f8f9ff] px-3 py-2.5 rounded-lg border border-slate-200">
                          "{quote.notes}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[#43474e] text-base font-medium">
                No quote requests found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Quotes;
