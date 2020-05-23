import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import md from 'markdown-it'

const markdown = md({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'lang-',
  linkify: false,
  typographer: true,
  quotes: '“”‘’',
})

markdown
  .disable('lheading') // a special syntax for h1 and h2 (using "=" or "-" below the text)
  .disable('hr')
  .disable('newline') // double space + \n won't be compiled to <br>
  .disable('code') // four space to make code block

markdown //
  .use(ins)
  .use(mark)

export { markdown }
export * from './tokens'
