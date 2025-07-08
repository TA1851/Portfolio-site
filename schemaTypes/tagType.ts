import {defineField, defineType} from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'タグ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'タグ名',
      type: 'string',
      validation: Rule => [
        Rule.required().error('タグ名は必須です'),
        Rule.min(1).max(50).error('タグ名は1文字以上50文字以下で入力してください'),
        Rule.regex(/^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s\-_]+$/)
          .error('タグ名には英数字、ひらがな、カタカナ、漢字、スペース、ハイフン、アンダースコアのみ使用できます')
      ]
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
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
      description: 'このタグの説明（オプション）'
    }),
    defineField({
      name: 'color',
      title: 'タグカラー',
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
      title: 'name',
      subtitle: 'description'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `#${title}`,
        subtitle: subtitle || 'タグの説明なし'
      };
    }
  }
});
