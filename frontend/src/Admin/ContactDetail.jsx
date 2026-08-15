import { ContactRound, MapPin, Phone, MessageSquare, User, BadgeCheck, Save, Smartphone, Pencil } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { client } from '../sanityClient';
import { toast } from 'react-toastify';

const ContactDetail = () => {

  const [adminId, setAdminId] = useState("")
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    reset,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      headquater_location: '',
      main_office_number: '',
      whatsapp_number: '',
      director_name: '',
      director_contact_number: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [watchHeadquaterLocation, watchMainOfficeNumber, watchWhatsappNumber, watchDirectorName, watchDirectorContactNumber] = watch(["headquater_location", "main_office_number", "whatsapp_number", "director_name", "director_contact_number"])

  const { data: fetchAdminContactDetail = [] } = useQuery({
    queryKey: ['contact_detail'],
    queryFn: async () => {
      const response = await client.fetch(`*[_type == "contact_detail"]`);
      return response;
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (fetchAdminContactDetail[0]) {
      setAdminId(fetchAdminContactDetail[0]?._id)
      reset({
        headquater_location: fetchAdminContactDetail[0].headquater_location || '',
        main_office_number: fetchAdminContactDetail[0].main_office_number || '',
        whatsapp_number: fetchAdminContactDetail[0].whatsapp_number || '',
        director_name: fetchAdminContactDetail[0].director_name || '',
        director_contact_number: fetchAdminContactDetail[0].director_contact_number || '',
      });
    }
  }, [fetchAdminContactDetail, reset]);

  const handleEdit = () => {
    setIsEditMode(true);
    reset({
      headquater_location: '',
      main_office_number: '',
      whatsapp_number: '',
      director_name: '',
      director_contact_number: '',
    });
  };

  const handleSave = () => {
    try {
      setIsEditMode(false);
      const data = {
        _type: 'contact_detail',
        headquater_location: watchHeadquaterLocation,
        main_office_number: watchMainOfficeNumber,
        whatsapp_number: watchWhatsappNumber,
        director_name: watchDirectorName,
        director_contact_number: watchDirectorContactNumber
      }
      updateAdminDetail.mutate(data)
      reset({
        headquater_location: '',
        main_office_number: '',
        whatsapp_number: '',
        director_name: '',
        director_contact_number: ''
      });
    } catch (error) {
      toast.error('Failed to update contact details');
    }
  };

  const updateAdminDetail = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      await client.patch(adminId)
        .set(data)
        .commit();
    },
    onSuccess: () => {
      toast.success('Contact details updated successfully');
      setIsEditMode(false);
    },
    onError: (error) => {
      toast.error('Failed to update contact details');
    }
  })

  return (
    <main className="flex-1 bg-[#f8f9ff] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col w-full gap-8 lg:gap-12 max-w-300 mx-auto">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000613] tracking-tight">
            Contact Details
          </h1>
          <p className="text-sm sm:text-base text-[#43474e] max-w-2xl">
            Manage and update the primary contact information displayed across the Lumina Freight platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,31,63,0.05)] rounded-2xl overflow-hidden relative">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#0b57d0] shrink-0">
                  <ContactRound size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-[#000613] text-lg sm:text-xl">
                    Headquarters Information
                  </h2>
                  <p className="text-xs sm:text-sm text-[#43474e]">
                    Update primary office and support details.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="headquater_location"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Headquarters Location
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        {...register('headquater_location', {
                          required: 'Headquater location is required',
                        })}
                        id="headquater_location"
                        type="text"
                        readOnly={!isEditMode}
                        required
                        placeholder="e.g., 123 Main St, City, Country"
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                    {errors.headquater_location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.headquater_location.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="main_office_number"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Main Office Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        {...register('main_office_number', {
                          required: 'Main office number is required',
                        })}
                        id="main_office_number"
                        type="text"
                        required
                        readOnly={!isEditMode}
                        placeholder="e.g., +1 234 567 890"
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                    {errors.main_office_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.main_office_number.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="whatsapp_number"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      WhatsApp Support Number
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        {...register('whatsapp_number', {
                          required: 'WhatsApp number is required',
                        })}
                        id="whatsapp_number"
                        type="text"
                        required
                        readOnly={!isEditMode}
                        placeholder="e.g., +1 234 567 890"
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                    {errors.whatsapp_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.whatsapp_number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-8" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#e8f0fe] rounded-full flex items-center justify-center text-[#5c606a] shrink-0">
                    <User size={20} />
                  </div>
                  <h3 className="font-bold text-[#000613] text-base sm:text-lg">
                    Director Contact
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="director_name"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Director Name
                    </label>
                    <div className="relative">
                      <BadgeCheck
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        {...register('director_name', {
                          required: 'Director name is required',
                        })}
                        id="director_name"
                        type="text"
                        required
                        readOnly={!isEditMode}
                        placeholder="e.g., John Doe"
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                    {errors.director_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.director_name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="director_contact_number"
                      className="text-[#43474e] uppercase text-[11px] font-bold tracking-wider"
                    >
                      Director Contact Number
                    </label>
                    <div className="relative">
                      <Smartphone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c606a]"
                      />
                      <input
                        {...register('director_contact_number', {
                          required: 'Director contact number is required',
                        })}
                        id="director_contact_number"
                        type="text"
                        required
                        readOnly={!isEditMode}
                        placeholder="e.g., +1 234 567 890"
                        className="w-full bg-[#e8f0fe] text-[#000613] text-sm font-sans pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#904d00]/30 transition-all border-none placeholder-[#74777f]"
                      />
                    </div>
                    {errors.director_contact_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.director_contact_number.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    disabled={isEditMode}
                    onClick={handleEdit}
                    className="w-full sm:w-auto bg-[#000613] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-[0_10px_25px_rgba(0,6,19,0.2)] hover:bg-[#f59e0b] hover:shadow-[0_12px_28px_rgba(245,158,11,0.32)] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#000613]"
                  >
                    <Pencil
                      size={18}
                      className="group-hover:-translate-y-0.5 transition-transform"
                    />
                    Edit Contact Details
                  </button>
                  <button
                    type="submit"
                    disabled={!isEditMode || !isValid || updateAdminDetail.isPending}
                    className="w-full sm:w-auto bg-[#000613] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-[0_10px_25px_rgba(0,6,19,0.2)] hover:bg-[#f59e0b] hover:shadow-[0_12px_28px_rgba(245,158,11,0.32)] hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#000613]"
                  >
                    <Save
                      size={18}
                      className="group-hover:-translate-y-0.5 transition-transform"
                    />
                    {updateAdminDetail.isPending ? 'Updating...' : 'Update Contact Details'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactDetail;
