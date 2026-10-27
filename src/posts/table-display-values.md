---
title: Quirks and Vintage Uses of CSS Table Display
description: An overview of HTML tables and table related values for CSS' display property which were commonly utilised to achieve otherwise difficult to realise layouts in web design and development of the 2000s and 2010s. Touching on methods for equal-height columns, vertical centring, boosting rendering performance, and major accessibility considerations.
og_description: Jokes about aligning divs will not be tolerated.
pub_time: 2026-10-27
section: Essay
standardsite_rkey: 3mytjitglap2s
tags: [HTML, CSS, accessibility]
---

The syntax for table markup is well known. `<table>` wraps the table, `<thead>` contains the table's header row, and is full of `<th>` elements which hold each header cell content, `<tbody>` contains the table's body rows, `<tr>` holds an individual table row, and `<td>` is a cell of table data within a row. Then `<colgroup>` and `<col>` are used together to define a group of columns. `<caption>` can provide an accessible name and description for a table and `<tfoot>` can provide a footer.

They come together into this structure:

```html
<table>
	<caption>
		Example Table.
	</caption>
	<colgroup>
		<col span="1">
		<col span="1">
		<col span="1">
	</colgroup>
	<thead>
		<tr>
			<th>Header 1</th>
			<th>Header 2</th>
			<th>Header 3</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Data 1</td>
			<td>Data 3</td>
			<td>Data 5</td>
		</tr>
		<tr>
			<td>Data 2</td>
			<td>Data 4</td>
			<td>Data 6</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td>Footer 1</td>
			<td>Footer 2</td>
			<td>Footer 3</td>
		</tr>
	</tfoot>
</table>
```

Which results in this output:

<table>
	<caption>
		Example Table.
	</caption>
	<colgroup>
		<col span="1">
		<col span="1">
		<col span="1">
	</colgroup>
	<thead>
		<tr>
			<th>Header 1</th>
			<th>Header 2</th>
			<th>Header 3</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Data 1</td>
			<td>Data 3</td>
			<td>Data 5</td>
		</tr>
		<tr>
			<td>Data 2</td>
			<td>Data 4</td>
			<td>Data 6</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td>Footer 1</td>
			<td>Footer 2</td>
			<td>Footer 3</td>
		</tr>
	</tfoot>
</table>

All these table elements are semantic -- they have meaning. Unlike a `<div>` or `<span>` they all have roles which browsers and other technologies understand. All the table-related elements are specifically designed for tabular data (two-dimensional presentation of rows and columns containing cells). As [the HTML Living Standard](https://html.spec.whatwg.org/dev/tables.html) describes, a `<tr>`, for example, has an [<abbr title="Accessible Rich Internet Applications">ARIA</abbr> role of `row`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/row_role). Other table elements take different roles based on their purpose.

This might not make much difference from a cursory glance, but it has impact on how assistive technologies interpret and parse a table. HTML tables are a fickle thing to meddle with and are nigh-impossible to reimplement with any other elements in an accessible way. However, their layout capabilities have many other uses beyond tabular data. Most of these uses are better achieved with other web platform features, but during the 2000s and early/mid 2010s, they were a go-to way to achieve many layouts.

## Table Display Values

In almost every case, semantic HTML elements should be used to markup a table. They're fit for purpose for tabular data and universally supported. If you're making a table to be used as a table, make it a `<table>`. However, CSS has many table-related values for the `display` property:

- `table` - behaves like `<table>` (with the same block-level box).
- `block table` - equivalent to `table`.
- `inline table` - behaves like `<table>` but with an inline-level box rather than a block-level box like a typical `<table>`.
- `inline-table` - the legacy precomposed syntax for `inline table` from CSS 2.

These values don't actually assign the semantic role of a table -- just the layout. As such, they could be used for the benefits of table layout without the baked-in condition of tabular data.

In the days of responsive design before flexbox and grid, these display values would sometimes be used during the [table layout era](http://grid-layout.com/history.html#table-layout:~:text=Table%20Layout) to facilitate usage of the same HTML markup between desktop and mobile viewports. On desktop a full table layout could be used. On mobile inline layouts could be used without having to change the markup. As the table layout was only defined in CSS, there were no HTML-related semantics clashes involved in trying to void the table element's roles for a non-table application. Generic tags could be used and the layout toggled with CSS.

You could apply a table layout to `<div>` soup using CSS:

```html
<div id="table">
	<div>
		<div>Data 1</div>
		<div>Data 3</div>
	</div>
	<div>
		<div>Data 2</div>
		<div>Data 4</div>
	</div>
</div>
```

```css
#table {
	display: table;

	> div {
		display: table-row;

		> div {
			display: table-cell;
		}
	}
}
```

### Equal-Height Columns

Regular block elements don't share heights, so developers would set `display: table` on a wrapper element, followed by `display: table-cell` on the children to prompt the children to stretch to match the height of the tallest element in the row. This would work because browsers force a strict hierarchy for table layout. A `table-cell` _must_ be within a `table-row`, so if it isn't, the browser generates an anonymous box as a sort of error-correction to make the layout function. Then, the standard styling of tables where all cells in different columns on the same row have the height of the tallest cell would apply.

### Vertical Centring

`vertical-align` doesn't work on typical block-level elements -- only `inline`, `inline-block`, and `table-cell` elements. Thus, `table-cell` can be used with `vertical-align: middle` for a centre aligned element. In a time before `align-items: center`, there was great value in using this for centring icons and text or other needs.

The reason `table-cell` would be used over `inline-block` is that `table-cell` evaluates the argument against the height of the `table-cell` box itself. In contrast, `inline-block` aligns the element according to the line box and font metrics, traditionally requiring messy hacks like transforms or `line-height` manipulation to get the desired result.

### Rendering Performance Gain

`table-layout` as a property defaults to a value of `auto` which tells the browser to go through a [reasonably complex set of steps](https://drafts.csswg.org/css2/#auto-table-layout) to determine column widths. However, we can set the value to `fixed` to use a simpler algorithm that doesn't take into account cell contents and instead only considers the table's width, the width of the columns, and borders and cell spacing.

This algorithm's simplicity makes it rather fast, which is something that can be used to one's advantage. The speed is, of course, generally irrelevant. Browsers are _extremely_ good and capable of layout. There is a reason almost every expert in web performance will advise focusing on any other part of a site or page before even considering analysing CSS performance unless you've managed something impressively egregious.

That said, there are some very niche, specific situations where it can be advantageous to set `table-layout: fixed` to get a small performance gain. A really long list of data, for example, can benefit -- especially if it has complex cell content in later rows due to cells beyond the first row not being used for table layout and instead overflowing.

Some developers thus use `display: table` with `table-layout: fixed` to unlock this quicker layout algorithm on non-table content. Sometimes instead of the performance gain, the overflowing behaviour is what is desired as it prevents width 'blow-outs' later in a column.

---

You _probably_ shouldn't use these table `display` properties today, because if you need them, there is a good chance you're doing something that would be better achieved by grid or flexbox, and which harbours some accessibility shortcomings. Adrian Roselli's [Tables, CSS Display Properties, and ARIA](https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html) rather aptly covers the subject matter in modern application.
