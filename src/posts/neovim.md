---
title: How I Configure Neovim
description: A full breakdown of my Neovim configuration, including documentation of all my base settings, plugins, and keybinds, as well as why I've configured them as such.
og_description: Symbiosis of man and editor. 
pub_time: 2025-07-12
section: Tutorial
---

I've looked far and wide, at the peaks of the highest mountains and at the bottoms of the deepest trenches, and have found Neovim to be the best text editor for my needs. However, out of the box it is fairly bare-bones and not entirely conducive to my preferences and workflow, so I've got a set of configs to improve the experience. This article extensively documents my Lua-based configuration as a front-end developer.

I've purposefully spent time with a range of editors, including Visual Studio Code, the JetBrains suite, and Neovim 'distros', including [LazyVim](https://www.lazyvim.org) and [NvChad](https://nvchad.com). All my configurations and preferences are a cherry-picking of things I like from these editors and all the others I've tried.

My editor is for editing and is where I edit files. I don't handle source control in my editor, though might pull in some information as is useful. In a similar vein, I don't use AI in my editor. I have spent many hours experimenting with in-editor AI but found it much more got in my way than helped. I use AI models externally, as detailed in my [notes on my AI usage](/posts/ai-usage#coding).

It is worth noting that many of my these choices are influenced by [how I choose to format my code](/posts/my-code-formatting-guidelines) and that you can access my complete configuration, as well as all my other public configs, in my [dotfiles repository on GitHub](https://github.com/DeclanChidlow/dotfiles/tree/main/Baud/.config/nvim).

## Base Settings

In `/main/settings.lua` I define all of my base Neovim preferences.

- **Cursor Visibility:** I like to know exactly where my cursor is at all times, so I enable a low-opacity line on both the row and column of my view.

  ```lua
  o.cursorline = true
  o.cursorlineopt = "screenline"
  o.cursorcolumn = true
  ```

- **Mouse Handling:** Although sacrilege, I occasionally use my mouse with Neovim and therefore disable the annoying popups that tell me how to disable it.

  ```lua
  a.nvim_command('aunmenu PopUp.How-to\\ disable\\ mouse')
  a.nvim_command('aunmenu PopUp.-1-')
  ```

- **Dynamic Line Numbers:** Neovim displays the number of each line of code down the side of the screen. On large files, these numbers can become huge beyond use, while you often only want to jump or delete a few relative to your cursor.

  For that reason, I only display absolute line numbers in insert mode, otherwise opting for relative numbers.

  ```lua
  o.number = true
  a.nvim_create_autocmd(
      { "BufEnter", "FocusGained", "InsertLeave", "WinEnter" },
      { pattern = "*", command = "if &nu && mode() != 'i' | set rnu | endif", }
  )
  a.nvim_create_autocmd(
      { "BufLeave", "FocusLost", "InsertEnter", "WinLeave" },
      { pattern = "*", command = "if &nu | set nornu | endif", }
  )
  ```

- **No Line Wrapping:** I don't want my code to wrap on my screen, so I disable wrapping by default.

  ```lua
  o.wrap = false
  ```

- **Scroll Offsetting:** To make it easier to view context and avoid becoming disoriented while scrolling, I set a scrolloff value so that there are three lines of padding at each end of the terminal window.

  ```lua
  o.scrolloff = 3
  ```

- **Persistent Undo:** I like to be able to close and reopen files without losing the ability to undo/redo changes, so I enable an undo file.

  ```lua
  o.undofile = true
  ```

- **Disable Backups:** I've never found Neovim's backup functionality useful, and it tends to get in my way more often than not, so I disable it.

  ```lua
  o.backup = false
  o.writebackup = false
  ```

- **Improved Search:** When searching, I wish to ignore the case of my characters by default. If I use a capital though, `smartcase` kicks in and the search becomes case sensitive. I also don't like the highlights, as they're somewhat distracting and stay visible even after the search, so I disable them.

  ```lua
  o.ignorecase = true
  o.smartcase = true
  o.hlsearch = false
  ```

- **Substitution Preview:** It can be difficult to see exactly what a substitution effects, so I like to display a split panel that displays all the effects of a substitution.

  ```lua
  o.inccommand = "split"
  ```

- **Code Folding:** Large files with many layers of nesting can be overwhelming, so I like having them folded by default.

  ```lua
  o.foldmethod = "indent"
  o.foldlevel = 4
  ```

- **Better Indentation:** Rather than indenting each line by hand or requiring a format before things look right, I set these options to indent my code as needed when I start a new line and indent wrapped lines whenever I actually have wrapping enabled.

  ```lua
  o.autoindent = true
  o.copyindent = true
  o.breakindent = true
  ```

- **Tab Width:** I like my tabs to have a width of 4 characters.

  ```lua
  o.tabstop = 4
  o.shiftwidth = 4
  ```

- **Spell Checking:** I do a lot of writing and, being Australian, more often than not write Australian English. Enabling this makes Neovim underline my spelling mistakes.

  ```lua
  o.spelllang = "en_au"
  o.spell = true
  ```

- **System Clipboard Integration:** I more often want to copy code to my system clipboard than I want to keep it confined to Neovim, so I tell Neovim to use my system clipboard. I don't worry about this overwriting my clipboard, as I store my clipboard history system-wide and can search through it as needed.

  ```lua
  o.clipboard = "unnamedplus"
  ```

- **Update Time:** The default update time is too long, so I set it to 500, which is a good balance between updates and performance.

  ```lua
  o.updatetime = 500
  ```

- **Timeout Length:** This is the time Neovim waits for the completion of a key sequence. 300 feels about right for me.

  ```lua
  o.timeoutlen = 300
  ```

- **Popup Menu Height:** I don't want my popups -- specifically the one from [blink.cmp](#blinkcmp-completion) -- to cover too much of my terminal, so I set the max-popup height to 5 items.

  ```lua
  o.pumheight = 5
  ```

- **Yank Indication:** When yanking code, it can be easy to miss a few lines, so I like to have my selection briefly highlight while copying.

  ```lua
  local highlight_group = a.nvim_create_augroup("YankHighlight", { clear = true })
  a.nvim_create_autocmd("TextYankPost", {
      callback = function()
          vim.highlight.on_yank()
      end,
      group = highlight_group,
      pattern = "*",
  })
  ```

- **Disabling Unused Plugins:** Neovim has so many features, and there are many that I never use and am better off disabling to improve startup times and overall performance.

  ```lua
  for _, plugin in pairs({
      "netrwFileHandlers",
      "getscript",
      "getscriptPlugin",
      "vimball",
      "vimballPlugin",
      "2html_plugin",
      "logipat",
      "rrhelper",
      "spellfile_plugin",
      "matchit"
  }) do
      vim.g["loaded_" .. plugin] = 1
  end
  ```

## Plugins

I use [lazy.nvim](https://lazy.folke.io) to configure and load my plugins from `/lua/plugins`. To the extent that is possible, I lazy load my plugins for the sake of performance.

I try to keep a lean machine, so plugins tend not to stick around unless they prove their worth. Also, for the sake of performance (specifically startup performance), I disable many plugins.

```lua
performance = {
    rtp = {
        disabled_plugins = {
            "gzip",
            "matchit",
            "matchparen",
            "netrwPlugin",
            "tarPlugin",
            "tohtml",
            "tutor",
        },
    },
},
```

### Treesitter

I have [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) installed. It provides better syntax highlighting, specific indents, and tons of other functionality that is depended on heavily throughout my configuration.

### Treesitter Context

[nvim-treesitter-context](https://github.com/nvim-treesitter/nvim-treesitter-context) is another part of my arsenal and sticks the context for my current visible buffer to the top of my terminal window.

### LSPConfig

All of my language servers are defined and installed on my host system. I have previously used [mason.nvim](https://github.com/mason-org/mason.nvim) but found it constantly clashed with NixOS.

### Blink.cmp (Completion)

[blink.cmp](https://cmp.saghen.dev) offers completions for my current in-progress inputs based on the current LSPs, path, predefined snippets, and the current buffer.

I cycle through possible completions with <kbd>Tab</kbd> and <kbd>Shift</kbd> <kbd>Tab</kbd>, then select them with <kbd>Ctrl</kbd> <kbd>y</kbd>.

### Conform (Code Formatting)

[conform.nvim](https://github.com/stevearc/conform.nvim) formats my code. For most languages, it uses prettier.

I have it configured to format whenever I press <kbd>f</kbd>.

### Dropbar (Navigation Aid)

[dropbar.nvim](https://github.com/Bekaboo/dropbar.nvim) provides a winbar at the top of Neovim, which shows me how my current view is nested.

I have got some keybinds set up, namely <kbd>Leader</kbd> <kbd>;</kbd> to pick symbols in winbar, <kbd>[</kbd> <kbd>;</kbd> to go to start of current context, and <kbd>]</kbd> <kbd>;</kbd> to select the next context. I very rarely use them and use the winbar almost exclusively as a way to orient myself within a file.

### Fzf-Lua

[fzf-lua](https://github.com/ibhagwan/fzf-lua) is one of the most vital parts of my Neovim setup and somewhat ties it all together. It provides the UI layer that I use to view all sorts of content and information regarding my current task.

I have a rather sizable set of keymaps that trigger it in different capacities:

- <kbd>g</kbd><kbd>r</kbd> - Grep
- <kbd>g</kbd><kbd>r</kbd><kbd>c</kbd> - Grep word under cursor (case-insensitive)
- <kbd>g</kbd><kbd>r</kbd><kbd>C</kbd> - Grep word under cursor (case-sensitive)
- <kbd>f</kbd><kbd>f</kbd> - Find files
- <kbd>b</kbd> - Find buffers
- <kbd>s</kbd><kbd>s</kbd> - Spell suggest
- <kbd>f</kbd><kbd>t</kbd> - Change file-types
- <kbd>k</kbd><kbd>m</kbd> - View keymaps
- <kbd>c</kbd><kbd>h</kbd> - Command history
- <kbd>s</kbd><kbd>h</kbd> - Search history
- <kbd>h</kbd><kbd>t</kbd> - Help tags
- <kbd>h</kbd><kbd>g</kbd> - Highlights
- <kbd>s</kbd><kbd>c</kbd> - Source control commits
- <kbd>l</kbd><kbd>d</kbd> - LSP definitions
- <kbd>l</kbd><kbd>r</kbd> - LSP references
- <kbd>l</kbd><kbd>i</kbd> - LSP implementations
- <kbd>l</kbd><kbd>t</kbd><kbd>d</kbd> - LSP type definitions
- <kbd>l</kbd><kbd>d</kbd><kbd>s</kbd> - LSP document symbols
- <kbd>l</kbd><kbd>w</kbd><kbd>s</kbd> - LSP workspace symbols
- <kbd>c</kbd><kbd>a</kbd> - LSP code actions

### Indent Blankline (Visual Indentation)

[indent-blankline.nvim](https://github.com/lukas-reineke/indent-blankline.nvim) displays vertical lines to help with identifying indentation. I have disabled the scope functionality, as I find it annoying and distracting.

### Render Markdown

[render-markdown.nvim](https://github.com/MeanderingProgrammer/render-markdown.nvim) formats markdown nicely so that it is nicer to view and appears a bit more representative of the output. This is really lovely, given that I do most of my writing in Neovim.

### Mini.diff (Git Diff Integration)

[mini.diff](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-diff.md) visually displays the difference of the buffer to the file as it is in version control. I choose the sign display type.

### Mini.hipatterns (Highlighting Notes)

[mini.hipatterns](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-hipatterns.md) highlights text if it matches a pattern. I have this setup to draw attention to notes, usually in comments, with labels such as `TODO`, `WARN`, `HACK`, or `BUG`.

### Mini.icons

[mini.icons](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-icons.md) provides icons that are displayed throughout Neovim's UI. I like these icons in that they make things understandable at a glance and take up minimal space on screen.

### Mini.move (Efficient Code Movement)

I am forever moving code around, so [mini.move](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-move.md) is invaluable.

I have previously written my own rudimentary move functionality, but mini.move is so much more convenient that I opted for the plugin. I can move lines and selections with <kbd>Alt</kbd> and the relevant directional arrow key.

### Mini.notify (Improved Notifications)

[mini.notify](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-notify.md) displays notifications in a much nicer and less intrusive way.

### Mini.statusline

My status line is provided by [mini.statusline](https://github.com/echasnovski/mini.nvim/blob/main/README.md). I don't feel any need to change the defaults, as it feels lovely out-of-the-box. I particularly love how it changes what content it displays based on the width of the terminal window.

## Key Mappings

If I'm opening and closing brackets, there is a reasonable assumption that I wish to enter them, so I have binds that place my cursor within them after creating them. The same applies to quotes and backticks.

```lua
map("i", "<>", "<><left>", { desc = "Enter into angled brackets" })
map("i", "()", "()<left>", { desc = "Enter into round brackets" })
map("i", "{}", "{}<left>", { desc = "Enter into curly brackets" })
map("i", "[]", "[]<left>", { desc = "Enter into square brackets" })
map("i", '""', '""<left>', { desc = "Enter into double quotes" })
map("i", "''", "''<left>", { desc = "Enter into single quotes" })
map("i", "``", "``<left>", { desc = "Enter into backticks" })
```

When I move around the screen, I want to move by the lines on the screen, not arbitrary lines of the document. This isn't generally an issue, but becomes one when I have line wrapping enabled.

```lua
map({ "n", "v" }, "<Up>", "gk", { desc = "Move up a screenline" })
map({ "n", "v" }, "<Down>", "gj", { desc = "Move down a screenline" })
map("i", "<Up>", "<C-o>gk", { desc = "Move up a screenline" })
map("i", "<Down>", "<C-o>gj", { desc = "Move down a screenline" })
```

I dislike how creating a new line above or below the current one changes the mode to insert, so I edit the commands to also perform an escape afterwards.

```lua
map('n', 'O', "O<Esc>", { desc = "Append empty line" })
map('n', 'o', "o<Esc>", { desc = "Prepend empty line" })
```

When I delete something, I don't want it to copy, so I disable that functionality.

```lua
map({"n", "v"}, "x", '"_x')
map({"n", "v"}, "X", '"_X')
```

I don't love all the LSP default binds, so I have some custom values.

```lua
map("n", "rn", vim.lsp.buf.rename, { desc = "Rename" })
map("n", "K", vim.lsp.buf.hover, { desc = "Hover" })
```

I will also note that I have <kbd>Caps Lock</kbd> bound to <kbd>Esc</kbd> system-wide, which comes in very handy.

## File-type Specific

There are a few file-types that I employ specific handling for. To do this, I place a file named for the file-type (eg `html.lua`, `markdown.lua`) in `/ftplugin` containing the specific changes.

As HTML is extremely heavy on nesting and can thus become very wide and illegible with my default tab width of 4 characters, I lower it to 2.

```lua
vim.o.tabstop = 2
vim.o.shiftwidth = 2
```

For both plain text and markdown, I want my text to wrap for the sake of readability.

```lua
vim.o.wrap = true
vim.o.linebreak = true
```
