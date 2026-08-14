import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Package, UploadCloud, ArrowRight, Trash2 } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url'
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Services = () => {

  const queryClient = useQueryClient()
  const builder = imageUrlBuilder(client)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null
    },
    mode: "onBlur"
  })

  const [imagePreview, setImagePreview] = useState("");
  const selectedImage = watch("image");

  const { data: fetchServicesData = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "services"]`)
      return response
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500
  })

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setValue('image', null, { shouldValidate: true, shouldDirty: true });
      setImagePreview('');
      return;
    }

    setValue('image', file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleServiceData = async (data) => {
    const file = data?.image;

    if (!file) {
      toast.error("Please upload an image for the service");
      return;
    }

    try {
      const imageUpload = await client.assets.upload('image', file);

      const payload = {
        _type: 'services',
        service_type: data?.title,
        service_description: data?.description,
        service_image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageUpload._id
          }
        }
      };

      postServiceData.mutate(payload);
      reset({
        title: '',
        description: '',
        image: null
      });
      setImagePreview('');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  }

  const postServiceData = useMutation({
    mutationFn: async (data) => {
      await client.create(data)
    },
    onSuccess: () => {
      toast.success("Service added successfully")
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
    onError: () => {
      toast.error("Failed to add service")
    }
  })

  const urlTo = (source) => {
    return source ? builder.image(source).url() : ""
  }

  const openDeleteModal = (id) => {
    setSelectedServiceId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleDeleteService = () => {
    if (!selectedServiceId) return;
    deleteServiceData.mutate(selectedServiceId);
  };

  const deleteServiceData = useMutation({
    mutationFn: async (id) => {
      await client.delete(id)
    },
    onSuccess: () => {
      toast.success("Service deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['services'] })
      closeDeleteModal();
    },
    onError: () => {
      toast.error("Failed to delete service")
    }
  })

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

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl transition-all duration-700 group-hover:bg-secondary/20 group-hover:scale-150" />
              <div className="flex items-center gap-3 relative z-10">
                <PlusCircle className="w-7 h-7 text-[#904d00]" />
                <h2 className="font-bold text-[#000613] text-lg sm:text-xl">Add New Service</h2>
              </div>

              <form className="flex flex-col gap-5 relative z-10" onSubmit={handleSubmit(handleServiceData)}>
                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Title
                  </label>
                  <input
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Title is required"
                      }
                    })}
                    id='title'
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f]"
                    placeholder="e.g., Cold Chain Logistics"
                    type="text"
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500">{errors.title.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required"
                      }
                    })}
                    id='description'
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-32 placeholder-[#74777f]"
                    placeholder="Describe the capabilities, equipment, and coverage for this service offering."
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">{errors.description.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider">
                    Service Image
                  </label>

                  <input
                    id="service-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="service-image-input"
                    className="w-full h-40 bg-[#e8f0fe] rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors cursor-pointer group/upload p-4 text-center overflow-hidden"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-[#001f3f] group-hover/upload:text-[#904d00] mb-2 transition-colors" />
                        <span className="font-bold text-[#43474e] text-xs group-hover/upload:text-[#000613] transition-colors">
                          DRAG &amp; DROP IMAGE
                        </span>
                        <span className="font-sans text-xs text-[#5c606a] mt-1">or click to browse</span>
                      </>
                    )}
                  </label>

                  {selectedImage && typeof selectedImage !== 'string' && (
                    <p className="text-xs text-[#5c606a]">
                      Selected: {selectedImage.name}
                    </p>
                  )}
                </div>

                <button type="submit" className="mt-2 w-full bg-[#050f1d] text-white font-semibold py-4 rounded-lg hover:bg-[#0c2444] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group/btn">
                  <span>Publish Service</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="bg-[#050f1d] text-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,31,63,0.05)] border border-slate-100 flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-on-primary/10 rounded-full blur-xl" />
              <div className="relative z-10 flex flex-col">
                <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  Active Services
                </span>
                <span className="text-2xl sm:text-3xl font-bold mt-1">{fetchServicesData?.length || 0}</span>
              </div>
              <Package className="w-10 h-10 text-slate-500 relative z-10" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {fetchServicesData?.map((service) => (
                <div
                  key={service?._id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative"
                >
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${urlTo(service?.service_image)}')` }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg">{service?.service_type || "No Title"}</h3>
                      <button
                        type="button"
                        aria-label="Delete Service"
                        onClick={() => openDeleteModal(service?._id)}
                        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[#5c606a] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#43474e] leading-relaxed mb-4 flex-1">
                      {service?.service_description || "No Description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-[#000613] mb-2">
              Delete Service?
            </h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Are you sure you want to delete this service? This action cannot be undone.
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
                onClick={handleDeleteService}
                disabled={deleteServiceData.isPending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleteServiceData.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Services;