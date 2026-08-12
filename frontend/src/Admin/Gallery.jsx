import React, { useState } from 'react';
import {
  LayoutDashboard,
  Images,
  Truck,
  Package,
  Globe,
  Building2,
  FileText,
  Contact,
  Search,
  Bell,
  UploadCloud,
  ChevronDown,
  ImagePlus,
  Upload,
  Grid,
  List,
  Trash2,
  Menu,
  X,
  Eye,
  CheckCircle2,
} from 'lucide-react';

const INITIAL_GALLERY_ITEMS = [
  {
    id: '1',
    title: 'port_containers_q3.jpg',
    category: 'containers',
    date: 'Oct 24, 2023',
    size: '2.4 MB',
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'highway_fleet_main.jpg',
    category: 'vehicles',
    date: 'Oct 22, 2023',
    size: '4.1 MB',
    src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'warehouse_interior_ops.jpg',
    category: 'warehouse',
    date: 'Oct 18, 2023',
    size: '3.8 MB',
    src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'control_tower_team.jpg',
    category: 'operations',
    date: 'Oct 15, 2023',
    size: '1.9 MB',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
];

const Gallery = () => {
  const [items, setItems] = useState(INITIAL_GALLERY_ITEMS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('containers');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState('');

  // Handle Image Upload Simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;

    const newItem = {
      id: Date.now().toString(),
      title: selectedFile.name,
      category: selectedCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      src: URL.createObjectURL(selectedFile),
    };

    setItems([newItem, ...items]);
    setSelectedFile(null);
    showToast('Asset uploaded successfully!');
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    showToast('Asset removed from library.');
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Search & Category Filter logic
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
       {/* //   Toast Notification */}
       {/* //   {notification && ( */}
      {/* //     <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#001f3f] text-white px-4 py-3 rounded-lg shadow-xl animate-bounce"> */}
       {/* //       <CheckCircle2 className="w-5 h-5 text-[#fd8b00]" /> */}
      {/* //       <span className="text-sm font-medium">{notification}</span> */}
      {/* //     </div> */}
     {/* //   )} */}


        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0d1c2f]">Gallery Management</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Upload, filter, and organize visual assets across all Bright Logistics categories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Upload Sidebar Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <UploadCloud className="w-6 h-6 text-[#fd8b00]" />
                <h2 className="text-lg font-bold text-slate-800">Upload Asset</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Image Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
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
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select File
                  </label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-[#fd8b00] bg-slate-50 hover:bg-amber-50/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center group">
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <ImagePlus className="w-10 h-10 text-slate-400 group-hover:text-[#fd8b00] transition-colors" />
                    <p className="text-sm font-semibold text-slate-700">
                      {selectedFile ? selectedFile.name : 'Click to browse or drop file'}
                    </p>
                    <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                  </label>
                </div>

                <button
                  onClick={handleUploadSubmit}
                  disabled={!selectedFile}
                  className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedFile
                      ? 'bg-[#000613] text-white hover:bg-[#fd8b00] shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Asset
                </button>
              </div>
            </div>

            {/* Asset Library Workspace */}
            <div className="lg:col-span-8 space-y-4">
              {/* Filter Tabs & Display Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                  {['all', 'containers', 'vehicles', 'warehouse', 'operations'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? 'bg-[#001f3f] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 border-l border-slate-200 pl-4 self-end sm:self-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-slate-100 text-[#fd8b00]' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-slate-100 text-[#fd8b00]' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Items Grid/List Container */}
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-slate-500 font-medium">No image assets found matching your selection.</p>
                </div>
              ) : viewMode === 'grid' ? (
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

      {/* Image Lightbox Preview Modal */}
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
}

export default Gallery