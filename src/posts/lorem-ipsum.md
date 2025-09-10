---
title: Lorem Ipsum
description: A page for testing and trialing formatting, features, and typography by seeing how they interact in complex arrangements to catch edge cases at scale.
og_description: "'Blah blah blah' doesn’t look quite as good."
pub_time: 2024-11-25
mod_time: 2025-09-10
section: Meta
site_recommended: true
---

This is a page in which I test and trial formatting, features, and typography by seeing how they interact in complex arrangements to catch edge cases. If you'd like to read the logic behind all of this, check out my posts on both [The Design of This Site](/posts/the-design-of-this-site) and [The Implementation of This Site](/posts/the-implementation-of-this-site).

Somebody once asked why this page is indexed and in production on my site. The reasoning is threefold. Firstly, I often come here to refer to things, such as the colour palette. Secondly, I can ask people if this page looks correct on their machine to check issues. Thirdly, because it is a showcase of site features that people (including myself) may wish to reference.

## Text Formatting

Escaping markdown can be done with \*some slashes\* (like so `\*some slashes\*`).

Normal text. _Italic text._ **Bold text.** **_Bold italic text._** ~~Strikethrough text.~~ ~~_Italic strikethrough text._~~ ~~**Bold strikethrough text.**~~ ~~**_Bold italic strikethrough text._**~~ `Code text.` _`Code italic text.`_ **`Code bold text.`** **_`Code bold italic text.`_** ~~`Code strikethrough text.`~~ ~~**_`Code bold italic strikethrough text.`_**~~

Normal superscript<sup>sup</sup>. Normal subscript<sub>sub</sub>. _Italic superscript<sup>sup</sup>_. _Italic subscript<sub>sub</sub>._ **Bold superscript<sup>sup</sup>**. **Bold subscript<sub>sub</sub>.** **_Bold italic superscript<sup>sup</sup>_**. **_Bold italic subscript<sub>sub</sub>._** ~~Strikethrough superscript<sup>sub</sup>.~~ ~~Strikethrough subscript<sub>sub</sub>.~~ ~~**_Bold italic strikethrough superscript<sup>sup</sup>_**~~. ~~**_Bold italic strikethrough subscript<sub>sub</sub>._**~~

Superscript and subscript together<sup>sup</sup><sub>sub</sub>.

You can define structure with <abbr title="Hypertext Markup Language">HTML</abbr> and then style it with <abbr title="Cascading Style Sheet">CSS</abbr>. You can do more interactive stuff with <abbr title="JavaScript">JS</abbr>.

These are abbreviations that aren't actually formatted like abbreviations but should be handled during building. NASA. DVD. GIF. 200MB.

You can do a hard refresh on a webpage using <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>

pneumonoultramicroscopicsilicovolcanoconiosisisaverylongwordpneumonoultramicroscopicsilicovolcanoconiosisisaverylongwordpneumonoultramicroscopicsilicovolcanoconiosisisaverylongword

### Maths

100⁄200 158⁄851

≈ ~ = ≠ ∙ ÷ − + ± × ∕ > ≥ ∞ < ≤ % √

I present: _numbers_. 10, 20, 30, 40, 800. Threw you off there. 1000. 2500. 95837593756191234567890. That's some numbers for ya.

### Swashes

<div style="font-feature-settings: 'swsh';">
A Á Ă Â Ä À Ā Ą Ã E É Ě Ê Ë Ė È Ē Ę E É Ě Ê Ë Ė È Ē Ę F L Ĺ Ľ Ļ Ł M M N Ń Ň Ņ Ñ R Ŕ Ř Ŗ R Ŕ Ř Ŗ S T Ť Ţ Ț W n ń ň ņ ñ r ŕ ř ŗ t ť ţ ț y ý ÿ
</div>

### Heading Levels

