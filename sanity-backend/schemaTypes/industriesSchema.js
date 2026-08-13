import { defineType, defineField } from 'sanity'

export const industriesSchema = defineType({
  name: 'industries',
  title: 'Industries',
  type: 'document',
  fields: [
    defineField({
      name: 'industry_type',
      title: 'Industry Type',
      type: 'string',
      validation: (Rule) => Rule.required().error('Industry type is required'),
    }),
    defineField({
      name: 'industry_description',
      title: 'Industry Description',
      type: 'text',
      validation: (Rule) => Rule.required().error('Description should be meaningful'),
    }),
    defineField({
      name: 'industry_image',
      title: 'Industry Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
