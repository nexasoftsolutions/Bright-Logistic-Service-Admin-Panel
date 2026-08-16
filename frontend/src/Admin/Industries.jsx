import { PlusCircle, CloudUpload, Trash2, Save, Layers, Syringe, Car, Cpu, Shirt } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import imageUrlBuilder from "@sanity/image-url";
import { useForm } from "react-hook-form";
import { client } from "../sanityClient";
import { toast } from "react-toastify";
import { useState } from "react";

const Industries = () => {

  const queryClient = useQueryClient();
  const builder = imageUrlBuilder(client);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      industry_type: "",
      description: "",
      cover_image: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { data: fetchIndustryData = [] } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "industries"]`);
      return response;
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500,
  });

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue("cover_image", file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const urlFor = (source) => {
    return source ? builder.image(source).url() : "";
  };

  const handleAdminData = async (data) => {
    const file = data.cover_image;

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      const uploadedImage = await client.assets.upload("image", file);

      const newIndustry = {
        _type: "industries",
        industry_type: data.industry_type,
        industry_description: data.description,
        industry_image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedImage._id,
          },
        },
      };

      postIndustryData.mutate(newIndustry);
      reset({
        industry_type: "",
        description: "",
        cover_image: null,
      });
      setImagePreview("");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  const postIndustryData = useMutation({
    mutationFn: async (data) => {
      await client.create(data);
    },
    onSuccess: () => {
      toast.success("Industry added successfully");
      queryClient.invalidateQueries({ queryKey: ["industries"] });
    },
    onError: (error) => {
      toast.error("Failed to add industry");
    },
  });

  const openDeleteModal = (id) => {
    setSelectedIndustryId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedIndustryId(null);
  };

  const deleteIndustryMutation = useMutation({
    mutationFn: async (id) => {
      await client.delete(id);
    },
    onSuccess: () => {
      toast.success("Industry deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["industries"] });
      closeDeleteModal();
    },
    onError: () => {
      toast.error("Failed to delete industry");
    },
  });

  const handleDeleteIndustry = () => {
    if (!selectedIndustryId) return;
    deleteIndustryMutation.mutate(selectedIndustryId);
  };

  return (
    <main className="flex-1 bg-[#f8f9ff] px-3 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
      <div className="flex flex-col w-full gap-6 md:gap-8 lg:gap-12 max-w-none md:max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 relative z-10 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#000613] tracking-tight">
            Industries Management
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start w-full">
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden group">
              <div className="mb-6">
                <h2 className="flex items-center gap-2 mb-2">
                  <PlusCircle className="w-6 h-6 text-[#904d00] shrink-0" />
                  <span className="font-bold text-[#000613] text-lg sm:text-xl">
                    Add New Industry
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#43474e]">
                  Create a new industry category for the logistics network.
                </p>
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(handleAdminData)}
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="industry-type"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    Industry Type
                  </label>
                  <input
                    {...register("industry_type", { 
                      required: {
                        value: true,
                        message: "Industry type is required",
                      },
                      maxLength: {
                        value: 100,
                        message: "Industry type cannot exceed 100 characters",
                      },
                      minLength: {
                        value: 2,
                        message: "Industry type must be at least 2 characters",
                      },
                    })}
                    required
                    id="industry-type"
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all placeholder-[#74777f] border-none"
                    placeholder="e.g. Automotive, Pharmaceuticals..."
                    type="text"
                  />
                  {errors.industry_type && (
                    <span className="text-red-500 text-xs mt-1">
                     Industry type is required
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="description"
                    className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                      minLength: {
                        value: 10,  
                        message: "Description must be at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Description cannot exceed 500 characters",
                      },
                    })}
                    required
                    id="description"
                    className="w-full bg-[#e8f0fe] text-[#000613] font-sans text-sm px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all resize-none h-24 placeholder-[#74777f] border-none"
                    placeholder="Brief description of cargo requirements..."
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider mb-2 block">
                    Cover Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    id="cover_image"
                    className="hidden"
                    {...register("cover_image", {
                      validate: (value) => {
                        if (!value || value.length === 0)
                          return "Image is required";
                        return true;
                      },
                    })}
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="cover_image"
                    className="bg-[#e8f0fe] border-2 border-dashed border-[#b4c6ef] hover:border-[#904d00] transition-colors rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer group overflow-hidden h-44"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Industry preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <CloudUpload className="w-8 h-8 text-[#001f3f] group-hover:text-[#904d00] transition-colors" />
                        <p className="font-bold text-[#43474e] text-xs group-hover:text-[#000613] transition-colors">
                          Click to upload or drag and drop
                        </p>
                        <p className="font-sans text-[10px] text-[#5c606a] leading-tight">
                          SVG, PNG, JPG or GIF (max. 800&times;400px)
                        </p>
                      </div>
                    )}
                  </label>
                  {errors.cover_image && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.cover_image.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || !imagePreview || postIndustryData.isPending}
                  className="mt-2 w-full bg-[#000613] text-white font-bold py-4 rounded-xl shadow-[0_10px_25px_rgba(0,6,19,0.2)] hover:bg-[#f59e0b] hover:shadow-[0_12px_28px_rgba(245,158,11,0.32)] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#000613]"
                >
                  <CloudUpload className="w-5 h-5" />
                  <span>{postIndustryData.isPending ? "Uploading..." : "Upload Industry"}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#5c606a] shrink-0" />
                <span className="font-bold text-[#000613] text-lg sm:text-xl">
                  Active Industries
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              {fetchIndustryData.length === 0 ? (
                <div className="col-span-full text-center py-12 text-[#5c606a]">
                  No industries found. Please add a new industry.
                </div>
              ) : (
                fetchIndustryData.map((item) => (
                  <div
                    key={item?._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] hover:shadow-xl transition-all duration-300 relative flex flex-col h-full"
                  >
                    <button
                      type="button"
                      onClick={() => openDeleteModal(item?._id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors z-10 opacity-0 group-hover:opacity-100 shadow-sm flex items-center justify-center cursor-pointer"
                      aria-label="Delete Industry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div
                      className="h-36 w-full bg-cover bg-center relative bg-slate-100"
                      style={{
                        backgroundImage: `url('${urlFor(item?.industry_image)}')`,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-[#000613] text-base sm:text-lg mb-1">
                        {item?.industry_type || "Unnamed Industry"}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#43474e] leading-relaxed mb-4 flex-1 line-clamp-2">
                        {item?.industry_description || "No description provided."}
                      </p>
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
            <h3 className="text-xl font-bold text-[#000613] mb-2">
              Delete Industry?
            </h3>
            <p className="text-sm text-[#43474e] leading-relaxed">
              Are you sure you want to delete this industry? This action cannot
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
                onClick={handleDeleteIndustry}
                disabled={deleteIndustryMutation.isPending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleteIndustryMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Industries;
