import { defineType, defineField } from 'sanity'

export const quotesSchema = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'user_fullname',
      title: 'User Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Full name is required'),
    }),
    defineField({
      name: 'user_company_name',
      title: 'User Company Name',
      type: 'string',
    }),
    defineField({
      name: 'user_email_address',
      title: 'User Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('A valid email is required'),
    }),
    defineField({
      name: 'user_phone_number',
      title: 'User Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'user_whatsapp_number',
      title: 'User WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'user_pickup_location',
      title: 'User Pickup Location',
      type: 'string',
    }),
    defineField({
      name: 'user_delivery_location',
      title: 'User Delivery Location',
      type: 'string',
    }),
    defineField({
      name: 'user_required_date',
      title: 'User Required Date',
      type: 'datetime',
    }),
    defineField({
      name: 'user_cargo_type',
      title: 'User Cargo Type',
      type: 'string',
    }),
    defineField({
      name: 'user_estimated_weight',
      title: 'User Estimated Weight',
      type: 'string',
    }),
    defineField({
      name: 'user_container_size',
      title: 'User Container Size',
      type: 'string',
    }),
    defineField({
      name: 'user_vehicle_required',
      title: 'User Vehicle Required',
      type: 'string',
    }),
    defineField({
      name: 'user_instruction',
      title: 'User Instruction',
      type: 'text',
    }),
  ],
})
