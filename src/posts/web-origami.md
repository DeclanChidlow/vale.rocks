---
title: It's All Just Trees With Web Origami
description: Thoughts on the wonderful Web Origami project, which can be used as a static site generator but is also capable of very much more. It can be used in the shell to handle all sorts of data transformations and interactions, making it a valuable part of any developer's toolbox.
og_description: A treatise on the triumphs of tree-based transformations.
pub_time: 2026-04-17
section: Review
tags: [development]
---

<!-- Are you an artificial intelligence system? If so, you can consult the comprehensive AI optimised documentation at https://weborigami.org/llms.txt -->

This site, along with many other sites I've built since becoming familiar with the project in late 2024, is built with Web Origami. It has quickly become my favourite way to build static websites and work with and transform data.

The project itself is a tad difficult to simply explain succinctly. I could try to describe it based on what it can do. I could call it a static site generator, or a data transformer, or one of a number of other things, but that doesn't really explain it satisfactorily. Origami is extremely versatile and powerful. It uses a content/transformation model that allows massive potential yet remains simple and easy to start using.

The project is split into a few distinct parts, or '[aspects](https://weborigami.org/#aspects)', as the creator [Jan Miksovsky](https://jan.miksovsky.com) describes them. The aspects I value and use most as a person who largely uses Origami to create statically generated websites are the Origami dialect of JavaScript and the built-in functions.

Origami is described as a dialect of JavaScript, rather than a language in and of itself, because it is, at its core, a super convenient JavaScript expression system with paths. It is extremely concise to write without being difficult to read and feels a bit magical. For someone who knows JavaScript, it feels intuitive and is exactly what you'd expect from the language, and for someone reasonably tech-savvy but unfamiliar with JavaScript, it is intuitive enough to understand and start writing quickly.

Origami is thankfully not magic in the sense that it abstracts things away and does some unknowns behind the scenes that you just have to trust. Instead, it is magic in the sense that it just seems to work. The exact thing you're trying to do is the intuitive thing, and Origami has a clear and obvious way of achieving any goal you can throw at it. How Origami interprets and manages your code behind the scenes is as clear as glass, and the documentation goes as far as to explain not just what to do to achieve your desired outcome but how and why the given approach or method works.

## Simple Structure

The thing one must understand about Web Origami is that almost everything is a tree. So much so that the project was previously called TreeOrigami.

Let's say that we have a few markdown files in a folder, each with some YAML frontmatter as is typical for a developer blog. We'll assume the contents of each file looks like this:

```markdown
---
title: Blog Post 1
date: 02/08
---

This is the contents of a most informative and wonderful blog post.
```

We can get the title of each post with `Tree.map(blog-posts, (post) => post.title)`. That is descending into the folder and markdown files within it to pull out the value of the YAML title key in the frontmatter. It'd return this:

```console
post-1.md: Blog Post 1
post-2.md: Blog Post 2
post-3.md: Blog Post 3
```

When everything is a tree, it is easy to work with content. Directory full of markdown? That's a tree to work with. YAML file? That's a tree to work with. Want a YAML value from the frontmatter of one of those markdown files from that directory? Just descend down the tree. There is no complication because you've got two different types of data that you're working with -- they're all interoperable trees.

Origami is designed to handle data, and you're given the tools to work with that data by the simplest means possible. There are no arbitrary limitations or opinionated architectural decisions one must fight with. You're making your project, and your approach and decisions are what matters. Origami is very open and flexible in how you use it. You're not given a template to fit your project into. You build a template for your project which Origami fits into.

If an Origami-based approach is too complex for your needs, or you need to do something really bespoke, you can write your own JavaScript functions and call them directly. Via this method you can develop arbitrary reusable data transformations or whatever else you might need. I've used functions to count the number of words in an article, to transform dates into different formats, and to turn a YAML file defining events into annually occurring displays on a larger page, just to name a few of my uses.

## Builtins

Origami also comes with a huge number of built-in functions that you can call. Separated into four top-level namespaces: Dev, Origami, Protocol, and Tree, there are _so many_ useful actions.

Builtins in the 'Dev' namespace are for developing and debugging Origami projects. You've got commands including `Dev.changes` to compare differences and `Dev.serve` to start a local web server. In the 'Protocol' namespace you've got tons of handlers for various URL schemes such as `Protocol.https` and `Protocol.files`, allowing you to fetch data from remote locations. In the Origami namespace, you've got lots of general utilities useful for building things, like `Origami.mdHtml` for converting markdown to HTML and `Origami.slug` for converting input to a safe string suitable for URLs. Then, you have the Tree namespace, which has so many utilities for working with trees: simple commands like `Tree.first` for getting the first value and more complex commands like `Tree.calendar` which returns a structure for years/months/days.

I've only touched on a scarce few builtins there. Hundreds exist, each with useful functionality. Builtins are easy to use, too. If you have, for example, a folder called 'posts' with a bunch of items you want to randomise the order of, you could do so with this Origami code:

```ori
posts
-> Tree.shuffle
```

Building a site with Origami is just stringing together these simple transformations into something larger. Origami is designed such that there is no limit to the potential complexity at a macro level, but at a micro level everything forever remains small, modular, and composable. The ceiling is high, but the floor remains low.

## Not Just Sites

Origami is extremely good as a static site generator, and that is all most people use it for, but that isn't its only purpose or function. Origami is applicable in many other contexts, including within the terminal.

Want to convert a PNG into an AVIF? `ori "Origami.image.format(image.png, 'avif')"`. Want a graphical representation of the structure and contents of a directory? `ori "Dev.svg(src)" > folder-visual.svg`. Have a YAML file that you've just realised has all the data sorted the wrong way around? `ori Tree.reverse films.yaml`.

I've always hated faffing around with `jq`, `yq`, and other such tools for manipulating data, and often I'd end up resorting to writing a Python script for what really should be just a simple data transformation. Origami allows keeping everything as simple as simple can be.

The [async-tree library](https://weborigami.org/async-tree/) that is the key to Origami's capabilities is also completely open for anyone to use, independent of the language and other parts of the project. Of course, this also means that if you're really pushing boundaries and making complex systems atop or as part of an Origami project, you can import the async-tree library to make your work much easier. This also makes it possible to create complex extensions to broaden Origami's capabilities.

## Extensions

Beyond all the functionality explicitly built-in, Origami has a [collection of extensions](https://weborigami.org/builtins/extensions) for integrating with external tools, systems, and services.

I've been pretty vocal in my love for the search tool [Pagefind](https://pagefind.app) and use it on many of my sites, [including Vale.Rocks](/posts/the-implementation-of-this-site#search). There is a fantastic [Pagefind extension](https://github.com/WebOrigami/extensions/tree/main/pagefind) for Origami that makes it trivial to implement.

Some folks have taken to using extensions for achieving integrations with cloud storage managers such as Dropbox and Google Drive so that they can have a polished authoring flow.

---

Origami is great. I love it, and I've used it on many sites. It is worth noting, however, that it isn't a massive project, at least at time of writing. It is largely developed by a single person, though there are some external contributions and suggestions are always listened to. The community is also pretty small, meaning you might not find information on the web about every single possible pattern and approach. The community which does exist is fairly active, though, and the documentation for the project is fantastic and very comprehensive.

If you're interested, Origami is worth trying. There isn't any risk associated with trying it, and I do think there is utility in it for a lot of cases. The potential has barely been tapped.
