import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useState, useEffect } from 'react'
import Mermaid from './Mermaid'
import pako from 'pako'

// Import all themes
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownPreviewProps {
  markdown: string
  theme: string
}

// Custom encoding function for PlantUML
function encodePlantUML(text: string): string {
  // Compress using DEFLATE
  const compressed = pako.deflate(text, { level: 9 })
  
  // Convert to base64
  const base64 = btoa(String.fromCharCode.apply(null, compressed as unknown as number[]))
  
  // Make URL safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_')
}

export default function MarkdownPreview({ markdown, theme }: MarkdownPreviewProps) {
  const [themeStyle, setThemeStyle] = useState(themes.tomorrow)

  useEffect(() => {
    setThemeStyle(themes[theme] || themes.tomorrow)
  }, [theme])

  return (
    <div className="markdown-preview prose prose-sm">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (language === 'mermaid') {
              return (
                <div className="my-4 p-4 bg-white rounded-lg shadow-md">
                  <Mermaid chart={String(children).replace(/\n$/, '')} />
                </div>
              )
            }

            if (language === 'plantuml') {
              const encodedUml = encodePlantUML(String(children).replace(/\n$/, ''))
              return (
                <img
                  src={`https://www.plantuml.com/plantuml/png/${encodedUml}`}
                  alt="PlantUML diagram"
                  className="my-4 bg-white p-4 rounded-lg shadow-md"
                />
              )
            }

            return !inline ? (
              <SyntaxHighlighter
                style={themeStyle}
                language={language}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
