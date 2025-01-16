'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
          background: '#ffffff',
          primaryColor: '#5a67d8',
          secondaryColor: '#7c3aed',
          tertiaryColor: '#2dd4bf',
          primaryTextColor: '#333333',
          secondaryTextColor: '#666666',
          tertiaryTextColor: '#888888',
          lineColor: '#666666',
          fontSize: '16px'
        }
      })
      mermaid.contentLoaded()
    }
  }, [chart])

  return <div ref={ref} className="mermaid bg-white">{chart}</div>
}