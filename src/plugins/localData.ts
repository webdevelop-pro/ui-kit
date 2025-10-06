// .vitepress/plugins/localDataPlugin.ts
import yaml from 'js-yaml'
import type MarkdownIt from 'markdown-it'

/**
 * VitePress plugin to support local data blocks in included markdown files
 * Allows ---data blocks to be used in included files for data separation
 */
export function localDataPlugin(md: MarkdownIt): void {
  // Intercept the source before parsing to extract data blocks
  const defaultRender = md.render.bind(md)
  
  md.render = function(src: string, env: any): string {
    // Extract frontmatter-style blocks in partials; skip the very first block at position 0 (top-level page FM)
    const dataBlockRegex = /^---\s*\n([\s\S]*?)\n---/gm
    let match: RegExpExecArray | null
    let cleanedSrc = src
    const extractedData: any[] = []

    console.log(src)
    
    while ((match = dataBlockRegex.exec(src)) !== null) {
      // Skip the first frontmatter block if it starts at the beginning of the document
      // if (match.index === 0) {
      //   continue
      // }
      try {
        const yamlContent = match[1]
        const data = yaml.load(yamlContent)
        extractedData.push(data)
        
        // Remove the data block from source
        cleanedSrc = cleanedSrc.replace(match[0], '')
      } catch (e) {
        console.error('Error parsing partial frontmatter block:', e)
      }
    }

    console.log('extractedData:', extractedData)
    
    // Always make a localData binding available; if a <script setup> exists, inject into it
    const dataObject = extractedData.length > 0 ? extractedData[0] : {}
    const localDataDeclaration = `const localData = ${JSON.stringify(dataObject, null, 2)}\n`

    const hasScriptSetup = /<script\s+setup[^>]*>/m.test(cleanedSrc)
    const alreadyHasLocalData = /const\s+localData\s*=/.test(cleanedSrc)

    if (alreadyHasLocalData) {
      // Do nothing if localData is already declared
      return defaultRender(cleanedSrc, env)
    }

    if (hasScriptSetup) {
      // Inject just after the opening <script setup> tag
      cleanedSrc = cleanedSrc.replace(/(<script\s+setup[^>]*>)/m, `$1\n${localDataDeclaration}`)
    } else {
      // Prepend a new script setup block
      const dataScript = `
<script setup>
${localDataDeclaration}</script>

`
      cleanedSrc = dataScript + cleanedSrc
    }
    
    return defaultRender(cleanedSrc, env)
  }
}