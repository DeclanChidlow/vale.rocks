<head>
    <title>My Code Formatting Guidelines | Vale.Rocks</title>
    <meta property="og:title" content="My Code Formatting Guidelines"/>
    <meta name="description" content="Code formatting, how I go about it, and why I choose to do it the way I do. This article covers indentation, string formatting, my take on the classic tabs vs spaces debate, and much more." />
    <meta property="og:description" content="Stirring the tabs vs spaces pot once again." />
    <meta property="article:published_time" content="2024-04-18" />
    <meta property="article:modified_time" content="2024-06-10" />
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
		<li>875 words</li>
		<li>3 minute read</li>
	</ul>
</header>

<div class="readable-width">

Software development is a varied field with varied opinions regarding varied ways of doing varied things. Everyone has their own opinionated takes on how code should be formatted. This leads to what can best be described as a conflated mess of conflicting thought. This is _not_ something I, nor anyone else, ever want to deal with.

This is why we have code style guidelines. These guidelines outline how to format things so that everyone gets along and manslaughter is kept to a minimum. I myself have my own opinionated takes on how code should be formatted and find myself repeating the justification of my choices, so I've documented them here.

Worth noting is that I am a frontend developer, and that is reflected in my preferences and the technologies those preferences best apply to. I tend to build for the web using HTML, CSS, and JavaScript where possible, but often find myself working with more complex stacks incorporating languages such as PHP and TypeScript and a smattering of frameworks.

I personally enforce these settings using [Prettier](https://prettier.io), which I feel does an excellent job. You can find my .prettierrc in my [dotfile repo on GitHub](https://github.com/DeclanChidlow/dotfiles/blob/main/Baud/.prettierrc.yaml). I've also noted the relevant Prettier options where applicable.

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

Prettier: [`singleQuote: true`](https://prettier.io/docs/en/options.html#quotes), [`jsxSingleQuote: false`](https://prettier.io/docs/en/options.html#jsx-quotes)

```javascript
// Bad
const variable = 'String Content';

// Good
const variable = "String Content";
```

## Quote Properties

Properties should all be quoted in the same way, rather than introducing unnecessary (and potentially confusing) variation within an object.

Prettier: [`quoteProps: "consistent"`](https://prettier.io/docs/en/options.html#quote-props)

```javascript
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

Strings should be contained within one line unless there is genuine reason not to do so. It makes things hard to search and is a general pain to deal with.

```javascript
// Bad
const variable = "This is awful. It may be easier for a human to read, but \
it leads to annoyance and makes it harder to search for things. It is an \
all around pain.";

// Good
const variable = "This is better. It may be a tad harder for a human to read, but resolves many annoyances and makes it easier to search for things. It is much cleaner as well.";
```

## Use Trailing Commas

Trailing commas help keep version history clean. Rather than a diff showing the implementation of a new line _and_ a comma on the previous line, it will only display the actual change, a new line.

Prettier: [`trailingComma: "all"`](https://prettier.io/docs/en/options.html#trailing-commas)

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

Prettier: [`bracketSpacing: true`](https://prettier.io/docs/en/options.html#bracket-spacing)

```javascript
// Bad
{foo: bar}

// Good
{ foo: bar }
```

## Use Arrow Parentheses

Using arrow parentheses makes it easier to read and make changes.

Prettier: [`arrowParens: always`](https://prettier.io/docs/en/options.html#arrow-function-parentheses)

```javascript
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

Splitting an element's attributes into multiple lines often makes it harder to quickly grasp structure and is an inefficient use of screen space.

Prettier: [`singleAttributePerLine: false`](https://prettier.io/docs/en/options.html#single-attribute-per-line)

```html
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

There you have my personal guidelines. I'm sure many people disagree (if only for my preference of tabs over spaces), and I'd love to hear your thoughts in the comments. All I ask is that you keep criticism constructive and remain respectful.

If you liked this post, then do consider sharing it. Also, if you'd like to support me in making more like it, consider [sending me a tip](/support). It'd mean a lot.

<section class="giscus"></section>

</div>
</article>
