type CharacterType = string | string[] | null;

type HtmlStringType = HTMLElement | Node | string;

class Str {
	/**
	 * Get a new Stringable object from the given string.
	 *
	 * @param { string } string
	 */
	static of(string: string) {
		return new Stringable(string);
	}

	/**
	 * Return the remainder of a string after the first occurrence of a given value.
	 *
	 * @param { string } subject
	 * @param { string } search
	 *
	 * @return { string }
	 */
	static after(subject: string, search: string): string {
		if (search === '') {
			return subject;
		}

		return subject.slice(subject.indexOf(search) + search.length);
	}

	/**
	 * Return the remainder of a string after the last occurrence of a given value.
	 *
	 * @param { string } subject
	 * @param { string } search
	 *
	 * @return { string }
	 */
	static afterLast(subject: string, search: string): string {
		if (search === '') {
			return subject;
		}

		const position: number = subject.lastIndexOf(search);

		if (position === -1) {
			return subject;
		}

		return subject.substring(position + search.length);
	}

	/**
	 * Transliterate a UTF-8 value to ASCII.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static ascii(value: string): string {
		return value.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-zA-Z0-9]/g, '');
	}

	/**
	 * Get the portion of a string before the first occurrence of a given value.
	 *
	 * @param { string } subject
	 * @param { string } search
	 *
	 * @return { string }
	 */
	static before(subject: string, search: string): string {
		if (search === '') {
			return subject;
		}

		const result: string = subject.substring(0, subject.indexOf(search));

		if (result === '') {
			return subject;
		}

		return result;
	}

	/**
	 * Get the portion of a string before the last occurrence of a given value.
	 *
	 * @param { string } subject
	 * @param { string } search
	 *
	 * @return { string }
	 */
	static beforeLast(subject: string, search: string): string {
		if (search === '') {
			return subject;
		}

		const position: number | null = subject.lastIndexOf(search) ?? null;

		if (position === -1) {
			return subject;
		}

		return this.substr(subject, 0, position);
	}

	/**
	 * Get the portion of a string between two given values.
	 *
	 * @param { string } subject
	 * @param { string } from
	 * @param { string } to
	 *
	 * @return { string }
	 */
	static between(subject: string, from: string, to: string): string {
		if (from === '' || to === '') {
			return subject;
		}

		return this.beforeLast(this.after(subject, from), to);
	}

	/**
	 * Get the smallest possible portion of a string between two given values.
	 *
	 * @param { string } subject
	 * @param { string } from
	 * @param { string } to
	 *
	 * @return { string }
	 */
	static betweenFirst(subject: string, from: string, to: string): string {
		if (from === '' || to === '') {
			return subject;
		}

		return this.before(this.after(subject, from), to);
	}

	/**
	 * Convert a value to camel case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static camel(value: string): string {
		return this.lcfirst(this.studly(value));
	}

	/**
	 * Get the character at the specified index.
	 *
	 * @param { string } subject
	 * @param { number } index
	 *
	 * @return { string | false }
	 */
	static charAt(subject: string, index: number): string | false {
		return subject.charAt(index);
	}

	/**
	 * Determine if a given string contains a given substring.
	 *
	 * @param { string } haystack
	 * @param { string | array } needles
	 * @param { boolean } ignoreCase
	 *
	 * @return { boolean }
	 */
	static contains(haystack: string, needles: string | string[], ignoreCase: boolean = false): boolean {
		let result: boolean = false;

		if (ignoreCase) {
			haystack = haystack.toLowerCase();
		}

		if (!(needles instanceof Array)) {
			needles = [needles];
		}

		needles.forEach((needle: string) => {
			if (ignoreCase) {
				needle = needle.toLowerCase();
			}

			if (needle !== '' && haystack.includes(needle)) {
				result = true;
			}
		});

		return result;
	}

	/**
	 * Determine if a given string contains all array values.
	 *
	 * @param { string } haystack
	 * @param { array } needles
	 * @param { boolean } ignoreCase
	 *
	 * @return { boolean }
	 */
	static containsAll(haystack: string, needles: string[], ignoreCase: boolean = false): boolean {
		let result: boolean = true;

		needles.forEach((needle: string) => {
			if (!this.contains(haystack, needle, ignoreCase)) {
				result = false;
			}
		});

		return result;
	}

	/**
	 * Determine if a given string ends with a given substring.
	 *
	 * @param { string } haystack
	 * @param { string | array } needles
	 *
	 * @return { boolean }
	 */
	static endsWith(haystack: string, needles: string | string[]): boolean {
		let result: boolean = false;

		if (!(needles instanceof Array)) {
			needles = [needles];
		}

		needles.forEach((needle: string) => {
			if (needle !== '' && haystack.endsWith(needle)) {
				result = true;
			}
		});

		return result;
	}

	/**
	 * Extracts an excerpt from text that matches the first instance of a phrase.
	 *
	 * @param { string } text
	 * @param { string } phrase
	 * @param { object } options
	 *
	 * @return { string | null }
	 */
	static excerpt(text: string, phrase: string = '', options: { radius?: number, omission?: string } = {}): string | null {
		const radius: number    = options.radius ?? 100;
		const omission: string  = options.omission ?? '...';
		const results: string[] = text.split(phrase);

		if (results.length === 1) {
			return null;
		}

		const matches: string[] = [text, (results[0] as string), phrase, results.splice(1).join(phrase)];

		let start = (matches[1] as string).trimStart();
		let end   = (matches[3] as string).trimEnd();

		start = this.of(this.substr(start, Math.max((start.length - radius), 0), radius))
			.ltrim()
			// @ts-ignore
			.unless(
				(startWithRadius: Stringable) => startWithRadius.exactly(start),
				(startWithRadius: Stringable) => startWithRadius.prepend(omission))
			.toString();

		end = this.of(this.substr(end, 0, radius))
			.rtrim()
			// @ts-ignore
			.unless(
				(endWithRadius: Stringable) => endWithRadius.exactly(end),
				(endWithRadius: Stringable) => endWithRadius.append(omission))
			.toString();

		return (start + ' ' + matches[2] + end).replace(/\s+/g, ' ').trim();
	}

	/**
	 * Cap a string with a single instance of a given value.
	 *
	 * @param { string } value
	 * @param { string } cap
	 *
	 * @return { string }
	 */
	static finish(value: string, cap: string): string {
		return value.endsWith(cap) ? value : value + cap;
	}

	/**
	 * Wrap the string with the given strings.
	 *
	 * @param { string } value
	 * @param { string } before
	 * @param { string | null } after
	 *
	 * @return string
	 */
	static wrap(value: string, before: string, after: string | null = null): string {
		return before + value + (after ?? before);
	}

	/**
	 * Unwrap the string with the given strings.
	 *
	 * @param { string } value
	 * @param { string } before
	 * @param { string | null } after
	 *
	 * @return { string }
	 */
	static unwrap(value: string, before: string, after: string | null = null): string {
		if (this.startsWith(value, before)) {
			value = this.replaceFirst(before, '', value);
		}

		if (this.endsWith(value, after ?? before)) {
			value = this.replaceLast(after ?? before, '', value);
		}

		return value;
	}

	/**
	 * Determine if a given string matches a given pattern.
	 *
	 * @param { string | array } pattern
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static is(pattern: string | string[], value: string): boolean {
		let patterns: string[] = Array.isArray(pattern) ? pattern : [pattern];

		for (let pattern of patterns) {
			if (pattern === value) {
				return true;
			}

			pattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\\\*/g, '.*');

			const regex: RegExp = new RegExp('^' + pattern + '$', 'u');

			if (regex.test(value)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Determine if a given string is 7-bit ASCII.
	 *
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static isAscii(value: string): boolean {
		return !/[^ -~\t\r\n]/.test(value);
	}

	/**
	 * Determine if a given string is valid JSON.
	 *
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static isJson(value: string): boolean {
		try {
			JSON.parse(value);
		} catch (JsonException) {
			return false;
		}

		return true;
	}

	/**
	 * Determine if a given value is a valid URL.
	 *
	 * @param { string } value
	 * @param { string[] } protocols
	 *
	 * @return { boolean }
	 */
	static isUrl(value: string, protocols: string[] = []): boolean {
		const protocolPattern = protocols.length === 0 ? 'https?|ftp|file|mailto|tel|data|irc|magnet' : protocols.join('|');

		const pattern: RegExp = new RegExp(`^(?:${protocolPattern}):\\/\\/(?:[\\w-]+(?:\\.[\\w-]+)+|localhost|\\d{1,3}(?:\\.\\d{1,3}){3})(?::\\d+)?(?:\\S*)?$`, 'i');

		return pattern.test(value);
	}

	/**
	 * Determine if a given string is a valid UUID.
	 *
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static isUuid(value: string): boolean {
		return new RegExp(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/).test(value);
	}

	/**
	 * Determine if a given string is a valid ULID.
	 *
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static isUlid(value: string): boolean {
		if (value.length !== 26) {
			return false;
		}

		if (value.length !== value.match(/[0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz]/g)?.length) {
			return false;
		}

		return Number(value.charAt(0)) <= 7;
	}

	/**
	 * Convert a string to kebab case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static kebab(value: string): string {
		return this.snake(value, '-');
	}

	/**
	 * Return the length of the given string.
	 *
	 * @param { string } value
	 *
	 * @return { number }
	 */
	static length(value: string): number {
		return value.length;
	}

	/**
	 * Limit the number of characters in a string.
	 *
	 * @param { string } value
	 * @param { number } limit
	 * @param { string } end
	 *
	 * @return { string }
	 */
	static limit(value: string, limit: number = 100, end: string = '...'): string {
		if (value.length <= limit) {
			return value;
		}

		return this.substr(value, 0, limit).trim() + end;
	}

	/**
	 * Convert the given string to lower-case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static lower(value: string): string {
		return value.toLowerCase();
	}

	/**
	 * Limit the number of words in a string.
	 *
	 * @param { string } value
	 * @param { number } words
	 * @param { string } end
	 *
	 * @return { string }
	 */
	static words(value: string, words: number = 100, end: string = '...'): string {
		const wordsArray: string[] = value.match(/\S+\s*/g)?.splice(0, words) ?? [];

		const result: string = wordsArray.join('');

		if (wordsArray.length === 1 || this.length(value) === this.length(result)) {
			return value;
		}

		return result.trim() + end;
	}

	/**
	 * Masks a portion of a string with a repeated character.
	 *
	 * @param { string } string
	 * @param { string } character
	 * @param { number } index
	 * @param { number | null } length
	 *
	 * @return { string }
	 */
	static mask(string: string, character: string, index: number, length: number | null = null): string {
		if (character === '') {
			return string;
		}

		let start: number | string = index;
		let endIndex: number       = length ?? string.length;

		if (start < 0) {
			start    = string.length + start;
			endIndex = start + (length ?? 0);
		}

		if (endIndex === 0) {
			endIndex = start;
		}

		let segment: string = string.substring(start, endIndex);

		if (segment === '') {
			return string;
		}

		let strLen: number     = string.length;
		let startIndex: number = index;

		if (index < 0) {
			startIndex = index < -strLen ? 0 : strLen + index;
		}

		start = string.substring(0, startIndex);

		let segmentLen: number = segment.length;
		let end: string        = string.substring(startIndex + segmentLen);

		return start + character.substring(0, 1).repeat(segmentLen) + end;
	}

	/**
	 * Get the string matching the given pattern.
	 *
	 * @param { string } pattern
	 * @param { string } subject
	 *
	 * @return { string }
	 */
	static match(pattern: string, subject: string): string {
		// @ts-ignore
		const regExpBody: string  = /^\/(.*)\/\w*$/.exec(pattern)[1];
		// @ts-ignore
		const regExpFlags: string = /^\/.*\/(\w*)$/.exec(pattern)[1];
		const regExp: RegExp      = new RegExp(regExpBody, regExpFlags);

		const matches: RegExpMatchArray | null = RegExp(regExp).exec(subject);

		if (!matches) {
			return '';
		}

		return matches[1] ?? matches[0];
	}

	/**
	 * Determine if a given string matches a given pattern.
	 *
	 * @param { string | array } pattern
	 * @param { string } value
	 *
	 * @return { boolean }
	 */
	static isMatch(pattern: string | string[], value: string): boolean {
		let result: boolean = false;

		if (!(pattern instanceof Array)) {
			pattern = [pattern];
		}

		pattern.forEach(item => {
			if (item === value) {
				result = true;
			}

			// @ts-ignore
			let regExpBody: string  = /^\/(.*)\/\w*$/.exec(item)[1];
			// @ts-ignore
			let regExpFlags: string = /^\/.*\/(\w*)$/.exec(item)[1];
			let regExp: RegExp      = new RegExp(regExpBody, regExpFlags);

			if (RegExp(regExp).exec(value)) {
				result = true;
			}
		});

		return result;
	}

	/**
	 * Get the string matching the given pattern.
	 *
	 * @param { string } pattern
	 * @param { string } subject
	 *
	 * @return { array }
	 */
	static matchAll(pattern: string, subject: string): string[] {
		// @ts-ignore
		const regExpBody: string  = /^\/(.*)\/\w*$/.exec(pattern)[1];
		// @ts-ignore
		const regExpFlags: string = /^\/.*\/(\w*)$/.exec(pattern)[1];

		const regExp: RegExp = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

		const matches: RegExpMatchArray[] = [...subject.matchAll(new RegExp(regExp, 'g'))];

		if (matches.length === 0) {
			return [];
		}

		return matches.map((match: RegExpMatchArray) => String(match.length === 1 ? match[0] : match[1]));
	}

	/**
	 * Pad both sides of a string with another.
	 *
	 * @param { string } value
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { string }
	 */
	static padBoth(value: string, length: number, pad: string = ' '): string {
		const short: number      = Math.max(0, length - value.length);
		const shortLeft: number  = Math.floor(short / 2);
		const shortRight: number = Math.ceil(short / 2);

		return pad.repeat(shortLeft).substring(0, shortLeft) + value + pad.repeat(shortRight).substring(0, shortRight);
	}

	/**
	 * Pad the left side of a string with another.
	 *
	 * @param { string } value
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { string }
	 */
	static padLeft(value: string, length: number, pad: string = ' '): string {
		const short: number = Math.max(0, length - (value.length ?? 0));

		return pad.repeat(short).substring(0, short) + value;
	}

	/**
	 * Pad the right side of a string with another.
	 *
	 * @param { string } value
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { string }
	 */
	static padRight(value: string, length: number, pad: string = ' '): string {
		const short: number = Math.max(0, length - value.length);

		return value + pad.repeat(short).substring(0, short);
	}

	/**
	 * Get the plural form of an English word.
	 *
	 * @param { string } value
	 * @param { number | array } count
	 *
	 * @return { string }
	 */
	static plural(value: string, count: number | number[] = 2): string {
		const isCapital: boolean = /[A-Z]/.test(value.charAt(0));

		if (count !== undefined && count === 1) {
			return value;
		}

		/**
		 * List of rules for plural words.
		 *
		 * @type { object }
		 */
		const plural: { [key: string]: string } = {
			'(quiz)$'                    : '$1zes',
			'^(ox)$'                     : '$1en',
			'([m|l])ouse$'               : '$1ice',
			'(matr|vert|ind)ix|ex$'      : '$1ices',
			'(x|ch|ss|sh)$'              : '$1es',
			'([^aeiouy]|qu)y$'           : '$1ies',
			'(hive)$'                    : '$1s',
			'(?:([^f])fe|([lr])f)$'      : '$1$2ves',
			'(shea|lea|loa|thie)f$'      : '$1ves',
			'sis$'                       : 'ses',
			'([ti])um$'                  : '$1a',
			'(tomat|potat|ech|her|vet)o$': '$1oes',
			'(bu)s$'                     : '$1ses',
			'(alias)$'                   : '$1es',
			'(octop)us$'                 : '$1i',
			'(ax|test)is$'               : '$1es',
			'(us)$'                      : '$1es',
			'([^s]+)$'                   : '$1s',
		};

		/**
		 * List of words that change irregularly.
		 *
		 * @type { object }
		 */
		const irregular: { [key: string]: string } = {
			'move'  : 'moves',
			'foot'  : 'feet',
			'goose' : 'geese',
			'sex'   : 'sexes',
			'child' : 'children',
			'human' : 'humans',
			'man'   : 'men',
			'tooth' : 'teeth',
			'person': 'people',
		};

		/**
		 * List of words that do not change.
		 *
		 * @type { string[] }
		 */
		const uncountable: string[] = [
			'sheep',
			'fish',
			'feedback',
			'deer',
			'moose',
			'series',
			'species',
			'money',
			'rice',
			'information',
			'equipment',
			'bison',
			'cod',
			'offspring',
			'pike',
			'salmon',
			'shrimp',
			'swine',
			'trout',
			'aircraft',
			'hovercraft',
			'spacecraft',
			'sugar',
			'tuna',
			'you',
			'wood',
		];

		if (uncountable.indexOf(value.toLowerCase()) >= 0) {
			return value;
		}

		for (const word in irregular) {
			const pattern: RegExp = new RegExp(`${word}$`, 'i');

			if (pattern.test(value)) {
				value = value.replace(pattern, (irregular[word] as string));

				return isCapital ? this.ucfirst(value) : value;
			}
		}

		for (const word in plural) {
			const pattern: RegExp = new RegExp(word, 'i');

			if (pattern.test(value)) {
				value = value.replace(pattern, (plural[word] as string));

				return isCapital ? this.ucfirst(value) : value;
			}
		}

		return isCapital ? this.ucfirst(value) : value;
	}

	/**
	 * Pluralize the last word of an English, studly caps case string.
	 *
	 * @param { string } value
	 * @param { number | array } count
	 *
	 * @return { string }
	 */
	static pluralStudly(value: string, count: number | number[] = 2): string {
		const parts: string[] = value.split(/(.)(?=[A-Z])/);

		const lastWord: string = (parts.pop() as string);

		return parts.join('') + this.ucfirst(this.plural(lastWord, count));
	}

	/**
	 * Generate a random, secure password.
	 *
	 * @param { number } length
	 * @param { boolean } letters
	 * @param { boolean } numbers
	 * @param { boolean } symbols
	 * @param { boolean } spaces
	 *
	 * @return { string }
	 */
	static password(length: number = 32, letters: boolean = true, numbers: boolean = true, symbols: boolean = true, spaces: boolean = false): string {
		let password: string[]   = [];
		let collection: string[] = [];

		while (password.length < length) {
			if (letters) {
				collection = collection.concat([
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
					'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
					'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
					'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
				]);
			}

			if (numbers) {
				collection = collection.concat([
					'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				]);
			}

			if (symbols) {
				collection = collection.concat([
					'~', '!', '#', '$', '%', '^', '&', '*', '(', ')', '-',
					'_', '.', ',', '<', '>', '?', '/', '\\', '{', '}', '[',
					']', '|', ':', ';',
				]);
			}

			if (spaces) {
				collection = collection.concat([' ']);
			}

			password.push((collection[Math.floor(Math.random() * collection.length)] as string));
		}

		return password.join('');
	}

	/**
	 * Find the position of the first occurrence of a given substring in a string.
	 *
	 * @param { string } haystack
	 * @param { string } needle
	 * @param { number } offset
	 *
	 * @return { number | false }
	 */
	static position(haystack: string, needle: string, offset: number = 0): number | false {
		const position: number = haystack.indexOf(needle, Math.max(offset, 0));

		return position !== -1 ? position : false;
	}

	/**
	 * Generate a more truly "random" alpha-numeric string.
	 *
	 * @param { number } length
	 *
	 * @return { string }
	 */
	static random(length: number = 16): string {
		let byteSize: number = Math.ceil((length) / 3) * 3;

		let bytes: string = crypto.getRandomValues(new Uint8Array(byteSize)).join('');

		let string: string = btoa(bytes);

		['/', '+', '='].forEach((char: string) => string = string.replace(char, ''));

		return string.substring(0, length);
	}

	/**
	 * Repeat the given string.
	 *
	 * @param { string } string
	 * @param { number } times
	 *
	 * @return { string }
	 */
	static repeat(string: string, times: number = 1): string {
		return string.repeat(times);
	}

	/**
	 * Replace a given value in the string sequentially with an array.
	 *
	 * @param { string[] } replace
	 * @param { string } subject
	 * @param { string } search
	 *
	 * @return { string }
	 */
	static replaceArray(search: string, replace: string[], subject: string): string {
		const segments: string[] = subject.split(search);

		let result: string = segments.shift()!;

		segments.forEach((segment: string) => result += (replace.shift() ?? search) + segment);

		return result;
	}

	/**
	 * Convert the given value to a string or return the given fallback on failure.
	 *
	 * @param { * } value
	 * @param { string } fallback
	 *
	 * @return { string }
	 */
	static toStringOr(value: any, fallback: string): string {
		try {
			let result: string = String(value);

			if (result === 'undefined' || result === 'null') {
				return fallback;
			}

			return result;
		} catch (e) {
			return fallback;
		}
	}

	/**
	 * Replace the given value in the given string.
	 *
	 * @param { string | string[] } search
	 * @param { string } replace
	 * @param { string } subject
	 * @param { boolean } caseSensitive
	 *
	 * @return { string }
	 */
	static replace(search: string | string[], replace: string, subject: string, caseSensitive: boolean = true): string {
		if (!(search instanceof Array)) {
			search = [search];
		}

		search.forEach((term: string | RegExp) => {
			if (!caseSensitive) {
				term = new RegExp(term, 'gi');
			}

			subject = subject.replaceAll(term, replace);
		});

		return subject;
	}

	/**
	 * Replace the first occurrence of a given value in the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 * @param { string } subject
	 *
	 * @return { string }
	 */
	static replaceFirst(search: string, replace: string, subject: string): string {
		if (search === '') {
			return subject;
		}

		let position: number = subject.indexOf(search);

		if (position !== undefined) {
			return subject.replace(search, replace);
		}

		return subject;
	}

	/**
	 * Replace the first occurrence of the given value if it appears at the start of the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 * @param { string } subject
	 *
	 * @return { string }
	 */
	static replaceStart(search: string, replace: string, subject: string): string {
		if (search === '') {
			return subject;
		}

		if (this.startsWith(subject, search)) {
			return this.replaceFirst(search, replace, subject);
		}

		return subject;
	}

	/**
	 * Replace the last occurrence of a given value in the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 * @param { string } subject
	 *
	 * @return { string }
	 */
	static replaceLast(search: string, replace: string, subject: string): string {
		if (search === '') {
			return subject;
		}

		let position: number = subject.lastIndexOf(search);

		if (position !== 0) {
			return subject.substring(0, position) + replace + subject.substring(position + search.length);
		}

		return subject;
	}

	/**
	 * Replace the last occurrence of a given value if it appears at the end of the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 * @param { string } subject
	 *
	 * @return { string
	 */
	static replaceEnd(search: string, replace: string, subject: string): string {
		if (search === '') {
			return subject;
		}

		if (this.endsWith(subject, search)) {
			return this.replaceLast(search, replace, subject);
		}

		return subject;
	}

	/**
	 * Replace the patterns matching the given regular expression.
	 *
	 * @param { string } pattern
	 * @param { string | function } replace
	 * @param { string } subject
	 *
	 * @return { this }
	 */
	static replaceMatches(pattern: string, replace: string | Function, subject: string) {
		// @ts-ignore
		const regExpBody: string  = /^\/(.*)\/\w*$/.exec(pattern)[1];
		// @ts-ignore
		const regExpFlags: string = /^\/.*\/(\w*)$/.exec(pattern)[1];
		const regExp              = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

		if (replace instanceof Function) {
			subject = subject.replace(regExp, (matched) => matched);
		}

		return subject.replace(regExp, (replace as string));
	}

	/**
	 * Remove any occurrence of the given string in the subject.
	 *
	 * @param { string } search
	 * @param { string } subject
	 * @param { boolean } caseSensitive
	 *
	 * @return { string }
	 */
	static remove(search: string, subject: string, caseSensitive: boolean = true): string {
		return subject.replace(new RegExp(search, caseSensitive ? 'g' : 'gi'), '');
	}

	/**
	 * Reverse the given string.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static reverse(value: string): string {
		return value.split('').reverse().join('');
	}

	/**
	 * Begin a string with a single instance of a given value.
	 *
	 * @param { string } value
	 * @param { string } prefix
	 *
	 * @return { string }
	 */
	static start(value: string, prefix: string): string {
		const quoted: string = preg_quote(prefix, '/');

		return prefix + value.replace(new RegExp(`^(?:${quoted})+`, 'u'), '');
	}

	/**
	 * Convert the given string to upper-case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static upper(value: string): string {
		return value.toUpperCase();
	}

	/**
	 * Convert the given string to title case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static title(value: string): string {
		return value.split(/[^A-Za-z]/)
			.map((word: string) => {
				return this.ucfirst(word[0] + word.substring(1).toLowerCase());
			})
			.join(' ');
	}

	/**
	 * Convert the given string to title case for each word.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static headline(value: string): string {
		let parts: string[] = value.split(' ');

		parts = parts.length > 1
			? parts.map((part: string) => this.title(part))
			: this.ucsplit(parts.join('_')).map((part: string) => this.title(part));

		let collapsed: string = this.replace(['-', '_', ' '], '_', parts.join('_'));

		return collapsed.split('_').join(' ').trim();
	}

	/**
	 * Convert the given string to APA-style title case.
	 *
	 * @see https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static apa(value: string) {
		if (value === '') {
			return value;
		}

		const minorWords: string[] = [
			'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an',
			'the', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via',
		];

		const endPunctuation: string[] = ['.', '!', '?', ':', '—', ','];

		let words: string[] = value.split(/\s+/).filter(Boolean);

		words[0] = (words[0] as string).charAt(0).toUpperCase() + (words[0] as string).slice(1).toLowerCase();

		for (let i = 0; i < words.length; i++) {
			let lowercaseWord: string = (words[i] as string).toLowerCase();

			if (lowercaseWord.includes('-')) {
				let hyphenatedWords: string[] = lowercaseWord.split('-');

				hyphenatedWords = hyphenatedWords.map((part: string) =>
					(minorWords.includes(part) && part.length <= 3) ? part : this.ucfirst(part)
				);

				words[i] = hyphenatedWords.join('-');
			} else if (minorWords.includes(lowercaseWord) &&
				lowercaseWord.length <= 3 &&
				!(i === 0 || endPunctuation.includes((words[i - 1] as string).slice(-1)))) {
				words[i] = lowercaseWord;
			} else {
				words[i] = this.ucfirst(lowercaseWord);
			}
		}

		return words.join(' ');
	}

	/**
	 * Get the singular form of an English word.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static singular(value: string): string {
		const isCapital: boolean = /[A-Z]/.test(value.charAt(0));

		/**
		 * List of rules for singular words.
		 *
		 * @type { object }
		 */
		const singular: { [key: string]: string } = {
			'(quiz)zes$'                                                   : '$1',
			'(matr)ices$'                                                  : '$1ix',
			'(vert|ind)ices$'                                              : '$1ex',
			'^(ox)en$'                                                     : '$1',
			'(alias)es$'                                                   : '$1',
			'(octop|vir)i$'                                                : '$1us',
			'(cris|ax|test)es$'                                            : '$1is',
			'(shoe)s$'                                                     : '$1',
			'(o)es$'                                                       : '$1',
			'(bus)es$'                                                     : '$1',
			'([m|l])ice$'                                                  : '$1ouse',
			'(x|ch|ss|sh)es$'                                              : '$1',
			'(m)ovies$'                                                    : '$1ovie',
			'(s)eries$'                                                    : '$1eries',
			'([^aeiouy]|qu)ies$'                                           : '$1y',
			'([lr])ves$'                                                   : '$1f',
			'(tive)s$'                                                     : '$1',
			'(hive)s$'                                                     : '$1',
			'(li|wi|kni)ves$'                                              : '$1fe',
			'(shea|loa|lea|thie)ves$'                                      : '$1f',
			'(^analy)ses$'                                                 : '$1sis',
			'((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
			'([ti])a$'                                                     : '$1um',
			'(n)ews$'                                                      : '$1ews',
			'(h|bl)ouses$'                                                 : '$1ouse',
			'(corpse)s$'                                                   : '$1',
			'(us)es$'                                                      : '$1',
			's$'                                                           : '',
		};

		/**
		 * List of words that change irregularly.
		 *
		 * @type { object }
		 */
		const irregular: { [key: string]: string } = {
			'move'  : 'moves',
			'foot'  : 'feet',
			'goose' : 'geese',
			'sex'   : 'sexes',
			'child' : 'children',
			'man'   : 'men',
			'tooth' : 'teeth',
			'person': 'people',
		};

		/**
		 * List of words that do not change.
		 *
		 * @type { String[] }
		 */
		const uncountable: string[] = [
			'sheep',
			'fish',
			'deer',
			'moose',
			'series',
			'species',
			'money',
			'rice',
			'information',
			'equipment',
			'bison',
			'cod',
			'offspring',
			'pike',
			'salmon',
			'shrimp',
			'swine',
			'trout',
			'aircraft',
			'hovercraft',
			'spacecraft',
			'sugar',
			'tuna',
			'you',
			'wood',
		];

		if (uncountable.indexOf(value.toLowerCase()) >= 0) {
			return value;
		}

		for (const word in irregular) {
			const pattern = new RegExp(`${irregular[word]}$`, 'i');

			if (pattern.test(value)) {
				value = value.replace(pattern, word);

				return isCapital ? this.ucfirst(value) : value;
			}
		}

		for (const word in singular) {
			const pattern = new RegExp(word, 'i');

			if (pattern.test(value)) {
				value = value.replace(pattern, (singular[word] as string));

				return isCapital ? this.ucfirst(value) : value;
			}
		}

		return isCapital ? this.ucfirst(value) : value;
	}

	/**
	 * Generate a URL friendly "slug" from a given string.
	 *
	 * @param { string } title
	 * @param { string } separator
	 * @param { object } dictionary
	 *
	 * @return { string }
	 */
	static slug(title: string, separator: string = '-', dictionary: { [key: string]: string } = { '@': 'at' }): string {
		// Convert all dashes/underscores into separator
		let flip: string = separator === '-' ? '_' : '-';

		title = title.replace('![' + preg_quote(flip) + ']+!u', separator);

		// Replace dictionary words
		for (let value in dictionary) {
			dictionary[value] = separator + dictionary[value] + separator;
		}

		for (let value in dictionary) {
			title = title.replaceAll(value, (dictionary[value] as string));
		}

		// Remove all characters that are not the separator, letters, numbers, or whitespace
		title = this.lower(title).replace('![^' + preg_quote(separator) + 'pLpNs]+!u', '');

		// Replace all separator characters and whitespace by a single separator
		return title.replaceAll(/\s/g, separator).replace(new RegExp('\\' + separator + '+', 'g'), separator);
	}

	/**
	 * Convert a string to snake case.
	 *
	 * @param { string } value
	 * @param { string } delimiter
	 *
	 * @return { string }
	 */
	static snake(value: string, delimiter: string = '_'): string {
		value = ucwords(value).replace(new RegExp(/\s+/, 'u'), '');

		value = this.lower(value.replace(new RegExp(/(.)(?=[A-Z])/, 'ug'), `$1${delimiter}`));

		return value;
	}

	/**
	 * Remove all "extra" blank space from the given string.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static squish(value: string): string {
		return value.replace(/\s\s+/g, ' ').trim();
	}

	/**
	 * Determine if a given string starts with a given substring.
	 *
	 * @param { string } haystack
	 * @param { string | array } needles
	 *
	 * @return { boolean }
	 */
	static startsWith(haystack: string, needles: string | string[]): boolean {
		let result: boolean = false;

		if (!(needles instanceof Array)) {
			needles = [needles];
		}

		needles.forEach((needle: string) => {
			if (needle !== '' && haystack.startsWith(needle)) {
				result = true;
			}
		});

		return result;
	}

	/**
	 * Convert a value to studly caps case.
	 *
	 * @param { string } value
	 *
	 * @return { string }
	 */
	static studly(value: string): string {
		const words: string[] = this.replace(['-', '_'], ' ', value).split(' ');

		const studlyWords: string[] = words.map((word: string) => this.ucfirst(word));

		return studlyWords.join('');
	}

	/**
	 * Returns the portion of the string specified by the start and length parameters.
	 *
	 * @param { string } string
	 * @param { number } start
	 * @param { number | null } length
	 *
	 * @return { string }
	 */
	static substr(string: string, start: number, length: number | null = null): string {
		if (start < 0) {
			start = string.length + start;

			if (start < 0) {
				start = 0;
			}
		}

		if (length !== null && length < 0) {
			return '';
		}

		if (length === 0 || length === null) {
			return string.substring(start);
		}

		return string.substring(start, start + length);
	}

	/**
	 * Returns the number of substring occurrences.
	 *
	 * @param { string } haystack
	 * @param { string } needle
	 * @param { number } offset
	 * @param { number | null } length
	 *
	 * @return { number }
	 */
	static substrCount(haystack: string, needle: string, offset: number = 0, length: number | null = null): number {
		if (length) {
			return haystack.substring(offset).substring(0, length).split(needle).length - 1;
		}

		return haystack.substring(offset).split(needle).length - 1;
	}

	/**
	 * Replace text within a portion of a string.
	 *
	 * @param { string } string
	 * @param { string } replace
	 * @param { number } offset
	 * @param { number | null } length
	 *
	 * @return { string }
	 */
	static substrReplace(string: string, replace: string, offset: number = 0, length: number | null = null): string {
		if (length !== null) {
			return string.substring(0, offset) + replace + string.substring(offset);
		}

		return string.substring(0, offset) + replace;
	}

	/**
	 * Swap multiple keywords in a string with other keywords.
	 *
	 * @param { object } map
	 * @param { string } subject
	 *
	 * @return { string }
	 */
	static swap(map: { [key: string]: string }, subject: string): string {
		for (const value in map) {
			subject = subject.replace(value, (map[value] as string));
		}

		return subject;
	}

	/**
	 * Take the first or last {limit} characters of a string.
	 *
	 * @param { string } string
	 * @param { number } limit
	 *
	 * @return { string }
	 */
	static take(string: string, limit: number): string {
		if (limit < 0) {
			return this.substr(string, limit);
		}

		return this.substr(string, 0, limit);
	}

	/**
	 * Convert the given string to Base64 encoding.
	 *
	 * @param { string } string
	 *
	 * @return { string }
	 */
	static toBase64(string: string): string {
		return btoa(string);
	}

	/**
	 * Decode the given Base64 encoded string.
	 *
	 * @param { string } string
	 *
	 * @return { string }
	 */
	static fromBase64(string: string): string {
		return atob(string);
	}

	/**
	 * Make a string's first character lowercase.
	 *
	 * @param { string } string
	 *
	 * @return { string }
	 */
	static lcfirst(string: string): string {
		return this.lower(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
	}

	/**
	 * Make a string's first character uppercase.
	 *
	 * @param { string } string
	 *
	 * @return { string }
	 */
	static ucfirst(string: string): string {
		return this.upper(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
	}

	/**
	 * Split a string into pieces by uppercase characters.
	 *
	 * @param { string } string
	 *
	 * @return { array }
	 */
	static ucsplit(string: string): string[] {
		return string.split(new RegExp(/(?=\p{Lu})/, 'u'));
	}

	/**
	 * Get the number of words a string contains.
	 *
	 * @param { string } string
	 *
	 * @return { number }
	 */
	static wordCount(string: string): number {
		return string.split(/\s+/).length;
	}

	/**
	 * Wrap a string to a given number of characters.
	 *
	 * @param { string } string
	 * @param { number } characters
	 * @param { string } breakStr
	 * @param { boolean } cutLongWords
	 *
	 * @returns { string }
	 */
	static wordWrap(string: string, characters: number = 75, breakStr: string = '\n', cutLongWords: boolean = false): string {
		const breakWithSpace: string = cutLongWords ? breakStr + '\u00ad' : breakStr;
		const regex: RegExp          = new RegExp(`.{1,${characters}}`, 'g');
		const result: string         = string.replace(regex, (substr: string) => substr.trim() + breakWithSpace);

		return this.replaceLast(breakStr, '', result);
	}

	/**
	 * Generate a UUID (version 4).
	 *
	 * @return { string }
	 */
	static uuid(): string {
		let time: number = parseInt((Math.random() * 10000000000000000).toString().substring(0, 13));

		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character: string): string {
			let randomChar: number = (time + Math.random() * 16) % 16 | 0;
			time                   = Math.floor(time / 16);

			return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
		});
	}

	/**
	 * Generate a time-ordered UUID (version 4).
	 *
	 * @return { string }
	 */
	static orderedUuid(): string {
		let time: number = new Date().getTime();

		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character: string): string {
			let randomChar: number = (time + Math.random() * 16) % 16 | 0;
			time                   = Math.floor(time / 16);

			return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
		});
	}

	/**
	 * Generate a ULID.
	 *
	 * @return { string }
	 */
	static ulid(): string {
		const encoding: string       = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
		const encodingLength: number = encoding.length;
		const timeLength: number     = 10;
		const randomLength: number   = 16;

		/**
		 * Generate random Encoding Time.
		 *
		 * @return { string }
		 */
		function generateEncodedTime(): string {
			let encodedTime: string = '';
			let now: number         = new Date().getTime();

			for (let length: number = timeLength; length > 0; length--) {
				const mod: number = now % encodingLength;
				encodedTime       = encoding.charAt(mod) + encodedTime;
				now               = (now - mod) / encodingLength;
			}

			return encodedTime;
		}

		/**
		 * Generate random Number.
		 *
		 * @return { number }
		 */
		function generateRandomNumber(): number {
			const buffer: Uint8Array = new Uint8Array(1);
			crypto.getRandomValues(buffer);

			// @ts-ignore
			return buffer[0] / 0xff;
		}

		/**
		 * Generate random String.
		 *
		 * @return { string }
		 */
		function generateRandomString(): string {
			let string: string = '';

			for (let length: number = randomLength; length > 0; length--) {
				let randomNumber: number = Math.floor(generateRandomNumber() * encodingLength);

				if (randomNumber === encodingLength) {
					randomNumber = encodingLength - 1;
				}

				string += encoding.charAt(randomNumber);
			}

			return string;
		}

		return generateEncodedTime() + generateRandomString();
	}
}

/**
 * Get a new Stringable object from the given string.
 *
 * @param { string } string
 *
 * @return Stringable
 */
const str = function (string: string): Stringable {
	return Str.of(string);
};

class Stringable {
	/**
	 * The underlying string value.
	 *
	 * @private
	 * @type { string }
	 */
	#value: string;

	/**
	 * Create a new instance of the class.
	 *
	 * @param { string } value
	 */
	constructor(value: string = '') {
		this.#value = value;
	}

	/**
	 * Return the remainder of a string after the first occurrence of a given value.
	 *
	 * @param { string } search
	 *
	 * @return { this }
	 */
	after(search: string): Stringable {
		return new Stringable(Str.after(this.#value, search));
	}

	/**
	 * Return the remainder of a string after the last occurrence of a given value.
	 *
	 * @param { string } search
	 *
	 * @return { this }
	 */
	afterLast(search: string): Stringable {
		return new Stringable(Str.afterLast(this.#value, search));
	}

	/**
	 * Append the given values to the string.
	 *
	 * @param { string | string[] } values
	 *
	 * @return { this }
	 */
	append(...values: string[]): Stringable {
		return new Stringable(this.#value + values.join(''));
	}

	/**
	 * Append a new line to the string.
	 *
	 * @param { number } count
	 *
	 * @return { this }
	 */
	newLine(count: number = 1): Stringable {
		return this.append('\n'.repeat(count));
	}

	/**
	 * Transliterate a UTF-8 value to ASCII.
	 *
	 * @return { this }
	 */
	ascii(): Stringable {
		return new Stringable(Str.ascii(this.#value));
	}

	/**
	 * Get the trailing name component of the path.
	 *
	 * @param { string } suffix
	 *
	 * @return { this }
	 */
	basename(suffix: string = ''): Stringable {
		let basename: string = this.#value;

		if (this.#value.split('/')[0] !== this.#value) {
			basename = (this.#value.split('/').pop() as string);
		}

		if (this.#value.split('\\')[0] !== this.#value) {
			basename = (this.#value.split('\\').pop() as string);
		}

		if (suffix !== '') {
			basename = basename.replace(suffix, '');
		}

		return new Stringable(basename);
	}

	/**
	 * Get the character at the specified index.
	 *
	 * @param { number } index
	 *
	 * @return { string | false }
	 */
	charAt(index: number) {
		return Str.charAt(this.#value, index);
	}

	/**
	 * Get the basename of the class path.
	 *
	 * @return { this }
	 */
	classBasename(): Stringable {
		return this.basename();
	}

	/**
	 * Get the portion of a string before the first occurrence of a given value.
	 *
	 * @param { string } search
	 *
	 * @return { this }
	 */
	before(search: string): Stringable {
		return new Stringable(Str.before(this.#value, search));
	}

	/**
	 * Get the portion of a string before the last occurrence of a given value.
	 *
	 * @param { string } search
	 *
	 * @return { this }
	 */
	beforeLast(search: string): Stringable {
		return new Stringable(Str.beforeLast(this.#value, search));
	}

	/**
	 * Get the portion of a string between two given values.
	 *
	 * @param { string } from
	 * @param { string } to
	 *
	 * @return { this }
	 */
	between(from: string, to: string): Stringable {
		return new Stringable(Str.between(this.#value, from, to));
	}

	/**
	 * Get the smallest possible portion of a string between two given values.
	 *
	 * @param { string } from
	 * @param { string } to
	 *
	 * @return { this }
	 */
	betweenFirst(from: string, to: string): Stringable {
		return new Stringable(Str.betweenFirst(this.#value, from, to));
	}

	/**
	 * Convert a value to camel case.
	 *
	 * @return { this }
	 */
	camel(): Stringable {
		return new Stringable(Str.camel(this.#value));
	}

	/**
	 * Determine if a given string contains a given substring.
	 *
	 * @param  { string | array } needles
	 * @param  { boolean } ignoreCase
	 *
	 * @return { boolean }
	 */
	contains(needles: string | string[], ignoreCase: boolean = false): boolean {
		return Str.contains(this.#value, needles, ignoreCase);
	}

	/**
	 * Determine if a given string contains all array values.
	 *
	 * @param { array } needles
	 * @param { boolean } ignoreCase
	 *
	 * @return { boolean }
	 */
	containsAll(needles: string[], ignoreCase: boolean = false): boolean {
		return Str.containsAll(this.#value, needles, ignoreCase);
	}

	/**
	 * Get the parent directory's path.
	 *
	 * @param { number } levels
	 *
	 * @return { this }
	 */
	dirname(levels: number = 1): Stringable {
		let dirname: string         = this.#value;
		let parts: string[]         = [];
		let isValidDirname: boolean = false;
		let hasValidLevels: boolean = false;

		if (this.#value.split('/')[0] !== this.#value) {
			parts          = this.#value.split('/');
			dirname        = parts.slice(0, parts.length - levels).join('/');
			isValidDirname = true;
			hasValidLevels = parts.length <= levels + 1;
		}

		if (this.#value.split('\\')[0] !== this.#value) {
			parts          = this.#value.split('\\');
			dirname        = parts.slice(0, parts.length - levels).join('\\');
			isValidDirname = true;
			hasValidLevels = parts.length <= levels + 1;
		}

		if (!isValidDirname) {
			dirname = '.';
		}

		if (isValidDirname && hasValidLevels) {
			dirname = '\\';
		}

		return new Stringable(dirname);
	}

	/**
	 * Determine if a given string ends with a given substring.
	 *
	 * @param { string | array } needles
	 *
	 * @return { boolean }
	 */
	endsWith(needles: string | string[]): boolean {
		return Str.endsWith(this.#value, needles);
	}

	/**
	 * Determine if the string is an exact match with the given value.
	 *
	 * @param { Stringable|string } value
	 *
	 * @return { boolean }
	 */
	exactly(value: string | object): boolean {
		if (value instanceof Stringable) {
			value = value.toString();
		}

		return this.#value === value;
	}

	/**
	 * Extracts an excerpt from text that matches the first instance of a phrase.
	 *
	 * @param { string } phrase
	 * @param { object } options
	 *
	 * @return { string | null }
	 */
	excerpt(phrase: string = '', options: object = {}): string | null {
		return Str.excerpt(this.#value, phrase, options);
	}

	/**
	 * Explode the string into an array.
	 *
	 * @param { string } delimiter
	 * @param { number } limit
	 *
	 * @return { array }
	 */
	explode(delimiter: string, limit: number = 0): string[] {
		if (limit === 0) {
			return [this.#value];
		}

		let wordsArray = this.#value.split(delimiter);

		const position = limit - 1 >= wordsArray.length
			? wordsArray.length - 1
			: limit - 1;

		wordsArray = [...wordsArray.slice(0, position), wordsArray.splice(position).join(' ')];

		return wordsArray;
	}

	/**
	 * Split a string using a regular expression or by length.
	 *
	 * @param { string } pattern
	 * @param { number } limit
	 *
	 * @return { array }
	 */
	split(pattern: string, limit: number = -1): string[] {
		// @ts-ignore
		const regExpBody: string  = (/^\/(.*)\/\w*$/.exec(pattern)[1]);
		// @ts-ignore
		const regExpFlags: string = /^\/.*\/(\w*)$/.exec(pattern)[1];
		const regExp: RegExp      = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

		let segments: string[] = this.#value.split(regExp);

		if (limit !== -1) {
			const position: number = limit - 1 >= segments.length
				? segments.length - 1
				: limit - 1;

			segments = [...segments.slice(0, position), segments.splice(position).join('')];
		}

		return segments.map((segment: string) => segment.trim()) ?? [];
	}

	/**
	 * Cap a string with a single instance of a given value.
	 *
	 * @param { string } cap
	 *
	 * @return { this }
	 */
	finish(cap: string): Stringable {
		return new Stringable(Str.finish(this.#value, cap));
	}

	/**
	 * Determine if a given string matches a given pattern.
	 *
	 * @param { string | array } pattern
	 *
	 * @return { boolean }
	 */
	is(pattern: string | string[]): boolean {
		return Str.is(pattern, this.#value);
	}

	/**
	 * Determine if a given string is 7 bit ASCII.
	 *
	 * @return { boolean }
	 */
	isAscii(): boolean {
		return Str.isAscii(this.#value);
	}

	/**
	 * Determine if a given string is valid JSON.
	 *
	 * @return { boolean }
	 */
	isJson(): boolean {
		return Str.isJson(this.#value);
	}

	/**
	 * Determine if a given value is a valid URL.
	 *
	 * @return { boolean }
	 */
	isUrl(): boolean {
		return Str.isUrl(this.#value);
	}

	/**
	 * Determine if a given string is a valid UUID.
	 *
	 * @return { boolean }
	 */
	isUuid(): boolean {
		return Str.isUuid(this.#value);
	}

	/**
	 * Determine if a given string is a valid ULID.
	 *
	 * @return { boolean }
	 */
	isUlid(): boolean {
		return Str.isUlid(this.#value);
	}

	/**
	 * Determine if the given string is empty.
	 *
	 * @return { boolean }
	 */
	isEmpty(): boolean {
		return this.#value.trim() === '';
	}

	/**
	 * Determine if the given string is not empty.
	 *
	 * @return { boolean }
	 */
	isNotEmpty(): boolean {
		return !this.isEmpty();
	}

	/**
	 * Convert a string to kebab case.
	 *
	 * @return { this }
	 */
	kebab(): Stringable {
		return new Stringable(Str.kebab(this.#value));
	}

	/**
	 * Return the length of the given string.
	 *
	 * @return { number }
	 */
	length(): number {
		return Str.length(this.#value);
	}

	/**
	 * Limit the number of characters in a string.
	 *
	 * @param { number } limit
	 * @param { string } end
	 *
	 * @return { this }
	 */
	limit(limit: number = 100, end: string = '...'): Stringable {
		return new Stringable(Str.limit(this.#value, limit, end));
	}

	/**
	 * Convert the given string to lower-case.
	 *
	 * @return { this }
	 */
	lower(): Stringable {
		return new Stringable(Str.lower(this.#value));
	}

	/**
	 * Masks a portion of a string with a repeated character.
	 *
	 * @param { string } character
	 * @param { number } index
	 * @param { number | null }length
	 *
	 * @return { this }
	 */
	mask(character: string, index: number, length: number | null = null): Stringable {
		return new Stringable(Str.mask(this.#value, character, index, length));
	}

	/**
	 * Get the string matching the given pattern.
	 *
	 * @param { string } pattern
	 *
	 * @return { this }
	 */
	match(pattern: string): Stringable {
		return new Stringable(Str.match(pattern, this.#value));
	}

	/**
	 * Determine if a given string matches a given pattern.
	 *
	 * @param { string | string[] } pattern
	 *
	 * @return { boolean }
	 */
	isMatch(...pattern: string[]): boolean {
		return Str.isMatch(pattern, this.#value);
	}

	/**
	 * Get the string matching the given pattern.
	 *
	 * @param { string } pattern
	 *
	 * @return { array }
	 */
	matchAll(pattern: string): string[] {
		return Str.matchAll(pattern, this.#value);
	}

	/**
	 * Determine if the string matches the given pattern.
	 *
	 * @param { string } pattern
	 *
	 * @return { boolean }
	 */
	test(pattern: string): boolean {
		return this.match(pattern).isNotEmpty();
	}

	/**
	 * Pad both sides of the string with another.
	 *
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { this }
	 */
	padBoth(length: number, pad: string = ' '): Stringable {
		return new Stringable(Str.padBoth(this.#value, length, pad));
	}

	/**
	 * Pad the left side of the string with another.
	 *
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { this }
	 */
	padLeft(length: number, pad: string = ' '): Stringable {
		return new Stringable(Str.padLeft(this.#value, length, pad));
	}

	/**
	 * Pad the right side of the string with another.
	 *
	 * @param { number } length
	 * @param { string } pad
	 *
	 * @return { this }
	 */
	padRight(length: number, pad: string = ' '): Stringable {
		return new Stringable(Str.padRight(this.#value, length, pad));
	}

	/**
	 * Call the given callback and return a new string.
	 *
	 * @param { string | function } callback
	 *
	 * @return { this }
	 */
	pipe(callback: string | Function): Stringable {
		// @ts-ignore
		if (this.#value[callback] instanceof Function) {
			// @ts-ignore
			return new Stringable(this.#value[callback]());
		}

		// @ts-ignore
		if (window[callback] instanceof Function) {
			// @ts-ignore
			return new Stringable(window[callback](this.#value));
		}

		// @ts-ignore
		return new Stringable(callback(this).toString());
	}

	/**
	 * Get the plural form of an English word.
	 *
	 * @param { number } count
	 *
	 * @return { this }
	 */
	plural(count: number = 2): Stringable {
		return new Stringable(Str.plural(this.#value, count));
	}

	/**
	 * Pluralize the last word of an English, studly caps case string.
	 *
	 * @param { number } count
	 *
	 * @return { this }
	 */
	pluralStudly(count: number = 2): Stringable {
		return new Stringable(Str.pluralStudly(this.#value, count));
	}

	/**
	 * Find the multibyte safe position of the first occurrence of the given substring.
	 *
	 * @param { string } needle
	 * @param { number } offset
	 *
	 * @return { number | false }
	 */
	position(needle: string, offset: number = 0): number | false {
		return Str.position(this.#value, needle, offset);
	}

	/**
	 * Prepend the given values to the string.
	 *
	 * @param { string | string[] } values
	 *
	 * @return { this }
	 */
	prepend(...values: string[]): Stringable {
		return new Stringable(values.join('') + this.#value);
	}

	/**
	 * Remove any occurrence of the given string in the subject.
	 *
	 * @param { string } search
	 * @param { boolean } caseSensitive
	 *
	 * @return { this }
	 */
	remove(search: string, caseSensitive: boolean = true): Stringable {
		return new Stringable(Str.remove(search, this.#value, caseSensitive));
	}

	/**
	 * Reverse the string.
	 *
	 * @return { this }
	 */
	reverse(): Stringable {
		return new Stringable(Str.reverse(this.#value));
	}

	/**
	 * Repeat the string.
	 *
	 * @param { number } times
	 *
	 * @return { this }
	 */
	repeat(times: number): Stringable {
		return new Stringable(Str.repeat(this.#value, times));
	}

	/**
	 * Replace the given value in the given string.
	 *
	 * @param { string | array } search
	 * @param { string } replace
	 * @param { boolean } caseSensitive
	 *
	 * @return { this }
	 */
	replace(search: string | string[], replace: string, caseSensitive: boolean = true): Stringable {
		return new Stringable(Str.replace(search, replace, this.#value, caseSensitive));
	}

	/**
	 * Replace a given value in the string sequentially with an array.
	 *
	 * @param { string } search
	 * @param { array } replace
	 *
	 * @return { this }
	 */
	replaceArray(search: string, replace: string[]): Stringable {
		return new Stringable(Str.replaceArray(search, replace, this.#value));
	}

	/**
	 * Replace the first occurrence of a given value in the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 *
	 * @return { this }
	 */
	replaceFirst(search: string, replace: string): Stringable {
		return new Stringable(Str.replaceFirst(search, replace, this.#value));
	}

	/**
	 * Replace the first occurrence of the given value if it appears at the start of the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 *
	 * @return { this }
	 */
	replaceStart(search: string, replace: string): Stringable {
		return new Stringable(Str.replaceStart(search, replace, this.#value));
	}

	/**
	 * Replace the last occurrence of a given value in the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 *
	 * @return { this }
	 */
	replaceLast(search: string, replace: string): Stringable {
		return new Stringable(Str.replaceLast(search, replace, this.#value));
	}

	/**
	 * Replace the last occurrence of a given value if it appears at the end of the string.
	 *
	 * @param { string } search
	 * @param { string } replace
	 *
	 * @return { this }
	 */
	replaceEnd(search: string, replace: string): Stringable {
		return new Stringable(Str.replaceEnd(search, replace, this.#value));
	}

	/**
	 * Replace the patterns matching the given regular expression.
	 *
	 * @param { string } pattern
	 * @param { string | function } replace
	 *
	 * @return { this }
	 */
	replaceMatches(pattern: string, replace: string | Function): Stringable {
		// @ts-ignore
		const regExpBody: string  = /^\/(.*)\/\w*$/.exec(pattern)[1];
		// @ts-ignore
		const regExpFlags: string = /^\/.*\/(\w*)$/.exec(pattern)[1];
		const regExp              = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

		if (replace instanceof Function) {
			// @ts-ignore
			this.#value.replace(regExp, (matched) => matched);
		}

		return new Stringable(this.#value.replace(regExp, (replace as string)));
	}

	/**
	 * Remove all "extra" blank space from the given string.
	 *
	 * @return { this }
	 */
	squish(): Stringable {
		return new Stringable(Str.squish(this.#value));
	}

	/**
	 * Begin a string with a single instance of a given value.
	 *
	 * @param { string } prefix
	 *
	 * @return { this }
	 */
	start(prefix: string): Stringable {
		return new Stringable(Str.start(this.#value, prefix));
	}

	/**
	 * Convert the given string to upper-case.
	 *
	 * @return { this }
	 */
	upper(): Stringable {
		return new Stringable(Str.upper(this.#value));
	}

	/**
	 * Convert the given string to title case.
	 *
	 * @return { this }
	 */
	title(): Stringable {
		return new Stringable(Str.title(this.#value));
	}

	/**
	 * Convert the given string to title case for each word.
	 *
	 * @return { this }
	 */
	headline(): Stringable {
		return new Stringable(Str.headline(this.#value));
	}

	/**
	 * Convert the given string to APA-style title case.
	 *
	 * @see https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
	 *
	 * @return { this}
	 */
	apa() {
		return new Stringable(Str.apa(this.#value));
	}

	/**
	 * Get the singular form of an English word.
	 *
	 * @return { this }
	 */
	singular(): Stringable {
		return new Stringable(Str.singular(this.#value));
	}

	/**
	 * Generate a URL friendly "slug" from a given string.
	 *
	 * @param { string } separator
	 * @param { object } dictionary
	 *
	 * @return { this }
	 */
	slug(separator: string = '-', dictionary: { [key: string]: string } = { '@': 'at' }): Stringable {
		return new Stringable(Str.slug(this.#value, separator, dictionary));
	}

	/**
	 * Convert a string to snake case.
	 *
	 * @param { string } delimiter
	 *
	 * @return { this }
	 */
	snake(delimiter: string = '_'): Stringable {
		return new Stringable(Str.snake(this.#value, delimiter));
	}

	/**
	 * Determine if a given string starts with a given substring.
	 *
	 * @param { string | array } needles
	 *
	 * @return { boolean }
	 */
	startsWith(needles: string | string[]) {
		return Str.startsWith(this.#value, needles);
	}

	/**
	 * Convert a value to studly caps case.
	 *
	 * @return { this }
	 */
	studly(): Stringable {
		return new Stringable(Str.studly(this.#value));
	}

	/**
	 * Returns the portion of the string specified by the start and length parameters.
	 *
	 * @param { number } start
	 * @param { number | null } length
	 *
	 * @return { this }
	 */
	substr(start: number, length: number | null = null): Stringable {
		return new Stringable(Str.substr(this.#value, start, length));
	}

	/**
	 * Returns the number of substring occurrences.
	 *
	 * @param { string } needle
	 * @param { number } offset
	 * @param { number | null } length
	 *
	 * @return { number }
	 */
	substrCount(needle: string, offset: number = 0, length: number | null = null): number {
		return Str.substrCount(this.#value, needle, offset, length);
	}

	/**
	 * Replace text within a portion of a string.
	 *
	 * @param { string } replace
	 * @param { number } offset
	 * @param { number | null } length
	 *
	 * @return { this }
	 */
	substrReplace(replace: string, offset: number = 0, length: number | null = null): Stringable {
		return new Stringable(Str.substrReplace(this.#value, replace, offset, length));
	}

	/**
	 * Swap multiple keywords in a string with other keywords.
	 *
	 * @param { object } map
	 *
	 * @return { this }
	 */
	swap(map: { [key: string]: string }): Stringable {
		return new Stringable(Str.swap(map, this.#value));
	}

	/**
	 * Take the first or last {limit} characters.
	 *
	 * @param { number } limit
	 *
	 * @return { this }
	 */
	take(limit: number): Stringable {
		if (limit < 0) {
			return this.substr(limit);
		}

		return this.substr(0, limit);
	}

	/**
	 * Call the given Closure with this instance then return the instance.
	 *
	 * @param { Function } callback
	 *
	 * @return { this }
	 */
	tap(callback: Function): this {
		callback(this);

		return this;
	}

	/**
	 * Trim the string of the given characters.
	 *
	 * @param { string | string[]|null } characters
	 *
	 * @return { this }
	 */
	trim(characters: CharacterType = null): Stringable {
		let characterArray = characters instanceof Array
			? characters
			: [...arguments];

		characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);

		characters.forEach(term => this.#value = this.#value.replaceAll(term, ''));

		return new Stringable(this.#value.trim());
	}

	/**
	 * Left trim the string of the given characters.
	 *
	 * @param { string | string[]|null } characters
	 *
	 * @return { this }
	 */
	ltrim(characters: CharacterType = null): Stringable {
		let characterArray = characters instanceof Array
			? characters
			: [...arguments];

		characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);

		characters.forEach(term => this.#value = Str.replaceFirst(term, '', this.#value));

		return new Stringable(this.#value.trimStart());
	}

	/**
	 * Right trim the string of the given characters.
	 *
	 * @param { string | string[]|null } characters
	 *
	 * @return { this }
	 */
	rtrim(characters: CharacterType = null): Stringable {
		let characterArray = characters instanceof Array
			? characters
			: [...arguments];

		characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);

		characters.forEach(term => this.#value = Str.replaceLast(term, '', this.#value));

		return new Stringable(this.#value.trimEnd());
	}

	/**
	 * Make a string's first character lowercase.
	 *
	 * @return { this }
	 */
	lcfirst(): Stringable {
		return new Stringable(Str.lcfirst(this.#value));
	}

	/**
	 * Make a string's first character uppercase.
	 *
	 * @return { this }
	 */
	ucfirst(): Stringable {
		return new Stringable(Str.ucfirst(this.#value));
	}

	/**
	 * Split a string by uppercase characters.
	 *
	 * @return { array }
	 */
	ucsplit(): string[] {
		return Str.ucsplit(this.#value);
	}

	/**
	 * Apply the callback if the given "value" is (or resolves to) truthy.
	 *
	 * @param { boolean|Function } value
	 * @param { Function } callback
	 * @param { Function|null } fallback
	 *
	 * @return { this }
	 */
	when(value: boolean | Function, callback: Function, fallback: Function | null = null): this {
		value = value instanceof Function ? value(this) : value;

		if (value) {
			return callback(this, value) ?? this;
		} else if (fallback) {
			return fallback(this, value) ?? this;
		}

		return this;
	}

	/**
	 * Apply the callback if the given "value" is (or resolves to) falsy.
	 *
	 *
	 * @param { boolean|Function } value
	 * @param { Function } callback
	 * @param { Function|null } fallback
	 *
	 * @return { this }
	 */
	unless(value: boolean | Function, callback: Function, fallback: Function | null = null): this {
		value = value instanceof Function ? value(this) : value;

		if (!value) {
			return callback(this, value) ?? this;
		} else if (fallback) {
			return fallback(this, value) ?? this;
		}

		return this;
	}

	/**
	 * Execute the given callback if the string contains a given substring.
	 *
	 * @param { string | array } needles
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenContains(needles: string | string[], callback: Function, fallback: Function | null = null): this {
		return this.when(this.contains(needles), callback, fallback);
	}

	/**
	 * Execute the given callback if the string contains all array values.
	 *
	 * @param { array } needles
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenContainsAll(needles: string[], callback: Function, fallback: Function | null = null): this {
		return this.when(this.containsAll(needles), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is empty.
	 *
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenEmpty(callback: Function, fallback: Function | null = null): this {
		return this.when(this.isEmpty(), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is not empty.
	 *
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenNotEmpty(callback: Function, fallback: Function | null = null): this {
		return this.when(this.isNotEmpty(), callback, fallback);
	}

	/**
	 * Execute the given callback if the string ends with a given substring.
	 *
	 * @param { string | array } needles
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenEndsWith(needles: string | string[], callback: Function, fallback: Function | null = null): this {
		return this.when(this.endsWith(needles), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is an exact match with the given value.
	 *
	 * @param { string } value
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenExactly(value: string, callback: Function, fallback: Function | null = null): this {
		return this.when(this.exactly(value), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is not an exact match with the given value.
	 *
	 * @param { string } value
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenNotExactly(value: string, callback: Function, fallback: Function | null = null): this {
		return this.when(!this.exactly(value), callback, fallback);
	}

	/**
	 * Execute the given callback if the string matches a given pattern.
	 *
	 * @param { string | array } pattern
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenIs(pattern: string | string[], callback: Function, fallback: Function | null = null): this {
		return this.when(this.is(pattern), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is 7-bit ASCII.
	 *
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenIsAscii(callback: Function, fallback: Function | null = null): this {
		return this.when(this.isAscii(), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is a valid UUID.
	 *
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenIsUuid(callback: Function, fallback: Function | null = null): this {
		return this.when(this.isUuid(), callback, fallback);
	}

	/**
	 * Execute the given callback if the string is a valid ULID.
	 *
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenIsUlid(callback: Function, fallback: Function | null = null): this {
		return this.when(this.isUlid(), callback, fallback);
	}

	/**
	 * Execute the given callback if the string starts with a given substring.
	 *
	 * @param { string | array } needles
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenStartsWith(needles: string | string[], callback: Function, fallback: Function | null = null): this {
		return this.when(this.startsWith(needles), callback, fallback);
	}

	/**
	 * Execute the given callback if the string matches the given pattern.
	 *
	 * @param { string } pattern
	 * @param { function } callback
	 * @param { function|null } fallback
	 *
	 * @return { this }
	 */
	whenTest(pattern: string, callback: Function, fallback: Function | null = null): this {
		return this.when(this.test(pattern), callback, fallback);
	}

	/**
	 * Limit the number of words in a string.
	 *
	 * @param { number } words
	 * @param { string } end
	 *
	 * @return { this }
	 */
	words(words: number = 100, end: string = '...'): Stringable {
		return new Stringable(Str.words(this.#value, words, end));
	}

	/**
	 * Get the number of words a string contains.
	 *
	 * @return { number }
	 */
	wordCount(): number {
		return Str.wordCount(this.#value);
	}

	/**
	 * Wrap a string to a given number of characters.
	 *
	 * @param { number } characters
	 * @param { string } breakStr
	 * @param { boolean } cutLongWords
	 *
	 * @returns { this }
	 */
	wordWrap(characters: number = 75, breakStr: string = '\n', cutLongWords: boolean = false) {
		return new Stringable(Str.wordWrap(this.#value, characters, breakStr, cutLongWords));
	}

	/**
	 * Wrap the string with the given strings.
	 *
	 * @param { string } before
	 * @param { string | null } after
	 *
	 * @return { this }
	 */
	wrap(before: string, after: string | null = null): Stringable {
		return new Stringable(Str.wrap(this.#value, before, after));
	}

	/**
	 * Unwrap the string with the given strings.
	 *
	 * @param { string } before
	 * @param { string | null } after
	 *
	 * @return { this }
	 */
	unwrap(before: string, after: string | null = null): Stringable {
		return new Stringable(Str.unwrap(this.#value, before, after));
	}

	/**
	 * Convert the string into a `HtmlString` instance.
	 *
	 * @return { HTMLElement | Node | string }
	 */
	toHtmlString(): HtmlStringType {
		return new HtmlString(this.#value).toHtml();
	}

	/**
	 * Convert the string to Base64 encoding.
	 *
	 * @return { this }
	 */
	toBase64(): Stringable {
		return new Stringable(Str.toBase64(this.#value));
	}

	/**
	 * Decode the Base64 encoded string.
	 *
	 * @return { this }
	 */
	fromBase64(): Stringable {
		return new Stringable(Str.fromBase64(this.#value));
	}

	/**
	 * Dump the string.
	 *
	 * @return { void }
	 */
	dump(): void {
		console.log(this.#value);
	}

	/**
	 * Dump the string and end the script.
	 *
	 * @return { void }
	 */
	dd(): void {
		this.dump();

		throw new Error('dd()');
	}

	/**
	 * Get the underlying string value.
	 *
	 * @return { string }
	 */
	value(): string {
		return this.toString();
	}

	/**
	 * Get the raw string value.
	 *
	 * @return { string }
	 */
	toString(): string {
		return this.#value;
	}

	/**
	 * Get the underlying string value as an integer.
	 *
	 * @return { number }
	 */
	toInteger(): number {
		return !isNaN(parseInt(this.#value)) ? parseInt(this.#value) : 0;
	}

	/**
	 * Get the underlying string value as a float.
	 *
	 * @return { number }
	 */
	toFloat(): number {
		return !isNaN(parseFloat(this.#value)) ? parseFloat(this.#value) : 0;
	}

	/**
	 * Get the underlying string value as a boolean.
	 *
	 * Returns true when value is "1", "true", "on", and "yes". Otherwise, returns false.
	 *
	 * @return { boolean }
	 */
	toBoolean(): boolean {
		switch (this.#value) {
			case '1':
			case 'true':
			case 'on':
			case 'yes':
				return true;
			default:
				return false;
		}
	}

	/**
	 * Get the underlying string value as a formatted Date string.
	 *
	 * @param { string | null } format
	 * @param { string | null } tz
	 */
	toDate(format: string | null = null, tz: string | null = null): string {
		if (new Date(this.#value).toString() === 'Invalid Date') {
			return 'Invalid Date';
		}

		if (format === null) {
			return new Date().toLocaleDateString('en-us', {
				year    : 'numeric',
				month   : 'numeric',
				day     : 'numeric',
				hour    : 'numeric',
				minute  : 'numeric',
				second  : 'numeric',
				hour12  : false,
				timeZone: tz ?? undefined,
			});
		}

		let date: string            = '';
		let days: string[]          = [];
		let months: string[]        = [];
		const now: Date             = new Date(new Date(this.#value).toLocaleString('en-US', { timeZone: tz ?? undefined }));
		const month: number         = now.getMonth();
		const dayOfTheWeek: number  = now.getDay();
		const dayOfTheMonth: number = now.getDate();
		const year: number          = now.getFullYear();
		const hours: number         = now.getHours();
		const minutes: number       = now.getMinutes();
		const seconds: number       = now.getSeconds();
		// @ts-ignore
		const milliseconds: number  = now.getMilliseconds();

		for (const element of format) {
			switch (element) {
				// Day of the month, 2 digits with leading zeros (e.g., 01 to 31)
				case 'd':
					date += Str.padLeft(dayOfTheMonth.toString(), 2, '0');

					break;

				// A textual representation of a day, three letters (e.g., Mon through Sun)
				case 'D':
					days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
					date += days[dayOfTheWeek];

					break;

				// Day of the month without leading zeros (e.g., 1 to 31)
				case 'j':
					date += dayOfTheMonth;

					break;

				// A full textual representation of the day of the week (e.g., Sunday through Saturday)
				case 'l':
					days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					date += days[dayOfTheWeek];

					break;

				// ISO 8601 numeric representation of the day of the week (e.g., 1 (for Monday) through 7 (for Sunday))
				case 'N':
					date += dayOfTheWeek;

					break;

				// English ordinal suffix for the day of the month, 2 characters (e.g., st, nd, rd or th)
				case 'S': {
					let suffix: { [key: number]: string } = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
					date += suffix[dayOfTheMonth] ?? 'th';

					break;
				}
				// Numeric representation of the day of the week (e.g., 0 (for Sunday) through 6 (for Saturday))
				case 'w':
					date += dayOfTheWeek;

					break;

				// Numeric representation of the day of the week (e.g., The day of the year (starting from 0))
				case 'z': {
					let start: Date          = new Date(year, 0, 0);
					let diff: number         = ((now as unknown as number) - (start as unknown as number)) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
					let day: number          = 1000 * 60 * 60 * 24;
					const currentDay: number = Math.floor(diff / day);
					date += currentDay - 1;

					break;
				}
				// ISO 8601 week number of year, weeks starting on Monday (e.g., 42 (the 42nd week in the year))
				case 'W': {
					let parsedDate: Date = new Date(Date.UTC(year, month, dayOfTheMonth));
					let weekDay: number  = parsedDate.getUTCDay() || 7;
					parsedDate.setUTCDate(parsedDate.getUTCDate() + 4 - weekDay);
					let yearStart: Date    = new Date(Date.UTC(parsedDate.getUTCFullYear(), 0, 1));
					let weekNumber: number = Math.ceil(((((parsedDate as unknown as number) - (yearStart as unknown as number)) / 86400000) + 1) / 7);

					date += Str.padLeft((weekNumber as unknown as string), 1, '0');

					break;
				}
				// A full textual representation of a month, such as January or March (e.g., January through December)
				case 'F':
					months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
					date += months[month];

					break;

				// Numeric representation of a month, with leading zeros (e.g., 01 through 12)
				case 'm': {
					const currentMonth = month + 1;
					date += Str.padLeft(currentMonth.toString(), 2, '0');

					break;
				}
				// A short textual representation of a month, three letters (e.g., Jan through Dec)
				case 'M':
					months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					date += months[month];

					break;

				// Numeric representation of a month, without leading zeros (e.g., 1 through 12)
				case 'n':
					date += month + 1;

					break;

				// Number of days in the given month (e.g., 28 through 31)
				case 't':
					date += new Date(year, month + 1, 0).getDate();

					break;

				// Whether it's a leap year (e.g., 1 if it is a leap year, 0 otherwise)
				case 'L':
					date += new Date(year, 1, 29).getMonth() === 1 ? '1' : '0';

					break;

				// ISO 8601 week-numbering year. This has the same value as Y,
				// except that if the ISO week number (W) belongs to the previous or next year,
				// that year is used instead. (e.g., 1999 or 2003)
				case 'o':
					date += now.toISOString().substring(0, 4);

					break;

				// An expanded full numeric representation of a year,
				// at least 4 digits, with - for years BCE, and + for years CE. (e.g., -0055, +0787, +1999, +10191)
				case 'X':
					date += year < 0 ? '-' + year : '+' + year;

					break;

				// An expanded full numeric representation if required,
				// or a standard full numeral representation if possible (like Y).
				// At least four digits. Years BCE are prefixed with a -.
				// Years beyond (and including) 10000 are prefixed by a +. (e.g., -0055, 0787, 1999, +10191)
				case 'x':
					date += year < 10000 ? year : '-' + year;

					break;

				// A full numeric representation of a year,
				// at least 4 digits, with - for years BCE. (e.g., -0055, 0787, 1999, 2003, 10191)
				case 'Y':
					date += year;

					break;

				// A two-digit representation of a year (e.g., 99 or 03)
				case 'y':
					date += year.toString().substring(2);

					break;

				// Lowercase Ante meridiem and Post meridiem (e.g., am or pm)
				case 'a':
					date += hours < 12 ? 'am' : 'pm';

					break;

				// Uppercase Ante meridiem and Post meridiem (e.g., AM or PM)
				case 'A':
					date += hours < 12 ? 'AM' : 'PM';

					break;

				// Swatch Internet time (e.g., 000 through 999)
				case 'B': {
					const utcHours   = now.getUTCHours();
					const utcMinutes = now.getUTCMinutes();
					const utcSeconds = now.getUTCSeconds();

					date += Math.floor((((utcHours + 1) % 24) + utcMinutes / 60 + utcSeconds / 3600) * 1000 / 24);

					break;
				}
				// 12-hour format of an hour without leading zeros (e.g., 1 through 12)
				case 'g':
					date += hours > 12 ? hours - 12 : hours;

					break;

				// 24-hour format of an hour without leading zeros (e.g., 0 through 23)
				case 'G':
					date += hours;

					break;

				// 12-hour format of an hour with leading zeros (e.g., 01 through 12)
				case 'h':
					date += Str.padLeft((hours > 12 ? hours - 12 : hours).toString(), 2, '0');

					break;

				// 24-hour format of an hour with leading zeros (e.g., 00 through 23)
				case 'H':
					date += Str.padLeft(hours.toString(), 2, '0');

					break;

				// Minutes with leading zeros (e.g., 00 to 59)
				case 'i':
					date += Str.padLeft(minutes.toString(), 2, '0');

					break;

				// Seconds with leading zeros (e.g., 00 to 59)
				case 's':
					date += Str.padLeft(seconds.toString(), 2, '0');

					break;

				// Microseconds. (e.g., 654321)
				case 'u':
					// date += Str.padRight((milliseconds * 1000).toString(), 6, '0');
					throw new Error('Microseconds are not supported at the moment.');

				// Milliseconds. (e.g., 654)
				case 'v':
					// date += Str.padLeft(milliseconds.toString(), 3, '0');
					throw new Error('Milliseconds are not supported at the moment.');

				// Timezone identifier (e.g., UTC, GMT, Atlantic/Azores)
				case 'e': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'shortOffset', timeZone: tz ?? undefined })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData;

					break;
				}

				// Whether the date is in daylight saving time (e.g., 1 if Daylight Saving Time, 0 otherwise)
				case 'I': {
					let january: number = new Date(year, 0, 1).getTimezoneOffset();
					let july: number    = new Date(year, 6, 1).getTimezoneOffset();

					date += Math.max(january, july) !== now.getTimezoneOffset() ? '1' : '0';

					break;
				}
				// Difference to Greenwich time (GMT) without colon between hours and minutes (e.g., +0200)
				case 'O': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz ?? undefined, })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData.length !== 3 ? timeZoneData.substring(3).replace(':', '') : '+0000';

					break;
				}

				// Difference to Greenwich time (GMT) with colon between hours and minutes (e.g., +02:00)
				case 'P': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz ?? undefined, })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData.length !== 3 ? timeZoneData.substring(3) : '+00:00';

					break;
				}

				// The same as P, but returns Z instead of +00:00 (e.g., +02:00)
				case 'p': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz ?? undefined, })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData === 'GMT' ? 'Z' : timeZoneData.substring(3);

					break;
				}

				// Timezone abbreviation, if known; otherwise the GMT offset (e.g., EST, MDT, +05)
				case 'T': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'short', timeZone: tz ?? undefined, })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData;

					break;
				}

				// Timezone offset in seconds.
				// The offset for timezones west of UTC is always negative,
				// and for those east of UTC is always positive. (e.g., -43200 through 50400)
				case 'Z': {
					// @ts-ignore
					const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'short', timeZone: tz ?? undefined, })
						.split(', ')
						.pop()
						.trim();

					date += timeZoneData === 'GMT' ? 0 : parseInt(timeZoneData.substring(3)) * 3600;

					break;
				}

				// ISO 8601 date (e.g., 2004-02-12T15:19:21+00:00)
				case 'c':
					// date += now.toISOString();

					throw new Error('ISO 8601 date is not supported at the moment.');

				// Seconds since the Unix Epoch (e.g., January 1, 1970 00:00:00 GMT)
				case 'r': {
					date += new Stringable(this.#value).toDate('D, d M Y H:i:s O', tz);

					break;
				}

				// RFC 2822/RFC 5322 formatted date (e.g., Thu, 21 Dec 2000 16:01:07 +0200)
				case 'U': {
					date += Math.floor(now.getTime() / 1000);

					break;
				}

				default:
					date += element;
			}
		}

		return date;
	}
}

class HtmlString {
	/**
	 * The HTML string.
	 *
	 * @type { string }
	 */
	html: string;

	/**
	 * Create a new HTML string instance.
	 *
	 * @param { string } html
	 *
	 * @return void
	 */
	constructor(html: string = '') {
		this.html = html;
	}

	/**
	 * Get the HTML string.
	 *
	 * @return { HTMLElement|Node|string | null }
	 */
	toHtml(): HTMLElement | Node | string {
		const pattern: RegExp             = /(?!<!DOCTYPE)<([^\s>]+)(\s|>)+/;
		const tag: RegExpExecArray | null = RegExp(pattern).exec(this.html);

		if (!tag) {
			return this.html;
		}

		const DOM: HTMLElement = document.createElement((tag[1] as string));

		DOM.innerHTML = this.html;

		return (tag[1] as string) === 'html'
			? DOM
			: String(DOM.firstChild);
	}

	/**
	 * Determine if the given HTML string is empty.
	 *
	 * @return { boolean }
	 */
	isEmpty(): boolean {
		return this.html === '';
	}

	/**
	 * Determine if the given HTML string is not empty.
	 *
	 * @return { boolean }
	 */
	isNotEmpty(): boolean {
		return !this.isEmpty();
	}

	/**
	 * Get the HTML string.
	 *
	 * @return { string }
	 */
	toString(): string {
		const html: HTMLElement | Node | string = this.toHtml();

		if (html instanceof HTMLElement) {
			return html.outerHTML;
		}

		if (html instanceof Node) {
			return (html.textContent as string);
		}

		return html;
	}
}

/**
 * Quote regular expression characters.
 *
 * @param { string } string The input string.
 * @param { string | null } delimiter If the optional delimiter is specified, it will also be escaped.
 * This is useful for escaping the delimiter that is required by the PCRE functions.
 * The / is the most commonly used delimiter.
 *
 * @return { string } The quoted (escaped) string.
 */
function preg_quote(string: string, delimiter: string | null = null): string {
	return (string + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter ?? '') + '-]', 'g'), '\\$&');
}

/**
 * Uppercase the first character of each word in a string
 *
 * @param { string } string The input string.
 * @param { string } separators The optional separators contains the word separator characters.

 * @return { string } String the modified string.
 */
function ucwords(string: string, separators: string = ' \t\r\n\f\v'): string {
	return string.split(separators).map((word: string) => word[0]?.toUpperCase() + word.substring(1)).join(' ');
}

if (typeof exports != 'undefined') {
	module.exports.Str = Str;
	module.exports.str = str;
}

// Hack to test this code, global is not available in the browser.
if (typeof global !== 'undefined') {
	const _global: any = global;

	_global.Str        = Str;
	_global.Stringable = Stringable;
	_global.str        = str;
}