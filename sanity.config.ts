import { defineConfig, defineField } from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'personal-blog',
  title: 'Personal Blog CMS',
  projectId: 'hrnqyow5',
  dataset: 'production',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the document',
    }),
  ],
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem()
              .title('About')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['hero', 'about'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool(),
    colorInput()
  ],
  schema: {
    types: schemaTypes,
  },
})