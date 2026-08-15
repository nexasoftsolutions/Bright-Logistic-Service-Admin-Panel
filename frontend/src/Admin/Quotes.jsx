import { Mail, Phone, Clock, Trash2, Route, Calendar, Layers, Send, CheckCircle2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Quotes = () => {

  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);

  const { data: fetchQuotesData = [] } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "quote"]`)
      return response
    }
  })

  const openDeleteModal = (id) => {
    setSelectedQuoteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedQuoteId(null);
  };

  const handleDeleteQuote = () => {
    if (!selectedQuoteId) return;

    deleteQuote.mutate(selectedQuoteId);
  };

  const deleteQuote = useMutation({
    mutationFn: async (id) => {
      await client.delete(id);
    },
    onSuccess: () => {
      toast.success('Quote deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      closeDeleteModal();
    },
    onError: (error) => {
      toast.error('Failed to delete quote');
    }
  })

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-300 mx-auto flex flex-col gap-8">

        <div>
          <p className="text-[#43474e] font-bold uppercase tracking-widest text-xs mb-1">
            Quote Management
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000613] tracking-tight">
            Recent Requests
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {fetchQuotesData.length > 0 ? (
            fetchQuotesData.map((quote) => (
              <div
                key={quote?._id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,31,63,0.05)] border border-slate-100 overflow-hidden"
              >
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg flex items-center flex-wrap gap-1">
                        {quote?.user_fullname || 'N/A'}
                        <span className="font-normal text-[#43474e] text-sm">
                          • {quote?.user_company_name || 'N/A'}
                        </span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#43474e]">
                        <span className="flex items-center gap-1">
                          <Mail size={13} /> {quote?.user_email_address || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={13} /> {quote?.user_phone_number || 'N/A'}
                        </span>
                        
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => openDeleteModal(quote?._id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#74777f] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Request"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-[#43474e] uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2">
                      <Route size={15} className="text-[#0b57d0]" /> Routing Details
                    </h4>
                    <div className="relative pl-6 border-l-2 border-[#d2e3fc] space-y-5">
                      <div className="relative">
                        <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b57d0] bg-white" />
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Pickup</p>
                        <p className="text-[#0b57d0] font-semibold text-sm mt-0.5">{quote?.user_pickup_location || 'N/A'}</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0b57d0] bg-white" />
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Delivery</p>
                        <p className="text-[#0b57d0] font-semibold text-sm mt-0.5">{quote?.user_delivery_location || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-[#43474e] bg-[#e8f0fe] px-3 py-1.5 rounded-lg text-xs font-semibold">
                      <Calendar size={14} className="text-[#0b57d0]" />
                      Required by: <strong className="text-[#000613]">{quote?.user_required_date || 'N/A'}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#43474e] uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2">
                      <Layers size={15} className="text-[#0b57d0]" /> Cargo Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Type</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote?.user_cargo_type || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Weight</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote?.user_estimated_weight || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Container</p>
                        <p className="text-[#000613] font-semibold mt-0.5">{quote?.user_container_size || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider">Vehicle</p>
                        <p className="text-[#0b57d0] font-semibold mt-0.5">{quote?.user_vehicle_required || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[#74777f] text-[10px] uppercase font-bold tracking-wider mb-1">Additional Notes</p>
                        <p className="text-[#43474e] italic text-xs sm:text-sm bg-[#f8f9ff] px-3 py-2.5 rounded-lg border border-slate-200">
                          "{quote?.user_instruction || 'N/A'}"
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

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-[#000613] mb-2">
              Delete Quote?
            </h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Are you sure you want to delete this quote request? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg border border-slate-200 text-[#43474e] hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteQuote}
                disabled={deleteQuote.isPending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleteQuote.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Quotes;
