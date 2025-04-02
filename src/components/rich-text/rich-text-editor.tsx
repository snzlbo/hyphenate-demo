'use client'
import {
  defaultEditorContent1,
  defaultEditorContent2,
  defaultEditorContent3,
} from '@/lib/content'
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  type JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from 'novel'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { defaultExtensions } from '@/components/rich-text/extensions'
import { ColorSelector } from '@/components/selectors/color-selector'
import { LinkSelector } from '@/components/selectors/link-selector'
import { MathSelector } from '@/components/selectors/math-selector'
import { NodeSelector } from '@/components/selectors/node-selector'
import { HyphenateSelector } from '@/components/selectors/hyphenate-selector'
import { Separator } from '@/components/ui/separator'

import GenerativeMenuSwitch from '@/components/rich-text/generative-menu-switch'
import { uploadFn } from '@/components/rich-text/image-upload'
import { TextButtons } from '@/components/selectors/text-buttons'
import {
  slashCommand,
  suggestionItems,
} from '@/components/rich-text/slash-command'

import hljs from 'highlight.js'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const extensions = [...defaultExtensions, slashCommand]

// Single page editor component
const PageEditor = ({
  pageNumber,
  dimensions,
  margins,
  defaultContent,
}: {
  pageNumber: number
  dimensions: { height: number; width: number; fontSize: number; leading: number }
  margins: { top: number; left: number; right: number; bottom: number }
  defaultContent: JSONContent
}) => {
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [charsCount, setCharsCount] = useState()
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)
  const [openSyllable, setOpenSyllable] = useState(false)
  const [initialContent, setInitialContent] = useState<JSONContent | null>(null)

  const convertPx = (mm: number) => {
    return Math.floor(mm * (96 / 25.4))
  }

  const convertPt = (pt: number) => {
    return Math.floor(pt * (96 / 72)) - 1
  }

  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html')
    doc.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el as HTMLElement)
    })
    return new XMLSerializer().serializeToString(doc)
  }

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON()
      setCharsCount(editor.storage.characterCount.words())

      // Save content for this page
      window.localStorage.setItem(
        `html-content-page-${pageNumber}`,
        highlightCodeblocks(editor.getHTML())
      )
      window.localStorage.setItem(
        `novel-content-page-${pageNumber}`,
        JSON.stringify(json)
      )
      window.localStorage.setItem(
        `markdown-page-${pageNumber}`,
        editor.storage.markdown.getMarkdown()
      )

      setSaveStatus('Saved')
    },
    500
  )

  // Load saved content on initial render
  useEffect(() => {
    const savedContent = window.localStorage.getItem(
      `novel-content-page-${pageNumber}`
    )
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent)
        setInitialContent(parsedContent)
      } catch (e) {
        console.error('Failed to parse saved content', e)
        setInitialContent(defaultContent)
      }
    } else {
      setInitialContent(defaultContent)
    }
  }, [pageNumber, defaultContent])

  if (!initialContent) return null

  return (
    <div className="relative mb-16">
      <div className="absolute -top-8 left-0 right-0 text-center text-sm font-medium">
        Page {pageNumber}
      </div>
      <div className="flex absolute right-4 -top-8 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? 'rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'
              : 'hidden'
          }
        >
          {charsCount} Words
        </div>
      </div>
      <div
        className="bg-white dark:bg-black border border-border items-center shadow-2xl mx-auto"
        style={{
          width: convertPx(dimensions.width),
          height: convertPx(dimensions.height),
          paddingRight: convertPx(margins.right),
          paddingLeft: convertPx(margins.left),
          paddingTop: convertPx(margins.top),
          paddingBottom: convertPx(margins.bottom),
        }}
      >
        <EditorRoot>
          <EditorContent
            immediatelyRender={false}
            initialContent={initialContent}
            extensions={extensions}
            className={cn(
              'relative w-auto border-muted bg-white dark:bg-black'
            )}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              handlePaste: (view, event) =>
                handleImagePaste(view, event, uploadFn),
              handleDrop: (view, event, _slice, moved) =>
                handleImageDrop(view, event, moved, uploadFn),
              attributes: {
                class: `text-justify`,
                style: `font-size: ${convertPt(
                  dimensions.fontSize
                )}px; line-height: ${convertPt(
                  dimensions.leading
                )}px; max-height: ${
                  convertPx(dimensions.height) -
                  convertPx(margins.top) -
                  convertPx(margins.bottom)
                }px; overflow: hidden;`,
              },
            }}
            onUpdate={({ editor }) => {
              debouncedUpdates(editor)
              setSaveStatus('Unsaved')
            }}
            slotAfter={<ImageResizer />}
          >
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                No results
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command?.(val)}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
              <Separator orientation="vertical" />
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" />
              <MathSelector />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
              <HyphenateSelector
                open={openSyllable}
                onOpenChange={setOpenSyllable}
              />
            </GenerativeMenuSwitch>
          </EditorContent>
        </EditorRoot>
      </div>
    </div>
  )
}

const StaticEditors = () => {
  // State for dimensions and text properties
  const [dimensions, setDimensions] = useState({
    height: 210,
    width: 135,
    fontSize: 11,
    leading: 14.52,
  })

  const [margins, setMargins] = useState({
    top: 16,
    left: 11,
    right: 21,
    bottom: 23,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      if (parent === 'margins') {
        setMargins((prev) => ({
          ...prev,
          [child]: Number(value),
        }))
      }
    } else {
      setDimensions((prev) => ({
        ...prev,
        [name]: Number(value),
      }))
    }
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full flex flex-wrap gap-4 py-4 mb-8">
        <div>
          <label htmlFor="width" className="block mb-1">
            Width (mm):
          </label>
          <Input
            id="width"
            name="width"
            value={dimensions.width}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="height" className="block mb-1">
            Height (mm):
          </label>
          <Input
            id="height"
            name="height"
            value={dimensions.height}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="fontSize" className="block mb-1">
            Font Size (pt):
          </label>
          <Input
            id="fontSize"
            name="fontSize"
            value={dimensions.fontSize}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="leading" className="block mb-1">
            Leading (pt):
          </label>
          <Input
            id="leading"
            name="leading"
            value={dimensions.leading}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="top" className="block mb-1">
            Top (mm):
          </label>
          <Input
            id="top"
            name="margins.top"
            value={margins.top}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="bottom" className="block mb-1">
            Bottom (mm):
          </label>
          <Input
            id="bottom"
            name="margins.bottom"
            value={margins.bottom}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="left" className="block mb-1">
            Left (mm):
          </label>
          <Input
            id="left"
            name="margins.left"
            value={margins.left}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
        <div>
          <label htmlFor="right" className="block mb-1">
            Right (mm):
          </label>
          <Input
            id="right"
            name="margins.right"
            value={margins.right}
            onChange={handleInputChange}
            className="mb-2"
          />
        </div>
      </div>

      {/* Three static pages with individual editors and specific content */}
      <div className="flex flex-col gap-16 w-full pb-12">
        <PageEditor
          pageNumber={1}
          dimensions={dimensions}
          margins={margins}
          defaultContent={defaultEditorContent1}
        />
        <PageEditor
          pageNumber={2}
          dimensions={dimensions}
          margins={margins}
          defaultContent={defaultEditorContent2}
        />
        <PageEditor
          pageNumber={3}
          dimensions={dimensions}
          margins={margins}
          defaultContent={defaultEditorContent3}
        />
      </div>
    </div>
  )
}

export default StaticEditors
