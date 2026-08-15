import { MapPinPlus, Building, Layers, ArrowRight, Trash2 } from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Coverage = () => {

  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCoverageId, setSelectedCoverageId] = useState(null);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    defaultValues: {
      city: "",
      speciality: ""
    },
    mode: "onChange",
    reValidateMode: "onChange"
  })

  const { data: fetchCoverageData = [] } = useQuery({
    queryKey: ['coverage'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "coverage"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500
  })

  const handleAdminData = (data) => {

    try {
      const payload = {
        _type: 'coverage',
        city_name: data.city,
        city_speciality: data.speciality
      }
      console.log(payload)
      postAdminData.mutate(payload)
      reset({
        city: "",
        speciality: ""
      })
    } catch (error) {
      toast.error("Failed to add coverage data")
    }
  }

  const postAdminData = useMutation({
    mutationFn: async (data) => {
      await client.create(data)
    },
    onSuccess: () => {
      toast.success("Coverage data added successfully")
      queryClient.invalidateQueries({ queryKey: ['coverage'] })
    },
    onError: (error) => {
      toast.error("Failed to add coverage data")
    }
  })

  const openDeleteModal = (id) => {
    setSelectedCoverageId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCoverageId(null);
  };

  const handleDelete = () => {
    if (!selectedCoverageId) return;

    try {
      deleteCoverage.mutate(selectedCoverageId);
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete coverage data");
    }
  };

  const deleteCoverage = useMutation({
    mutationFn: async (id) => {
      await client.delete(id)
    },
    onSuccess: () => {
      toast.success("Coverage data deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['coverage'] })
      closeDeleteModal();
    },
    onError: (error) => {
      toast.error("Failed to delete coverage data")
    }
  })

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
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
          <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#904d00] transition-opacity" />
              <h2 className="mb-6 flex items-center gap-2.5">
                <MapPinPlus className="text-[#904d00]" size={22} />
                <span className="font-bold text-[#000613] text-lg sm:text-xl">Add New Location</span>
              </h2>
              <form onSubmit={handleSubmit(handleAdminData)} className="flex flex-col gap-5">
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
                      {...register("city", {
                        required: {
                          value: true,
                          message: "city is required"
                        },
                        minLength: {
                          value: 2,
                          message: "City name must be at least 2 characters"
                        },
                        maxLength: {
                          value: 100,
                          message: "City name cannot exceed 100 characters"
                        }
                      })}
                      id="city-name"
                      type="text"
                      required
                      placeholder="e.g. Frankfurt, Shanghai"
                      className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm py-3 pl-10 pr-4 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f]"
                    />
                  </div>
                    {errors.city &&
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    }
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
                      {...register("speciality", {
                        required: {
                          value: true,
                          message: "speciality is required"
                        }
                      })}
                      id="city-speciality"
                      required
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
                  {errors.speciality &&
                    <p className="text-red-500 text-xs mt-1">{errors.speciality.message}</p>
                  }
                </div>

                <button
                  type="submit"
                  disabled={!isValid || postAdminData.isPending}
                  className="mt-2 w-full bg-[#000613] text-white font-bold py-4 rounded-xl shadow-[0_10px_25px_rgba(0,6,19,0.2)] hover:bg-[#f59e0b] hover:shadow-[0_12px_28px_rgba(245,158,11,0.32)] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#000613]"
                >
                  <MapPinPlus className="w-5 h-5" />
                  <span>{postAdminData.isPending ? "Adding..." : "Upload Coverage"}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-bold text-[#000613] text-lg sm:text-xl">
                Active Facilities Grid
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {fetchCoverageData.length === 0 ? (
                <div className="col-span-full text-center py-10 text-[#5c606a]">
                  No coverage data available. Please add a new location.
                </div>
              ) : (
                fetchCoverageData.map((item) => (
                  <div
                    key={item?._id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="p-6 flex flex-col grow justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[#000613] text-lg">
                          {item?.city_name || "Unknown City"}
                        </h3>
                        <p className="text-[#5c606a] text-sm font-medium">
                          {item?.city_speciality || "Unknown Speciality"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(item._id)}
                        className="w-fit mt-2 py-2 flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer group/remove"
                      >
                        <Trash2
                          size={15}
                          className="group-hover/remove:scale-110 transition-transform"
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-[#000613] mb-2">Delete Coverage?</h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Are you sure you want to delete this coverage item? This action cannot be undone.
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
                onClick={handleDelete}
                disabled={deleteCoverage.isPending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleteCoverage.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Coverage;