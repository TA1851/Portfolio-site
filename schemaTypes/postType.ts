import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: '記事の概要（任意）',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }]
        }
      ],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.max(10).error('タグは最大10個まで設定できます')
    }),
    defineField({
      name: 'categories',
      title: 'カテゴリ',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ]
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'typescript', // デフォルトの言語
            theme: 'github-dark', // シンタックスハイライトのテーマ
          },
        },
        {type: 'table'},
      ],
    }),
  ],
})