'use client'

import { useState } from 'react'
import MarkdownEditor from './components/MarkdownEditor'
import MarkdownPreview from './components/MarkdownPreview'
import ThemeSelector from './components/ThemeSelector'

export default function Home() {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nStart typing your markdown here!')
  const [theme, setTheme] = useState('github')

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Markdown Editor</h1>
      </header>
      <div className="flex-grow flex overflow-hidden">
        <div className="w-1/2 p-4 overflow-auto">
          <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        <div className="w-1/2 p-4 overflow-auto">
          <div className="mb-4">
            <ThemeSelector setTheme={setTheme} />
          </div>
          <MarkdownPreview markdown={markdown} theme={theme} />
        </div>
      </div>
    </div>
  )
}

