import { defineType, defineField } from 'sanity'

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image_type',
      title: 'Image Type',
      type: 'string',
      validation: (Rule) => Rule.required().error('Image type is required'),
    }),
    defineField({
      name: 'gallery_image',
      title: 'Gallery Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
