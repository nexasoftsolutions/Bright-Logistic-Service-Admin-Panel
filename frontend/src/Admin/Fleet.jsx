import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, UploadCloud, Save, Trash2, Truck } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Fleet = () => {

  const queryClient = useQueryClient();
  const builder = imageUrlBuilder(client);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFleetId, setSelectedFleetId] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      assest_des: "",
      capacity: "",
      cargo: "",
      specification: "",
      image: ""
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const { data: fetchFleetData = [] } = useQuery({
    queryKey: ['fleet'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "fleet"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retruDelay: 1500
  })

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue('image', file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFleetData = async (data) => {
    const file = data?.image;

    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const uploadedImage = await client.assets.upload('image', file);

      const payload = {
        _type: 'fleet',
        assest_designation: data?.assest_des,
        operational_capacity: data?.capacity,
        optimal_cargo: data?.cargo,
        specification: data?.specification,
        assest_image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedImage._id,
          },
        }
      };

      uploadFleetData.mutate(payload);
      reset({
        assest_des: "",
        capacity: "",
        cargo: "",
        specification: "",
        image: null
      });
      setImagePreview("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register asset");
    }
  }

  const uploadFleetData = useMutation({
    mutationFn: async (data) => {
      await client.create(data)
    },
    onSuccess: () => {
      toast.success("Asset registered successfully")
      queryClient.invalidateQueries({ queryKey: ['fleet'] })
    },
    onError: () => {
      toast.error("Failed to register asset")
    }
  })

  const urlTo = (source) => {
    return source ? builder.image(source).url() : ""
  }

  const openDeleteModal = (id) => {
    console.log('Opening delete modal for fleet id:', id);
    setSelectedFleetId(id || 'debug-modal');
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedFleetId(null);
  };

  const handleDeleteFleet = () => {
    if (!selectedFleetId) return;
    deleteFleetData.mutate(selectedFleetId);
  };

  const deleteFleetData = useMutation({
    mutationFn: async (id) => {
      await client.delete(id);
    },
    onSuccess: () => {
      toast.success("Asset deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['fleet'] });
      closeDeleteModal();
    },
    onError: () => {
      toast.error("Failed to delete asset");
    },
  });

  return (
    <>
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
                <span className="font-bold text-[#0b57d0] text-base sm:text-lg">{fetchFleetData?.length || 0}</span>
                <span className="font-bold text-[#0b57d0] text-xs uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
              <h2 className="mb-6 flex items-center gap-3">
                <PlusCircle className="w-6 h-6 text-[#904d00] shrink-0" />
                <span className="font-bold text-[#000613] text-lg sm:text-xl">Register Asset</span>
              </h2>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleFleetData)}>
                <div className="flex flex-col gap-2 relative">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Asset Designation
                  </label>
                  <input
                    {...register("assest_des", {
                      required: {
                        value: true,
                        message: "Asset designation is required"
                      },
                      minLength: {
                        value: 2,
                        message: "Asset designation must be at least 2 characters long"
                      },
                      maxLength: {
                        value: 100,
                        message: "Asset designation cannot exceed 100 characters"
                      }
                    })}
                    className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                    placeholder="e.g. 40ft Flatbed"
                    type="text"
                    required
                    id='assest_designation'
                  />
                  {errors.assest_des && (
                    <p className="text-xs text-red-600 mt-1">{errors.assest_des.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Operational Capacity
                  </label>
                  <input
                  {...register("capacity", {
                      required: {
                        value: true,
                        message: "Operational capacity is required"
                      },
                      minLength: {
                        value: 2,
                        message: "Operational capacity must be at least 2 characters long"
                      },
                      maxLength: {
                        value: 100,
                        message: "Operational capacity cannot exceed 100 characters"
                      }
                    })}
                    className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                    placeholder="e.g. 30 Tons"
                    type="text"
                    required
                    id='operational_capacity'
                  />
                  {errors.capacity && (
                    <p className="text-xs text-red-600 mt-1">{errors.capacity.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Optimal Cargo
                  </label>
                  <input
                    {...register("cargo", {
                      required: {
                        value: true,
                        message: "Optimal cargo is required"
                      },
                      minLength: {
                        value: 2,
                        message: "Optimal cargo must be at least 2 characters long"
                      },
                      maxLength: {
                        value: 100,
                        message: "Optimal cargo cannot exceed 100 characters"
                      }
                    })}
                    className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all"
                    placeholder="e.g. Heavy Machinery"
                    type="text"
                    required
                    id='optimal_cargo'
                  />
                  {errors.cargo && (
                    <p className="text-xs text-red-600 mt-1">{errors.cargo.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Specifications
                  </label>
                  <textarea
                    {...register("specification", {
                      required: {
                        value: true,
                        message: "Specifications are required"
                      },
                      minLength: {
                        value: 2,
                        message: "Specifications must be at least 2 characters long"
                      },
                      maxLength: {
                        value: 100,
                        message: "Specifications cannot exceed 100 characters"
                      }
                    })}
                    className="bg-[#e8f0fe] rounded-lg p-4 font-sans text-sm text-[#000613] placeholder-[#74777f] outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-24"
                    placeholder="Detailed structural notes..."
                    required
                    id='specification'
                  />
                  {errors.specification && (
                    <p className="text-xs text-red-600 mt-1">{errors.specification.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Asset Imagery
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    id="fleet-image"
                    className="hidden"
                    {...register('image', {
                      validate: (value) => {
                        if (!value || value.length === 0) return 'Image is required';
                        return true;
                      },
                    })}
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="fleet-image"
                    className="bg-[#e8f0fe] border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group overflow-hidden min-h-[180px]"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Fleet preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 text-[#001f3f] group-hover:text-[#904d00] transition-colors" />
                        <p className="font-sans text-xs text-center text-[#43474e] group-hover:text-[#000613] transition-colors leading-relaxed">
                          Drag &amp; drop<br />
                          schematics or<br />
                          click to browse<br />
                          files.
                        </p>
                      </>
                    )}
                  </label>

                  {errors.image && (
                    <p className="text-xs text-red-600 mt-1">{errors.image.message}</p>
                  )}
                </div>

                <button
                  className="mt-2 w-full bg-[#000613] text-white font-bold py-4 rounded-xl shadow-[0_10px_25px_rgba(0,6,19,0.2)] hover:bg-[#f59e0b] hover:shadow-[0_12px_28px_rgba(245,158,11,0.32)] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#000613]"
                  type="submit"
                  disabled={!isValid || !imagePreview || uploadFleetData.isPending}
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>{uploadFleetData.isPending ? "Uploading..." : "Upload Asset"}</span>
                </button>
              </form>
            </div>

            <div className="col-span-12 lg:col-span-8">
              {!fetchFleetData?.length && (
                <div className="mb-4 rounded-xl border border-dashed border-slate-300 bg-white p-4">
                  <p className="text-sm text-slate-500">No fleet assets found yet.</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fetchFleetData?.map((asset) => (
                  <div
                    key={asset?._id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 group relative flex flex-col"
                  >
                    <button
                      type="button"
                      onClick={() => openDeleteModal(asset?._id)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full flex items-center justify-center opacity-100 transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
                      aria-label="Delete Asset"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                      <img
                        alt="image"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={urlTo(asset?.assest_image)}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg mb-3 group-hover:text-[#904d00] transition-colors">
                        {asset?.assest_designation}
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[#5c606a] uppercase text-[10px] font-bold tracking-widest">
                            Capacity
                          </p>
                          <p className="text-[#000613] font-bold text-sm sm:text-base mt-1">
                            {asset?.operational_capacity}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#5c606a] uppercase text-[10px] font-bold tracking-widest">
                            Ideal For
                          </p>
                          <p className="text-[#000613] font-bold text-sm sm:text-base mt-1">
                            {asset?.optimal_cargo}
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

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-[#000613] mb-2">
              Delete Fleet Asset?
            </h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Are you sure you want to delete this asset? This action cannot be undone.
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
                onClick={handleDeleteFleet}
                disabled={deleteFleetData.isPending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleteFleetData.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fleet;