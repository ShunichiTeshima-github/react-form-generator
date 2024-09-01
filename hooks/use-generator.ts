import { ElementModel, GeneratorModel } from '@/shared/models/generator'
import { exec } from 'child_process'
import { useEffect, useState } from 'react'

const useGenerator = (document: GeneratorModel, path: string) => {
  const [elements, setElements] = useState<{ [x: string]: ElementModel }>({})

  useEffect(() => {
    const doc = document.paths[path]
    setElements(doc.elements)
  }, [])

  return { elements }
}

export default useGenerator
