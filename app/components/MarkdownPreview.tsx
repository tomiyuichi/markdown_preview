import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useState, useEffect } from 'react'
import Mermaid from './Mermaid'

// Import all themes
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownPreviewProps {
  markdown: string
  theme: string
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
              return <Mermaid chart={String(children).replace(/\n$/, '')} />
            }

            if (language === 'plantuml') {
              const encodedUml = btoa(String(children).replace(/\n$/, ''))
              return (
                <img
                  src={`https://www.plantuml.com/plantuml/png/${encodedUml}`}
                  alt="PlantUML diagram"
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

