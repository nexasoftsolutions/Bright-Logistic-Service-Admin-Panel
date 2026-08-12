import { defineType, defineField } from 'sanity'

export const adminSchema = defineType({
  name: 'admin',
  title: 'Admin',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Name is required'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('A valid email is required'),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => Rule.required().min(6).error('Password must be at least 6 characters'),
    }),
  ],
})
