<head>
    <title>My Code Formatting Guidelines | Vale.Rocks</title>
    <meta property="og:title" content="My Code Formatting Guidelines"/>
    <meta name="description" content="Code formatting, how I go about it, and why I choose to do it the way I do. This article covers indentation, string formatting, the classic tabs vs spaces debate, and much more." />
    <meta property="og:description" content="Stirring the tabs vs spaces pot once again." />
    <meta property="article:published_time" content="2024-04-18" />
    <meta property="article:modified_time" content="2024-04-18" />
    <meta property="article:section" content="Tutorials" />
</head>

<article>
<header>
	Tutorial
	<h1>
		My Code Formatting Guidelines
	</h1>
	<ul>
		<li><time datetime="2024-04-18">18 Apr, 2024</time></li>
		<li>746 words</li>
		<li>3 minute read</li>
	</ul>
</header>

Software development is a varied field filled with lots of different people with very strong opinions. When working on projects, it's important that everyone follows the same guidelines for the sake of compatibility and coherence.

This document outlines my personal code style guidelines and how I implement them. Much of what I outline here can be achieved using [my Prettier configuration](https://github.com/DeclanChidlow/dotfiles/blob/main/Baud/.prettierrc.yaml). Where relevant, I've included the related Prettier config lines.

Note that I am a frontend developer, and, as such, this documentation is best tailored to that. If you wish to utilise my guidelines outside the sphere of frontend development, then you may need to make some alterations.

## Use Tabs

Tabs should be used for indentation for several reasons. These include:

- Semantic indication of indentation
- Customisable display
- Improved accessibility
- Smaller file sizes

Prettier: [`useTabs: true`](https://prettier.io/docs/en/options.html#tabs)

## Always Add Semicolons

When writing JavaScript, every line that can end with a semicolon should end with a semicolon. JavaScript engines add them anyway, and it's ideal to see exactly what code will be executed.

Prettier: [`semi: true`](https://prettier.io/docs/en/options.html#semicolons)

```JavaScript
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

Prettier: [`singleQuote: true`](https://prettier.io/docs/en/options.html#quotes), [`jsxSingleQuote: false`](https://prettier.io/docs/en/options.html#jsx-quotes)

```JavaScript
// Bad
const variable = "String Content";

// Good
const variable = 'String Content';
```

## Quote Properties

Properties should all be quoted in the same way, rather than introducing unnecessary (and potentially confusing) variation within an object.

Prettier: [`quoteProps: "consistent"`](https://prettier.io/docs/en/options.html#quote-props)

```JavaScript
// Bad
object = {
	property1: "content",
	"property2": "content"
};

// Good
object = {
	"property1": "content",
	"property2": "content"
};
```

## Don't Split Strings Across Multiple Lines

Strings should be contained within one line unless there is genuine reason not to. It makes things hard to search and is a pain to deal with.

```JavaScript
// Bad
const variable = 'This is awful. It may be easier for a human to read, but \
it leads to annoyance and makes it harder to search for things. It is an \
all around pain.';

// Good
const variable = 'This is better. It may be a tad harder for a human to read, but resolves many annoyances and makes it easier to search for things. It is much cleaner as well.';
```

## Use Trailing Commas

Trailing commas make version history cleaner. Rather than a change implementing a new line _and_ a comma on the previous line, it will only need to add the new line.

Prettier: [`trailingComma: "all"`](https://prettier.io/docs/en/options.html#trailing-commas)

```JavaScript
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

Prettier: [`bracketSpacing: true`](https://prettier.io/docs/en/options.html#bracket-spacing)

```JavaScript
// Bad
{foo: bar}

// Good
{ foo: bar }
```

## Use Arrow Parentheses

Using arrow parentheses makes it easier to read and make changes.

Prettier: [`arrowParens: always`](https://prettier.io/docs/en/options.html#arrow-function-parentheses)

```JavaScript
// Bad
x => x

// Good
(x) => x
```

## Unwrap Prose

Prose formatting should be handled slightly differently to code. As such, each block of prose should be unwrapped into one line. This makes it easy for any editor to define how they want prose to display.

Prettier: [`proseWrap: preserve`](https://prettier.io/docs/en/options.html#prose-wrap)

## HTML Whitespace Sensitive Formatting

Formatting HTML can be messy due to the way browsers parse whitespace. Prettier [offers a good explanation of it](https://prettier.io/blog/2018/11/07/1.15.0#whitespace-sensitive-formatting), but the crux is that their CSS formatting option offers the best mix of human readability and preservation of whitespace.

Prettier: [`htmlWhitespaceSensitivity: css`](https://prettier.io/docs/en/options.html#html-whitespace-sensitivity)

## Line Feed End of Line

Different operating systems handle line endings differently, and things get messy quick. Using line feed, which is common on Unix based systems, is a clean option that is also supported on Windows.

Prettier: [`endOfLine: lf`](https://prettier.io/docs/en/options.html#end-of-line)

## Format Embedded Languages

Code of one type used within a file of another should be formatted as you would code in it's native filetype.

Prettier: [`embeddedLanguageFormatting: auto`](https://prettier.io/docs/en/options.html#embedded-language-formatting)

## Keep Multiple Attributes Per Line

Splitting an element's attributes into multiple lines takes up a lot of space and, on larger elements, leads to very long and unwieldy files.

Prettier: [`singleAttributePerLine: false`](https://prettier.io/docs/en/options.html#single-attribute-per-line)

```HTML
// Bad
<div
	 class="name"
	 id="name"
>
	Content
</div>

// Good
<div class="name" id="name">
	Content
</div>
```

---

As I opened with, the formatting of code is a decisive and complex topic. I'm sure many people disagree with my code formatting guidelines, and I'd love to hear your criticisms in the comments. All I ask is that you keep criticism constructive and remain respectful.

</article>

<span class="giscus"></span>
