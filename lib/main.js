"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stringable_value, _HtmlString_html;
var Mode;
(function (Mode) {
    Mode[Mode["MB_CASE_UPPER"] = 0] = "MB_CASE_UPPER";
    Mode[Mode["MB_CASE_LOWER"] = 1] = "MB_CASE_LOWER";
    Mode[Mode["MB_CASE_TITLE"] = 2] = "MB_CASE_TITLE";
    Mode[Mode["MB_CASE_FOLD"] = 3] = "MB_CASE_FOLD";
    Mode[Mode["MB_CASE_UPPER_SIMPLE"] = 4] = "MB_CASE_UPPER_SIMPLE";
    Mode[Mode["MB_CASE_LOWER_SIMPLE"] = 5] = "MB_CASE_LOWER_SIMPLE";
    Mode[Mode["MB_CASE_TITLE_SIMPLE"] = 6] = "MB_CASE_TITLE_SIMPLE";
    Mode[Mode["MB_CASE_FOLD_SIMPLE"] = 7] = "MB_CASE_FOLD_SIMPLE";
})(Mode || (Mode = {}));
class Str {
    /**
     * Get a new Stringable object from the given string.
     *
     * @param { string } string
     */
    static of(string) {
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
    static after(subject, search) {
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
    static afterLast(subject, search) {
        if (search === '') {
            return subject;
        }
        const position = subject.lastIndexOf(search);
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
    static ascii(value) {
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
    static before(subject, search) {
        if (search === '') {
            return subject;
        }
        const result = subject.substring(0, subject.indexOf(search));
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
    static beforeLast(subject, search) {
        var _a;
        if (search === '') {
            return subject;
        }
        const position = (_a = subject.lastIndexOf(search)) !== null && _a !== void 0 ? _a : null;
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
    static between(subject, from, to) {
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
    static betweenFirst(subject, from, to) {
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
    static camel(value) {
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
    static charAt(subject, index) {
        return subject.charAt(index);
    }
    /**
     * Remove the given string(s) if it exists at the start of the haystack.
     *
     * @param { string } subject
     * @param { string | string[] } needle
     *
     * @return string
     */
    static chopStart(subject, needle) {
        let results = subject;
        needle = Array.isArray(needle) ? needle : [needle];
        needle.forEach((word) => {
            if (subject.startsWith(word)) {
                results = subject.substring(word.length);
            }
        });
        return results;
    }
    /**
     * Remove the given string(s) if it exists at the end of the haystack.
     *
     * @param { string } subject
     * @param { string | string[] } needle
     *
     * @return string
     *
     */
    static chopEnd(subject, needle) {
        let results = subject;
        needle = Array.isArray(needle) ? needle : [needle];
        needle.forEach((word) => {
            if (subject.endsWith(word)) {
                results = subject.substring(0, subject.length - word.length);
            }
        });
        return results;
    }
    /**
     * Determine if a given string contains a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    static contains(haystack, needles, ignoreCase = false) {
        let result = false;
        if (ignoreCase) {
            haystack = haystack.toLowerCase();
        }
        if (!(needles instanceof Array)) {
            needles = [needles];
        }
        needles.forEach((needle) => {
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
     * @param { string[] } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    static containsAll(haystack, needles, ignoreCase = false) {
        let result = true;
        needles.forEach((needle) => {
            if (!this.contains(haystack, needle, ignoreCase)) {
                result = false;
            }
        });
        return result;
    }
    /**
     * Determine if a given string doesn't contain a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    static doesntContain(haystack, needles, ignoreCase = false) {
        return !this.contains(haystack, needles, ignoreCase);
    }
    /**
     * Convert the case of a string.
     *
     * @param { string } string
     * @param { Mode | number } mode
     *
     * @return { string }
     */
    static convertCase(string, mode = Mode.MB_CASE_FOLD) {
        switch (mode) {
            case Mode.MB_CASE_UPPER: {
                string = string.toLocaleUpperCase();
                break;
            }
            case Mode.MB_CASE_LOWER: {
                string = string.toLocaleLowerCase();
                break;
            }
            case Mode.MB_CASE_TITLE: {
                string = this.title(string);
                break;
            }
            case Mode.MB_CASE_FOLD: {
                string = string.toLocaleLowerCase();
                break;
            }
            case Mode.MB_CASE_UPPER_SIMPLE: {
                string = string.toUpperCase();
                break;
            }
            case Mode.MB_CASE_LOWER_SIMPLE: {
                string = string.toLowerCase();
                break;
            }
            case Mode.MB_CASE_TITLE_SIMPLE: {
                string = this.title(string);
                break;
            }
            case Mode.MB_CASE_FOLD_SIMPLE: {
                string = string.toLowerCase();
                break;
            }
        }
        return string;
    }
    /**
     * Replace consecutive instances of a given character with a single character in the given string.
     *
     * @param { string } string
     * @param { string | string[] } characters
     *
     * @return { string }
     */
    static deduplicate(string, characters = ' ') {
        if (Array.isArray(characters)) {
            return characters.reduce((carry, character) => carry.replace(new RegExp(`${character.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}+`, 'gu'), character), string);
        }
        return string.replace(new RegExp(`${preg_quote(characters)}+`, 'gu'), characters);
    }
    /**
     * Determine if a given string ends with a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    static endsWith(haystack, needles) {
        let result = false;
        if (!(needles instanceof Array)) {
            needles = [needles];
        }
        needles.forEach((needle) => {
            if (needle !== '' && haystack.endsWith(needle)) {
                result = true;
            }
        });
        return result;
    }
    /**
     * Determine if a given string doesn't end with a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    static doesntEndWith(haystack, needles) {
        return !this.endsWith(haystack, needles);
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
    static excerpt(text, phrase = '', options = {}) {
        var _a, _b;
        const radius = (_a = options.radius) !== null && _a !== void 0 ? _a : 100;
        const omission = (_b = options.omission) !== null && _b !== void 0 ? _b : '...';
        const results = text.split(phrase);
        if (results.length === 1) {
            return null;
        }
        const matches = [text, results[0], phrase, results.splice(1).join(phrase)];
        let start = matches[1].trimStart();
        let end = matches[3].trimEnd();
        start = this.of(this.substr(start, Math.max((start.length - radius), 0), radius))
            .ltrim()
            .unless((startWithRadius) => startWithRadius.exactly(start), (startWithRadius) => startWithRadius.prepend(omission))
            .toString();
        end = this.of(this.substr(end, 0, radius))
            .rtrim()
            .unless((endWithRadius) => endWithRadius.exactly(end), (endWithRadius) => endWithRadius.append(omission))
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
    static finish(value, cap) {
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
    static wrap(value, before, after = null) {
        return before + value + (after !== null && after !== void 0 ? after : before);
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
    static unwrap(value, before, after = null) {
        if (this.startsWith(value, before)) {
            value = this.replaceFirst(before, '', value);
        }
        if (this.endsWith(value, after !== null && after !== void 0 ? after : before)) {
            value = this.replaceLast(after !== null && after !== void 0 ? after : before, '', value);
        }
        return value;
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | string[] } pattern
     * @param { string } value
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    static is(pattern, value, ignoreCase = false) {
        let patterns = Array.isArray(pattern) ? pattern : [pattern];
        for (let pattern of patterns) {
            if (pattern === value) {
                return true;
            }
            if (ignoreCase && pattern.toLowerCase() === value.toLowerCase()) {
                return true;
            }
            pattern = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\\\*/g, '.*');
            const regex = new RegExp('^' + pattern + '$', ignoreCase ? 'iu' : 'u');
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
    static isAscii(value) {
        return !/[^ -~\t\r\n]/.test(value);
    }
    /**
     * Determine if a given string is valid JSON.
     *
     * @param { string } value
     *
     * @return { boolean }
     */
    static isJson(value) {
        try {
            JSON.parse(value);
        }
        catch (JsonException) {
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
    static isUrl(value, protocols = []) {
        const protocolPattern = protocols.length === 0 ? 'https?|ftp|file|mailto|tel|data|irc|magnet' : protocols.join('|');
        const pattern = new RegExp(`^(?:${protocolPattern}):\\/\\/(?:[\\w-]+(?:\\.[\\w-]+)+|localhost|\\d{1,3}(?:\\.\\d{1,3}){3})(?::\\d+)?(?:\\S*)?$`, 'i');
        return pattern.test(value);
    }
    /**
     * Determine if a given string is a valid UUID.
     *
     * @param { string } value
     *
     * @return { boolean }
     */
    static isUuid(value) {
        return new RegExp(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/).test(value);
    }
    /**
     * Determine if a given string is a valid ULID.
     *
     * @param { string } value
     *
     * @return { boolean }
     */
    static isUlid(value) {
        var _a;
        if (value.length !== 26) {
            return false;
        }
        if (value.length !== ((_a = value.match(/[0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz]/g)) === null || _a === void 0 ? void 0 : _a.length)) {
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
    static kebab(value) {
        return this.snake(value, '-');
    }
    /**
     * Return the length of the given string.
     *
     * @param { string } value
     *
     * @return { number }
     */
    static length(value) {
        return value.length;
    }
    /**
     * Limit the number of characters in a string.
     *
     * @param { string } value
     * @param { number } limit
     * @param { string } end
     * @param { boolean } preserveWords
     *
     * @return { string }
     */
    static limit(value, limit = 100, end = '...', preserveWords = false) {
        if (value.length <= limit) {
            return value;
        }
        if (!preserveWords) {
            return this.substr(value, 0, limit).trim() + end;
        }
        value = value.replace(/[\n\r]+/, ' ');
        const trimmed = this.substr(value, 0, limit).trim();
        if (this.substr(value, limit, 1) === ' ') {
            return `${trimmed}${end}`;
        }
        return `${trimmed.replace(/(.*)\s.*/, '$1')}${end}`;
    }
    /**
     * Convert the given string to lower-case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static lower(value) {
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
    static words(value, words = 100, end = '...') {
        var _a, _b;
        const wordsArray = (_b = (_a = value.match(/\S+\s*/g)) === null || _a === void 0 ? void 0 : _a.splice(0, words)) !== null && _b !== void 0 ? _b : [];
        const result = wordsArray.join('');
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
    static mask(string, character, index, length = null) {
        if (character === '') {
            return string;
        }
        let start = index;
        let endIndex = length !== null && length !== void 0 ? length : string.length;
        if (start < 0) {
            start = string.length + start;
            endIndex = start + (length !== null && length !== void 0 ? length : 0);
        }
        if (endIndex === 0) {
            endIndex = start;
        }
        let segment = string.substring(start, endIndex);
        if (segment === '') {
            return string;
        }
        let strLen = string.length;
        let startIndex = index;
        if (index < 0) {
            startIndex = index < -strLen ? 0 : strLen + index;
        }
        start = string.substring(0, startIndex);
        let segmentLen = segment.length;
        let end = string.substring(startIndex + segmentLen);
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
    static match(pattern, subject) {
        var _a;
        const body = RegExpString.make(/^\/(.*)\/\w*$/, pattern);
        const flags = RegExpString.make(/^\/.*\/(\w*)$/, pattern);
        const expression = new RegExp(body, flags);
        const matches = RegExp(expression).exec(subject);
        if (!matches) {
            return '';
        }
        return (_a = matches[1]) !== null && _a !== void 0 ? _a : matches[0];
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | string[] } pattern
     * @param { string } value
     *
     * @return { boolean }
     */
    static isMatch(pattern, value) {
        let result = false;
        if (!(pattern instanceof Array)) {
            pattern = [pattern];
        }
        pattern.forEach(item => {
            if (item === value) {
                result = true;
            }
            // @ts-ignore
            let body = /^\/(.*)\/\w*$/.exec(item)[1];
            // @ts-ignore
            let flags = /^\/.*\/(\w*)$/.exec(item)[1];
            let expression = new RegExp(body, flags);
            if (RegExp(expression).exec(value)) {
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
     * @return { string[] }
     */
    static matchAll(pattern, subject) {
        const body = RegExpString.make(/^\/(.*)\/\w*$/, pattern);
        const flags = RegExpString.make(/^\/.*\/(\w*)$/, pattern);
        const expression = new RegExp(body, flags + (flags.indexOf('g') !== -1 ? '' : 'g'));
        const matches = [...subject.matchAll(new RegExp(expression, 'g'))];
        if (matches.length === 0) {
            return [];
        }
        return matches.map((match) => String(match.length === 1 ? match[0] : match[1]));
    }
    /**
     * Remove all non-numeric characters from a string.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static numbers(value) {
        return value.replace(/[^0-9]/g, '');
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
    static padBoth(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);
        const shortLeft = Math.floor(short / 2);
        const shortRight = Math.ceil(short / 2);
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
    static padLeft(value, length, pad = ' ') {
        var _a;
        const short = Math.max(0, length - ((_a = value.length) !== null && _a !== void 0 ? _a : 0));
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
    static padRight(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);
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
    static plural(value, count = 2) {
        if ((count !== undefined && count === 1) || value.trim() === '') {
            return value;
        }
        // List of rules for plural words.
        const plural = {
            // Special cases (unchanged plurals)
            '^(.*)menu$': '$1menus',
            '^tights$': 'tights',
            '^shorts$': 'shorts',
            '^glasses$': 'glasses',
            '^pants$': 'pants',
            // -us -> -i (second declension nouns)
            '(alumn|bacill|cact|foc|fung|nucle|radi|stimul|syllab|termin|vir)us$': '$1i',
            '(vir)us$': '$1i',
            // -um/on -> -a (neuter nouns)
            '([ti])um$': '$1a',
            '(tax)on$': '$1a',
            '(criteri)on$': '$1a',
            // -ix/ex -> -ices
            '(matr)ix$': '$1ices',
            '(vert|ind)ex$': '$1ices',
            // -o -> -oes
            '(buffal|her|potat|tomat|volcan)o$': '$1oes',
            // -ouse -> -ouses
            '(h|bl)ouse$': '$1ouses',
            'ouse$': 'ouses',
            // -y -> -ies
            '([^aeiouy]|qu)y$': '$1ies',
            // -f/fe -> -ves
            '([lr])f$': '$1ves',
            '([^fo])fe$': '$1ves',
            '(shea|loa|lea|thie)f$': '$1ves',
            '(li|wi|kni)fe$': '$1ves',
            // -is -> -es
            '(analys|ax|cris|test|thes)is$': '$1es',
            // -e exceptions
            '(alias|status|bus)$': '$1es',
            '(shoe|slave)$': '$1s',
            '(corpse)$': '$1s',
            '(drive|dive|hive|olive|tive)$': '$1s',
            // -x -> -xes
            '([ftw]ax)$': '$1es',
            // -ouse -> -ice
            '([m|l])ouse$': '$1ice',
            // -e -> -es
            '(x|ch|ss|sh)$': '$1es',
            'o$': 'oes',
            // -ze -> -zes
            '(quiz)$': '$1zes',
            // -ox -> -oxen
            '^(ox)$': '$1en',
            // -person -> -people
            '(p)erson$': '$1eople',
            // Irregular singulars
            '(m)an$': '$1en',
            '(c)hild$': '$1hildren',
            '(f)oot$': '$1eet',
            '(m)ouse$': '$1ice',
            '(t)ooth$': '$1eeth',
            '(g)oose$': '$1eese',
            // -news (unchanged)
            '(n)ews$': '$1ews',
            // -eau -> -eaus
            'eau$': 'eaus',
            // -sis -> -ses
            '(^analy)sis$': '$1ses',
            '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)sis$': '$1$2ses',
            // -ovie -> -ovies
            '(m)ovie$': '$1ovies',
            // -eries -> -eries (unchanged)
            '(s)eries$': '$1eries',
            // -us -> -uses
            '([^a])us$': '$1uses',
            'us$': 'uses',
            // -status -> -statuses
            '(s)tatus$': '$1tatuses',
            // -campus -> -campuses
            '(c)ampus$': '$1ampuses',
            // General case (add -s)
            '$': 's'
        };
        // List of words that change irregularly.
        const irregular = {
            // A
            'abuse': 'abuses',
            'alumna': 'alumnae',
            'alumnus': 'alumni',
            'analysis': 'analyses',
            'appendix': 'appendices',
            'atlas': 'atlases',
            'avalanche': 'avalanches',
            'axis': 'axes',
            'axe': 'axes',
            // B
            'bacillus': 'bacilli',
            'bacterium': 'bacteria',
            'basis': 'bases',
            'beau': 'beaux',
            'beef': 'beefs',
            'blouse': 'blouses',
            'brother': 'brothers',
            'brownie': 'brownies',
            'bureau': 'bureaux',
            // C
            'cache': 'caches',
            'cactus': 'cacti',
            'cafe': 'cafes',
            'calf': 'calves',
            'canvas': 'canvases',
            'cave': 'caves',
            'chateau': 'chateaux',
            'child': 'children',
            'cookie': 'cookies',
            'corpus': 'corpuses',
            'cow': 'cows',
            'crisis': 'crises',
            'criterion': 'criteria',
            'curriculum': 'curricula',
            'curve': 'curves',
            // D
            'datum': 'data',
            'deer': 'deer',
            'demo': 'demos',
            'diagnosis': 'diagnoses',
            'domino': 'dominoes',
            // E
            'echo': 'echoes',
            'elf': 'elves',
            'ellipsis': 'ellipses',
            'emphasis': 'emphases',
            'epoch': 'epochs',
            // F
            'fish': 'fish',
            'focus': 'foci',
            'foe': 'foes',
            'foot': 'feet',
            'formula': 'formulae',
            'fungus': 'fungi',
            // G
            'ganglion': 'ganglions',
            'gas': 'gases',
            'genie': 'genies',
            'genus': 'genera',
            'goose': 'geese',
            'graffito': 'graffiti',
            'grave': 'graves',
            // H
            'half': 'halves',
            'hippopotamus': 'hippopotami',
            'hoax': 'hoaxes',
            'hoof': 'hoofs',
            'human': 'humans',
            // I
            'iris': 'irises',
            // K
            'knife': 'knives',
            // L
            'larva': 'larvae',
            'leaf': 'leaves',
            'lens': 'lenses',
            'life': 'lives',
            'loaf': 'loaves',
            // M
            'man': 'men',
            'matrix': 'matrices',
            'means': 'means',
            'medium': 'media',
            'memorandum': 'memoranda',
            'money': 'monies',
            'mongoose': 'mongooses',
            'mouse': 'mice',
            'motto': 'mottoes',
            'move': 'moves',
            'mythos': 'mythoi',
            // N
            'nebula': 'nebulae',
            'neurosis': 'neuroses',
            'niche': 'niches',
            'niveau': 'niveaux',
            'nucleus': 'nuclei',
            'numen': 'numina',
            // O
            'oasis': 'oases',
            'occiput': 'occiputs',
            'octopus': 'octopuses',
            'offspring': 'offspring',
            'opus': 'opuses',
            'ox': 'oxen',
            // P
            'parenthesis': 'parentheses', 'passerby': 'passersby',
            'penis': 'penises',
            'person': 'people',
            'phenomenon': 'phenomena',
            'plateau': 'plateaux',
            // R
            'radius': 'radii',
            'runner-up': 'runners-up',
            // S
            'safe': 'safes',
            'save': 'saves',
            'scarf': 'scarves',
            'self': 'selves',
            'series': 'series',
            'sex': 'sexes',
            'sheep': 'sheep',
            'shelf': 'shelves',
            'sieve': 'sieves',
            'soliloquy': 'soliloquies',
            'son-in-law': 'sons-in-law',
            'species': 'species',
            'stadium': 'stadiums',
            'stimulus': 'stimuli',
            'stratum': 'strata',
            'swine': 'swine',
            'syllabus': 'syllabi',
            'synthesis': 'syntheses',
            // T
            'testis': 'testes',
            'thesis': 'theses',
            'thief': 'thieves',
            'tooth': 'teeth',
            'tornado': 'tornadoes',
            'trilby': 'trilbys',
            'turf': 'turfs',
            // V
            'valve': 'valves',
            'volcano': 'volcanoes',
            // W
            'wave': 'waves',
            'wife': 'wives',
            'wolf': 'wolves',
            // Z
            'zombie': 'zombies'
        };
        // List of words that do not change.
        const uncountable = [
            // A
            'advice',
            'aircraft',
            'amoyese',
            'art',
            'audio',
            // B
            'baggage',
            'bison',
            'borghese',
            'bream',
            'breeches',
            'britches',
            'buffalo',
            'butter',
            // C
            'cantus',
            'carp',
            'cattle',
            'chassis',
            'clippers',
            'clothing',
            'coal',
            'cod',
            'coitus',
            'compensation',
            'congoese',
            'contretemps',
            'coreopsis',
            'corps',
            'cotton',
            // D
            'data',
            'debris',
            'deer',
            'diabetes',
            'djinn',
            // E
            'education',
            'eland',
            'elk',
            'emoji',
            'equipment',
            'evidence',
            // F
            'faroese',
            'feedback',
            'fish',
            'flounder',
            'flour',
            'foochowese',
            'food',
            'furniture',
            // G
            'gallows',
            'genevese',
            'genoese',
            'gilbertese',
            'gold',
            // H
            'headquarters',
            'herpes',
            'hijinks',
            'homework',
            'hovercraft',
            'hottentotese',
            // I
            'impatience',
            'information',
            'innings',
            // J
            'jackanapes',
            'jeans',
            'jedi',
            // K
            'kin',
            'kiplingese',
            'knowledge',
            'kongoese',
            // L
            'leather',
            'love',
            'lucchese',
            'luggage',
            // M
            'mackerel',
            'Maltese',
            'management',
            'metadata',
            'mews',
            'money',
            'moose',
            'mumps',
            'music',
            // N
            'nankingese',
            'news',
            'nexus',
            'niasese',
            'nutrition',
            // O
            'oil',
            'offspring',
            // P
            'patience',
            'pekingese',
            'piedmontese',
            'pike',
            'pincers',
            'pistoiese',
            'plankton',
            'pliers',
            'pokemon',
            'police',
            'polish',
            'portuguese',
            'proceedings',
            'progress',
            // Q
            // (none yet)
            // R
            'rabies',
            'rain',
            'research',
            'rhinoceros',
            'rice',
            // S
            'salmon',
            'sand',
            'sarawakese',
            'scissors',
            'sea[- ]bass',
            'series',
            'shavese',
            'shears',
            'sheep',
            'shrimp',
            'siemens',
            'silk',
            'sms',
            'soap',
            'social media',
            'spacecraft',
            'spam',
            'species',
            'staff',
            'sugar',
            'swine',
            // T
            'talent',
            'toothpaste',
            'traffic',
            'travel',
            'trousers',
            'trout',
            'tuna',
            // U
            'us',
            // V
            'vermontese',
            'vinegar',
            // W
            'weather',
            'wenchowese',
            'wheat',
            'whiting',
            'wildebeest',
            'wood',
            'wool',
            // Y
            'yengeese',
            'you'
        ];
        if (uncountable.indexOf(value.toLowerCase()) >= 0) {
            return matchCase(value, value);
        }
        for (const word in irregular) {
            const pattern = new RegExp(`${word}$`, 'i');
            if (pattern.test(value)) {
                return matchCase(value.replace(pattern, irregular[word]), value);
            }
        }
        for (const word in plural) {
            const pattern = new RegExp(word, 'i');
            if (pattern.test(value)) {
                return matchCase(value.replace(pattern, plural[word]), value);
            }
        }
        return matchCase(value, value);
    }
    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { string } value
     * @param { number | array } count
     *
     * @return { string }
     */
    static pluralStudly(value, count = 2) {
        const parts = value.split(/(.)(?=[A-Z])/);
        const lastWord = parts.pop();
        return parts.join('') + this.ucfirst(this.plural(lastWord, count));
    }
    /**
     * Pluralize the last word of an English, Pascal case string.
     *
     * @param { string } value
     * @param { number | array } count
     *
     * @return { string }
     */
    static pluralPascal(value, count = 2) {
        return this.pluralStudly(value, count);
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
    static password(length = 32, letters = true, numbers = true, symbols = true, spaces = false) {
        let password = [];
        let collection = [];
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
            password.push(collection[Math.floor(Math.random() * collection.length)]);
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
    static position(haystack, needle, offset = 0) {
        const position = haystack.indexOf(needle, Math.max(offset, 0));
        return position !== -1 ? position : false;
    }
    /**
     * Generate a more truly "random" alpha-numeric string.
     *
     * @param { number } length
     *
     * @return { string }
     */
    static random(length = 16) {
        let byteSize = Math.ceil((length) / 3) * 3;
        let bytes = crypto.getRandomValues(new Uint8Array(byteSize)).join('');
        let string = btoa(bytes);
        ['/', '+', '='].forEach((character) => string = string.replace(character, ''));
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
    static repeat(string, times = 1) {
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
    static replaceArray(search, replace, subject) {
        const segments = subject.split(search);
        let result = segments.shift();
        segments.forEach((segment) => { var _a; return result += Str.toStringOr((_a = replace.shift()) !== null && _a !== void 0 ? _a : search, search) + segment; });
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
    static toStringOr(value, fallback) {
        try {
            let result = String(value);
            if (result === 'undefined' || result === 'null') {
                return fallback;
            }
            return result;
        }
        catch (e) {
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
    static replace(search, replace, subject, caseSensitive = true) {
        if (!(search instanceof Array)) {
            search = [search];
        }
        search.forEach((term) => {
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
    static replaceFirst(search, replace, subject) {
        if (search === '') {
            return subject;
        }
        let position = subject.indexOf(search);
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
    static replaceStart(search, replace, subject) {
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
    static replaceLast(search, replace, subject) {
        if (search === '') {
            return subject;
        }
        let position = subject.lastIndexOf(search);
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
     * @return { string }
     */
    static replaceEnd(search, replace, subject) {
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
     * @return { string }
     */
    static replaceMatches(pattern, replace, subject) {
        const body = RegExpString.make(/^\/(.*)\/\w*$/, pattern);
        const flags = RegExpString.make(/^\/.*\/(\w*)$/, pattern);
        const expression = new RegExp(body, flags + (flags.indexOf('g') !== -1 ? '' : 'g'));
        if (replace instanceof Function) {
            subject = subject.replace(expression, (matched) => matched);
        }
        return subject.replace(expression, replace);
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
    static remove(search, subject, caseSensitive = true) {
        return subject.replace(new RegExp(search, caseSensitive ? 'g' : 'gi'), '');
    }
    /**
     * Reverse the given string.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static reverse(value) {
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
    static start(value, prefix) {
        const quoted = preg_quote(prefix, '/');
        return prefix + value.replace(new RegExp(`^(?:${quoted})+`, 'u'), '');
    }
    /**
     * Convert the given string to upper-case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static upper(value) {
        return value.toUpperCase();
    }
    /**
     * Convert the given string to title case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static title(value) {
        return value.split(/[^A-Za-z]/)
            .map((word) => this.ucfirst(word[0] + word.substring(1).toLowerCase()))
            .join(' ');
    }
    /**
     * Convert the given string to title case for each word.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static headline(value) {
        let parts = value.split(' ');
        parts = parts.length > 1
            ? parts.map((part) => this.title(part))
            : this.ucsplit(parts.join('_')).map((part) => this.title(part));
        let collapsed = this.replace(['-', '_', ' '], '_', parts.join('_'));
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
    static apa(value) {
        if (value === '') {
            return value;
        }
        const minorWords = [
            'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an',
            'the', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via',
        ];
        const endPunctuation = ['.', '!', '?', ':', '—', ','];
        let words = value.split(/\s+/).filter(Boolean);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        for (let i = 0; i < words.length; i++) {
            let lowercaseWord = words[i].toLowerCase();
            if (lowercaseWord.includes('-')) {
                let hyphenatedWords = lowercaseWord.split('-');
                hyphenatedWords = hyphenatedWords.map((part) => (minorWords.includes(part) && part.length <= 3) ? part : this.ucfirst(part));
                words[i] = hyphenatedWords.join('-');
            }
            else if (minorWords.includes(lowercaseWord) &&
                lowercaseWord.length <= 3 &&
                !(i === 0 || endPunctuation.includes(words[i - 1].slice(-1)))) {
                words[i] = lowercaseWord;
            }
            else {
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
    static singular(value) {
        // List of rules for singular words.
        const singular = {
            // Special cases
            '^(.*)(menu)s$': '$1$2',
            '^tights$': 'tights',
            '^shorts$': 'shorts',
            '^glasses$': 'glasses',
            '^pants$': 'pants',
            // -us -> -i (second declension nouns)
            '(alumn|bacill|cact|foc|fung|nucle|radi|stimul|syllab|termin|viri?)i$': '$1us',
            '(vir)i$': '$1us',
            // -a -> -um/on (neuter nouns)
            '([ti])a$': '$1um',
            '([ti])a(?<!regatta)$': '$1um',
            '(tax)a$': '$1on',
            '(c)riteria$': '$1riterion',
            // -ices -> -ex/ix
            '(matr)ices$': '$1ix',
            '(vert|ind)ices$': '$1ex',
            // -oes -> -o
            '(buffal|her|potat|tomat|volcan)oes$': '$1o',
            // -ouses -> -ouse
            '(h|bl)ouses$': '$1ouse',
            'ouses$': 'ouse',
            // -ies -> -y
            '([^aeiouy]|qu)ies$': '$1y',
            // -ves -> -f/fe
            '([lr])ves$': '$1f',
            '([^fo])ves$': '$1fe',
            '(shea|loa|lea|thie)ves$': '$1f',
            '(li|wi|kni)ves$': '$1fe',
            // -es -> -is
            '(analys|ax|cris|test|thes)es$': '$1is',
            '(cris|ax|test)es$': '$1is',
            // -es exceptions
            '(alias|status|bus)es$': '$1',
            '(shoe|slave)s$': '$1',
            '(corpse)s$': '$1',
            '(drive|dive|hive|olive|tive)s$': '$1',
            // -xes
            '([ftw]ax)es': '$1',
            // -ices -> -ouse
            '([m|l])ice$': '$1ouse',
            // -es -> -e
            '(o)es$': '$1',
            '(x|ch|ss|sh)es$': '$1',
            // -zes -> -ze
            '(quiz)zes$': '$1',
            // -en -> - (oxen -> ox)
            '^(ox)en$': '$1',
            // -people -> -person
            '(p)eople$': '$1erson',
            // Irregular plurals
            '(m)en$': '$1an',
            '(c)hildren$': '$1hild',
            '(f)eet$': '$1oot',
            '(m)ice$': '$1ouse',
            '(t)eeth$': '$1ooth',
            '(g)eese$': '$1oose',
            // -news
            '(n)ews$': '$1ews',
            // -eau
            'eaus$': 'eau',
            // -ses -> -sis
            '(^analy)ses$': '$1sis',
            '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
            // -movies
            '(m)ovies$': '$1ovie',
            // -series
            '(s)eries$': '$1eries',
            // -us
            '([^a])uses$': '$1us',
            '(us)es$': '$1',
            // -status
            '(s)tatus(es)?$': '$1tatus',
            // -campus
            '(c)ampus$': '$1ampus',
            // General case
            's$': ''
        };
        // List of words that change irregularly.
        const irregular = {
            // A
            'abuses': 'abuse',
            'alumnae': 'alumna',
            'alumni': 'alumnus',
            'analyses': 'analysis',
            'appendices': 'appendix',
            'atlases': 'atlas',
            'avalanches': 'avalanche',
            'axes': 'axis', // Also covers 'axe'
            // B
            'bacilli': 'bacillus',
            'bacteria': 'bacterium',
            'bases': 'basis',
            'beaux': 'beau',
            'beefs': 'beef',
            'blouses': 'blouse',
            'brothers': 'brother',
            'brownies': 'brownie',
            'bureaux': 'bureau',
            // C
            'caches': 'cache',
            'cacti': 'cactus',
            'cafes': 'cafe',
            'calves': 'calf',
            'canvases': 'canvas',
            'caves': 'cave',
            'chateaux': 'chateau',
            'children': 'child',
            'cookies': 'cookie',
            'corpuses': 'corpus',
            'cows': 'cow',
            'crises': 'crisis',
            'criteria': 'criterion',
            'curricula': 'curriculum',
            'curves': 'curve',
            // D
            'deer': 'deer',
            'demos': 'demo',
            'diagnoses': 'diagnosis',
            'dominoes': 'domino',
            // E
            'echoes': 'echo',
            'elves': 'elf',
            'ellipses': 'ellipsis',
            'emphases': 'emphasis',
            'epochs': 'epoch',
            // F
            'fish': 'fish',
            'foci': 'focus',
            'foes': 'foe',
            'feet': 'foot',
            'formulae': 'formula',
            'fungi': 'fungus',
            // G
            'ganglions': 'ganglion',
            'gases': 'gas',
            'genies': 'genie',
            'genera': 'genus',
            'geese': 'goose',
            'graffiti': 'graffito',
            'graves': 'grave',
            // H
            'halves': 'half',
            'hippopotami': 'hippopotamus',
            'hoaxes': 'hoax',
            'hoofs': 'hoof', // Also acceptable: 'hooves'
            'humans': 'human',
            // I
            'irises': 'iris',
            // K
            'knives': 'knife',
            // L
            'larvae': 'larva',
            'leaves': 'leaf',
            'lenses': 'lens',
            'lives': 'life',
            'loaves': 'loaf',
            // M
            'men': 'man',
            'matrices': 'matrix',
            'means': 'means',
            'media': 'medium',
            'memoranda': 'memorandum',
            'monies': 'money',
            'mongooses': 'mongoose',
            'mice': 'mouse',
            'mottoes': 'motto',
            'moves': 'move',
            'mythoi': 'mythos',
            // N
            'nebulae': 'nebula',
            'neuroses': 'neurosis',
            'niches': 'niche',
            'niveaux': 'niveau',
            'nuclei': 'nucleus',
            'numina': 'numen',
            // O
            'oases': 'oasis',
            'occiputs': 'occiput',
            'octopuses': 'octopus',
            'offspring': 'offspring',
            'opuses': 'opus',
            'oxen': 'ox',
            // P
            'parentheses': 'parenthesis',
            'passersby': 'passerby',
            'penises': 'penis',
            'people': 'person',
            'phenomena': 'phenomenon',
            'plateaux': 'plateau',
            // R
            'radii': 'radius',
            'runners-up': 'runner-up',
            // S
            'safes': 'safe',
            'saves': 'save',
            'scarves': 'scarf',
            'selves': 'self',
            'series': 'series',
            'sexes': 'sex',
            'sheep': 'sheep',
            'shelves': 'shelf',
            'sieves': 'sieve',
            'soliloquies': 'soliloquy',
            'sons-in-law': 'son-in-law',
            'species': 'species',
            'stadiums': 'stadium',
            'stimuli': 'stimulus',
            'strata': 'stratum',
            'swine': 'swine',
            'syllabi': 'syllabus',
            'syntheses': 'synthesis',
            // T
            'testes': 'testis',
            'theses': 'thesis',
            'thieves': 'thief',
            'teeth': 'tooth',
            'tornadoes': 'tornado',
            'trilbys': 'trilby',
            'turfs': 'turf', // Also acceptable: 'turves'
            // V
            'valves': 'valve',
            'volcanoes': 'volcano',
            // W
            'waves': 'wave',
            'wives': 'wife',
            'wolves': 'wolf',
            // Z
            'zombies': 'zombie'
        };
        // List of words that do not change.
        const uncountable = [
            // A
            'advice',
            'aircraft',
            'amoyese',
            'art',
            'audio',
            // B
            'baggage',
            'bison',
            'borghese',
            'bream',
            'breeches',
            'britches',
            'buffalo',
            'butter',
            // C
            'cantus',
            'carp',
            'cattle',
            'chassis',
            'clippers',
            'clothing',
            'coal',
            'cod',
            'coitus',
            'compensation',
            'congoese',
            'contretemps',
            'coreopsis',
            'corps',
            'cotton',
            // D
            'data',
            'debris',
            'deer',
            'diabetes',
            'djinn',
            // E
            'education',
            'eland',
            'elk',
            'emoji',
            'equipment',
            'evidence',
            // F
            'faroese',
            'feedback',
            'fish',
            'flounder',
            'flour',
            'foochowese',
            'food',
            'furniture',
            // G
            'gallows',
            'genevese',
            'genoese',
            'gilbertese',
            'gold',
            // H
            'headquarters',
            'herpes',
            'hijinks',
            'homework',
            'hovercraft',
            'hottentotese',
            // I
            'impatience',
            'information',
            'innings',
            // J
            'jackanapes',
            'jeans',
            'jedi',
            // K
            'kin',
            'kiplingese',
            'knowledge',
            'kongoese',
            // L
            'leather',
            'love',
            'lucchese',
            'luggage',
            // M
            'mackerel',
            'Maltese',
            'management',
            'metadata',
            'mews',
            'money',
            'moose',
            'mumps',
            'music',
            // N
            'nankingese',
            'news',
            'nexus',
            'niasese',
            'nutrition',
            // O
            'oil',
            'offspring',
            // P
            'patience',
            'pekingese',
            'piedmontese',
            'pike',
            'pincers',
            'pistoiese',
            'plankton',
            'pliers',
            'pokemon',
            'police',
            'polish',
            'portuguese',
            'proceedings',
            'progress',
            // Q
            // (none yet)
            // R
            'rabies',
            'rain',
            'research',
            'rhinoceros',
            'rice',
            // S
            'salmon',
            'sand',
            'sarawakese',
            'scissors',
            'sea[- ]bass',
            'series',
            'shavese',
            'shears',
            'sheep',
            'shrimp',
            'siemens',
            'silk',
            'sms',
            'soap',
            'social media',
            'spacecraft',
            'spam',
            'species',
            'staff',
            'sugar',
            'swine',
            // T
            'talent',
            'toothpaste',
            'traffic',
            'travel',
            'trousers',
            'trout',
            'tuna',
            // U
            'us',
            // V
            'vermontese',
            'vinegar',
            // W
            'weather',
            'wenchowese',
            'wheat',
            'whiting',
            'wildebeest',
            'wood',
            'wool',
            // Y
            'yengeese',
            'you'
        ];
        if (uncountable.indexOf(value.toLowerCase()) >= 0) {
            return matchCase(value, value);
        }
        for (const word in irregular) {
            const pattern = new RegExp(`${word}$`, 'i');
            if (pattern.test(value)) {
                return matchCase(value.replace(pattern, irregular[word]), value);
            }
        }
        for (const word in singular) {
            const pattern = new RegExp(word, 'i');
            if (pattern.test(value)) {
                return matchCase(value.replace(pattern, singular[word]), value);
            }
        }
        return matchCase(value, value);
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
    static slug(title, separator = '-', dictionary = { '@': 'at' }) {
        let flip = separator === '-' ? '_' : '-';
        title = title.replace('![' + preg_quote(flip) + ']+!u', separator);
        for (let value in dictionary) {
            dictionary[value] = separator + dictionary[value] + separator;
        }
        for (let value in dictionary) {
            title = title.replaceAll(value, dictionary[value]);
        }
        title = this.lower(title).replace('![^' + preg_quote(separator) + 'pLpNs]+!u', '');
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
    static snake(value, delimiter = '_') {
        value = ucwords(value).replace(new RegExp(/\s+/, 'u'), '');
        value = this.lower(value.replace(new RegExp(/(.)(?=[A-Z])/, 'ug'), `$1${delimiter}`));
        return value;
    }
    /**
     * Remove all whitespace from both ends of a string.
     *
     * @param { string } value
     * @param { string | null } charlist
     *
     * @return { string }
     */
    static trim(value, charlist = null) {
        var _a;
        if (charlist === null) {
            return value.trim();
        }
        if (charlist === '') {
            return value;
        }
        if (charlist === ' ') {
            return value.replaceAll(' ', '');
        }
        charlist = charlist.split('').join('|');
        const regex = new RegExp(`${charlist}+`, 'g');
        return (_a = value.replace(regex, '')) !== null && _a !== void 0 ? _a : value;
    }
    /**
     * Remove all whitespace from the beginning of a string.
     *
     * @param { string } value
     * @param { string | null } charlist
     *
     * @return { string }
     */
    static ltrim(value, charlist = null) {
        if (charlist === null) {
            return value.trimStart();
        }
        if (charlist === '') {
            return value;
        }
        if (charlist === ' ') {
            return this.replaceStart(' ', '', value);
        }
        charlist.split('').forEach((character) => value = this.replaceStart(character, '', value));
        return value;
    }
    /**
     * Remove all whitespace from the end of a string.
     *
     * @param { string } value
     * @param { string | null } charlist
     *
     * @return { string }
     */
    static rtrim(value, charlist = null) {
        if (charlist === null) {
            return value.trimEnd();
        }
        if (charlist === '') {
            return value;
        }
        if (charlist === ' ') {
            return this.replaceEnd(' ', '', value);
        }
        charlist.split('').forEach((character) => value = this.replaceEnd(character, '', value));
        return value;
    }
    /**
     * Remove all "extra" blank space from the given string.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static squish(value) {
        return value.replace(/\s\s+/g, ' ').trim();
    }
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    static startsWith(haystack, needles) {
        let result = false;
        if (!(needles instanceof Array)) {
            needles = [needles];
        }
        needles.forEach((needle) => {
            if (needle !== '' && haystack.startsWith(needle)) {
                result = true;
            }
        });
        return result;
    }
    /**
     * Determine if a given string doesn't start with a given substring.
     *
     * @param { string } haystack
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    static doesntStartWith(haystack, needles) {
        return !this.startsWith(haystack, needles);
    }
    /**
     * Convert a value to studly caps case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static studly(value) {
        const words = this.replace(['-', '_'], ' ', value).split(' ');
        const studlyWords = words.map((word) => this.ucfirst(word));
        return studlyWords.join('');
    }
    /**
     * Convert a value to Pascal case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static pascal(value) {
        return this.studly(value);
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
    static substr(string, start, length = null) {
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
            return string.substring(start, length !== null && length !== void 0 ? length : string.length);
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
    static substrCount(haystack, needle, offset = 0, length = null) {
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
    static substrReplace(string, replace, offset = 0, length = null) {
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
    static swap(map, subject) {
        for (const value in map) {
            subject = subject.replace(value, map[value]);
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
    static take(string, limit) {
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
    static toBase64(string) {
        return btoa(string);
    }
    /**
     * Decode the given Base64 encoded string.
     *
     * @param { string } string
     *
     * @return { string }
     */
    static fromBase64(string) {
        return atob(string);
    }
    /**
     * Make a string's first character lowercase.
     *
     * @param { string } string
     *
     * @return { string }
     */
    static lcfirst(string) {
        return this.lower(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }
    /**
     * Make a string's first character uppercase.
     *
     * @param { string } string
     *
     * @return { string }
     */
    static ucfirst(string) {
        return this.upper(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }
    /**
     * Split a string into pieces by uppercase characters.
     *
     * @param { string } string
     *
     * @return { string[] }
     */
    static ucsplit(string) {
        return string.split(new RegExp(/(?=\p{Lu})/u));
    }
    /**
     * Get the number of words a string contains.
     *
     * @param { string } string
     *
     * @return { number }
     */
    static wordCount(string) {
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
    static wordWrap(string, characters = 75, breakStr = '\n', cutLongWords = false) {
        const breakWithSpace = cutLongWords ? breakStr + '\u00ad' : breakStr;
        const regex = new RegExp(`.{1,${characters}}`, 'g');
        const result = string.replace(regex, (substr) => substr.trim() + breakWithSpace);
        return this.replaceLast(breakStr, '', result);
    }
    /**
     * Generate a UUID (version 4).
     *
     * @return { string }
     */
    static uuid() {
        let time = parseInt((Math.random() * Number.MAX_SAFE_INTEGER + 1).toString().substring(0, 13));
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }
    /**
     * Generate a UUID (version 7).
     *
     * @return { string }
     */
    static uuid7(time = null) {
        const values = new Uint32Array(3);
        crypto.getRandomValues(values);
        const timestamp = time ? time.getTime() : Date.now();
        if (timestamp < 0 || timestamp > 281474976710655) {
            throw new RangeError('Timestamp must be a 48-bit positive integer');
        }
        const [r1, r2, r3] = values;
        const randomA = r1 & 0xfff;
        const randomBHi = r2 & 0x3fffffff;
        const randomBLo = r3;
        const bytes = new Uint8Array(16);
        bytes[0] = timestamp / Math.pow(2, 40);
        bytes[1] = timestamp / Math.pow(2, 32);
        bytes[2] = timestamp / Math.pow(2, 24);
        bytes[3] = timestamp / Math.pow(2, 16);
        bytes[4] = timestamp / Math.pow(2, 8);
        bytes[5] = timestamp;
        bytes[6] = 0x70 | (randomA >>> 8);
        bytes[7] = randomA;
        bytes[8] = 0x80 | (randomBHi >>> 24);
        bytes[9] = randomBHi >>> 16;
        bytes[10] = randomBHi >>> 8;
        bytes[11] = randomBHi;
        bytes[12] = randomBLo >>> 24;
        bytes[13] = randomBLo >>> 16;
        bytes[14] = randomBLo >>> 8;
        bytes[15] = randomBLo;
        const digits = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < 16; i++) {
            result += digits.charAt(bytes[i] >>> 4);
            result += digits.charAt(bytes[i] & 0xf);
            if (i === 3 || i === 5 || i === 7 || i === 9) {
                result += '-';
            }
        }
        return result;
    }
    /**
     * Generate a time-ordered UUID (version 4).
     *
     * @return { string }
     */
    static orderedUuid() {
        let time = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }
    /**
     * Generate a ULID.
     *
     * @return { string }
     */
    static ulid() {
        const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const encodingLength = encoding.length;
        const timeLength = 10;
        const randomLength = 16;
        /**
         * Generate random Encoding Time.
         *
         * @return { string }
         */
        function generateEncodedTime() {
            let encodedTime = '';
            let now = new Date().getTime();
            for (let length = timeLength; length > 0; length--) {
                const mod = now % encodingLength;
                encodedTime = encoding.charAt(mod) + encodedTime;
                now = (now - mod) / encodingLength;
            }
            return encodedTime;
        }
        /**
         * Generate random Number.
         *
         * @return { number }
         */
        function generateRandomNumber() {
            const buffer = new Uint8Array(1);
            crypto.getRandomValues(buffer);
            // @ts-ignore
            return buffer[0] / 0xff;
        }
        /**
         * Generate random String.
         *
         * @return { string }
         */
        function generateRandomString() {
            let string = '';
            for (let length = randomLength; length > 0; length--) {
                let randomNumber = Math.floor(generateRandomNumber() * encodingLength);
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
class Stringable {
    /**
     * Create a new instance of the class.
     *
     * @param { string } value
     */
    constructor(value = '') {
        /**
         * The underlying string value.
         *
         * @private
         *
         * @type { string }
         */
        _Stringable_value.set(this, void 0);
        __classPrivateFieldSet(this, _Stringable_value, value, "f");
    }
    /**
     * Return the remainder of a string after the first occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { Stringable }
     */
    after(search) {
        return new Stringable(Str.after(__classPrivateFieldGet(this, _Stringable_value, "f"), search));
    }
    /**
     * Return the remainder of a string after the last occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { Stringable }
     */
    afterLast(search) {
        return new Stringable(Str.afterLast(__classPrivateFieldGet(this, _Stringable_value, "f"), search));
    }
    /**
     * Append the given values to the string.
     *
     * @param { string | string[] } values
     *
     * @return { Stringable }
     */
    append(...values) {
        return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f") + values.join(''));
    }
    /**
     * Append a new line to the string.
     *
     * @param { number } count
     *
     * @return { Stringable }
     */
    newLine(count = 1) {
        return this.append('\n'.repeat(count));
    }
    /**
     * Transliterate a UTF-8 value to ASCII.
     *
     * @return { Stringable }
     */
    ascii() {
        return new Stringable(Str.ascii(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Get the trailing name component of the path.
     *
     * @param { string } suffix
     *
     * @return { Stringable }
     */
    basename(suffix = '') {
        let basename = __classPrivateFieldGet(this, _Stringable_value, "f");
        if (__classPrivateFieldGet(this, _Stringable_value, "f").split('/')[0] !== __classPrivateFieldGet(this, _Stringable_value, "f")) {
            basename = __classPrivateFieldGet(this, _Stringable_value, "f").split('/').pop();
        }
        if (__classPrivateFieldGet(this, _Stringable_value, "f").split('\\')[0] !== __classPrivateFieldGet(this, _Stringable_value, "f")) {
            basename = __classPrivateFieldGet(this, _Stringable_value, "f").split('\\').pop();
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
    charAt(index) {
        return Str.charAt(__classPrivateFieldGet(this, _Stringable_value, "f"), index);
    }
    /**
     * Remove the given string if it exists at the start of the current string.
     *
     * @param { string | string[] }  needle
     *
     * @return { Stringable }
     */
    chopStart(needle) {
        return new Stringable(Str.chopStart(__classPrivateFieldGet(this, _Stringable_value, "f"), needle));
    }
    /**
     * Remove the given string if it exists at the end of the current string.
     *
     * @param { string | string[] }  needle
     *
     * @return { Stringable }
     */
    chopEnd(needle) {
        return new Stringable(Str.chopEnd(__classPrivateFieldGet(this, _Stringable_value, "f"), needle));
    }
    /**
     * Get the basename of the class path.
     *
     * @return { Stringable }
     */
    classBasename() {
        return this.basename();
    }
    /**
     * Get the portion of a string before the first occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { Stringable }
     */
    before(search) {
        return new Stringable(Str.before(__classPrivateFieldGet(this, _Stringable_value, "f"), search));
    }
    /**
     * Get the portion of a string before the last occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { Stringable }
     */
    beforeLast(search) {
        return new Stringable(Str.beforeLast(__classPrivateFieldGet(this, _Stringable_value, "f"), search));
    }
    /**
     * Get the portion of a string between two given values.
     *
     * @param { string } from
     * @param { string } to
     *
     * @return { Stringable }
     */
    between(from, to) {
        return new Stringable(Str.between(__classPrivateFieldGet(this, _Stringable_value, "f"), from, to));
    }
    /**
     * Get the smallest possible portion of a string between two given values.
     *
     * @param { string } from
     * @param { string } to
     *
     * @return { Stringable }
     */
    betweenFirst(from, to) {
        return new Stringable(Str.betweenFirst(__classPrivateFieldGet(this, _Stringable_value, "f"), from, to));
    }
    /**
     * Convert a value to camel case.
     *
     * @return { Stringable }
     */
    camel() {
        return new Stringable(Str.camel(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Determine if a given string contains a given substring.
     *
     * @param  { string | string[] } needles
     * @param  { boolean } ignoreCase
     *
     * @return { boolean }
     */
    contains(needles, ignoreCase = false) {
        return Str.contains(__classPrivateFieldGet(this, _Stringable_value, "f"), needles, ignoreCase);
    }
    /**
     * Determine if a given string contains all array values.
     *
     * @param { string[] } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    containsAll(needles, ignoreCase = false) {
        return Str.containsAll(__classPrivateFieldGet(this, _Stringable_value, "f"), needles, ignoreCase);
    }
    /**
     * Determine if a given string doesn't contain a given substring.
     *
     * @param  { string | string[] } needles
     * @param  { boolean } ignoreCase
     *
     * @return { boolean }
     */
    doesntContain(needles, ignoreCase = false) {
        return !this.contains(needles, ignoreCase);
    }
    /**
     * Convert the case of a string.
     *
     * @param { Mode | number } mode
     *
     * @return { Stringable }
     */
    convertCase(mode = Mode.MB_CASE_FOLD) {
        return new Stringable(Str.convertCase(__classPrivateFieldGet(this, _Stringable_value, "f"), mode));
    }
    /**
     * Replace consecutive instances of a given character with a single character in the given string.
     *
     * @param { string | string[] } characters
     *
     * @return { string }
     */
    deduplicate(characters = ' ') {
        return new Stringable(Str.deduplicate(__classPrivateFieldGet(this, _Stringable_value, "f"), characters));
    }
    /**
     * Get the parent directory's path.
     *
     * @param { number } levels
     *
     * @return { Stringable }
     */
    dirname(levels = 1) {
        let dirname = __classPrivateFieldGet(this, _Stringable_value, "f");
        let parts = [];
        let isValidDirname = false;
        let hasValidLevels = false;
        if (__classPrivateFieldGet(this, _Stringable_value, "f").split('/')[0] !== __classPrivateFieldGet(this, _Stringable_value, "f")) {
            parts = __classPrivateFieldGet(this, _Stringable_value, "f").split('/');
            dirname = parts.slice(0, parts.length - levels).join('/');
            isValidDirname = true;
            hasValidLevels = parts.length <= levels + 1;
        }
        if (__classPrivateFieldGet(this, _Stringable_value, "f").split('\\')[0] !== __classPrivateFieldGet(this, _Stringable_value, "f")) {
            parts = __classPrivateFieldGet(this, _Stringable_value, "f").split('\\');
            dirname = parts.slice(0, parts.length - levels).join('\\');
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
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    endsWith(needles) {
        return Str.endsWith(__classPrivateFieldGet(this, _Stringable_value, "f"), needles);
    }
    /**
     * Determine if a given string doesn't end with a given substring.
     *
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    doesntEndWith(needles) {
        return !this.endsWith(needles);
    }
    /**
     * Determine if the string is an exact match with the given value.
     *
     * @param { Stringable|string } value
     *
     * @return { boolean }
     */
    exactly(value) {
        if (value instanceof Stringable) {
            value = value.toString();
        }
        return __classPrivateFieldGet(this, _Stringable_value, "f") === value;
    }
    /**
     * Extracts an excerpt from text that matches the first instance of a phrase.
     *
     * @param { string } phrase
     * @param { object } options
     *
     * @return { string | null }
     */
    excerpt(phrase = '', options = {}) {
        return Str.excerpt(__classPrivateFieldGet(this, _Stringable_value, "f"), phrase, options);
    }
    /**
     * Explode the string into an array.
     *
     * @param { string } delimiter
     * @param { number } limit
     *
     * @return { string[] }
     */
    explode(delimiter, limit = 0) {
        let wordsArray = __classPrivateFieldGet(this, _Stringable_value, "f").split(delimiter);
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
     * @return { string[] }
     */
    split(pattern, limit = -1) {
        var _a;
        const body = RegExpString.make(/^\/(.*)\/\w*$/, pattern);
        const flags = RegExpString.make(/^\/.*\/(\w*)$/, pattern);
        const expression = new RegExp(body, flags + (flags.indexOf('g') !== -1 ? '' : 'g'));
        let segments = __classPrivateFieldGet(this, _Stringable_value, "f").split(expression);
        if (limit !== -1) {
            const position = limit - 1 >= segments.length
                ? segments.length - 1
                : limit - 1;
            segments = [...segments.slice(0, position), segments.splice(position).join('')];
        }
        return (_a = segments.map((segment) => segment.trim())) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Cap a string with a single instance of a given value.
     *
     * @param { string } cap
     *
     * @return { Stringable }
     */
    finish(cap) {
        return new Stringable(Str.finish(__classPrivateFieldGet(this, _Stringable_value, "f"), cap));
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | string[] } pattern
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    is(pattern, ignoreCase = false) {
        return Str.is(pattern, __classPrivateFieldGet(this, _Stringable_value, "f"), ignoreCase);
    }
    /**
     * Determine if a given string is 7-bit ASCII.
     *
     * @return { boolean }
     */
    isAscii() {
        return Str.isAscii(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if a given string is valid JSON.
     *
     * @return { boolean }
     */
    isJson() {
        return Str.isJson(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if a given value is a valid URL.
     *
     * @return { boolean }
     */
    isUrl() {
        return Str.isUrl(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if a given string is a valid UUID.
     *
     * @return { boolean }
     */
    isUuid() {
        return Str.isUuid(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if a given string is a valid ULID.
     *
     * @return { boolean }
     */
    isUlid() {
        return Str.isUlid(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if the given string is empty.
     *
     * @return { boolean }
     */
    isEmpty() {
        return __classPrivateFieldGet(this, _Stringable_value, "f").trim() === '';
    }
    /**
     * Determine if the given string is not empty.
     *
     * @return { boolean }
     */
    isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Convert a string to kebab case.
     *
     * @return { Stringable }
     */
    kebab() {
        return new Stringable(Str.kebab(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Return the length of the given string.
     *
     * @return { number }
     */
    length() {
        return Str.length(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Limit the number of characters in a string.
     *
     * @param { number } limit
     * @param { string } end
     * @param { boolean } preserveWords
     *
     * @return { Stringable }
     */
    limit(limit = 100, end = '...', preserveWords = false) {
        return new Stringable(Str.limit(__classPrivateFieldGet(this, _Stringable_value, "f"), limit, end, preserveWords));
    }
    /**
     * Convert the given string to lower-case.
     *
     * @return { Stringable }
     */
    lower() {
        return new Stringable(Str.lower(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { string } character
     * @param { number } index
     * @param { number | null }length
     *
     * @return { Stringable }
     */
    mask(character, index, length = null) {
        return new Stringable(Str.mask(__classPrivateFieldGet(this, _Stringable_value, "f"), character, index, length));
    }
    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     *
     * @return { Stringable }
     */
    match(pattern) {
        return new Stringable(Str.match(pattern, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | string[] } pattern
     *
     * @return { boolean }
     */
    isMatch(...pattern) {
        return Str.isMatch(pattern, __classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     *
     * @return { string[] }
     */
    matchAll(pattern) {
        return Str.matchAll(pattern, __classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Determine if the string matches the given pattern.
     *
     * @param { string } pattern
     *
     * @return { boolean }
     */
    test(pattern) {
        return this.match(pattern).isNotEmpty();
    }
    /**
     * Remove all non-numeric characters from a string.
     *
     * @return { Stringable }
     */
    numbers() {
        return new Stringable(Str.numbers(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Pad both sides of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { Stringable }
     */
    padBoth(length, pad = ' ') {
        return new Stringable(Str.padBoth(__classPrivateFieldGet(this, _Stringable_value, "f"), length, pad));
    }
    /**
     * Pad the left side of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { Stringable }
     */
    padLeft(length, pad = ' ') {
        return new Stringable(Str.padLeft(__classPrivateFieldGet(this, _Stringable_value, "f"), length, pad));
    }
    /**
     * Pad the right side of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { Stringable }
     */
    padRight(length, pad = ' ') {
        return new Stringable(Str.padRight(__classPrivateFieldGet(this, _Stringable_value, "f"), length, pad));
    }
    /**
     * Call the given callback and return a new string.
     *
     * @param { string | function } callback
     *
     * @return { Stringable }
     */
    pipe(callback) {
        // @ts-ignore
        if (__classPrivateFieldGet(this, _Stringable_value, "f")[callback] instanceof Function) {
            // @ts-ignore
            return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f")[callback]());
        }
        // @ts-ignore
        if (window[callback] instanceof Function) {
            // @ts-ignore
            return new Stringable(window[callback](__classPrivateFieldGet(this, _Stringable_value, "f")));
        }
        // @ts-ignore
        return new Stringable(callback(this).toString());
    }
    /**
     * Get the plural form of an English word.
     *
     * @param { number } count
     *
     * @return { Stringable }
     */
    plural(count = 2) {
        return new Stringable(Str.plural(__classPrivateFieldGet(this, _Stringable_value, "f"), count));
    }
    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { number } count
     *
     * @return { Stringable }
     */
    pluralStudly(count = 2) {
        return new Stringable(Str.pluralStudly(__classPrivateFieldGet(this, _Stringable_value, "f"), count));
    }
    /**
     * Pluralize the last word of an English, Pascal case string.
     *
     * @param { number } count
     *
     * @return { Stringable }
     */
    pluralPascal(count = 2) {
        return new Stringable(Str.pluralPascal(__classPrivateFieldGet(this, _Stringable_value, "f"), count));
    }
    /**
     * Find the multibyte safe position of the first occurrence of the given substring.
     *
     * @param { string } needle
     * @param { number } offset
     *
     * @return { number | false }
     */
    position(needle, offset = 0) {
        return Str.position(__classPrivateFieldGet(this, _Stringable_value, "f"), needle, offset);
    }
    /**
     * Prepend the given values to the string.
     *
     * @param { string | string[] } values
     *
     * @return { Stringable }
     */
    prepend(...values) {
        return new Stringable(values.join('') + __classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Remove any occurrence of the given string in the subject.
     *
     * @param { string } search
     * @param { boolean } caseSensitive
     *
     * @return { Stringable }
     */
    remove(search, caseSensitive = true) {
        return new Stringable(Str.remove(search, __classPrivateFieldGet(this, _Stringable_value, "f"), caseSensitive));
    }
    /**
     * Reverse the string.
     *
     * @return { Stringable }
     */
    reverse() {
        return new Stringable(Str.reverse(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Repeat the string.
     *
     * @param { number } times
     *
     * @return { Stringable }
     */
    repeat(times) {
        return new Stringable(Str.repeat(__classPrivateFieldGet(this, _Stringable_value, "f"), times));
    }
    /**
     * Replace the given value in the given string.
     *
     * @param { string | string[] } search
     * @param { string } replace
     * @param { boolean } caseSensitive
     *
     * @return { Stringable }
     */
    replace(search, replace, caseSensitive = true) {
        return new Stringable(Str.replace(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f"), caseSensitive));
    }
    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param { string } search
     * @param { string[] } replace
     *
     * @return { Stringable }
     */
    replaceArray(search, replace) {
        return new Stringable(Str.replaceArray(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Replace the first occurrence of a given value in the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { Stringable }
     */
    replaceFirst(search, replace) {
        return new Stringable(Str.replaceFirst(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Replace the first occurrence of the given value if it appears at the start of the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { Stringable }
     */
    replaceStart(search, replace) {
        return new Stringable(Str.replaceStart(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Replace the last occurrence of a given value in the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { Stringable }
     */
    replaceLast(search, replace) {
        return new Stringable(Str.replaceLast(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Replace the last occurrence of a given value if it appears at the end of the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { Stringable }
     */
    replaceEnd(search, replace) {
        return new Stringable(Str.replaceEnd(search, replace, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Replace the patterns matching the given regular expression.
     *
     * @param { string } pattern
     * @param { string | function } replace
     *
     * @return { Stringable }
     */
    replaceMatches(pattern, replace) {
        const body = RegExpString.make(/^\/(.*)\/\w*$/, pattern);
        const flags = RegExpString.make(/^\/.*\/(\w*)$/, pattern);
        const expression = new RegExp(body, flags + (flags.indexOf('g') !== -1 ? '' : 'g'));
        if (replace instanceof Function) {
            __classPrivateFieldGet(this, _Stringable_value, "f").replace(expression, (matched) => matched);
        }
        return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f").replace(expression, replace));
    }
    /**
     * Remove all "extra" blank space from the given string.
     *
     * @return { Stringable }
     */
    squish() {
        return new Stringable(Str.squish(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Begin a string with a single instance of a given value.
     *
     * @param { string } prefix
     *
     * @return { Stringable }
     */
    start(prefix) {
        return new Stringable(Str.start(__classPrivateFieldGet(this, _Stringable_value, "f"), prefix));
    }
    /**
     * Convert the given string to upper-case.
     *
     * @return { Stringable }
     */
    upper() {
        return new Stringable(Str.upper(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Convert the given string to title case.
     *
     * @return { Stringable }
     */
    title() {
        return new Stringable(Str.title(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Convert the given string to title case for each word.
     *
     * @return { Stringable }
     */
    headline() {
        return new Stringable(Str.headline(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Convert the given string to APA-style title case.
     *
     * @see https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
     *
     * @return { Stringable }
     */
    apa() {
        return new Stringable(Str.apa(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Get the singular form of an English word.
     *
     * @return { Stringable }
     */
    singular() {
        return new Stringable(Str.singular(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param { string } separator
     * @param { object } dictionary
     *
     * @return { Stringable }
     */
    slug(separator = '-', dictionary = { '@': 'at' }) {
        return new Stringable(Str.slug(__classPrivateFieldGet(this, _Stringable_value, "f"), separator, dictionary));
    }
    /**
     * Convert a string to snake case.
     *
     * @param { string } delimiter
     *
     * @return { Stringable }
     */
    snake(delimiter = '_') {
        return new Stringable(Str.snake(__classPrivateFieldGet(this, _Stringable_value, "f"), delimiter));
    }
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    startsWith(needles) {
        return Str.startsWith(__classPrivateFieldGet(this, _Stringable_value, "f"), needles);
    }
    /**
     * Determine if a given string doesn't start with a given substring.
     *
     * @param { string | string[] } needles
     *
     * @return { boolean }
     */
    doesntStartWith(needles) {
        return Str.doesntStartWith(__classPrivateFieldGet(this, _Stringable_value, "f"), needles);
    }
    /**
     * Convert a value to studly caps case.
     *
     * @return { Stringable }
     */
    studly() {
        return new Stringable(Str.studly(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Convert a value to Pascal case.
     *
     * @return { Stringable }
     */
    pascal() {
        return new Stringable(Str.pascal(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Returns the portion of the string specified by the start and length parameters.
     *
     * @param { number } start
     * @param { number | null } length
     *
     * @return { Stringable }
     */
    substr(start, length = null) {
        return new Stringable(Str.substr(__classPrivateFieldGet(this, _Stringable_value, "f"), start, length));
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
    substrCount(needle, offset = 0, length = null) {
        return Str.substrCount(__classPrivateFieldGet(this, _Stringable_value, "f"), needle, offset, length);
    }
    /**
     * Replace text within a portion of a string.
     *
     * @param { string } replace
     * @param { number } offset
     * @param { number | null } length
     *
     * @return { Stringable }
     */
    substrReplace(replace, offset = 0, length = null) {
        return new Stringable(Str.substrReplace(__classPrivateFieldGet(this, _Stringable_value, "f"), replace, offset, length));
    }
    /**
     * Swap multiple keywords in a string with other keywords.
     *
     * @param { object } map
     *
     * @return { Stringable }
     */
    swap(map) {
        return new Stringable(Str.swap(map, __classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Take the first or last {limit} characters.
     *
     * @param { number } limit
     *
     * @return { Stringable }
     */
    take(limit) {
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
     * @return { Stringable }
     */
    tap(callback) {
        callback(this);
        return this;
    }
    /**
     * Trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { Stringable }
     */
    trim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => __classPrivateFieldSet(this, _Stringable_value, __classPrivateFieldGet(this, _Stringable_value, "f").replaceAll(term, ''), "f"));
        return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f").trim());
    }
    /**
     * Left trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { Stringable }
     */
    ltrim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => __classPrivateFieldSet(this, _Stringable_value, Str.replaceFirst(term, '', __classPrivateFieldGet(this, _Stringable_value, "f")), "f"));
        return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f").trimStart());
    }
    /**
     * Right trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { Stringable }
     */
    rtrim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => __classPrivateFieldSet(this, _Stringable_value, Str.replaceLast(term, '', __classPrivateFieldGet(this, _Stringable_value, "f")), "f"));
        return new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f").trimEnd());
    }
    /**
     * Make a string's first character lowercase.
     *
     * @return { Stringable }
     */
    lcfirst() {
        return new Stringable(Str.lcfirst(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Make a string's first character uppercase.
     *
     * @return { Stringable }
     */
    ucfirst() {
        return new Stringable(Str.ucfirst(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Split a string by uppercase characters.
     *
     * @return { string[] }
     */
    ucsplit() {
        return Str.ucsplit(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Apply the callback if the given "value" is (or resolves to) truthy.
     *
     * @param { boolean|Function } value
     * @param { Function } callback
     * @param { Function|null } fallback
     *
     * @return { Stringable }
     */
    when(value, callback, fallback = null) {
        var _a, _b;
        value = value instanceof Function ? value(this) : value;
        if (value) {
            return (_a = callback(this, value)) !== null && _a !== void 0 ? _a : this;
        }
        else if (fallback) {
            return (_b = fallback(this, value)) !== null && _b !== void 0 ? _b : this;
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
     * @return { Stringable }
     */
    unless(value, callback, fallback = null) {
        var _a, _b;
        value = value instanceof Function ? value(this) : value;
        if (!value) {
            return (_a = callback(this, value)) !== null && _a !== void 0 ? _a : this;
        }
        else if (fallback) {
            return (_b = fallback(this, value)) !== null && _b !== void 0 ? _b : this;
        }
        return this;
    }
    /**
     * Execute the given callback if the string contains a given substring.
     *
     * @param { string | string[] } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenContains(needles, callback, fallback = null) {
        return this.when(this.contains(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string contains all array values.
     *
     * @param { string[] } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenContainsAll(needles, callback, fallback = null) {
        return this.when(this.containsAll(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string is empty.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenEmpty(callback, fallback = null) {
        return this.when(this.isEmpty(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is not empty.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenNotEmpty(callback, fallback = null) {
        return this.when(this.isNotEmpty(), callback, fallback);
    }
    /**
     * Execute the given callback if the string ends with a given substring.
     *
     * @param { string | string[] } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenEndsWith(needles, callback, fallback = null) {
        return this.when(this.endsWith(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string is an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenExactly(value, callback, fallback = null) {
        return this.when(this.exactly(value), callback, fallback);
    }
    /**
     * Execute the given callback if the string is not an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenNotExactly(value, callback, fallback = null) {
        return this.when(!this.exactly(value), callback, fallback);
    }
    /**
     * Execute the given callback if the string matches a given pattern.
     *
     * @param { string | string[] } pattern
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenIs(pattern, callback, fallback = null) {
        return this.when(this.is(pattern), callback, fallback);
    }
    /**
     * Execute the given callback if the string is 7-bit ASCII.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenIsAscii(callback, fallback = null) {
        return this.when(this.isAscii(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is a valid UUID.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenIsUuid(callback, fallback = null) {
        return this.when(this.isUuid(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is a valid ULID.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenIsUlid(callback, fallback = null) {
        return this.when(this.isUlid(), callback, fallback);
    }
    /**
     * Execute the given callback if the string starts with a given substring.
     *
     * @param { string | string[] } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenStartsWith(needles, callback, fallback = null) {
        return this.when(this.startsWith(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string matches the given pattern.
     *
     * @param { string } pattern
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { Stringable }
     */
    whenTest(pattern, callback, fallback = null) {
        return this.when(this.test(pattern), callback, fallback);
    }
    /**
     * Limit the number of words in a string.
     *
     * @param { number } words
     * @param { string } end
     *
     * @return { Stringable }
     */
    words(words = 100, end = '...') {
        return new Stringable(Str.words(__classPrivateFieldGet(this, _Stringable_value, "f"), words, end));
    }
    /**
     * Get the number of words a string contains.
     *
     * @return { number }
     */
    wordCount() {
        return Str.wordCount(__classPrivateFieldGet(this, _Stringable_value, "f"));
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
    wordWrap(characters = 75, breakStr = '\n', cutLongWords = false) {
        return new Stringable(Str.wordWrap(__classPrivateFieldGet(this, _Stringable_value, "f"), characters, breakStr, cutLongWords));
    }
    /**
     * Wrap the string with the given strings.
     *
     * @param { string } before
     * @param { string | null } after
     *
     * @return { Stringable }
     */
    wrap(before, after = null) {
        return new Stringable(Str.wrap(__classPrivateFieldGet(this, _Stringable_value, "f"), before, after));
    }
    /**
     * Unwrap the string with the given strings.
     *
     * @param { string } before
     * @param { string | null } after
     *
     * @return { Stringable }
     */
    unwrap(before, after = null) {
        return new Stringable(Str.unwrap(__classPrivateFieldGet(this, _Stringable_value, "f"), before, after));
    }
    /**
     * Convert the string into a `HtmlString` instance.
     *
     * @return { HTMLElement | Node | string }
     */
    toHtmlString() {
        return new HtmlString(__classPrivateFieldGet(this, _Stringable_value, "f")).toHtml();
    }
    /**
     * Convert the string to Base64 encoding.
     *
     * @return { Stringable }
     */
    toBase64() {
        return new Stringable(Str.toBase64(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Decode the Base64 encoded string.
     *
     * @return { Stringable }
     */
    fromBase64() {
        return new Stringable(Str.fromBase64(__classPrivateFieldGet(this, _Stringable_value, "f")));
    }
    /**
     * Dump the string.
     *
     * @return { void }
     */
    dump() {
        console.log(__classPrivateFieldGet(this, _Stringable_value, "f"));
    }
    /**
     * Dump the string and end the script.
     *
     * @return { void }
     */
    dd() {
        this.dump();
        throw new Error('dd()');
    }
    /**
     * Get the underlying string value.
     *
     * @return { string }
     */
    value() {
        return this.toString();
    }
    /**
     * Get the raw string value.
     *
     * @return { string }
     */
    toString() {
        return __classPrivateFieldGet(this, _Stringable_value, "f");
    }
    /**
     * Get the underlying string value as an integer.
     *
     * @param { number } base
     *
     * @return { number }
     */
    toInteger(base = 10) {
        const value = parseInt(__classPrivateFieldGet(this, _Stringable_value, "f"), base);
        return isNaN(value) || !isFinite(value) ? 0 : value;
    }
    /**
     * Get the underlying string value as a float.
     *
     * @return { number }
     */
    toFloat() {
        return !isNaN(parseFloat(__classPrivateFieldGet(this, _Stringable_value, "f"))) ? parseFloat(__classPrivateFieldGet(this, _Stringable_value, "f")) : 0;
    }
    /**
     * Get the underlying string value as a boolean.
     *
     * Returns true when value is "1", "true", "on", and "yes". Otherwise, returns false.
     *
     * @return { boolean }
     */
    toBoolean() {
        switch (__classPrivateFieldGet(this, _Stringable_value, "f")) {
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
    toDate(format = null, tz = null) {
        var _a;
        if (new Date(__classPrivateFieldGet(this, _Stringable_value, "f")).toString() === 'Invalid Date') {
            return 'Invalid Date';
        }
        if (format === null) {
            return new Date(__classPrivateFieldGet(this, _Stringable_value, "f")).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: tz !== null && tz !== void 0 ? tz : undefined,
            });
        }
        let date = '';
        const now = new Date(new Date(__classPrivateFieldGet(this, _Stringable_value, "f")).toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            fractionalSecondDigits: 3,
            hour12: false,
            timeZone: tz !== null && tz !== void 0 ? tz : undefined,
        }));
        const month = now.getMonth();
        const dayOfTheWeek = now.getDay();
        const dayOfTheMonth = now.getDate();
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        const elements = format.match(/\\?.|./g);
        for (const element of elements) {
            switch (element) {
                // Day of the month, 2 digits with leading zeros (e.g., 01 to 31)
                case 'd':
                    date += Str.padLeft(dayOfTheMonth.toString(), 2, '0');
                    break;
                // A textual representation of a day, three letters (e.g., Mon through Sun)
                case 'D':
                    date += now.toLocaleString('en-US', { weekday: 'short' });
                    break;
                // Day of the month without leading zeros (e.g., 1 to 31)
                case 'j':
                    date += dayOfTheMonth;
                    break;
                // A full textual representation of the day of the week (e.g., Sunday through Saturday)
                case 'l':
                    date += now.toLocaleString('en-US', { weekday: 'long' });
                    break;
                // ISO 8601 numeric representation of the day of the week (e.g., 1 (for Monday) through 7 (for Sunday))
                case 'N':
                    date += dayOfTheWeek !== 0 ? dayOfTheWeek : 0;
                    break;
                // English ordinal suffix for the day of the month, 2 characters (e.g., st, nd, rd or th)
                case 'S': {
                    let suffix = {
                        1: 'st',
                        2: 'nd',
                        3: 'rd',
                        21: 'st',
                        22: 'nd',
                        23: 'rd',
                        31: 'st'
                    };
                    date += (_a = suffix[dayOfTheMonth]) !== null && _a !== void 0 ? _a : 'th';
                    break;
                }
                // Numeric representation of the day of the week (e.g., 0 (for Sunday) through 6 (for Saturday))
                case 'w':
                    date += dayOfTheWeek;
                    break;
                // Numeric representation of the day of the week (e.g., The day of the year (starting from 0))
                case 'z': {
                    let start = new Date(year, 0, 0);
                    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                    let day = 86400000;
                    const currentDay = Math.floor(diff / day);
                    date += currentDay;
                    break;
                }
                // ISO 8601 week number of year, weeks starting on Monday (e.g., 42 (the 42nd week in the year))
                case 'W': {
                    let parsedDate = new Date(Date.UTC(year, month, dayOfTheMonth));
                    let weekDay = parsedDate.getUTCDay() || 7;
                    parsedDate.setUTCDate(parsedDate.getUTCDate() + 4 - weekDay);
                    let yearStart = new Date(Date.UTC(parsedDate.getUTCFullYear(), 0, 1));
                    let weekNumber = Math.ceil((((parsedDate - yearStart) / 86400000) + 1) / 7);
                    date += Str.padLeft((weekNumber.toString()), 2, '0');
                    break;
                }
                // A full textual representation of a month, such as January or March (e.g., January through December)
                case 'F':
                    date += now.toLocaleString('en-US', { month: 'long' });
                    break;
                // Numeric representation of a month, with leading zeros (e.g., 01 through 12)
                case 'm': {
                    const currentMonth = month + 1;
                    date += Str.padLeft(currentMonth.toString(), 2, '0');
                    break;
                }
                // A short textual representation of a month, three letters (e.g., Jan through Dec)
                case 'M':
                    date += now.toLocaleString('en-US', { month: 'short' });
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
                // An expanded full numeric representation of a year, at least 4 digits, with - for years BCE, and + for years CE. (e.g., -0055, +0787, +1999, +10191)
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
                // A full numeric representation of a year, at least 4 digits, with - for years BCE. (e.g., -0055, 0787, 1999, 2003, 10191)
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
                    const hours = now.getUTCHours();
                    const minutes = now.getUTCMinutes();
                    const seconds = now.getUTCSeconds();
                    date += Math.floor((((hours + 1) % 24) + minutes / 60 + seconds / 3600) * 1000 / 24);
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
                    throw new Error('Microseconds are not supported.');
                // Milliseconds. (e.g., 654)
                case 'v': {
                    date += Str.padLeft(milliseconds.toString(), 3, '0');
                    break;
                }
                // Timezone identifier (e.g., UTC, GMT, Atlantic/Azores)
                case 'e': {
                    date += Intl.DateTimeFormat('en-us', { timeZone: tz !== null && tz !== void 0 ? tz : undefined }).resolvedOptions().timeZone;
                    break;
                }
                // Whether the date is in daylight saving time (e.g., 1 if Daylight Saving Time, 0 otherwise)
                case 'I': {
                    let january = new Date(year, 0, 1).getTimezoneOffset();
                    let july = new Date(year, 6, 1).getTimezoneOffset();
                    date += Math.max(january, july) !== now.getTimezoneOffset() ? '1' : '0';
                    break;
                }
                // Difference to Greenwich time (GMT) without colon between hours and minutes (e.g., +0200)
                case 'O': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone: tz !== null && tz !== void 0 ? tz : undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3).replace(':', '') : '+0000';
                    break;
                }
                // Difference to Greenwich time (GMT) with colon between hours and minutes (e.g., +02:00)
                case 'P': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone: tz !== null && tz !== void 0 ? tz : undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3) : '+00:00';
                    break;
                }
                // The same as P, but returns Z instead of +00:00 (e.g., +02:00)
                case 'p': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone: tz !== null && tz !== void 0 ? tz : undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData === 'GMT' ? 'Z' : timeZoneData.substring(3);
                    break;
                }
                // Timezone abbreviation, if known; otherwise the GMT offset (e.g., EST, MDT, +05)
                case 'T': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'short',
                        timeZone: tz !== null && tz !== void 0 ? tz : undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();
                    date += tz !== null && tz !== void 0 ? tz : timeZoneData.replace('GMT', 'UTC').split(/[+-]/)[0];
                    break;
                }
                // Timezone offset in seconds.
                // The offset for timezones west of UTC is always negative,
                // and for those east of UTC is always positive. (e.g., -43200 through 50400)
                case 'Z': {
                    const timezone = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone: tz !== null && tz !== void 0 ? tz : undefined
                    });
                    const symbol = timezone.match(/[+-]/);
                    const data = timezone.split(/[+-]/);
                    const sign = symbol ? symbol.pop() : '+';
                    const offset = data.length === 2 ? data[1] : '0:00';
                    const hours = parseInt(offset.split(':')[0]);
                    const minutes = parseInt(offset.split(':')[1]);
                    const offsetInSeconds = hours * 3600 + minutes * 60;
                    date += `${sign}${offsetInSeconds}`;
                    break;
                }
                // ISO 8601 date (e.g., 2004-02-12T15:19:21+00:00)
                case 'c': {
                    date += `${this.toDate('Y-m-d\\TH:i:sP')}`;
                    break;
                }
                // RFC 2822/RFC 5322 formatted date (e.g., Thu, 21 Dec 2000 16:01:07 +0200)
                case 'r': {
                    date += new Stringable(__classPrivateFieldGet(this, _Stringable_value, "f")).toDate('D, d M Y H:i:s O', tz);
                    break;
                }
                // Seconds since the Unix Epoch (e.g., January 1, 1970 00:00:00 GMT)
                case 'U': {
                    date += Math.floor(now.getTime() / 1000);
                    break;
                }
                default:
                    date += element.length >= 2 && element.indexOf('\\') > -1 ? element.replace('\\', '') : element;
            }
        }
        return date;
    }
}
_Stringable_value = new WeakMap();
class HtmlString {
    /**
     * Create a new HTML string instance.
     *
     * @param { string } html
     *
     * @return void
     */
    constructor(html = '') {
        /**
         * The HTML string.
         *
         * @type { string }
         */
        _HtmlString_html.set(this, void 0);
        __classPrivateFieldSet(this, _HtmlString_html, html, "f");
    }
    /**
     * Get the HTML string.
     *
     * @return { HtmlStringType }
     */
    toHtml() {
        const pattern = /(?!<!DOCTYPE)<([^\s>]+)(\s|>)+/;
        const tag = RegExp(pattern).exec(__classPrivateFieldGet(this, _HtmlString_html, "f"));
        if (!tag) {
            return __classPrivateFieldGet(this, _HtmlString_html, "f");
        }
        const DOM = document.createElement(tag[1]);
        DOM.innerHTML = __classPrivateFieldGet(this, _HtmlString_html, "f");
        return tag[1] === 'html' ? DOM : DOM.firstChild;
    }
    /**
     * Determine if the given HTML string is empty.
     *
     * @return { boolean }
     */
    isEmpty() {
        return __classPrivateFieldGet(this, _HtmlString_html, "f") === '';
    }
    /**
     * Determine if the given HTML string is not empty.
     *
     * @return { boolean }
     */
    isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Get the HTML string.
     *
     * @return { string }
     */
    toString() {
        const html = this.toHtml();
        if (html instanceof HTMLElement) {
            return html.outerHTML;
        }
        if (html instanceof Node) {
            return html.textContent;
        }
        return html;
    }
}
_HtmlString_html = new WeakMap();
class RegExpString {
    /**
     * Build the Regular Expression string from the given parameter.
     *
     * @param { RegExp } pattern
     * @param { string } string
     *
     * @return { string }
     */
    static make(pattern, string) {
        if (string === '') {
            throw new Error('Empty regular expression.');
        }
        if (!string.startsWith('/')) {
            throw new Error('Delimiter must not be alphanumeric, backslash, or NUL.');
        }
        if (string.startsWith('/') && string.length === 1 || !string.endsWith('/')) {
            throw new Error('No ending delimiter \'/\'.');
        }
        const expression = new RegExp(pattern).exec(string);
        return expression ? expression[1] : '';
    }
}
/**
 * Get a new Stringable object from the given string.
 *
 * @param { string } string
 *
 * @return Stringable
 */
function str(string = '') {
    return Str.of(string);
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
function preg_quote(string, delimiter = null) {
    const characters = [
        '-', '.', '\\', '+', '*', '?', '[', '^', ']',
        '$', '(', ')', '{', '}', '=', '!', '<', '>',
        '|', ':', delimiter
    ];
    const escaped = characters.filter(Boolean).map((character) => `\\${character}`).join('');
    return string.replace(new RegExp(`[${escaped}]`, 'g'), '\\$&');
}
/**
 * Uppercase the first character of each word in a string
 *
 * @param { string } string The input string.
 * @param { string } separators The optional separators contains the word separator characters.

 * @return { string } String the modified string.
 */
function ucwords(string, separators = ' \t\r\n\f\v') {
    return string.split(separators).map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); }).join(' ');
}
/**
 * Attempt to match the case on two strings.
 *
 * @param { string} value
 * @param { string } comparison
 *
 * @return { string }
 */
function matchCase(value, comparison) {
    const cases = [
        (string) => string.toLowerCase(),
        (string) => string.toUpperCase(),
        (string) => string.charAt(0).toUpperCase() + string.slice(1),
        (string) => string.replace(/\b\w/g, (char) => char.toUpperCase())
    ];
    for (const matcher of cases) {
        if (matcher(comparison) === comparison) {
            return matcher(value);
        }
    }
    return value;
}
if (typeof exports != 'undefined') {
    module.exports.Str = Str;
    module.exports.Stringable = Stringable;
    module.exports.HtmlString = HtmlString;
    module.exports.str = str;
}
if (typeof global !== 'undefined') {
    const _global = global;
    _global.Mode = Mode;
    _global.Str = Str;
    _global.Stringable = Stringable;
    _global.HtmlString = HtmlString;
    _global.str = str;
}
//# sourceMappingURL=main.js.map