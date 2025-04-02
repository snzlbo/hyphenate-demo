'use client'

import { ChevronDown, HexagonIcon as Hyphen } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Define the type for hyphenation options
export interface HyphenationOption {
  name: string
  options: string[]
}

// Hyphenation data for the given text
const HYPHENATION_OPTIONS: HyphenationOption[] = [
  {
    name: 'Олноо',
    options: ['Ол-ноо'],
  },
  {
    name: 'өргөгдсөний',
    options: ['өр-гөгдсөний', 'өргөгд-сөний', 'өргөгдсөн-ий'],
  },
  {
    name: 'дөтгөөр',
    options: ['дөт-гөөр'],
  },
  {
    name: 'оны',
    options: ['о-ны'],
  },
  {
    name: 'зуны',
    options: ['зу-ны'],
  },
  {
    name: 'эхэн',
    options: ['э-хэн'],
  },
  {
    name: 'сарын',
    options: ['са-рын'],
  },
  {
    name: 'нэгэн',
    options: ['нэ-гэн'],
  },
  {
    name: 'өдөр',
    options: ['ө-дөр'],
  },
  {
    name: 'Их',
    options: ['Их'],
  },
  {
    name: 'тамирын',
    options: ['та-мирын', 'тамир-ын'],
  },
  {
    name: 'хойгуур',
    options: ['хой-гуур'],
  },
  {
    name: 'гарсан',
    options: ['гар-сан'],
  },
  {
    name: 'замаар',
    options: ['за-маар'],
  },
  {
    name: 'гуч',
    options: ['гуч'],
  },
  {
    name: 'орчим',
    options: ['ор-чим'],
  },
  {
    name: 'насны',
    options: ['нас-ны'],
  },
  {
    name: 'хар',
    options: ['хар'],
  },
  {
    name: 'хүн',
    options: ['хүн'],
  },
  {
    name: 'нилээд',
    options: ['ни-лээд'],
  },
  {
    name: 'ачаатай',
    options: ['а-чаатай', 'ачаа-тай'],
  },
  {
    name: 'морин',
    options: ['мо-рин'],
  },
  {
    name: 'тэрэг',
    options: ['те-рэг'],
  },
  {
    name: 'хөтлөөд',
    options: ['хөт-лөөд'],
  },
  {
    name: 'явж',
    options: ['явж'],
  },
  {
    name: 'байв',
    options: ['байв'],
  },
]

interface HyphenateSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HyphenateSelector({
  open,
  onOpenChange,
}: HyphenateSelectorProps) {
  const { editor } = useEditor()
  const [selectedWord, setSelectedWord] = useState<string>('')
  const [options, setOptions] = useState<string[]>([])

  // Get the selected word when the component opens
  useEffect(() => {
    if (open && editor) {
      const selection = editor.state.selection
      const { from, to } = selection

      if (from !== to) {
        const selectedText = editor.state.doc.textBetween(from, to)
        setSelectedWord(selectedText)

        // Find hyphenation options for the selected word
        const wordOptions = HYPHENATION_OPTIONS.find(
          (item) => item.name === selectedText
        )

        if (wordOptions) {
          setOptions(wordOptions.options)
        } else {
          setOptions([])
        }
      }
    }
  }, [open, editor])

  if (!editor) {
    return null
  }

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <Hyphen className="h-4 w-4" />
          <span className="hidden sm:inline">Hyphenate</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-64 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            {selectedWord
              ? `Hyphenation for "${selectedWord}"`
              : 'Select text to hyphenate'}
          </div>

          {options.length > 0 ? (
            options.map((option) => (
              <EditorBubbleItem
                key={option}
                onSelect={() => {
                  editor
                    .chain()
                    .focus()
                    .deleteSelection()
                    .insertContent(option)
                    .run()
                  onOpenChange(false)
                }}
                className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">{option}</div>
                </div>
              </EditorBubbleItem>
            ))
          ) : (
            <div className="px-2 py-1 text-sm text-muted-foreground">
              {selectedWord
                ? 'No hyphenation options available'
                : 'Select text first'}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
