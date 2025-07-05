import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60).warning('SEO titles should be under 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(155).warning('SEO descriptions should be under 155 characters'),
    }),
    defineField({
      name: 'image',
      title: 'SEO Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})