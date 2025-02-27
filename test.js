/**
 * @typedef {import('lowlight/lib/core.js').HighlightSyntax} HighlightSyntax
 */

import test from 'tape'
import {rehype} from 'rehype'
import rehypeHighlight from './index.js'

test('rehypeHighlight', (t) => {
  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {detect: true})
      .processSync(
        ['<h1>Hello World!</h1>', '', '<pre><code></code></pre>'].join('\n')
      )
      .toString(),
    ['<h1>Hello World!</h1>', '', '<pre><code class="hljs"></code></pre>'].join(
      '\n'
    ),
    'empty'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    ['<h1>Hello World!</h1>', '', '<pre><code>"use strict";</code></pre>'].join(
      '\n'
    ),
    'should not highlight (no class)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {detect: true})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-javascript"><span class="hljs-meta">"use strict"</span>;</code></pre>'
    ].join('\n'),
    'should highlight (`detect`, no class)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {detect: true, subset: ['arduino']})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-arduino"><span class="hljs-string">"use strict"</span>;</code></pre>'
    ].join('\n'),
    'should highlight (detect, no class, subset)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {detect: false})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    ['<h1>Hello World!</h1>', '', '<pre><code>"use strict";</code></pre>'].join(
      '\n'
    ),
    'should not highlight (`detect: false`, no class)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {prefix: 'foo', detect: true})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="foo language-javascript"><span class="foometa">"use strict"</span>;</code></pre>'
    ].join('\n'),
    'should highlight (prefix without dash)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {prefix: 'foo-', detect: true})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code>"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="foo language-javascript"><span class="foo-meta">"use strict"</span>;</code></pre>'
    ].join('\n'),
    'should highlight (prefix with dash)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="lang-js">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs lang-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
    ].join('\n'),
    'should highlight (lang class)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="language-js">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
    ].join('\n'),
    'should highlight (language class)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="language-javascript">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
    ].join('\n'),
    'should highlight (long name)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="no-highlight">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="no-highlight">var name = "World";',
      'console.log("Hello, " + name + "!")</code></pre>'
    ].join('\n'),
    'should not highlight (`no-highlight`)'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="nohighlight">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="nohighlight">var name = "World";',
      'console.log("Hello, " + name + "!")</code></pre>'
    ].join('\n'),
    'should not highlight (`nohighlight`)'
  )

  t.throws(
    () => {
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeHighlight)
        .processSync(
          [
            '<h1>Hello World!</h1>',
            '',
            '<pre><code class="lang-foobar">var name = "World";',
            'console.log("Hello, " + name + "!")</code></pre>'
          ].join('\n')
        )
        .toString()
    },
    /Unknown language: `foobar` is not registered/,
    'should throw on missing languages'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {ignoreMissing: true})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="lang-foobar">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs lang-foobar">var name = "World";',
      'console.log("Hello, " + name + "!")</code></pre>'
    ].join('\n'),
    'should ignore missing languages'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {plainText: ['js']})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="lang-js">var name = "World";',
          'console.log("Hello, " + name + "!")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="lang-js">var name = "World";',
      'console.log("Hello, " + name + "!")</code></pre>'
    ].join('\n'),
    'should not highlight plainText-ed languages'
  )

  // For some reason this isn’t detected as c++.
  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {subset: ['cpp'], detect: true})
      .processSync(`<pre><code>def add(a, b):\n  return a + b</code></pre>`)
      .toString(),
    '<pre><code class="hljs">def add(a, b):\n  return a + b</code></pre>',
    'should not remove contents'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="hljs lang-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
          '<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs lang-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
    ].join('\n'),
    'should reprocess exact'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {
        aliases: {javascript: ['funkyscript']}
      })
      .processSync(
        '<pre><code class="lang-funkyscript">console.log(1)</code></pre>'
      )
      .toString(),
    '<pre><code class="hljs lang-funkyscript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-number">1</span>)</code></pre>',
    'should parse custom language'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="hljs lang-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
          '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs lang-js"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"World"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello, "</span> + name + <span class="hljs-string">"!"</span>)</code></pre>'
    ].join('\n'),
    'should reprocess exact'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {detect: true})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code><!--TODO-->"use strict";</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-javascript"><span class="hljs-meta">"use strict"</span>;</code></pre>'
    ].join('\n'),
    'should ignore comments'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight)
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="language-javascript">"use strict";<br>console.log("very strict")</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-javascript"><span class="hljs-meta">"use strict"</span>;',
      '<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"very strict"</span>)</code></pre>'
    ].join('\n'),
    'should support `<br>` elements'
  )

  /**
   * @type {HighlightSyntax}
   */
  function testLang() {
    return {
      contains: [],
      aliases: ['test'],
      keywords: {keyword: 'test'}
    }
  }

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(rehypeHighlight, {languages: {test: testLang}})
      .processSync(
        [
          '<h1>Hello World!</h1>',
          '',
          '<pre><code class="language-scss">test normal text</code></pre>'
        ].join('\n')
      )
      .toString(),
    [
      '<h1>Hello World!</h1>',
      '',
      '<pre><code class="hljs language-scss">test <span class="hljs-attribute">normal</span> text</code></pre>'
    ].join('\n'),
    'should register languages'
  )

  t.end()
})
