import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  markdown: string
  setMarkdown: (markdown: string) => void
}

export default function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  return (
    <Textarea
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      className="w-full h-full resize-none"
      placeholder="Type your markdown here..."
    />
  )
}

