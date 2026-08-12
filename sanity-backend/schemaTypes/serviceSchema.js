import { defineType, defineField } from 'sanity'

export const servicesSchema = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'service_type',
      title: 'Service Type',
      type: 'string',
      validation: (Rule) => Rule.required().error('Services type is required'),
    }),
    defineField({
      name: 'service_description',
      title: 'Service Description',
      type: 'text',
      validation: (Rule) => Rule.required().error('Service should be meaningful'),
    }),
    defineField({
      name: 'service_image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
