import { defineType, defineField } from 'sanity'

export const fleetSchema = defineType({
  name: 'fleet',
  title: 'Fleet',
  type: 'document',
  fields: [
    defineField({
      name: 'assest_designation',
      title: 'Asset Designation',
      type: 'string',
      validation: (Rule) => Rule.required().error('Asset designation is required'),
    }),
    defineField({
      name: 'operational_capacity',
      title: 'Operational Capacity',
      type: 'string',
      validation: (Rule) => Rule.required().error('Operational capacity is required'),
    }),
    defineField({
      name: 'optimal_cargo',
      title: 'Optimal Cargo',
      type: 'string',
      validation: (Rule) => Rule.required().error('Optimal cargo is required'),
    }),
    defineField({
      name: 'specification',
      title: 'Specification',
      type: 'string',
      validation: (Rule) => Rule.required().error('Optimal cargo is required'),
    }),
    defineField({
      name: 'assest_image',
      title: 'Asset Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
