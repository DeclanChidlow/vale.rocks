---
title: My Code Formatting Guidelines
description: Code formatting, how I go about it using Prettier, and why I choose to do it the way I do. Covering indentation, string formatting, my take on the classic tabs vs spaces debate, and much more.
og_description: Stirring the tabs vs spaces pot.
pub_time: 2024-04-18
mod_time: 2025-10-29
section: Tutorial
tags: [development, front-end development]
---

Software development is a varied field with varied opinions regarding varied ways of doing varied things. Everyone has their own opinionated takes on how code should be formatted, leading to a conflated mess of conflicting thought which neither I nor anyone else ever wants to deal with.

Hence, we have code style guidelines. These guidelines outline how to format things so that everyone gets along and manslaughter is kept to a minimum. I myself have my own opinionated takes on how code should be formatted and find myself repeating the justification of my choices, so I've documented them here.

Worth noting is that I am a front-end developer, and that is reflected in my preferences and the technologies those preferences best apply to. I tend to build for the web using HTML, CSS, and JavaScript where possible but often find myself working with more complex stacks incorporating languages such as PHP and a smattering of frameworks.

I'm strongly of the opinion that code should be formatted in such a way that it is representative of how the code is run, and also in such a way that text editors can handle it gracefully and adapt its display to the user's preferences. Allowing user-dictated preferences to be easily applied reduces the impact of differing formatting opinions, allowing for improved experiences for all involved parties.

I personally enforce these settings using [Prettier](https://prettier.io) via [`conform.nvim` in Neovim](/posts/neovim#conform-code-formatting), which I feel does an excellent job. You can find my `.prettierrc` in my [dotfile repo on GitHub](https://github.com/DeclanChidlow/dotfiles/blob/main/Baud/.prettierrc.yml). I've also noted the relevant Prettier options where applicable.

## Use Tabs

Tabs should be used for indentation for several reasons. These include:

- Semantic indication of indentation
- Customisable display
- Improved accessibility
- Smaller file sizes

Prettier: [`useTabs: true`](https://prettier.io/docs/options.html#tabs)

## Naming Style

HTML elements and attributes should be lowercase, not uppercase. It isn't 1995 any more. IDs and classes should both be in kebab-case. I'm not a huge fan of the naming style provided by the [BEM CSS methodology](https://getbem.com) or other similar projects.

JavaScript variables and functions should be camelCase, immutable constants should be UPPER_SNAKE_CASE, classes and constructors should be PascalCase, and events/callbacks should be camelCase unless referencing HTML/CSS using kebab-case.

## Always Add Semicolons

When writing JavaScript, every line that can end with a semicolon should end with a semicolon. When JavaScript is being parsed, [automatic semicolon insertion (ASI)](https://web.dev/learn/javascript/appendix#ASI) is used by interpreters to correct missing semicolons. This is error correction, not JavaScript being flexible.

Semicolons should always be included, as it is ideal to see exactly what code will be executed.

Prettier: [`semi: true`](https://prettier.io/docs/options.html#semicolons)

```javascript
// Bad
function name {
	console.log("I truly do love JavaScript")
}

// Good
function name {
	console.log("I truly do love JavaScript");
}
```

## Use Double Quotes

Strings should use double quotes (`""`), not single quotes (`''`). This makes it easier to use single quotes (which are more common) within strings. This is merely a default, and there will be situations where using single quotes is preferable. For the most part, Prettier will handle these exceptions.

Prettier: [`singleQuote: false`](https://prettier.io/docs/options.html#quotes), [`jsxSingleQuote: false`](https://prettier.io/docs/options.html#jsx-quotes)

```javascript
// Bad
const variable = 'String Content';

// Good
const variable = "String Content";
```

## Quote Properties

Properties should all be quoted in the same way, rather than introducing unnecessary (and potentially confusing) variation within an object.

Prettier: [`quoteProps: "consistent"`](https://prettier.io/docs/options.html#quote-props)

```javascript
// Bad
object = {
	property1: "content",
	"property2": "content",
};

// Good
object = {
	"property1": "content",
	"property2": "content",
};
```

## Don't Split Strings Across Multiple Lines

Strings should be contained within one line unless there is genuine reason not to do so. It makes things hard to search, laborious to copy, and is a general pain to deal with.

```javascript
// Bad
const variable = "This is awful. It may be easier for a human to read, but \
it leads to annoyance and makes it harder to search for things. It is an \
all around pain.";

const variable = "This is awful. It may be easier for a human to read, but " +
"it leads to annoyance and makes it harder to search for things. It is an " +
"all around pain.";

// Good
const variable = "This is better. It may be a tad harder for a human to read, but resolves many annoyances and makes it easier to search for things. It is much cleaner as well.";
```

## Use Trailing Commas

Trailing commas help keep version history clean. Rather than a diff showing the implementation of a new line _and_ a comma on the previous line, it will only display the actual change, a new line.

Prettier: [`trailingComma: "all"`](https://prettier.io/docs/options.html#trailing-commas)

```javascript
// Bad
object = {
	property1: "content",
	"property2": "content"
};

// Good
object = {
	"property1": "content",
	"property2": "content",
};
```

## Space Brackets

Brackets should have spaces on either side to provide padding. This makes it easier to read and maintains consistency.

Prettier: [`bracketSpacing: true`](https://prettier.io/docs/options.html#bracket-spacing)

```javascript
// Bad
{foo: bar}

// Good
{ foo: bar }
```

## Use Arrow Parentheses

Using arrow parentheses makes it easier to read and make changes.

Prettier: [`arrowParens: always`](https://prettier.io/docs/options.html#arrow-function-parentheses)

```javascript
// Bad
x => x

// Good
(x) => x
```

## Unwrap Prose

Prose formatting should be handled slightly differently from code. As such, each block of prose shouldn't be forcefully wrapped. Preserve keeps the writer's chosen breaks and makes it easy for any text editor to define how prose should display.

Prettier: [`proseWrap: preserve`](https://prettier.io/docs/options.html#prose-wrap)

## HTML Whitespace Sensitive Formatting

Formatting HTML can be messy due to the way browsers parse whitespace. Prettier [offers a good explanation of it](https://prettier.io/blog/2018/11/07/1.15.0#whitespace-sensitive-formatting), but the crux is that their CSS formatting option offers the best mix of human readability and preservation of whitespace.

Prettier: [`htmlWhitespaceSensitivity: css`](https://prettier.io/docs/options.html#html-whitespace-sensitivity)

## Line Feed End of Line

Different operating systems handle line endings differently, and things get messy quick. Using line feed, which is common on Unix-based systems, is a clean option that is also supported on Windows.

Prettier: [`endOfLine: lf`](https://prettier.io/docs/options.html#end-of-line)

## Format Embedded Languages

Code of one type used within a file of another should be formatted as you would code in its native file type.

Prettier: [`embeddedLanguageFormatting: auto`](https://prettier.io/docs/options.html#embedded-language-formatting)

## Keep Multiple Attributes Per Line

Splitting an element's attributes into multiple lines often makes it harder to quickly grasp structure and is an inefficient use of screen space. I also feel it just looks rather ugly.

Prettier: [`singleAttributePerLine: false`](https://prettier.io/docs/options.html#single-attribute-per-line)

```html
<!-- Bad -->
<div
	 class="name"
	 id="name"
>
	Content
</div>

<!-- Good -->
<div class="name" id="name">
	Content
</div>
```
