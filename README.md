
<!-- Project Header -->
<div align="center">
	<img class="projectLogo" src="src/assets/images/icon_large.png" alt="Project logo" title="Project logo" width="256">
	<h1 class="projectName">
		<a href="https://tally.johng.io">
			Tally - Word Counter
		</a>
	</h1>
	<p class="projectBadges">
		<img src="https://johng.io/badges/category/App.svg" alt="Project category" title="Project category">
		<img src="https://img.shields.io/github/languages/top/jerboa88/Tally.svg" alt="Language" title="Language">
		<img src="https://img.shields.io/github/repo-size/jerboa88/Tally.svg" alt="Repository size" title="Repository size">
		<a href="LICENSE">
			<img src="https://img.shields.io/github/license/jerboa88/Tally.svg" alt="Project license" title="Project license"/>
		</a>
		<a href="https://tally.johng.io" title="Project URL">
			<img src="https://img.shields.io/website?url=https%3A%2F%2Ftally.johng.io&up_message=tally.johng.io%20%E2%86%97" alt="Project URL" title="Project URL">
		</a>
	</p>
	<p class="projectDesc">
		Your favorite word counter, now with a dark mode! Count the number of characters, words, sentences, paragraphs, and lines in your text instantly.
	</p>
	<br/>
</div>


## About
> [!WARNING]
> This calculator was designed for use with English text. It may work for other languages, but I cannot guarantee that the results will be accurate. See the [specification](#specification) below for more details on how the calculator works.

Tally Word Counter is a free online tool to count the number of characters, words, paragraphs, and lines in your text. Tally can also show counts for different types of characters like letters, digits, spaces, and symbols/special characters. Make sure you have the required number of words for your essay or post by counting them instantly with Tally.

Also check out the Tally Chrome Extension [here](https://github.com/jerboa88/Tally-Extension).

### Features
- **🧮 Counts:** Count the number of characters, words, sentences, paragraphs, and lines in your text.
- **📊 Character stats:** View the number of spaces, digits, letters, and symbols/special characters in the input.
- **🎨 Themes:** Save your eyes with the built-in dark mode, or try one of the other included themes.
- **👨🏻‍💻 Open-source:** Know how to code? Help make Tally better by contributing to the project on GitHub, or copy it and make your own version!

### Screenshots

|                   &#8291;                   |                   &#8291;                   |
| :-----------------------------------------: | :-----------------------------------------: |
| ![Black Theme](screenshots/theme_black.png) | ![White Theme](screenshots/theme_white.png) |
|  ![Dusk Theme](screenshots/theme_dusk.png)  |  ![Teal Theme](screenshots/theme_teal.png)  |


## Specification
> [!NOTE]
> In this specification, we refer to words, characters, spaces, lines, etc. as **_tokens_** for simplicity.

There may be slight differences between the counts generated by Tally and other word counters due to differences in how they are implemented.

The counting function is implemented as a single-pass parser for performance reasons.  State transitions (sentence terminator -> letter, letter -> space, etc.) are used to determine when to increment the counts for each token type.

> [!NOTE]
> The following characters are used to separate tokens:
> - **Space:** `' '`
> - **Newline:** `\n`
> - **End Mark:** `.`, `!`, `?`
>
> **End of Input** can also be considered a separator because words, sentences, paragraphs, and lines at the end of the input are counted even if not specifically terminated. For example, `Something` is counted as a word, sentence, paragraph, and line.

Here is an overview of how we determine the counts for each token type:

| Count Type    | Description                                                                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **character** | A Unicode **grapheme cluster** (user-perceived character), as determined by `Intl.Segmenter`. This is currently hardcoded to use the `en` locale, but other locales may work as well. Using this method, Emojis and other multi-codepoint characters are counted as a single character. **Examples:** `a`, `2`, `!`, `🔥`, `貓` |
| **word**      | A contiguous sequence of one or more **letters or digits** followed by a **space**, **end mark**, or **newline**. Symbols by themselves are not considered words. **Examples:** `space `, `Whoa!`, `newline\n`, `42`.                                                                                                          |
| **sentence**  | A contiguous sequence of one or more **words** followed by an **end mark**. **Example:** `Hello, world!`, `20 93.`.                                                                                                                                                                                                            |
| **paragraph** | A contiguous sequence of one or more **sentences** followed by a **newline**. **Examples:** `The quick brown fox jumps over the lazy dog\n`, `Hello world! Bye world!\n`, `42\n`.                                                                                                                                              |
| **space**     | A literal space character (`' '`). Other whitespace (ex. tabs, newlines) are not included.                                                                                                                                                                                                                                     |
| **letter**    | A character in the ASCII ranges A–Z or a–z. **Examples:** `A`, `j`, `z`.                                                                                                                                                                                                                                                       |
| **digit**     | A character in the ASCII range 0-9. **Examples:** `0`, `5`, `9`.                                                                                                                                                                                                                                                               |
| **symbol**    | A non-letter, non-digit, non-space, non-newline character. This includes emojis, symbols, punctuation, and most whitespace. **Examples:** `,`, `%`, `#`, `😊`, `貓`, `\t`.                                                                                                                                                      |
| **line**      | A literal newline character (`\n`).                                                                                                                                                                                                                                                                                            |


## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