Quod provident corporis natus. Voluptatem sunt magnam nobis quo quas repudiandae magnam. Qui maxime dolor harum. Aspernatur tempore ea id sed fugit. Dolores cum tenetur in quisquam et maiores quam. Suscipit est aperiam rerum consectetur velit officiis.

#### Heading Level 4

Aliquam non sed beatae. Deleniti laborum ut eveniet autem. Aut incidunt sint ex ut occaecati. Praesentium et ut cumque beatae.

##### Heading Level 5

Quaerat deleniti quos accusamus sit qui. Est temporibus fugiat cupiditate aut sit hic ex cum. Ea quaerat non dolor et iure repellendus velit. Nihil ea tempore ut libero aperiam nulla aut necessitatibus. Est praesentium fuga rerum aut ipsa et aut id.

###### Heading Level 6

Aliquam laborum voluptate molestiae illo sunt dolorum. Qui fuga qui fuga impedit libero tenetur ex aliquam. Sit molestiae ut sint nulla deserunt molestiae eos veritatis. Neque perferendis culpa ad omnis. Ipsum nisi facere cum molestiae aut possimus exercitationem repellat. Voluptatum blanditiis optio officiis et quo.

### Links

[Normal internal link](https://vale.rocks). [`Code internal link`](https://vale.rocks). [~~**_Bold italic strikethrough subscript internal link<sub>sub</sub>_**~~](https://vale.rocks). [~~**_Bold italic strikethrough superscript external link<sup>sup</sup>_**~~](https://vale.rocks).

[Anchor link](#main). [`Code anchor link`](#main). [~~**_Bold italic strikethrough subscript anchor link<sub>sub</sub>_**~~](#main). [~~**_Bold italic strikethrough superscript external link<sup>sup</sup>_**~~](#main).

[External link](https://zombo.com). [`Code external link`](https://zombo.com). [~~**_Bold italic strikethrough subscript external link<sub>sub</sub>_**~~](https://zombo.com). [~~**_Bold italic strikethrough superscript external link<sup>sup</sup>_**~~](https://zombo.com).

Here is an abbreviation with a link: [<abbr title="Abreviation Meaning">AM</abbr>](https://vale.rocks).

#### **Quick Links**

(Links specified with `<>`) \
<https://vale.rocks> \
<example@example.com>

### Lists

**Unordered List**

- Item one
  - Item one's child
    - Item one's child's child
      - Item one's child's child's child
- Item two
- Item three

**Ordered List**

1. Item one
   1. Item one's child
      1. Item one's child's child
      2. Item one's child's child's sibling
         1. Item one's child's child's sibling's child
2. Item two
3. Item three

**Task List**

- [x] Completed task
- [ ] Task left to do

## Blockquotes

> Normal text. _Italic text._ **Bold text.** **_Bold italic text._** ~~Strikethrough text.~~ ~~_Italic strikethrough text._~~ ~~**Bold strikethrough text.**~~ ~~**_Bold italic strikethrough text._**~~ `Code text.` _`Code italic text.`_ **`Code bold text.`** **_`Code bold italic text.`_** ~~`Code strikethrough text.`~~ ~~**_`Code bold italic strikethrough text.`_**~~
>
> Id deleniti eveniet non placeat quia libero. Non soluta consequatur sit accusamus illum veniam. Animi ab ab omnis iusto aut. Porro tempora fugit placeat perspiciatis et rem consectetur sequi.

> Normal text. _Italic text._ **Bold text.** **_Bold italic text._** ~~Strikethrough text.~~ ~~_Italic strikethrough text._~~ ~~**Bold strikethrough text.**~~ ~~**_Bold italic strikethrough text._**~~ `Code text.` _`Code italic text.`_ **`Code bold text.`** **_`Code bold italic text.`_** ~~`Code strikethrough text.`~~ ~~**_`Code bold italic strikethrough text.`_**~~
>
> Id deleniti eveniet non placeat quia libero. Non soluta consequatur sit accusamus illum veniam. Animi ab ab omnis iusto aut. Porro tempora fugit placeat perspiciatis et rem consectetur sequi.
>
> > Normal text. _Italic text._ **Bold text.** **_Bold italic text._** ~~Strikethrough text.~~ ~~_Italic strikethrough text._~~ ~~**Bold strikethrough text.**~~ ~~**_Bold italic strikethrough text._**~~ `Code text.` _`Code italic text.`_ **`Code bold text.`** **_`Code bold italic text.`_** ~~`Code strikethrough text.`~~ ~~**_`Code bold italic strikethrough text.`_**~~
> >
> > Id deleniti eveniet non placeat quia libero. Non soluta consequatur sit accusamus illum veniam. Animi ab ab omnis iusto aut. Porro tempora fugit placeat perspiciatis et rem consectetur sequi.
> >
> > > Normal text. _Italic text._ **Bold text.** **_Bold italic text._** ~~Strikethrough text.~~ ~~_Italic strikethrough text._~~ ~~**Bold strikethrough text.**~~ ~~**_Bold italic strikethrough text._**~~ `Code text.` _`Code italic text.`_ **`Code bold text.`** **_`Code bold italic text.`_** ~~`Code strikethrough text.`~~ ~~**_`Code bold italic strikethrough text.`_**~~
> > >
> > > Id deleniti eveniet non placeat quia libero. Non soluta consequatur sit accusamus illum veniam. Animi ab ab omnis iusto aut. Porro tempora fugit placeat perspiciatis et rem consectetur sequi.

## Details

<details>
<summary>Details element</summary>

Quis voluptatem nisi minima eaque molestiae non magnam tempora. Deleniti aut doloremque ut illum et enim sit blanditiis. Sequi facere voluptas et voluptas rerum maiores qui. Et nobis et dolor ipsum nihil debitis. Voluptates id esse officia aut est nulla.

</details>

<details open>
<summary>Open details element</summary>

This details element defaults to open.

Quis voluptatem nisi minima eaque molestiae non magnam tempora. Deleniti aut doloremque ut illum et enim sit blanditiis. Sequi facere voluptas et voluptas rerum maiores qui. Et nobis et dolor ipsum nihil debitis. Voluptates id esse officia aut est nulla.

</details>

## Tables

<figure>
<div class="table-wrapper">

| Vehicle Name      | Primary User | Vehicle Type            | Key Features                                       | Special Functions                                     |
| :---------------- | :----------- | :---------------------- | :------------------------------------------------- | :---------------------------------------------------- |
| **Thunderbird 1** | Scott Tracy  | Rocket-Powered VTOL Jet | Sleek design, vertical take-off and landing (VTOL) | High-speed, rescue operations, aerial manoeuvrability |
| **Thunderbird 2** | Virgil Tracy | Transport Aircraft      | Large cargo hold, modular design, green colour     | Carries vehicles for land and sea rescues             |
| **Thunderbird 3** | Alan Tracy   | Space Rocket            | Red design, space travel capabilities              | Space missions, long-range travel                     |
| **Thunderbird 4** | Gordon Tracy | Submarine               | Yellow, compact, built for underwater exploration  | Submarine for underwater rescue and exploration       |
| **Thunderbird 5** | John Tracy   | Space Station           | Satellite orbiting Earth, advanced communication   | Monitoring global distress signals from space         |

</div>

<figcaption>Large table presenting the various Thunderbirds vehicles.</figcaption>
</figure>

<figure>
<div class="table-wrapper">

| ID         | Value A | Value B | Value C | Value D |
| :--------- | ------: | ------: | ------: | ------: |
| Text One   |    12.5 |    88.2 |    45.1 |    73.4 |
| Text Two   |    19.8 |    67.4 |    52.3 |    81.7 |
| Text Three |    15.3 |    90.1 |    39.8 |    60.2 |

</div>

<figcaption>Small table presenting numeric data.</figcaption>
</figure>

## Admonitions

> [!NOTE]
> Important info users should be aware of, even when skimming.

> [!TIP]
> Practical advice for improving or simplifying tasks.

> [!IMPORTANT]
> Critical info for achieving the desired outcome.

> [!WARNING]
> Urgent info requiring immediate attention to prevent issues.

> [!CAUTION]
> Alerts about potential risks or negative consequences.

## Codeblocks

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Lorem Ipsum Generator</title>
		<link rel="stylesheet" href="styles.css" />
	</head>
	<body>
		<main class="container">
			<h1>Lorem Ipsum Generator</h1>
			<div class="controls">
				<button id="generate">Generate Text</button>
				<select id="paragraphs">
					<option value="1">1 Paragraph</option>
					<option value="3">3 Paragraphs</option>
					<option value="5">5 Paragraphs</option>
				</select>
			</div>
		</main>
		<script src="script.js"></script>
	</body>
</html>
```

```css
/* Example comment */

:root {
	--accent-color: #e74c3c;
	--text-color: #333;
}

.controls {
	margin: 0 auto;
}

button,
select {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s ease;
}

button {
	background: var(--accent-color);
	color: var(--text-color);

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
}
```

```js
class LoremIpsumGenerator {
	constructor() {
		this.words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor"];
	}

	generateSentence() {
		const length = 8 + Math.floor(Math.random() * 8);
		return (
			Array(length)
				.fill()
				.map(() => this.words[Math.floor(Math.random() * this.words.length)])
				.join(" ")
				.charAt(0)
				.toUpperCase() +
			this.words.slice(1) +
			"."
		);
	}

	generateParagraph() {
		const sentences = 3 + Math.floor(Math.random() * 4);
		return Array(sentences)
			.fill()
			.map(() => this.generateSentence())
			.join(" ");
	}
}

const generator = new LoremIpsumGenerator();
document.getElementById("generate").addEventListener("click", () => {
	const paragraphs = document.getElementById("paragraphs").value;
	const output = Array(parseInt(paragraphs))
		.fill()
		.map(() => generator.generateParagraph())
		.join("\n\n");
	document.getElementById("output").textContent = output;
});
```

```rust
use rand::Rng;
use std::collections::HashMap;

struct LoremIpsum {
    words: Vec<String>,
    cache: HashMap<usize, String>,
}

impl LoremIpsum {
    fn new() -> Self {
        let words = vec![
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit"
        ]
        .iter()
        .map(|&s| s.to_string())
        .collect();

        LoremIpsum {
            words,
            cache: HashMap::new(),
        }
    }

    fn generate_paragraph(&mut self, seed: usize) -> String {
        if let Some(cached) = self.cache.get(&seed) {
            return cached.clone();
        }

        let mut rng = rand::thread_rng();
        let sentence_count = rng.gen_range(3..7);

        let paragraph: String = (0..sentence_count)
            .map(|_| self.generate_sentence(&mut rng))
            .collect::<Vec<_>>()
            .join(" ");

        self.cache.insert(seed, paragraph.clone());
        paragraph
    }

    fn generate_sentence(&self, rng: &mut impl rand::Rng) -> String {
        let word_count = rng.gen_range(6..12);
        let mut sentence: String = (0..word_count)
            .map(|_| {
                let word = &self.words[rng.gen_range(0..self.words.len())];
                word.to_string()
            })
            .collect::<Vec<_>>()
            .join(" ");

        sentence.chars().next().unwrap().to_uppercase().to_string() + &sentence[1..] + "."
    }
}
```

## Inputs

<form>
<label for="text">Text Input:</label>
<input type="text" id="text" name="text">

<label for="password">Password:</label>
<input type="password" id="password" name="password">

<label for="email">Email:</label>
<input type="email" id="email" name="email">

<label for="url">Website:</label>
<input type="url" id="url" name="url">

<label for="number">Number:</label>
<input type="number" id="number" name="number">

<label for="range">Range:</label>
<input type="range" id="range" name="range" min="0" max="100">

<label for="date">Date:</label>
<input type="date" id="date" name="date">

<label for="time">Time:</label>
<input type="time" id="time" name="time">

<label for="month">Month:</label>
<input type="month" id="month" name="month">

<label for="week">Week:</label>
<input type="week" id="week" name="week">

<label for="file">File Upload:</label>
<input type="file" id="file" name="file">

<label for="color">Colour:</label>
<input type="color" id="color" name="color">

<label for="textarea">Textarea:</label><br>
<textarea id="textarea" name="textarea" rows="4" cols="40"></textarea>

<label for="select">Select:</label>
<select id="select" name="select">

<option value="option1">Option 1</option>
<option value="option2">Option 2</option>
<option value="option3">Option 3</option>
</select>

<p>Checkboxes:</p>
<input type="checkbox" id="option1" name="options" value="option1">
<label for="option1">Option 1</label><br>
<input type="checkbox" id="option2" name="options" value="option2">
<label for="option2">Option 2</label><br>
<input type="checkbox" id="option3" name="options" value="option3">
<label for="option3">Option 3</label>

<input type="hidden" name="hiddenField" value="secretValue">

<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="reset" disabled>Disabled</button>
<input type="button" value="Click Me">

</form>

## End/Side Notes

There is a note after this [^1].

There is not a note after this.

This is just some text.

Here are a lot of them, to see if they break... [^2] [^3] [^4] [^5] [^6] [^7] [^8].

## Definitions

<dl>
<dt>Frood</dt>
<dd>Someone who is really amazingly together.</dd>

<dt>Defenestration</dt>
<dd>The act of throwing someone or something out of a window.</dd>

<dt>Schlock</dt>
<dd>Something that is low-quality, junky, or tacky.</dd>

<dt>Flibbertigibbet</dt>
<dd>A scatterbrained, silly person.</dd>

<dt>Doozy</dt>
<dd>Some unusual. Usually troublesome.</dd>
</dl>

## Figures

Standard image not in a figure:
![A picture of a Flipper Zero sitting on a table.](/assets/posts/i-got-a-flipper-zero/flipper-zero-on-table.avif)

<figure class="right">
<img src="/assets/posts/i-got-a-flipper-zero/flipper-zero-on-table.avif" alt="A picture of a Flipper Zero sitting on a table.">
<figcaption>Right floated figure with caption.</figcaption>
</figure>

<figure class="left">
<img src="/assets/posts/i-got-a-flipper-zero/flipper-zero-on-table.avif" alt="A picture of a Flipper Zero sitting on a table.">
<figcaption>Left floated figure with caption.</figcaption>
</figure>

Some placeholder text for presenting figure placements. Hopefully things float where they should. If they don't, that'll be wickedly annoying.

Really annoying. I spend a lot of time trying to get things to look correct on this godforsaken site, and then I go to take a break and check out Hacker News only to find number one on the front page is some rando's default WordPress template.

At least the super-ugly websites made by hackers are stylised, even if ugly. I'd take an ugly design built with intent any day over a template with no care put into it.

'Yo, your site is broken.' 'On what browser?' 'Samsung Internet.' 'Sounds about right.'

Genuine interaction I have fairly frequently. What an awful excuse for a browser. Did they forget how to update Chromium?

Y'know what, maybe I should just give up. Maybe the real lesson we've learnt along the way is that people don't notice good design but hate design that is different. Different and good? Bad. Different and bad? Unique.

If this site were a book, rather than a web page, I'd rip up the pages, type everything out on a typewriter, and run it through a photocopier. Then I'd staple all the pages together haphazardly and just start throwing it at people like a madman.

They'd lock me up, sure, but at least nobody would be confused by small caps. I mean, seriously, guys. Small caps. They aren't difficult to get a grasp on.

## Colour Palette

<style>
.colour-blocks {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    > span {
        display: inline-block;
        width: 5rem;
        height: 5rem;
        border: var(--white) solid 2px;
        padding: 0.25rem;
    }
}
</style>

<div class="colour-blocks">
<span style="background: var(--black);">Black</span>
<span style="background: var(--dark_grey);">Dark Grey</span>
<span style="background: var(--grey);">Grey</span>
<span style="background: var(--bright_grey);">Bright Grey</span>
<span style="background: var(--white);">White</span>
<span style="background: var(--bright_white);">Bright White</span>
<span style="background: var(--red);">Red</span>
<span style="background: var(--bright_red);">Bright Red</span>
<span style="background: var(--orange);">Orange</span>
<span style="background: var(--bright_orange);">Bright Orange</span>
<span style="background: var(--yellow);">Yellow</span>
<span style="background: var(--bright_yellow);">Bright Yellow</span>
<span style="background: var(--green);">Green</span>
<span style="background: var(--bright_green);">Bright Green</span>
<span style="background: var(--blue);">Blue</span>
<span style="background: var(--bright_blue);">Bright Blue</span>
<span style="background: var(--cyan);">Cyan</span>
<span style="background: var(--bright_cyan);">Bright Cyan</span>
<span style="background: var(--magenta);">Magenta</span>
<span style="background: var(--bright_magenta);">Bright Magenta</span>
</div>

<span style="color: var(--black);">Black</span>
<span style="color: var(--dark_grey);">Dark Grey</span>
<span style="color: var(--grey);">Grey</span>
<span style="color: var(--bright_grey);">Bright Grey</span>
<span style="color: var(--white);">White</span>
<span style="color: var(--bright_white);">Bright White</span>
<span style="color: var(--red);">Red</span>
<span style="color: var(--bright_red);">Bright Red</span>
<span style="color: var(--orange);">Orange</span>
<span style="color: var(--bright_orange);">Bright Orange</span>
<span style="color: var(--yellow);">Yellow</span>
<span style="color: var(--bright_yellow);">Bright Yellow</span>
<span style="color: var(--green);">Green</span>
<span style="color: var(--bright_green);">Bright Green</span>
<span style="color: var(--blue);">Blue</span>
<span style="color: var(--bright_blue);">Bright Blue</span>
<span style="color: var(--cyan);">Cyan</span>
<span style="color: var(--bright_cyan);">Bright Cyan</span>
<span style="color: var(--magenta);">Magenta</span>
<span style="color: var(--bright_magenta);">Bright Magenta</span>

## Horizontal Rule

And finally, a nice horizontal rule...

---

<!-- Sneaky little comment that won't be rendered. -->

[^1]: This is a footnote, but more accurately it's an endnote, and it'll appear as a sidenote on larger screens.

[^2]: This is more of the same. The issue with this set of close-together footnote/endnote/sidenote/whatever references is that they're a bit hard to target, especially on a phone. Shouldn't happen often though, so I'll ignore it.

[^3]: Id ex ipsum rerum tempore. Sunt ab deserunt impedit architecto reprehenderit ex. Corporis dolores qui accusamus dolorem. Laudantium optio voluptatem eum id qui. Est ut laborum unde.

[^4]: These should move down the screen, due to their references being so close that they'd otherwise overlap. Of course, if you're on a narrow viewport, then I may as well be speaking to a wall, because it doesn't matter.

[^5]: Now I think about it further, it doesn't really matter if you're lacking JavaScript or if I broke the script that handles sidenotes and popovers. Oh well. I tried.

[^6]: Similique laboriosam quas ipsam molestias quia. Earum maxime quo veniam modi. Exercitationem et odit cum. Aspernatur et ad dolor voluptatem aperiam nihil et ut.

[^7]: This footnote is sandwiched between a few others, but it should still look alright.

[^8]: Eaque perferendis eos illo. Cum quos qui aut commodi. Et cumque quaerat molestiae. Quo laboriosam itaque odit dolorem perferendis eius.
