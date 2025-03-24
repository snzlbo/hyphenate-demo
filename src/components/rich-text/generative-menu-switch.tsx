import { EditorBubble, useEditor } from 'novel'
import { Fragment, type ReactNode } from 'react'

interface GenerativeMenuSwitchProps {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor()

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false)
          editor?.chain().unsetHighlight().run()
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {!open && <Fragment>{children}</Fragment>}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch
