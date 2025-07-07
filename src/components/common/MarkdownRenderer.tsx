import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
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
        code: ({ children, className, ...props }: React.HTMLProps<HTMLElement>) => {
          const isInline = !className?.includes('language-')
          
          if (isInline) {
            return (
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
        
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
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse border border-gray-600">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-800">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody>
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-gray-600">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="border border-gray-600 px-4 py-2 text-white font-semibold text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-600 px-4 py-2 text-white">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
