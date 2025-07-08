'use client'

import { useState, useRef, FC, HTMLAttributes, DetailedHTMLProps } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

const CodeBlock: FC<DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>> = ({ children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector('code')
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const language = (children as any)?.props?.className?.replace(/language-/, '') || 'code'

  return (
    <div className="relative my-4">
      <div className="bg-gray-700 text-gray-300 border border-gray-600 rounded-t px-4 py-2 text-sm font-mono flex justify-between items-center">
        <span>{language}</span>
        <button onClick={handleCopy} className="text-sm font-sans bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded">
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre {...props} ref={preRef} className="bg-gray-800 border border-gray-600 rounded-b-lg overflow-x-auto p-4 text-sm leading-relaxed m-0">
        {children}
      </pre>
    </div>
  )
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
        // 見出し
        h1: ({ children }) => (
          <h1 className="text-white text-4xl font-bold mb-6 mt-8">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-white text-3xl font-semibold mb-5 mt-7">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-white text-2xl font-semibold mb-4 mt-6">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-white text-xl font-semibold mb-3 mt-5">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-white text-lg font-semibold mb-2 mt-4">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-white text-base font-semibold mb-2 mt-3">{children}</h6>
        ),
        
        // 段落
        p: ({ children }) => (
          <p className="text-white mb-4 leading-relaxed">{children}</p>
        ),
        
        // リスト
        ul: ({ children }) => (
          <ul className="text-white list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="text-white list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-white">{children}</li>
        ),
        
        // 引用
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-gray-800/30 rounded-r">
            <div className="text-gray-300 italic">{children}</div>
          </blockquote>
        ),
        
        // コード
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: (props: any) => {
          const { children, className, inline } = props
          if (inline) {
            return (
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          return (
            <code className={`${className || ''} text-sm`}>
              {children}
            </code>
          )
        },
        pre: CodeBlock,
        
        // リンク
        a: ({ href, children }) => (
          <a 
            href={href} 
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        
        // 強調
        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-white">{children}</em>
        ),
        
        // 画像
        img: ({ src, alt }) => (
          <div className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || '画像'}
              className="rounded-lg max-w-full h-auto"
            />
            {alt && (
              <p className="text-gray-400 text-sm text-center mt-2 italic">
                {alt}
              </p>
            )}
          </div>
        ),
        
        // 水平線
        hr: () => (
          <hr className="border-gray-600 my-8" />
        ),
        
        // テーブル
        table: ({ ...props }) => (
          <div className="overflow-x-auto my-4">
            <table {...props} className="w-full border-collapse border border-gray-600" />
          </div>
        ),
        thead: ({ ...props }) => <thead {...props} className="bg-gray-800" />,
        tbody: ({ ...props }) => <tbody {...props} className="divide-y divide-gray-700" />,
        tr: ({ ...props }) => <tr {...props} className="border-b border-gray-700" />,
        th: ({ ...props }) => (
          <th {...props} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" />
        ),
        td: ({ ...props }) => <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-white" />,
      }}      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
