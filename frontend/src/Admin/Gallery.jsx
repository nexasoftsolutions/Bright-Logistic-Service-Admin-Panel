import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LayoutDashboard, Images, Truck, Package, Globe, Building2, FileText, Contact, Search, Bell, UploadCloud, ChevronDown, ImagePlus, Upload, Grid, List, Trash2, Menu, X, Eye, CheckCircle2 } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url'
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Gallery = () => {

  const queryClient = useQueryClient();
  const builder = imageUrlBuilder(client);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image_type: "containers",
      gallery_image: null,
    },
  });

  const { data: fetchGalleryData = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "gallery"]`);
      return response;
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500,
  });

  const urlTo = (source) => {
    return source ? builder.image(source).url() : "";
  };

  const galleryItems = (fetchGalleryData || []).map((item) => ({
    id: item._id,
    title: item.image_type || "Gallery Image",
    category: item.image_type || "general",
    src: item.gallery_image ? urlTo(item.gallery_image) : "",
    date: item._createdAt
      ? new Date(item._createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recently added",
    size: "Uploaded",
  }));

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setValue("gallery_image", file, { shouldValidate: true, shouldDirty: true });
    setImagePreview(URL.createObjectURL(file));
  };

  const postGalleryData = useMutation({
    mutationFn: async (data) => {
      await client.create(data);
    },
    onSuccess: () => {
      toast.success("Gallery image uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: () => {
      toast.error("Failed to upload gallery image");
    },
  });

  const handleGalleryData = async (data) => {
    const file = data.gallery_image;

    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      const uploadedImage = await client.assets.upload("image", file);

      const payload = {
        _type: "gallery",
        image_type: data.image_type,
        gallery_image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedImage._id,
          },
        },
      };

      postGalleryData.mutate(payload);
      reset({
        image_type: "containers",
        gallery_image: null,
      });
      setSelectedFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const deleteGallerydata = useMutation({
    mutationFn: async (id) => {
      await client.delete(id);
    },
    onSuccess: () => {
      toast.success("Gallery item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: () => {
      toast.error("Failed to delete gallery item");
    },
  });

  const handleDelete = (id) => {
    deleteGallerydata.mutate(id);
  };

  return (
    <>
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0d1c2f]">Gallery Management</h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Upload, filter, and organize visual assets across all Bright Logistics categories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <UploadCloud className="w-6 h-6 text-[#fd8b00]" />
              <h2 className="text-lg font-bold text-slate-800">Upload Asset</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(handleGalleryData)}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Image Type
                </label>
                <div className="relative">
                  <select
                    {...register("image_type", { required: true })}
                    id="image_type"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-800 appearance-none outline-none focus:border-[#000613] transition-colors cursor-pointer"
                  >
                    <option value="containers">Containers</option>
                    <option value="trailers">Trailers</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="ports">Ports</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="operations">Operations</option>
                    <option value="team">Team</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                {errors.image_type && (
                  <p className="text-red-500 text-xs mt-1">Image type is required</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select File
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="gallery_image"
                  className="hidden"
                  {...register("gallery_image", {
                    validate: (value) => {
                      if (!value || value.length === 0) return "Image is required";
                      return true;
                    },
                  })}
                  onChange={handleFileUpload}
                />

                <label
                  htmlFor="gallery_image"
                  className="border-2 border-dashed border-slate-200 hover:border-[#fd8b00] bg-slate-50 hover:bg-amber-50/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center group overflow-hidden"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-44 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <ImagePlus className="w-10 h-10 text-slate-400 group-hover:text-[#fd8b00] transition-colors" />
                      <p className="text-sm font-semibold text-slate-700">
                        {selectedFile ? selectedFile.name : "Click to browse or drop file"}
                      </p>
                      <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                    </>
                  )}
                </label>
                {errors.gallery_image && (
                  <p className="text-red-500 text-xs mt-1">{errors.gallery_image.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!selectedFile}
                className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedFile
                    ? "bg-[#000613] text-white hover:bg-[#fd8b00] shadow-md cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Asset
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {['all', 'containers', 'vehicles', 'warehouse', 'operations'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? "bg-[#001f3f] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 border-l border-slate-200 pl-4 self-end sm:self-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-slate-100 text-[#fd8b00]" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-slate-100 text-[#fd8b00]" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 font-medium">No image assets found matching your selection.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-[280px]"
                  >
                    <div className="relative flex-1 bg-slate-100 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <span className="absolute top-3 left-3 bg-[#fd8b00] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {item.category}
                      </span>

                      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setPreviewImage(item)}
                          className="bg-white/90 hover:bg-white text-slate-700 p-1.5 rounded-full shadow-sm transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full shadow-sm transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Added {item.date} • {item.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between gap-4 hover:bg-slate-50">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.src} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-xs text-slate-400">
                          {item.category} • Added {item.date} • {item.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewImage(item)}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage.src} alt={previewImage.title} className="w-full max-h-[70vh] object-contain bg-black" />
            <div className="p-4 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">{previewImage.title}</h3>
                <p className="text-xs text-slate-400">
                  Category: {previewImage.category} | Size: {previewImage.size}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery