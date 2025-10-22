import { runTests } from './utils.ts';

// Word counts in Chinese are a best-effort computation, so we skip testing them here. Chinese text has no spaces, so “word” boundaries are ambiguous. Word counts depend on segmentation rules and may not have a single correct value.

const locale = 'zh-CN' as const;
const testCases = [
	{
		label: 'empty string',
		input: '',
		expectedGraphemes: {
			total: 0,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 0,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 0,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 0,
				},
				lines: {
					total: 0,
				},
			},
		},
		expectedWords: {
			total: 0,
		},
		expectedSentences: {
			total: 0,
		},
	},
	{
		label: '1 word',
		// https://tatoeba.org/en/sentences/show/1437
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		// Pinyin: Gōngxǐ!
		input: '恭喜！',
		expectedGraphemes: {
			total: 3,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 2,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 1,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		expectedWords: {
			total: 1,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence',
		// https://tatoeba.org/en/sentences/show/1308
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		// Pinyin: Wǒ xiǎng nǐ.
		input: '我想你。',
		expectedGraphemes: {
			total: 4,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 3,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 1,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		// Segmentation suggested by GPT-5:
		// | Segment | Type        | Meaning         |
		// | ------- | ----------- | --------------- |
		// | 我       | pronoun     | I / me          |
		// | 想       | verb        | miss / think of |
		// | 你       | pronoun     | you             |
		// | 。       | punctuation | —               |
		expectedWords: {
			total: 3,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '1 sentence w/ punctuation',
		// https://tatoeba.org/en/sentences/show/1360
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		// Pinyin: Yǐqián dú gāozhōng de shíhòu﹐wǒ měitiān zǎoshang liù diǎn qǐchuáng.
		input: '以前讀高中的時候﹐我每天早上六點起床。',
		expectedGraphemes: {
			total: 19,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 17,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 2,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		// Segmentation suggested by GPT-5:
		// | Segment | Type        | Meaning              |
		// | ------- | ----------- | -------------------- |
		// | 以前      | adverb      | before / in the past |
		// | 讀       | verb        | study / attend       |
		// | 高中      | noun        | high school          |
		// | 的       | particle    | (linking modifier)   |
		// | 時候      | noun        | time / when          |
		// | ，       | punctuation | —                    |
		// | 我       | pronoun     | I / me               |
		// | 每天      | adverb      | every day            |
		// | 早上      | noun        | morning              |
		// | 六點      | noun phrase | six o’clock          |
		// | 起床      | verb        | get up               |
		// | 。       | punctuation | —                    |
		expectedWords: {
			total: 10,
		},
		expectedSentences: {
			total: 1,
		},
	},
	{
		label: '2 sentences',
		// https://tatoeba.org/en/sentences/show/1370
		// CC BY 2.0 FR (https://creativecommons.org/licenses/by/2.0/fr/)
		// Pinyin: Wǒ xiànzài bùnéng gàosù tā. Nà bùshì nàme jiǎndān de shì.
		input: '我現在不能告訴她。那不是那麼簡單的事。',
		expectedGraphemes: {
			total: 19,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					total: 17,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 2,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 1,
				},
				lines: {
					total: 1,
				},
			},
		},
		// Segmentation suggested by GPT-5:
		// | Segment | Type        | Meaning          |
		// | ------- | ----------- | ---------------- |
		// | 我       | pronoun     | I / me           |
		// | 現在      | noun/adverb | now              |
		// | 不能      | verb phrase | cannot           |
		// | 告訴      | verb        | tell             |
		// | 她       | pronoun     | her              |
		// | 。       | punctuation | —                |
		// | 那       | pronoun     | that             |
		// | 不是      | verb phrase | is not           |
		// | 那麼      | adverb      | so / that (much) |
		// | 簡單      | adjective   | simple           |
		// | 的       | particle    | (nominalizer)    |
		// | 事       | noun        | matter / thing   |
		// | 。       | punctuation | —                |
		expectedWords: {
			total: 12,
		},
		// expectedWords: false,
		expectedSentences: {
			total: 2,
		},
	},
	{
		label: '2 paragraphs',
		// https://www.un.org/en/about-us/universal-declaration-of-human-rights: Articles 3 & 4
		input:
			'人人在任何地方有权被承认在法律前的人格。\n\n法律之前人人平等,并有权享受法律的平等保护,不受任何歧视。人人有权享受平等保护,以免受违反本宣言的任何歧视行为以及煽动这种歧视的任何行为之害。',
		expectedGraphemes: {
			total: 93,
			by: {
				spaces: {
					total: 0,
				},
				letters: {
					// 人人在任何地方有权被承认在法律前的人格法律之前人人平等并有权享受法律的平等保护不受任何歧视人人有权享受平等保护以免受违反本宣言的任何歧视行为以及煽动这种歧视的任何行为之害
					total: 85,
				},
				digits: {
					total: 0,
				},
				punctuation: {
					total: 6,
				},
				symbols: {
					total: 0,
				},
			},
			related: {
				paragraphs: {
					total: 2,
				},
				lines: {
					total: 3,
				},
			},
		},
		// Segmentation suggested by GPT-5:
		// 人人 / 在 / 任何 / 地方 / 有权 / 被 / 承认 / 在 / 法律 / 前 / 的 / 人格 / 。
		// 法律 / 之 / 前 / 人人 / 平等 / ， / 并 / 有权 / 享受 / 法律 / 的 / 平等 / 保护 / ，
		// 不受 / 任何 / 歧视 / 。
		// 人人 / 有权 / 享受 / 平等 / 保护 / ，
		// 以免 / 受 / 违反 / 本 / 宣言 / 的 / 任何 / 歧视 / 行为 / 以及 / 煽动 / 这种 / 歧视 / 的 / 任何 / 行为 / 之 / 害 / 。
		expectedWords: {
			total: 49,
		},
		expectedSentences: {
			total: 3,
		},
	},
];

runTests(locale, testCases, true);
