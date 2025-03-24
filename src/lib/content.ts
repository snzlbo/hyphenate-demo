export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Introducing Hyphenate Words' }],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Features' }],
    },
    {
      type: 'orderedList',
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Slash menu & bubble menu' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'AI autocomplete (type ' },
                { type: 'text', marks: [{ type: 'code' }], text: '++' },
                {
                  type: 'text',
                  text: ' to activate, or select from slash menu)',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Image uploads (drag & drop / copy & paste, or select from slash menu) ',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Add tweets from the command slash menu:',
                },
              ],
            },
            {
              type: 'twitter',
              attrs: {
                src: 'https://x.com/elonmusk/status/1800759252224729577',
              },
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Mathematical symbols with LaTeX expression:',
                },
              ],
            },
            {
              type: 'orderedList',
              attrs: {
                tight: true,
                start: 1,
              },
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'math',
                          attrs: {
                            latex: 'E = mc^2',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'math',
                          attrs: {
                            latex: 'a^2 = \\sqrt{b^2 + c^2}',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'math',
                          attrs: {
                            latex:
                              '\\hat{f} (\\xi)=\\int_{-\\infty}^{\\infty}f(x)e^{-2\\pi ix\\xi}dx',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'math',
                          attrs: {
                            latex:
                              'A=\\begin{bmatrix}a&b\\\\c&d \\end{bmatrix}',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'math',
                          attrs: {
                            latex: '\\sum_{i=0}^n x_i',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: '/banner.png',
        alt: 'banner.png',
        title: 'banner.png',
        width: null,
        height: null,
      },
    },
    { type: 'horizontalRule' },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Learn more' }],
    },
    {
      type: 'taskList',
      content: [
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Star us on ' },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://github.com/steven-tey/novel',
                        target: '_blank',
                      },
                    },
                  ],
                  text: 'GitHub',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Install the ' },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://www.npmjs.com/package/novel',
                        target: '_blank',
                      },
                    },
                  ],
                  text: 'NPM package',
                },
              ],
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: { checked: false },
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'link',
                      attrs: {
                        href: 'https://vercel.com/templates/next.js/novel',
                        target: '_blank',
                      },
                    },
                  ],
                  text: 'Deploy your own',
                },
                { type: 'text', text: ' to Vercel' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
