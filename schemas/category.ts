import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'カテゴリ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'カテゴリ名',
      type: 'string',
      validation: Rule => [
        Rule.required().error('カテゴリ名は必須です'),
        Rule.min(1).max(50).error('カテゴリ名は1文字以上50文字以下で入力してください')
      ]
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]+/g, '')
      },
      validation: Rule => Rule.required().error('スラッグは必須です')
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      rows: 3,
      description: 'このカテゴリの説明（オプション）'
    }),
    defineField({
      name: 'color',
      title: 'カテゴリカラー',
      type: 'string',
      options: {
        list: [
          { title: 'ブルー', value: 'blue' },
          { title: 'グリーン', value: 'green' },
          { title: 'レッド', value: 'red' },
          { title: 'イエロー', value: 'yellow' },
          { title: 'パープル', value: 'purple' },
          { title: 'ピンク', value: 'pink' },
          { title: 'グレー', value: 'gray' }
        ]
      },
      initialValue: 'blue'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle || 'カテゴリの説明なし'
      };
    }
  }
});