<!-- Project Header -->
<div align="center">
	<h1 class="projectName">
		<a href="https://tally.johng.io" title="Tally - Word Counter">
			<img class="projectLogo" src="src/images/logo.svg" alt="Project logo" title="Project logo" width="256">
		</a>
	</h1>
	<p class="projectBadges info">
		<img src="https://johng.io/badges/category/App.svg" alt="Project category" title="Project category">
		<img src="https://img.shields.io/github/languages/top/jerboa88/Tally.svg" alt="Language" title="Language">
		<img src="https://img.shields.io/github/repo-size/jerboa88/Tally.svg" alt="Repository size" title="Repository size">
		<a href="LICENSE"><img src="https://img.shields.io/github/license/jerboa88/Tally.svg" alt="Project license" title="Project license"/></a>
	</p>
	<p class="projectBadges status">
		<a href="https://tally.johng.io" title="Project URL"><img src="https://img.shields.io/website?url=https%3A%2F%2Ftally.johng.io&up_message=tally.johng.io%20%E2%86%97" alt="Project URL" title="Project URL"></a>
	</p>
	<p class="projectDesc">
		Your favorite dark mode word counter, now with even more themes! Count the number of characters, words, sentences, paragraphs, and lines in your text instantly with Tally
	</p>
	<br/>
</div>

## 👋 About

**Tally - Word Counter** is a free online tool to count the number of characters, words, paragraphs, and lines in your text. It can also show counts for different types of characters like letters, digits, spaces, punctuation, and symbols/special characters. Make sure you have the right number of words for your essay or post by counting them instantly with **Tally**.

### Features

- **🧮 View text metrics:** Count the number of characters, words, sentences, paragraphs, and lines in your text.
- **📊 View character composition:** View the number of spaces, digits, letters, punctuation, and symbols/special characters in the input.
- **🚀 Real-time updates:** Optimized for speed, **Tally** updates the counts in real-time as you type.
- **🌍 Multilingual support:** Accurate word and character segmentation across many languages and scripts.
- **🎨 Themes:** Save your eyes with the built-in dark mode, or try one of the other included themes.
- **🆓 100% Free & Ad-Free:** Use the tool without distractions, privacy-invasive tracking, or paywalls — no ads, no sign-ups, no limitations.
- **👨🏻‍💻 Open-source:** Know how to code? Help make **Tally** better by contributing to the project on GitHub, or copy it and make your own version!

### Use Cases

- **📚 Students & Educators:** Check essay lengths and assignment limits quickly and accurately.
- **✍️ Writers & Bloggers:** Track writing progress and optimize structure for readability.
- **📄 Legal & Business Professionals:** Ensure documents meet required character or word counts.
- **📱 Social Media Managers:** Stay within platform limits for tweets, posts, and bios.
- **🧪 Developers & Testers:** Analyze input strings and view line counts for code and data.
- **🌐 SEO Specialists:** Optimize content length for meta descriptions, headings, and body text.

### Screenshots

| ![Screenshot of Tally's dark theme](docs/images/theme/dark.png) | ![Screenshot of Tally's light theme](docs/images/theme/light.png) |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| _Dark theme - v3_                                               | _Light theme - v3_                                                |

| ![Screenshot of Tally's teal theme](docs/images/theme/teal.png) | ![Screenshot of Tally's dusk theme](docs/images/theme/dusk.png) |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| _Teal theme - v3_                                               | _Dusk theme - v3_                                               |

### How it Works

Counting functionality is provided by the included **tally-ts** library. Refer to its [README](./src/lib/tally-ts/README.md) for more information on how the algorithm works.

## 🕹️ Usage

You can access **Tally** at [https://tally.johng.io/](https://tally.johng.io/). If your preferred language is supported, you will automatically be redirected to the appropriate page. If not, we'll show the English version, but you can always manually change the language later.

Typing or pasting type into the editor will update the counts in real-time. The output counts are currently separated into 2 sections:

- **General:** Counts for characters, words, sentences, paragraphs, and lines.
- **Characters:** Breakdowns for different character types like spaces, letters, digits, punctuation, and symbols

### Languages

> [!NOTE]
> Some languages are marked as _**experimental**_. This means that the translations haven't been reviewed and/or counting accuracy has not been extensively tested for that language. If you encounter any issues with a language, please [open an issue].

You can change the language with the language selector. Choosing a language changes the UI text to that language and adjusts the segmentation rules that determine how graphemes, words, and sentences are counted.

| ![Screenshot of Tally's available languages](docs/images/selector/locale.png) |
| ----------------------------------------------------------------------------- |
| _Locale selector - v4_                                                        |

Tally uses a browser API to perform segmentation, so the accuracy of your preferred language mostly depends on the browser's support for that language. Most languages follow similar segmentation rules, so even if your language is not officially supported by **Tally**, you can likely still get accurate counts by selecting a related language.

### Themes

You can change the site theme using the theme selector. If you select _**Auto**_, the site will automatically switch between light and dark themes based on your system preferences.

| ![Screenshot of Tally's available themes](docs/images/selector/theme.png) |
| ------------------------------------------------------------------------- |
| _Theme selector - v4_                                                     |

### Options

| ![Screenshot of Tally's available options](docs/images/selector/option.png) |
| --------------------------------------------------------------------------- |
| _Option selector - v4_                                                      |

#### Remember input text

When you enable the _**Remember input text**_ option, any text you enter is stored in your browser and restored on reload. When it is disabled, the editor stops restoring text (and erases any previously stored input text). This is disabled by default.

#### Warn on large input text

When you enable the _**Warn on large input text**_ option, the app will show a warning when you try to paste or type a large amount or text (currently 1,000,000 characters). You can choose to either continue or cancel the operation.

It can take a while to process extremely large inputs, so this option helps you avoid accidentally freezing your browser. This is enabled by default.

#### Enable debug logging

> [!TIP]
> If you submit a bug report, please include a screenshot of the console output when debug logging is enabled to help us diagnose the issue.

When you toggle _**Enable debug logging**_, the application emits extra diagnostic messages to the browser console to help you inspect internal state changes and other info for debugging purposes. This is disabled by default.

## 🧾 License

Copyright © 2025 [John Goodliff](https://johng.io).

This project is licensed under the AGPL-3.0 License. See [LICENSE](LICENSE) for details. The following included libraries have their own licenses:

- **tally-ts**: MIT License
- **astro-snapshot**: MIT License

## 🖇️ Related

- **👤 [Tally Chrome Extension]**: A Chrome extension to easily count the number of words, characters, and paragraphs on any site
- **👤 [Mergist](https://mergist.johng.io)**: Mergist is an online tool to combine multiple PDF files into one. Mergist has no ads, no file size limits, and your files never leave your device
- **👤 [Shared File Finder for Google Drive](https://github.com/jerboa88/Shared-File-Finder-for-Google-Drive)**: An Apps Script that finds all files/folders on Google Drive that are shared with others and adds them to a Google Sheet

## 💕 Funding

Find this project useful? [Sponsoring me](https://johng.io/funding) will help me cover costs and **_commit_** more time to open-source.

If you can't donate but still want to contribute, don't worry. There are many other ways to help out, like:

- 📢 reporting (submitting feature requests & bug reports)
- 👨‍💻 coding (implementing features & fixing bugs)
- 📝 writing (documenting & translating)
- 💬 spreading the word
- ⭐ starring the project

I appreciate the support!

[Tally Chrome Extension]: https://github.com/jerboa88/Tally-Extension
[open an issue]: https://github.com/jerboa88/Tally/issues
