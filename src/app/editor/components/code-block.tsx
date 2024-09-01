import { Button } from '@/components/ui/button'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokaiSublime } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  codeType: string
  children: React.ReactNode
}

const CodeBlock: React.FC<Props> = ({ ...Props }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
  }
  return (
    <>
      <div
        style={{
          background: '#f5f5f5',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          fontWeight: 'bold'
        }}
        className="pl-2 flex justify-between items-center"
      >
        <p>{Props.codeType}</p>
        <CopyToClipboard text={Props.children} onCopy={handleCopy}>
          <Button variant={'ghost'}>{copied ? 'Copied!' : 'Copy'}</Button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter language="html" style={monokaiSublime}>
        {Props.children}
      </SyntaxHighlighter>
    </>
  )
}

export default CodeBlock
