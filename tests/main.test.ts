import { HtmlStringType, Mode, str, Str, Stringable } from '../src/main';

beforeEach((): void => {
    Str.createRandomStringsNormally();
    Str.createUuidsNormally();
    Str.createUlidsNormally();
});

describe('Strings', (): void => {
    describe('Str.of', (): void => {
        test('returns instance of Stringable', (): void => {
            expect(Str.of('foo')).toBeInstanceOf(Stringable);
        });
    });

    describe('Str.after', (): void => {
        test('returns everything after the given value in a string', (): void => {
            expect(Str.after('This is my name', 'This is')).toEqual(' my name');
        });
    });

    describe('Str.afterLast', (): void => {
        test('returns everything after the last occurrence of the given value in a string', (): void => {
            expect(Str.afterLast('App\\Http\\Controllers\\Controller', '\\')).toEqual('Controller');
        });
    });

    describe('Str.ascii', (): void => {
        test('transliterates accented characters to ASCII equivalents', (): void => {
            expect(Str.ascii('ü')).toEqual('u');
            expect(Str.ascii('é')).toEqual('e');
            expect(Str.ascii('ñ')).toEqual('n');
            expect(Str.ascii('ç')).toEqual('c');
            expect(Str.ascii('å')).toEqual('a');
        });

        test('removes diacritical marks', (): void => {
            expect(Str.ascii('c\u0327')).toEqual('c');
            expect(Str.ascii('e\u0301')).toEqual('e');
            expect(Str.ascii('a\u0308')).toEqual('a');
        });

        test('handles strings with only non-alphanumeric characters', (): void => {
            expect(Str.ascii('!@#$%^&*()_+-=')).toEqual('!@#$%^&*()_+-=');
            expect(Str.ascii('   ')).toEqual('   ');
        });

        test('preserves case for ASCII letters', (): void => {
            expect(Str.ascii('HelloWorld')).toEqual('HelloWorld');
            expect(Str.ascii('HELLOworld')).toEqual('HELLOworld');
        });

        test('handles mixed input', (): void => {
            expect(Str.ascii('Héllö Wörld! 123')).toEqual('Hello World! 123');
            expect(Str.ascii('Café au lait')).toEqual('Cafe au lait');
            expect(Str.ascii('Mëtàl Hëàd')).toEqual('Metal Head');
        });
    });

    describe('Str.before', (): void => {
        test('returns everything before the given value in a string', (): void => {
            expect(Str.before('This is my name', 'my name')).toEqual('This is ');
        });
    });

    describe('Str.beforeLast', (): void => {
        test('returns everything before the last occurrence of the given value in a string', (): void => {
            expect(Str.beforeLast('This is my name', 'is')).toEqual('This ');
        });
    });

    describe('Str.between', (): void => {
        test('returns the portion of a string between two values', (): void => {
            expect(Str.between('This is my name', 'This', 'name')).toEqual(' is my ');
        });
    });

    describe('Str.betweenFirst', (): void => {
        test('returns the smallest possible portion of a string between two values', (): void => {
            expect(Str.betweenFirst('[a] bc [d]', '[', ']')).toEqual('a');
        });
    });

    describe('Str.camel', (): void => {
        test('converts the given string to camelCase', (): void => {
            expect(Str.camel('foo_bar')).toEqual('fooBar');
        });
    });

    describe('Str.charAt', (): void => {
        test('returns the character at the specified index', (): void => {
            expect(Str.charAt('This is my name.', 6)).toEqual('s');
        });
    });

    describe('Str.chopStart', (): void => {
        test('removes the given string if it exists at the start of the subject', (): void => {
            expect(Str.chopStart('Hello, world!', 'Hello, ')).toEqual('world!');
        });

        test('removes the first matching string from an array of needles', (): void => {
            expect(Str.chopStart('Hello, world!', ['Hello, ', 'Hi, '])).toEqual('world!');
        });

        test('removes only the first matching string when both are found at the start', (): void => {
            expect(Str.chopStart('Hello, Hello, world!', ['Hello, ', 'Hello, '])).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the start of the subject', (): void => {
            expect(Str.chopStart('Hello, world!', 'world')).toEqual('Hello, world!');
        });
    });

    describe('Str.chopEnd', (): void => {
        test('removes the given string if it exists at the end of the subject', (): void => {
            expect(Str.chopEnd('Hello, world!', 'world!')).toEqual('Hello, ');
        });

        test('removes the first matching string from an array of needles', (): void => {
            expect(Str.chopEnd('Hello, world!', ['world!', 'planet!'])).toEqual('Hello, ');
        });

        test('removes only the first matching string when both are found at the end', (): void => {
            expect(Str.chopEnd('Hello, world!world!', ['world!', 'world!'])).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the end of the subject', (): void => {
            expect(Str.chopEnd('Hello, world!', 'Hello')).toEqual('Hello, world!');
        });
    });

    describe('Str.contains', (): void => {
        test('determines if the given string contains the given value', (): void => {
            expect(Str.contains('This is my name', 'my')).toBeTruthy();
        });

        test('determines if the given string contains any of the values in the array', (): void => {
            expect(Str.contains('This is my name', ['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string contains the given value case-insensitively', (): void => {
            expect(Str.contains('This is my name', 'MY', true)).toBeTruthy();
        });
    });

    describe('Str.containsAll', (): void => {
        test('determines if the given string contains all the values in a given array', (): void => {
            expect(Str.containsAll('This is my name', ['my', 'name'])).toBeTruthy();
        });

        test('determines if the given string contains all the values in a given array case-insensitively', (): void => {
            expect(Str.contains('This is my name', ['MY', 'NAME'], true)).toBeTruthy();
        });
    });

    describe('Str.doesntContain', (): void => {
        test('determines if the given string doesnt contain the given value', (): void => {
            expect(Str.doesntContain('This is name', 'my')).toBeTruthy();
        });

        test('determines if the given string doesnt contain any of the values in the array', (): void => {
            expect(Str.doesntContain('This is name', ['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string doesnt contain the given value case-insensitively', (): void => {
            expect(Str.doesntContain('This is name', 'MY', true)).toBeTruthy();
        });
    });

    describe('Str.convertCase', (): void => {
        test('converts the case of a string', (): void => {
            expect(Str.convertCase('HeLLo')).toEqual('hello');
            expect(Str.convertCase('hello', Mode.MB_CASE_UPPER)).toEqual('HELLO');
            expect(Str.convertCase('WORLD', Mode.MB_CASE_LOWER)).toEqual('world');
            expect(Str.convertCase('hello world', Mode.MB_CASE_TITLE)).toEqual('Hello World');
            expect(Str.convertCase('HeLLo', Mode.MB_CASE_FOLD)).toEqual('hello');
            expect(Str.convertCase('hello', Mode.MB_CASE_UPPER_SIMPLE)).toEqual('HELLO');
            expect(Str.convertCase('HELLO', Mode.MB_CASE_LOWER_SIMPLE)).toEqual('hello');
            expect(Str.convertCase('hello world', Mode.MB_CASE_TITLE_SIMPLE)).toEqual('Hello World');
            expect(Str.convertCase('HeLLo', Mode.MB_CASE_FOLD_SIMPLE)).toEqual('hello');
            expect(Str.convertCase('üöä', Mode.MB_CASE_UPPER)).toEqual('ÜÖÄ');
            expect(Str.convertCase('ÜÖÄ', Mode.MB_CASE_LOWER)).toEqual('üöä');
        });

        test('throws error for invalid mode', (): void => {
            expect((): string => Str.convertCase('test', -1)).toThrow('Argument #2 (mode) must be one of the Mode.MB_CASE_* constants');
            expect((): string => Str.convertCase('test', -1 as Mode)).toThrow('Argument #2 (mode) must be one of the Mode.MB_CASE_* constants');
        });
    });

    describe('Str.deduplicate', (): void => {
        test('replace consecutive instances of a given character with a single character in the given string', (): void => {
            expect(Str.deduplicate(' laravel   php  framework ')).toEqual(' laravel php framework ');
            expect(Str.deduplicate('whaaat', 'a')).toEqual('what');
            expect(Str.deduplicate('/some//odd//path/', '/')).toEqual('/some/odd/path/');
        });

        test('replace consecutive instances of multiple characters when given an array', (): void => {
            expect(Str.deduplicate('a--b++c**d', ['-', '+', '*'])).toEqual('a-b+c*d');
            expect(Str.deduplicate('  hello  !!world??  ', [' ', '!', '?'])).toEqual(' hello !world? ');
            expect(Str.deduplicate('mixed...spaces   and---dashes', ['.', ' ', '-'])).toEqual('mixed.spaces and-dashes');
        });
    });

    describe('Str.endsWith', (): void => {
        test('determines if the given string ends with the given value', (): void => {
            expect(Str.endsWith('This is my name', 'name')).toBeTruthy();
        });

        test('determines if the given string ends with any of the values in the array', (): void => {
            expect(Str.endsWith('This is my name', ['name', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string does not end with the given value', (): void => {
            expect(Str.endsWith('This is my name', 'names')).toBeFalsy();
        });

        test('returns false if the given string does not end with any of the values in the array', (): void => {
            expect(Str.endsWith('This is my name', ['this', 'foo'])).toBeFalsy();
        });
    });

    describe('Str.doesntEndWith', (): void => {
        test('determines if the given string does not end with the given value', (): void => {
            expect(Str.doesntEndWith('This is my name', 'names')).toBeTruthy();
        });

        test('determines if the given string does not end with any of the values in the array', (): void => {
            expect(Str.doesntEndWith('This is my name', ['names', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string ends with the given value', (): void => {
            expect(Str.doesntEndWith('This is my name', 'name')).toBeFalsy();
        });

        test('returns false if the string ends with the given value', (): void => {
            expect(Str.doesntEndWith('This is my name', ['name', 'foo'])).toBeFalsy();
        });
    });

    describe('Str.excerpt', (): void => {
        test('extracts an excerpt from a given string that matches the first instance of a phrase', (): void => {
            expect(Str.excerpt('This is my name', 'my', { 'radius': 3 })).toEqual('...is my na...');
        });

        test('allows definition of custom omission strings', (): void => {
            expect(Str.excerpt('This is my name', 'name', { 'radius': 3, 'omission': '(...) ' })).toEqual('(...) my name');
        });
    });

    describe('Str.finish', (): void => {
        test('adds a single instance of the given value to a string if it does not already end with that value', (): void => {
            expect(Str.finish('this/string', '/')).toEqual('this/string/');
        });

        test('does not add a value to a string that already ends with that value', (): void => {
            expect(Str.finish('this/string/', '/')).toEqual('this/string/');
        });
    });

    describe('Str.wrap', (): void => {
        test('wraps the given string with an additional string or a pair of strings', (): void => {
            expect(Str.wrap('Laravel', '"')).toEqual('"Laravel"');
            expect(Str.wrap('is', 'This ', ' Laravel!')).toEqual('This is Laravel!');
        });
    });

    describe('Str.unwrap', (): void => {
        test('removes the specified strings from the beginning and end of a given string', (): void => {
            expect(Str.unwrap('-Laravel-', '-')).toEqual('Laravel');
            expect(Str.unwrap('{framework: "Laravel"}', '{', '}')).toEqual('framework: "Laravel"');
        });
    });

    describe('Str.is', (): void => {
        test('determines if a given string matches a given pattern', (): void => {
            expect(Str.is('a', 'a')).toBeTruthy();
            expect(Str.is('foo*', 'foobar')).toBeTruthy();
            expect(Str.is('baz*', 'foobar')).toBeFalsy();
            expect(Str.is(['a*', 'b*'], 'b/')).toBeTruthy();
            expect(Str.is(['a*', 'b*'], 'f/')).toBeFalsy();
        });

        test('determines if a given string matches a given pattern case-insensitively', (): void => {
            expect(Str.is('A', 'a', true)).toBeTruthy();
            expect(Str.is('FOO*', 'foobar', true)).toBeTruthy();
            expect(Str.is('baz*', 'foobar', true)).toBeFalsy();
            expect(Str.is(['A*', 'B*'], 'b/', true)).toBeTruthy();
            expect(Str.is(['A*', 'B*'], 'f/', true)).toBeFalsy();
        });
    });

    describe('Str.isAscii', (): void => {
        test('determines if a given string is 7-bit ASCII', (): void => {
            expect(Str.isAscii('Taylor')).toBeTruthy();
            expect(Str.isAscii('ü')).toBeFalsy();
        });
    });

    describe('Str.isJson', (): void => {
        test('determines if the given string is valid JSON', (): void => {
            expect(Str.isJson('[1,2,3]')).toBeTruthy();
            expect(Str.isJson('{"first": "John", "last": "Doe"}')).toBeTruthy();
            expect(Str.isJson('{first: "John", last: "Doe"}')).toBeFalsy();
        });
    });

    describe('Str.isUrl', (): void => {
        test('determines if the given string is a valid URL', (): void => {
            expect(Str.isUrl('https://example.com')).toBeTruthy();
            expect(Str.isUrl('laravel')).toBeFalsy();
        });
    });

    describe('Str.isUuid', (): void => {
        test('determines if the given string is a valid UUID', (): void => {
            expect(Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de')).toBeTruthy();
            expect(Str.isUuid('laravel')).toBeFalsy();
        });
    });

    describe('Str.isUlid', (): void => {
        test('determines if the given string is a valid ULID', (): void => {
            expect(Str.isUlid('01gd6r360bp37zj17nxb55yv40')).toBeTruthy();
            expect(Str.isUlid('laravel')).toBeFalsy();
        });
    });

    describe('Str.kebab', (): void => {
        test('converts the given string to kebab-case', (): void => {
            expect(Str.kebab('fooBar')).toEqual('foo-bar');
        });
    });

    describe('Str.length', (): void => {
        test('returns the length of the given string', (): void => {
            expect(Str.length('Laravel')).toEqual(7);
        });
    });

    describe('Str.limit', (): void => {
        test('truncates the given string to the specified length', (): void => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20)).toEqual('The quick brown fox...');
        });

        test('truncates the string and appends a custom string', (): void => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)')).toEqual('The quick brown fox (...)');
        });

        test('respects word boundaries if \'preserveWord\' is set to true', (): void => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, '...', true)).toEqual('The quick brown...');
        });
    });

    describe('Str.lower', (): void => {
        test('converts the given string to lowercase', (): void => {
            expect(Str.lower('LARAVEL')).toEqual('laravel');
        });
    });

    describe('Str.words', (): void => {
        test('limits the number of words in a string', (): void => {
            expect(Str.words('Perfectly balanced, as all things should be.', 3, ' >>>')).toEqual('Perfectly balanced, as >>>');
        });
    });

    describe('Str.mask', (): void => {
        test('masks a portion of a string with a repeated character', (): void => {
            expect(Str.mask('taylor@example.com', '*', 3)).toEqual('tay***************');
            expect(Str.mask('taylor@example.com', '*', -15, 3)).toEqual('tay***@example.com');
        });
    });

    describe('Str.match', (): void => {
        test('returns the portion of a string that matches a given regular expression pattern', (): void => {
            expect(Str.match(/bar/, 'foo bar')).toEqual('bar');
        });

        test('returns the portion of a string that matches a regular expression with a capturing group', (): void => {
            expect(Str.match(/foo (.*)/, 'foo bar')).toEqual('bar');
        });
    });

    describe('Str.isMatch', (): void => {
        test('determines if the string matches a given regular expression', (): void => {
            expect(Str.isMatch(/foo (.*)/, 'foo bar')).toBeTruthy();
            expect(Str.isMatch(/foo (.*)/, 'laravel')).toBeFalsy();
        });

        test('determines if the string matches a given array of regular expression', (): void => {
            expect(Str.isMatch([/.*,.*!/, /H.o/], 'Hello, Laravel!')).toBeTruthy();
            expect(Str.isMatch([/.*,.*!/, /H.o/], 'Hello, Laravel')).toBeFalsy();
        });
    });

    describe('Str.matchAll', (): void => {
        test('returns an array containing portions of a string that match a given regular expression pattern', (): void => {
            expect(Str.matchAll(/bar/, 'bar foo bar')).toEqual(['bar', 'bar']);
        });

        test('returns an empty array when there are no matches', (): void => {
            expect(Str.matchAll(/baz/, 'bar foo bar')).toEqual([]);
        });

        test('returns an array containing matches of a regular expression with a capturing group', (): void => {
            expect(Str.matchAll(/f(\w*)/, 'bar fun bar fly')).toEqual(['un', 'ly']);
        });
    });

    describe('Str.numbers', (): void => {
        test('removes all non-numeric characters from a string', (): void => {
            expect(Str.numbers('(555) 123-4567')).toEqual('5551234567');
            expect(Str.numbers('L4r4v3l!')).toEqual('443');
            expect(Str.numbers('Laravel!')).toEqual('');
        });
    });

    describe('Str.padBoth', (): void => {
        test('pads both sides of a string until the final string reaches a desired length', (): void => {
            expect(Str.padBoth('James', 10, '_')).toEqual('__James___');
            expect(Str.padBoth('James', 10)).toEqual('  James   ');
        });
    });

    describe('Str.padLeft', (): void => {
        test('pads the left side of a string until the final string reaches a desired length', (): void => {
            expect(Str.padLeft('James', 10, '-=')).toEqual('-=-=-James');
            expect(Str.padLeft('James', 10)).toEqual('     James');
        });
    });

    describe('Str.padRight', (): void => {
        test('pads the right side of a string until the final string reaches a desired length', (): void => {
            expect(Str.padRight('James', 10, '-')).toEqual('James-----');
            expect(Str.padRight('James', 10)).toEqual('James     ');
        });
    });

    describe('Str.plural', (): void => {
        test('converts singular to plural for regular nouns', (): void => {
            expect(Str.plural('car')).toBe('cars');
            expect(Str.plural('book')).toBe('books');
            expect(Str.plural('apple')).toBe('apples');
        });

        test('handles count parameter correctly', (): void => {
            expect(Str.plural('child', 1)).toBe('child');
            expect(Str.plural('child', 2)).toBe('children');
            expect(Str.plural('person', 1)).toBe('person');
            expect(Str.plural('person', 3)).toBe('people');
        });

        test('converts irregular nouns correctly', (): void => {
            // A
            expect(Str.plural('alumna')).toBe('alumnae');
            expect(Str.plural('analysis')).toBe('analyses');
            expect(Str.plural('axis')).toBe('axes');

            // B-C
            expect(Str.plural('bacterium')).toBe('bacteria');
            expect(Str.plural('child')).toBe('children');
            expect(Str.plural('crisis')).toBe('crises');

            // D-F
            expect(Str.plural('datum')).toBe('data');
            expect(Str.plural('foot')).toBe('feet');
            expect(Str.plural('fungus')).toBe('fungi');

            // G-M
            expect(Str.plural('goose')).toBe('geese');
            expect(Str.plural('man')).toBe('men');
            expect(Str.plural('mouse')).toBe('mice');

            // N-S
            expect(Str.plural('nucleus')).toBe('nuclei');
            expect(Str.plural('person')).toBe('people');
            expect(Str.plural('thesis')).toBe('theses');

            // T-Z
            expect(Str.plural('tooth')).toBe('teeth');
            expect(Str.plural('wife')).toBe('wives');
            expect(Str.plural('zombie')).toBe('zombies');
        });

        test('handles uncountable nouns correctly', (): void => {
            expect(Str.plural('sheep')).toBe('sheep');
            expect(Str.plural('fish')).toBe('fish');
            expect(Str.plural('series')).toBe('series');
            expect(Str.plural('money')).toBe('money');
            expect(Str.plural('information')).toBe('information');
            expect(Str.plural('equipment')).toBe('equipment');
        });

        test('handles special pluralization rules', (): void => {
            // -f/-fe → -ves
            expect(Str.plural('leaf')).toBe('leaves');
            expect(Str.plural('knife')).toBe('knives');

            // -y → -ies
            expect(Str.plural('city')).toBe('cities');
            expect(Str.plural('baby')).toBe('babies');

            // -o → -oes
            expect(Str.plural('potato')).toBe('potatoes');
            expect(Str.plural('volcano')).toBe('volcanoes');

            // -us → -i
            expect(Str.plural('cactus')).toBe('cacti');
            expect(Str.plural('focus')).toBe('foci');

            // -is → -es
            expect(Str.plural('analysis')).toBe('analyses');
            expect(Str.plural('basis')).toBe('bases');

            // -ix → -ices
            expect(Str.plural('matrix')).toBe('matrices');
            expect(Str.plural('index')).toBe('indices');
        });

        test('handles compound words and special cases', (): void => {
            expect(Str.plural('passerby')).toBe('passersby');
            expect(Str.plural('runner-up')).toBe('runners-up');
        });

        test('handles words with multiple plural forms', (): void => {
            expect(Str.plural('octopus')).toBe('octopuses');
            expect(Str.plural('hoof')).toBe('hoofs');
        });

        test('preserves case sensitivity', (): void => {
            expect(Str.plural('Hero')).toBe('Heroes');
            expect(Str.plural('CHILD')).toBe('CHILDREN');
            expect(Str.plural('Analysis')).toBe('Analyses');
        });

        test('handles edge cases', (): void => {
            expect(Str.plural('')).toBe('');
            expect(Str.plural(' ')).toBe(' ');
            expect(Str.plural('sheep', 0)).toBe('sheep');
            expect(Str.plural('person', 1.5)).toBe('people');
        });
    });

    describe('Str.pluralStudly', (): void => {
        test('converts a singular word string formatted in studly caps case to its plural form', (): void => {
            expect(Str.pluralStudly('VerifiedHuman')).toEqual('VerifiedHumans');
            expect(Str.pluralStudly('UserFeedback')).toEqual('UserFeedback');
            expect(Str.pluralStudly('VerifiedHuman', 2)).toEqual('VerifiedHumans');
            expect(Str.pluralStudly('VerifiedHuman', 1)).toEqual('VerifiedHuman');
        });
    });

    describe('Str.pluralPascal', (): void => {
        test('converts a singular word string formatted in Pascal case to its plural form', (): void => {
            expect(Str.pluralPascal('VerifiedHuman')).toEqual('VerifiedHumans');
            expect(Str.pluralPascal('UserFeedback')).toEqual('UserFeedback');
            expect(Str.pluralPascal('VerifiedHuman', 2)).toEqual('VerifiedHumans');
            expect(Str.pluralPascal('VerifiedHuman', 1)).toEqual('VerifiedHuman');
        });
    });

    describe('Str.password', (): void => {
        test('generates a secure, random password of a given length', (): void => {
            expect(Str.password()).toHaveLength(32);
            expect(Str.password(12)).toHaveLength(12);
        });

        test('includes letters when "letters" when is set to true', (): void => {
            expect(Str.password(12, true, false, false, false)).toMatch(/^[a-zA-Z]+$/);
        });

        test('excludes letters when "letters" when is set to false', (): void => {
            expect(Str.password(12, false, true, true, true)).not.toMatch(/[a-zA-Z]/);
        });

        test('includes numbers when "numbers" when is set to true', (): void => {
            expect(Str.password(12, false, true, false, false)).toMatch(/^\d+$/);
        });

        test('excludes numbers when "numbers" when is set to false', (): void => {
            expect(Str.password(12, true, false, true, true)).not.toMatch(/\d/);
        });

        test('includes symbols when "symbols" when is set to true', (): void => {
            expect(Str.password(12, false, false, true, false)).toMatch(/^[~!#$%^&*()\-_.,<>?\/\\{}[\]|:;]+$/);
        });

        test('excludes symbols when "symbols" when is set to false', (): void => {
            expect(Str.password(12, true, true, false, true)).not.toMatch(/[~!#$%^&*()\-_.,<>?\/\\{}[\]|:;]/);
        });

        test('includes spaces when "spaces" when is set to true', (): void => {
            expect(Str.password(12, true, true, true, true)).toContain(' ');
        });

        test('excludes spaces when "spaces" when is set to false', (): void => {
            expect(Str.password(12, true, true, true, false)).not.toContain(' ');
        });
    });

    describe('Str.position', (): void => {
        test('returns the position of the first occurrence of a substring in a string', (): void => {
            expect(Str.position('Hello, World!', 'Hello')).toEqual(0);
        });

        test('returns the position of the first occurrence of a substring in a string', (): void => {
            expect(Str.position('Hello, World!', 'W')).toEqual(7);
        });
    });

    describe('Str.random', (): void => {
        test('generates a random string of the specified length', (): void => {
            expect(Str.random(40)).toHaveLength(40);
        });
    });

    describe('Str.createRandomStringsUsing', (): void => {
        test('creates random strings using the specified callback', (): void => {
            Str.createRandomStringsUsing((length: number): string => `length:${length}`);

            expect(Str.random(7)).toEqual('length:7');
            expect(Str.random(7)).toEqual('length:7');

            Str.createRandomStringsNormally();

            expect(Str.random(7)).not.toEqual('length:7');
        });
    });

    describe('Str.createRandomStringsUsingSequence', (): void => {
        test('returns strings from the sequence in order', (): void => {
            Str.createRandomStringsUsingSequence(['first', undefined, 'second', 'third']);

            expect(Str.random()).toBe('first');
            expect(Str.random()).toHaveLength(16);
            expect(Str.random()).toBe('second');
            expect(Str.random()).toBe('third');
            expect(Str.random()).toHaveLength(16);
        });

        test('uses default fallback when none provided', (): void => {
            Str.createRandomStringsUsingSequence([Str.random(), Str.random()], (): never => {
                throw new Error('Out of random strings.');
            });

            Str.random();
            Str.random();

            expect((): string => Str.random()).toThrow('Out of random strings.');
        });
    });

    describe('Str.createRandomStringsNormally', (): void => {
        test('resets random string generation to default behavior', (): void => {
            Str.createRandomStringsUsingSequence(['first', 'second']);

            expect(Str.random()).toBe('first');
            expect(Str.random()).toBe('second');

            Str.createRandomStringsNormally();

            const first: string = Str.random();
            const second: string = Str.random();

            expect(first).toHaveLength(16);
            expect(second).toHaveLength(16);
            expect(first).not.toEqual(second);
        });
    });

    describe('Str.repeat', (): void => {
        test('repeats the given string', (): void => {
            expect(Str.repeat('a', 5)).toEqual('aaaaa');
        });
    });

    describe('Str.replaceArray', (): void => {
        test('replaces a given value in the string sequentially using an array', (): void => {
            expect(Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?')).toEqual('The event will take place between 8:30 and 9:00');
        });
    });

    describe('Str.replace', (): void => {
        test('replaces a given string within the string', (): void => {
            expect(Str.replace('9.x', '10.x', 'Laravel 9.x')).toEqual('Laravel 10.x');
            expect(Str.replace('framework', 'Laravel', 'Framework 10.x', false)).toEqual('Laravel 10.x');
        });
    });

    describe('Str.replaceFirst', (): void => {
        test('replaces the first occurrence of a given value in a string', (): void => {
            expect(Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('a quick brown fox jumps over the lazy dog');
        });
    });

    describe('Str.replaceStart', (): void => {
        test('replaces the first occurrence of the given value only if the value appears at the start of the string', (): void => {
            expect(Str.replaceStart('Hello', 'Laravel', 'Hello World')).toEqual('Laravel World');
            expect(Str.replaceStart('World', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.replaceLast', (): void => {
        test('replaces the last occurrence of a given value in a string', (): void => {
            expect(Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('the quick brown fox jumps over a lazy dog');
        });
    });

    describe('Str.replaceEnd', (): void => {
        test('replaces the last occurrence of the given value only if the value appears at the end of the string', (): void => {
            expect(Str.replaceEnd('World', 'Laravel', 'Hello World')).toEqual('Hello Laravel');
            expect(Str.replaceEnd('Hello', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.replaceMatches', (): void => {
        test('replaces all portions of a string matching a pattern with the given replacement string', (): void => {
            expect(Str.replaceMatches(/baz/, 'bar', 'foo bar baz')).toEqual('foo bar bar');
            expect(Str.replaceMatches(/404/, 'found', 'foo bar baz')).toEqual('foo bar baz');
        });

        test('replaces all portions of a string matching a pattern with the given array of replacement strings', (): void => {
            expect(Str.replaceMatches([/bar/, /baz/], ['XXX', 'YYY'], 'foo bar baz')).toEqual('foo XXX YYY');
            expect(Str.replaceMatches([/bar/, /baz/], ['XXX'], 'foo bar baz')).toEqual('foo XXX ');
        });

        test('replaces all portions of a string matching a pattern with the given callback as a replacement', (): void => {
            expect(Str.replaceMatches(/\d/, (matches: string[]): string => `[${matches[0]}]`, '123')).toEqual('[1][2][3]');
            expect(Str.replaceMatches(/ba(.)/, (matches: [string, string]): string => `ba${(matches[1]).toUpperCase()}`, 'foo baz bar')).toEqual('foo baZ baR');
        });

        test('limits the number of replacements when "limit" value is provided', (): void => {
            expect(Str.replaceMatches(/ba(.)/, 'bar', 'foo baz baz', 1)).toEqual('foo bar baz');
            expect(Str.replaceMatches(/\d/, (matches: string[]): string => `[${matches[0]}]`, '123', 1)).toEqual('[1]23');
        });
    });

    describe('Str.remove', (): void => {
        test('removes the given value or array of values from the string', (): void => {
            expect(Str.remove('e', 'Peter Piper picked a peck of pickled peppers.')).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
            expect(Str.remove('E', 'Peter Piper picked a peck of pickled peppers.', false)).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
        });
    });

    describe('Str.reverse', (): void => {
        test('reverses the given string', (): void => {
            expect(Str.reverse('Hello World')).toEqual('dlroW olleH');
        });
    });

    describe('Str.start', (): void => {
        test('adds a single instance of the given value to a string if it does not already start with that value', (): void => {
            expect(Str.start('this/string', '/')).toEqual('/this/string');
            expect(Str.start('/this/string', '/')).toEqual('/this/string');
        });
    });

    describe('Str.upper', (): void => {
        test('converts the given string to uppercase', (): void => {
            expect(Str.upper('laravel')).toEqual('LARAVEL');
        });
    });

    describe('Str.title', (): void => {
        test('converts the given string to Title Case', (): void => {
            expect(Str.title('a nice title uses the correct case')).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('Str.headline', (): void => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word’s first letter capitalized', (): void => {
            expect(Str.headline('steve_jobs')).toEqual('Steve Jobs');
            expect(Str.headline('EmailNotificationSent')).toEqual('Email Notification Sent');
        });
    });

    describe('Str.apa', (): void => {
        test('converts the given string to title case following the APA guidelines', (): void => {
            expect(Str.apa('Creating A Project')).toEqual('Creating a Project');
        });
    });

    describe('Str.singular', (): void => {
        test('converts plural to singular for regular nouns', (): void => {
            expect(Str.singular('cars')).toBe('car');
            expect(Str.singular('books')).toBe('book');
            expect(Str.singular('apples')).toBe('apple');
        });

        test('handles irregular nouns correctly', (): void => {
            // A
            expect(Str.singular('alumnae')).toBe('alumna');
            expect(Str.singular('analyses')).toBe('analysis');
            expect(Str.singular('axes')).toBe('axis');

            // B-C
            expect(Str.singular('bacteria')).toBe('bacterium');
            expect(Str.singular('children')).toBe('child');
            expect(Str.singular('crises')).toBe('crisis');

            // D-F
            expect(Str.singular('demos')).toBe('demo');
            expect(Str.singular('feet')).toBe('foot');
            expect(Str.singular('fungi')).toBe('fungus');

            // G-M
            expect(Str.singular('geese')).toBe('goose');
            expect(Str.singular('men')).toBe('man');
            expect(Str.singular('mice')).toBe('mouse');

            // N-S
            expect(Str.singular('nuclei')).toBe('nucleus');
            expect(Str.singular('people')).toBe('person');
            expect(Str.singular('theses')).toBe('thesis');

            // T-Z
            expect(Str.singular('teeth')).toBe('tooth');
            expect(Str.singular('wives')).toBe('wife');
            expect(Str.singular('zombies')).toBe('zombie');
        });

        test('handles uncountable nouns correctly', (): void => {
            expect(Str.singular('sheep')).toBe('sheep');
            expect(Str.singular('fish')).toBe('fish');
            expect(Str.singular('series')).toBe('series');
            expect(Str.singular('money')).toBe('money');
            expect(Str.singular('information')).toBe('information');
        });

        test('handles special singularization rules', (): void => {
            // -ves → -f/-fe
            expect(Str.singular('leaves')).toBe('leaf');
            expect(Str.singular('knives')).toBe('knife');

            // -ies → -y
            expect(Str.singular('cities')).toBe('city');
            expect(Str.singular('babies')).toBe('baby');

            // -oes → -o
            expect(Str.singular('potatoes')).toBe('potato');
            expect(Str.singular('volcanoes')).toBe('volcano');

            // -i → -us
            expect(Str.singular('cacti')).toBe('cactus');
            expect(Str.singular('foci')).toBe('focus');

            // -es → -is
            expect(Str.singular('analyses')).toBe('analysis');
            expect(Str.singular('bases')).toBe('basis');

            // -ices → -ix/ex
            expect(Str.singular('matrices')).toBe('matrix');
            expect(Str.singular('indices')).toBe('index');
        });

        test('handles compound words and special cases', (): void => {
            expect(Str.singular('passersby')).toBe('passerby');
            expect(Str.singular('runners-up')).toBe('runner-up');
        });

        test('handles words with multiple singular forms', (): void => {
            expect(Str.singular('octopuses')).toBe('octopus');
            expect(Str.singular('hoofs')).toBe('hoof');
        });

        test('preserves case sensitivity', (): void => {
            expect(Str.singular('Heroes')).toBe('Hero');
            expect(Str.singular('CHILDREN')).toBe('CHILD');
            expect(Str.singular('Analyses')).toBe('Analysis');
        });

        test('handles edge cases', (): void => {
            expect(Str.singular('')).toBe('');
            expect(Str.singular(' ')).toBe(' ');
            expect(Str.singular('123')).toBe('123');
        });
    });

    describe('Str.slug', (): void => {
        test('generates a URL friendly "slug" from the given string', (): void => {
            expect(Str.slug('Laravel 5 Framework', '-')).toEqual('laravel-5-framework');
        });
    });

    describe('Str.snake', (): void => {
        test('converts the given string to snake_case', (): void => {
            expect(Str.snake('fooBar')).toEqual('foo_bar');
            expect(Str.snake('fooBar', '-')).toEqual('foo-bar');
        });
    });

    describe('Str.trim', (): void => {
        test('removes all whitespace from both ends of a string', (): void => {
            expect(Str.trim('   Laravel   ')).toEqual('Laravel');
            expect(Str.trim('Laravel   ')).toEqual('Laravel');
            expect(Str.trim('   Laravel')).toEqual('Laravel');
            expect(Str.trim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from both ends of a string with specified characters', (): void => {
            expect(Str.trim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.trim(' Laravel ', ' ')).toEqual('Laravel');
            expect(Str.trim('-Laravel  Framework_', '-_')).toEqual('Laravel  Framework');
        });
    });

    describe('Str.ltrim', (): void => {
        test('removes all whitespace from the beginning of a string', (): void => {
            expect(Str.ltrim('   Laravel   ')).toEqual('Laravel   ');
            expect(Str.ltrim('Laravel   ')).toEqual('Laravel   ');
            expect(Str.ltrim('   Laravel')).toEqual('Laravel');
            expect(Str.ltrim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from the beginning of a string with specified characters', (): void => {
            expect(Str.ltrim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.ltrim(' Laravel ', ' ')).toEqual('Laravel ');
            expect(Str.ltrim('-Laravel  Framework_', '-_')).toEqual('Laravel  Framework_');
        });
    });

    describe('Str.rtrim', (): void => {
        test('removes all whitespace from the end of a string', (): void => {
            expect(Str.rtrim('   Laravel   ')).toEqual('   Laravel');
            expect(Str.rtrim('Laravel   ')).toEqual('Laravel');
            expect(Str.rtrim('   Laravel')).toEqual('   Laravel');
            expect(Str.rtrim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from the end of a string with specified characters', (): void => {
            expect(Str.rtrim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.rtrim(' Laravel ', ' ')).toEqual(' Laravel');
            expect(Str.rtrim('-Laravel  Framework_', '-_')).toEqual('-Laravel  Framework');
        });
    });

    describe('Str.squish', (): void => {
        test('removes all extraneous white space from a string', (): void => {
            expect(Str.squish('    laravel    framework    ')).toEqual('laravel framework');
        });
    });

    describe('Str.startsWith', (): void => {
        test('determines if the given string begins with the given value', (): void => {
            expect(Str.startsWith('This is my name', 'This')).toBeTruthy();
        });

        test('determines if the given string begins with any of the values in the array', (): void => {
            expect(Str.startsWith('This is my name', ['This', 'That', 'There'])).toBeTruthy();
        });

        test('returns false if the given string does not start with the given value', (): void => {
            expect(Str.startsWith('This is my name', 'There')).toBeFalsy();
        });

        test('returns false if the given string does not start with any of the values in the array', (): void => {
            expect(Str.startsWith('This is my name', ['That', 'There'])).toBeFalsy();
        });
    });

    describe('Str.doesntStartWith', (): void => {
        test('determines if the given string does not start with the given value', (): void => {
            expect(Str.doesntStartWith('This is my name', 'There')).toBeTruthy();
        });

        test('determines if the given string does not start with any of the values in the array', (): void => {
            expect(Str.doesntStartWith('This is my name', ['There', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string starts with the given value', (): void => {
            expect(Str.doesntStartWith('This is my name', 'This')).toBeFalsy();
        });

        test('returns false if the string ends starts the given value', (): void => {
            expect(Str.doesntStartWith('This is my name', ['This', 'foo'])).toBeFalsy();
        });
    });

    describe('Str.studly', (): void => {
        test('converts the given string to studly caps case', (): void => {
            expect(Str.studly('foo_bar')).toEqual('FooBar');
        });
    });

    describe('Str.pascal', (): void => {
        test('converts the given string to Pascal case', (): void => {
            expect(Str.pascal('foo_bar')).toEqual('FooBar');
        });
    });

    describe('Str.substr', (): void => {
        test('returns the portion of string specified by the start and length parameters', (): void => {
            expect(Str.substr('The Laravel Framework', 4, 7)).toEqual('Laravel');
        });
    });

    describe('Str.substrCount', (): void => {
        test('returns the number of occurrences of a given value in the given string', (): void => {
            expect(Str.substrCount('If you like ice cream, you will like snow cones.', 'like')).toEqual(2);
        });
    });

    describe('Str.substrReplace', (): void => {
        test('replaces text within a portion of a string', (): void => {
            expect(Str.substrReplace('1300', ':', 2)).toEqual('13:');
            expect(Str.substrReplace('1300', ':', 2, 0)).toEqual('13:00');
        });
    });

    describe('Str.swap', (): void => {
        test('replaces multiple values in the given string', (): void => {
            expect(Str.swap({
                'Tacos': 'Burritos',
                'great': 'fantastic'
            }, 'Tacos are great!')).toEqual('Burritos are fantastic!');
        });
    });

    describe('Str.take', (): void => {
        test('takes the first n characters when limit is positive', (): void => {
            expect(Str.take('Hello, world!', 5)).toEqual('Hello');
        });

        test('takes the last n characters when limit is negative', (): void => {
            expect(Str.take('Hello, world!', -5)).toEqual('orld!');
        });

        test('returns an empty string when limit is zero', (): void => {
            expect(Str.take('Hello, world!', 0)).toEqual('');
        });

        test('returns the entire string when limit is greater than string length', (): void => {
            expect(Str.take('Hello', 10)).toEqual('Hello');
        });

        test('returns the entire string when limit is less than negative string length', (): void => {
            expect(Str.take('Hello', -10)).toEqual('Hello');
        });
    });

    describe('Str.toBase64', (): void => {
        test('converts the given string to Base64', (): void => {
            expect(Str.toBase64('Laravel')).toEqual('TGFyYXZlbA==');
        });
    });

    describe('Str.fromBase64', (): void => {
        test('converts the given string from Base64', (): void => {
            expect(Str.fromBase64('TGFyYXZlbA==')).toEqual('Laravel');
        });
    });

    describe('Str.lcfirst', (): void => {
        test('returns the given string with the first character lowercased', (): void => {
            expect(Str.lcfirst('Foo Bar')).toEqual('foo Bar');
        });
    });

    describe('Str.ucfirst', (): void => {
        test('returns the given string with the first character capitalized', (): void => {
            expect(Str.ucfirst('foo bar')).toEqual('Foo bar');
        });
    });

    describe('Str.ucsplit', (): void => {
        test('splits the given string into an array by uppercase characters', (): void => {
            expect(Str.ucsplit('FooBar')).toEqual(['Foo', 'Bar']);
        });
    });

    describe('Str.wordCount', (): void => {
        test('returns the number of words that a string contains', (): void => {
            expect(Str.wordCount('Hello, world!')).toEqual(2);
        });
    });

    describe('Str.wordWrap', (): void => {
        test('wraps a string to a given number of characters', (): void => {
            expect(Str.wordWrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
        });
    });

    describe('Str.uuid', (): void => {
        test('generates a UUID (version 4)', (): void => {
            expect(Str.uuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.uuid7', (): void => {
        test('generates a UUID (version 7)', (): void => {
            expect(Str.uuid7()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('uses current time when no timestamp provided', (): void => {
            const before: number = Date.now();
            const uuid: string = Str.uuid7();
            const after: Number = Date.now();

            const time: number = parseInt(uuid.slice(0, 8) + uuid.slice(9, 13), 16);

            expect(time).toBeGreaterThanOrEqual(before);
            expect(time).toBeLessThanOrEqual(after as number);
        });

        test('accepts custom timestamp', (): void => {
            expect(Str.uuid7(new Date('2023-01-01T00:00:00Z')).startsWith('01856aa0-c800')).toBeTruthy();
        });

        test('handles minimum timestamp correctly', (): void => {
            expect(Str.uuid7(new Date(0)).startsWith('00000000-0000-7')).toBeTruthy();
        });

        test('handles maximum 48-bit timestamp correctly', (): void => {
            expect(Str.uuid7(new Date(281474976710655)).startsWith('ffffffff-ffff-7')).toBeTruthy();
        });

        test('throws error for invalid timestamps', (): void => {
            expect((): string => Str.uuid7(new Date(-1))).toThrow(RangeError);
            expect((): string => Str.uuid7(new Date(281474976710655 + 1))).toThrow(RangeError);
        });

        test('contains correct version and variant bits', (): void => {
            const parts: string[] = Str.uuid7().split('-');

            expect((parts[2] as string)[0]).toBe('7');
            expect(['8', '9', 'a', 'b']).toContain((parts[3] as string)[0]);
        });

        test('has correct byte structure', (): void => {
            const uuid: string = Str.uuid7();
            const bytes: string = uuid.replace(/-/g, '');

            const byte6: number = parseInt(bytes.substring(12, 14), 16);
            const byte8: number = parseInt(bytes.substring(16, 18), 16);

            expect((byte6 & 0xf0) >> 4).toBe(7);
            expect((byte8 & 0xc0) >> 6).toBe(2);
        });

        test('generates unique values', (): void => {
            const uuids = new Set<string>();
            const count = 1000;

            for (let i: number = 0; i < count; i++) {
                uuids.add(Str.uuid7());
            }

            expect(uuids.size).toBe(count);
        });
    });

    describe('Str.orderedUuid', (): void => {
        test('generates a "timestamp first" UUID', (): void => {
            expect(Str.orderedUuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.createUuidsUsing', (): void => {
        test('creates UUIDs using the specified callback', (): void => {
            const uuid: string = 'e7d145db-1f4b-40a9-9684-5e7ad7673494';

            Str.createUuidsUsing((): string => uuid);

            expect(Str.uuid()).toBe(uuid);
            expect(Str.uuid()).toBe(uuid);

            Str.createUuidsNormally();

            const first: string = Str.uuid();
            const second: string = Str.uuid();

            expect(first).not.toBe(uuid);
            expect(second).not.toBe(uuid);
            expect(first).not.toBe(second);
        });
    });

    describe('Str.createUuidsUsingSequence', (): void => {
        test('returns UUIDs from the sequence in order', (): void => {
            const first: string = Str.uuid();
            const second: string = Str.uuid();
            const third: string = 'third';

            Str.createUuidsUsingSequence([first, undefined, second, third]);

            expect(Str.uuid()).toBe(first);
            expect(Str.uuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
            expect(Str.uuid()).toBe(second);
            expect(Str.uuid()).toBe(third);
            expect(Str.uuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

            Str.createUuidsUsingSequence([]);
        });

        test('uses default fallback when none provided', (): void => {
            const uuid: string = Str.uuid();

            Str.createUuidsUsingSequence([uuid], (): never => {
                throw new Error('Out of UUIDs.');
            });

            expect(Str.uuid()).toBe(uuid);
            expect((): string => Str.uuid()).toThrow('Out of UUIDs.');
        });
    });

    describe('Str.freezeUuids', (): void => {
        test('returns the same UUID for all calls', (): void => {
            const frozen: string = Str.freezeUuids();

            try {
                expect(Str.uuid()).toBe(frozen);
                expect(Str.uuid()).toBe(frozen);
            } finally {
                Str.createUuidsNormally();
            }
        });

        test('returns the same UUID for all calls within the callback', (): void => {
            const frozen: string = Str.freezeUuids((uuid: string): void => {
                expect(Str.uuid()).toBe(uuid);
                expect(Str.uuid()).toBe(uuid);
            });

            expect(Str.uuid()).not.toBe(frozen);
        });
    });

    describe('Str.createUuidsNormally', (): void => {
        test('resets UUID generation to default behavior', (): void => {
            const uuid: string = 'e7d145db-1f4b-40a9-9684-5e7ad7673494';

            Str.createUuidsUsing((): string => uuid);

            expect(Str.uuid()).toBe(uuid);

            Str.createUuidsNormally();

            const first: string = Str.uuid();
            const second: string = Str.uuid();

            expect(first).not.toBe(uuid);
            expect(second).not.toBe(uuid);
            expect(first).not.toBe(second);
            expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
        });
    });

    describe('Str.ulid', (): void => {
        test('generates a ULID', (): void => {
            expect(Str.ulid()).toMatch(/[0-9A-Z]{26}/);
        });
    });

    describe('Str.createUlidsUsing', (): void => {
        test('creates ULIDs using the specified callback', (): void => {
            const ulid: string = '01K5FBP7ZJ1W659T73KNH9XK46';

            Str.createUlidsUsing((): string => ulid);

            expect(Str.ulid()).toBe(ulid);
            expect(Str.ulid()).toBe(ulid);

            Str.createUlidsNormally();

            const first: string = Str.ulid();
            const second: string = Str.ulid();

            expect(first).not.toBe(ulid);
            expect(second).not.toBe(ulid);
            expect(first).not.toBe(second);
        });
    });

    describe('Str.createUlidsUsingSequence', (): void => {
        test('returns ULIDs from the sequence in order', (): void => {
            const first: string = '01K5FBP7ZJ1W659T73KNH9XK46';
            const second: string = '01H5KK0ZQZ9Z9Z9Z9Z9Z9Z9Z9';
            const third: string = 'third';

            Str.createUlidsUsingSequence([first, undefined, second, third]);

            expect(Str.ulid()).toBe(first);
            expect(Str.ulid()).toMatch(/^[0-9A-Z]{26}$/);
            expect(Str.ulid()).toBe(second);
            expect(Str.ulid()).toBe(third);
            expect(Str.ulid()).toMatch(/^[0-9A-Z]{26}$/);

            Str.createUlidsUsingSequence([]);
        });

        test('uses default fallback when none provided', (): void => {
            const ulid: string = '01K5FBP7ZJ1W659T73KNH9XK46';

            Str.createUlidsUsingSequence([ulid], (): never => {
                throw new Error('Out of ULIDs.');
            });

            expect(Str.ulid()).toBe(ulid);
            expect((): string => Str.ulid()).toThrow('Out of ULIDs.');
        });
    });

    describe('Str.freezeUlids', (): void => {
        test('returns the same ULID for all calls', (): void => {
            const frozen: string = Str.freezeUlids();

            try {
                expect(Str.ulid()).toBe(frozen);
                expect(Str.ulid()).toBe(frozen);
            } finally {
                Str.createUlidsNormally();
            }
        });

        test('returns the same ULID for all calls within the callback', (): void => {
            const frozen: string = Str.freezeUlids((ulid: string): void => {
                expect(Str.ulid()).toBe(ulid);
                expect(Str.ulid()).toBe(ulid);
            });

            expect(Str.ulid()).not.toBe(frozen);
        });
    });

    describe('Str.createUlidsNormally', (): void => {
        test('resets ULID generation to default behavior', (): void => {
            const ulid: string = '01K5FBP7ZJ1W659T73KNH9XK46';

            Str.createUlidsUsing((): string => ulid);

            expect(Str.ulid()).toBe(ulid);

            Str.createUlidsNormally();

            const first: string = Str.ulid();
            const second: string = Str.ulid();

            expect(first).not.toBe(ulid);
            expect(second).not.toBe(ulid);
            expect(first).not.toBe(second);
            expect(first).toMatch(/^[0-9A-Z]{26}$/);
        });
    });
});

describe('Fluent Strings', (): void => {
    describe('after', (): void => {
        test('returns everything after the given value in a string', (): void => {
            expect(Str.of('This is my name').after('This is').toString()).toEqual(' my name');
        });
    });

    describe('afterLast', (): void => {
        test('returns everything after the last occurrence of the given value in a string', (): void => {
            expect(Str.of('App\\Http\\Controllers\\Controller').afterLast('\\').toString()).toEqual('Controller');
        });
    });

    describe('append', (): void => {
        test('appends the given values to the string', (): void => {
            expect(Str.of('Taylor').append(' Otwell').toString()).toEqual('Taylor Otwell');
        });
    });

    describe('newLine', (): void => {
        test('appends an "end of line" character to a string', (): void => {
            expect(Str.of('Laravel').newLine().append('Framework').toString()).toEqual('Laravel\nFramework');
        });
    });

    describe('ascii', (): void => {
        test('transliterates accented characters to ASCII equivalents', (): void => {
            expect(Str.of('ü').ascii().toString()).toEqual('u');
            expect(Str.of('é').ascii().toString()).toEqual('e');
            expect(Str.of('ñ').ascii().toString()).toEqual('n');
            expect(Str.of('ç').ascii().toString()).toEqual('c');
            expect(Str.of('å').ascii().toString()).toEqual('a');
        });

        test('removes diacritical marks', (): void => {
            expect(Str.of('c\u0327').ascii().toString()).toEqual('c');
            expect(Str.of('e\u0301').ascii().toString()).toEqual('e');
            expect(Str.of('a\u0308').ascii().toString()).toEqual('a');
        });

        test('handles strings with only non-alphanumeric characters', (): void => {
            expect(Str.of('!@#$%^&*()_+-=').ascii().toString()).toEqual('!@#$%^&*()_+-=');
            expect(Str.of('   ').ascii().toString()).toEqual('   ');
        });

        test('preserves case for ASCII letters', (): void => {
            expect(Str.of('HelloWorld').ascii().toString()).toEqual('HelloWorld');
            expect(Str.of('HELLOworld').ascii().toString()).toEqual('HELLOworld');
        });

        test('handles mixed input', (): void => {
            expect(Str.of('Héllö Wörld! 123').ascii().toString()).toEqual('Hello World! 123');
            expect(Str.of('Café au lait').ascii().toString()).toEqual('Cafe au lait');
            expect(Str.of('Mëtàl Hëàd').ascii().toString()).toEqual('Metal Head');
        });
    });

    describe('basename', (): void => {
        test('returns the trailing name component of the given string', (): void => {
            expect(Str.of('/foo/bar/baz').basename().toString()).toEqual('baz');
            expect(Str.of('/foo/bar/baz.jpg').basename('.jpg').toString()).toEqual('baz');
        });
    });

    describe('charAt', (): void => {
        test('returns the character at the specified index', (): void => {
            expect(Str.of('This is my name.').charAt(6).toString()).toEqual('s');
        });
    });

    describe('chopStart', (): void => {
        test('removes the given string if it exists at the start of the subject', (): void => {
            expect(Str.of('Hello, world!').chopStart('Hello, ').toString()).toEqual('world!');
        });

        test('removes the first matching string from an array of needles', (): void => {
            expect(Str.of('Hello, world!').chopStart(['Hello, ', 'Hi, ']).toString()).toEqual('world!');
        });

        test('removes only the first matching string when both are found at the start', (): void => {
            expect(Str.of('Hello, Hello, world!').chopStart(['Hello, ', 'Hello, ']).toString()).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the start of the subject', (): void => {
            expect(Str.of('Hello, world!').chopStart('world').toString()).toEqual('Hello, world!');
        });
    });

    describe('chopEnd', (): void => {
        test('removes the given string if it exists at the end of the subject', (): void => {
            expect(Str.of('Hello, world!').chopEnd('world!').toString()).toEqual('Hello, ');
        });

        test('removes the first matching string from an array of needles', (): void => {
            expect(Str.of('Hello, world!').chopEnd(['world!', 'planet!']).toString()).toEqual('Hello, ');
        });

        test('removes only the first matching string when both are found at the end', (): void => {
            expect(Str.of('Hello, world!world').chopEnd(['world', 'world!']).toString()).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the end of the subject', (): void => {
            expect(Str.of('Hello, world!').chopEnd('Hello').toString()).toEqual('Hello, world!');
        });
    });

    describe('classBasename', (): void => {
        test('returns the class name of the given class with the class\'s namespace removed', (): void => {
            expect(Str.of('Foo\\Bar\\Baz').classBasename().toString()).toEqual('Baz');
        });
    });

    describe('before', (): void => {
        test('returns everything before the given value in a string', (): void => {
            expect(Str.of('This is my name').before('my name').toString()).toEqual('This is ');
        });
    });

    describe('beforeLast', (): void => {
        test('returns everything before the last occurrence of the given value in a string', (): void => {
            expect(Str.of('This is my name').beforeLast('is').toString()).toEqual('This ');
        });
    });

    describe('between', (): void => {
        test('returns the portion of a string between two values', (): void => {
            expect(Str.of('This is my name').between('This', 'name').toString()).toEqual(' is my ');
        });
    });

    describe('betweenFirst', (): void => {
        test('returns the smallest possible portion of a string between two values', (): void => {
            expect(Str.of('[a] bc [d]').betweenFirst('[', ']').toString()).toEqual('a');
        });
    });

    describe('camel', (): void => {
        test('converts the given string to camelCase', (): void => {
            expect(Str.of('foo_bar').camel().toString()).toEqual('fooBar');
        });
    });

    describe('contains', (): void => {

        test('determines if the given string contains the given value', (): void => {
            expect(Str.of('This is my name').contains('my')).toBeTruthy();
        });

        test('determines if the given string contains any of the values in the array', (): void => {
            expect(Str.of('This is my name').contains(['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string contains the given value case-insensitively', (): void => {
            expect(Str.of('This is my name').contains('MY', true)).toBeTruthy();
        });
    });

    describe('containsAll', (): void => {
        test('determines if the given string contains all the values in a given array', (): void => {
            expect(Str.of('This is my name').containsAll(['my', 'name'])).toBeTruthy();
        });

        test('determines if the given string contains all the values in a given array case-insensitively', (): void => {
            expect(Str.of('This is my name').containsAll(['my', 'name'])).toBeTruthy();
        });
    });

    describe('doesntContain', (): void => {
        test('determines if the given string doesnt contain the given value', (): void => {
            expect(Str.of('This is name').doesntContain('my')).toBeTruthy();
        });

        test('determines if the given string doesnt contain any of the values in the array', (): void => {
            expect(Str.of('This is name').doesntContain(['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string doesnt contain the given value case-insensitively', (): void => {
            expect(Str.of('This is name').doesntContain('MY', true)).toBeTruthy();
        });
    });

    describe('convertCase', (): void => {
        test('converts the case of a string', (): void => {
            expect(Str.of('HeLLo').convertCase().toString()).toEqual('hello');
            expect(Str.of('hello').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('HELLO');
            expect(Str.of('WORLD').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('world');
            expect(Str.of('hello world').convertCase(Mode.MB_CASE_TITLE).toString()).toEqual('Hello World');
            expect(Str.of('HeLLo').convertCase(Mode.MB_CASE_FOLD).toString()).toEqual('hello');
            expect(Str.of('hello').convertCase(Mode.MB_CASE_UPPER_SIMPLE).toString()).toEqual('HELLO');
            expect(Str.of('HELLO').convertCase(Mode.MB_CASE_LOWER_SIMPLE).toString()).toEqual('hello');
            expect(Str.of('hello world').convertCase(Mode.MB_CASE_TITLE_SIMPLE).toString()).toEqual('Hello World');
            expect(Str.of('HeLLo').convertCase(Mode.MB_CASE_FOLD_SIMPLE).toString()).toEqual('hello');
            expect(Str.of('üöä').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('ÜÖÄ');
            expect(Str.of('ÜÖÄ').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('üöä');
        });

        test('handles empty string and whitespace', (): void => {
            expect(Str.of('').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('');
            expect(Str.of('   ').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('   ');
            expect(Str.of('  test  ').convertCase(Mode.MB_CASE_TITLE).toString()).toEqual('  Test  ');
        });

        test('throws error for invalid mode', (): void => {
            // @ts-expect-error
            expect((): string => Str.of('test').convertCase(-1)).toThrow('Argument #2 (mode) must be one of the Mode.MB_CASE_* constants');
            // @ts-expect-error
            expect((): string => Str.of('test').convertCase(-1 as Mode)).toThrow('Argument #2 (mode) must be one of the Mode.MB_CASE_* constants');
        });
    });

    describe('deduplicate', (): void => {
        test('replace consecutive instances of a given character with a single character in the given string', (): void => {
            expect(Str.of(' laravel   php  framework ').deduplicate().toString()).toEqual(' laravel php framework ');
            expect(Str.of('whaaat').deduplicate('a').toString()).toEqual('what');
            expect(Str.of('/some//odd//path/').deduplicate('/').toString()).toEqual('/some/odd/path/');
        });

        test('replace consecutive instances of multiple characters when given an array', (): void => {
            expect(Str.of('a--b++c**d').deduplicate(['-', '+', '*']).toString()).toEqual('a-b+c*d');
            expect(Str.of('  hello  !!world??  ').deduplicate([' ', '!', '?']).toString()).toEqual(' hello !world? ');
            expect(Str.of('mixed...spaces   and---dashes').deduplicate(['.', ' ', '-']).toString()).toEqual('mixed.spaces and-dashes');
        });
    });

    describe('dirname', (): void => {
        test('return the parent directory portion of the given string', (): void => {
            expect(Str.of('/foo/bar/baz').dirname().toString()).toEqual('/foo/bar');
            expect(Str.of('/foo/bar/baz').dirname(2).toString()).toEqual('/foo');
        });
    });

    describe('endsWith', (): void => {
        test('determines if the given string ends with the given value', (): void => {
            expect(Str.of('This is my name').endsWith('name')).toBeTruthy();
        });

        test('determines if the given string ends with any of the values in the array', (): void => {
            expect(Str.of('This is my name').endsWith(['name', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string does not end with the given value', (): void => {
            expect(Str.of('This is my name').endsWith('names')).toBeFalsy();
        });

        test('returns false if the given string does not end with any of the values in the array', (): void => {
            expect(Str.of('This is my name').endsWith(['this', 'foo'])).toBeFalsy();
        });
    });

    describe('doesntEndWith', (): void => {
        test('determines if the given string does not end with the given value', (): void => {
            expect(Str.of('This is my name').doesntEndWith('names')).toBeTruthy();
        });

        test('determines if the given string does not end with any of the values in the array', (): void => {
            expect(Str.of('This is my name').doesntEndWith(['names', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string ends with the given value', (): void => {
            expect(Str.of('This is my name').doesntEndWith('name')).toBeFalsy();
        });

        test('returns false if the string ends with the given value', (): void => {
            expect(Str.of('This is my name').doesntEndWith(['name', 'foo'])).toBeFalsy();
        });
    });

    describe('exactly', (): void => {
        test('determines if the given string is an exact match with another string', (): void => {
            expect(Str.of('Laravel').exactly('Laravel')).toBeTruthy();
        });
    });

    describe('excerpt', (): void => {
        test('extracts an excerpt from the string that matches the first instance of a phrase within that string', (): void => {
            expect(Str.of('This is my name').excerpt('my', { 'radius': 3 })).toEqual('...is my na...');
        });

        test('allows definition of custom omission strings', (): void => {
            expect(Str.of('This is my name').excerpt('name', { 'radius': 3, 'omission': '(...) ' })).toEqual('(...) my name');
        });
    });

    describe('explode', (): void => {
        test('splits the string by the given delimiter and returns an array containing each section of the split string', (): void => {
            expect(Str.of('foo bar baz').explode(' ')).toEqual(['foo', 'bar', 'baz']);
        });
    });

    describe('split', (): void => {
        test('splits a string into an array using a regular expression', (): void => {
            expect(Str.of('one, two, three').split('/[\s,]+/')).toEqual(['one', 'two', 'three']);
        });
    });

    describe('finish', (): void => {
        test('adds a single instance of the given value to a string if it does not already end with that value', (): void => {
            expect(Str.of('this/string').finish('/').toString()).toEqual('this/string/');
        });

        test('does not add a value to a string that already ends with that value', (): void => {
            expect(Str.of('this/string/').finish('/').toString()).toEqual('this/string/');
        });
    });

    describe('is', (): void => {
        test('determines if a given string matches a given pattern', (): void => {
            expect(Str.of('a').is('a')).toBeTruthy();
            expect(Str.of('foobar').is('foo*')).toBeTruthy();
            expect(Str.of('foobar').is('baz*')).toBeFalsy();
            expect(Str.of('b/').is(['a*', 'b*'])).toBeTruthy();
            expect(Str.of('f/').is(['a*', 'b*'])).toBeFalsy();
        });

        test('determines if a given string matches a given pattern case-insensitively', (): void => {
            expect(Str.of('a').is('A', true)).toBeTruthy();
            expect(Str.of('foobar').is('FOO*', true)).toBeTruthy();
            expect(Str.of('foobar').is('baz*', true)).toBeFalsy();
            expect(Str.of('b/').is(['A*', 'B*'], true)).toBeTruthy();
            expect(Str.of('f/').is(['A*', 'B*'], true)).toBeFalsy();
        });
    });

    describe('isAscii', (): void => {
        test('determines if a given string is an ASCII string', (): void => {
            expect(Str.of('Taylor').isAscii()).toBeTruthy();
            expect(Str.of('ü').isAscii()).toBeFalsy();
        });
    });

    describe('isJson', (): void => {
        test('determines if a given string is valid JSON', (): void => {
            expect(Str.of('[1,2,3]').isJson()).toBeTruthy();
            expect(Str.of('{"first": "John", "last": "Doe"}').isJson()).toBeTruthy();
            expect(Str.of('{first: "John", last: "Doe"}').isJson()).toBeFalsy();
        });
    });

    describe('isUrl', (): void => {
        test('determines if a given string is a URL', (): void => {
            expect(Str.of('https://example.com').isUrl()).toBeTruthy();
            expect(Str.of('Taylor').isUrl()).toBeFalsy();
        });
    });

    describe('isUuid', (): void => {
        test('determines if a given string is a UUID', (): void => {
            expect(Str.of('5ace9ab9-e9cf-4ec6-a19d-5881212a452c').isUuid()).toBeTruthy();
            expect(Str.of('Taylor').isUuid()).toBeFalsy();
        });
    });

    describe('isUlid', (): void => {
        test('determines if a given string is a ULID', (): void => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').isUlid()).toBeTruthy();
            expect(Str.of('Taylor').isUlid()).toBeFalsy();
        });
    });

    describe('isEmpty', (): void => {
        test('determines if the given string is empty', (): void => {
            expect(Str.of('  ').trim().isEmpty()).toBeTruthy();
            expect(Str.of('Laravel').trim().isEmpty()).toBeFalsy();
        });
    });

    describe('isNotEmpty', (): void => {
        test('determines if the given string is not empty', (): void => {
            expect(Str.of('  ').trim().isNotEmpty()).toBeFalsy();
            expect(Str.of('Laravel').trim().isNotEmpty()).toBeTruthy();
        });
    });

    describe('kebab', (): void => {
        test('converts the given string to kebab-case', (): void => {
            expect(Str.of('fooBar').kebab().toString()).toEqual('foo-bar');
        });
    });

    describe('length', (): void => {
        test('returns the length of the given string', (): void => {
            expect(Str.of('Laravel').length()).toEqual(7);
        });
    });

    describe('limit', (): void => {
        test('truncates the given string to the specified length', (): void => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20).toString()).toEqual('The quick brown fox...');
        });

        test('truncates the string and appends a custom string', (): void => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20, ' (...)').toString()).toEqual('The quick brown fox (...)');
        });

        test('respects word boundaries if \'preserveWord\' is set to true', (): void => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20, '...', true).toString()).toEqual('The quick brown...');
        });
    });

    describe('lower', (): void => {
        test('converts the given string to lowercase', (): void => {
            expect(Str.of('LARAVEL').lower().toString()).toEqual('laravel');
        });
    });

    describe('mask', (): void => {
        test('masks a portion of a string with a repeated character', (): void => {
            expect(Str.of('taylor@example.com').mask('*', 3).toString()).toEqual('tay***************');
        });

        test('masks a portion of a string from the end', (): void => {
            expect(Str.of('taylor@example.com').mask('*', -15, 3).toString()).toEqual('tay***@example.com');
        });
    });

    describe('match', (): void => {
        test('returns the portion of a string that matches a given regular expression pattern', (): void => {
            expect(Str.of('foo bar').match(/bar/).toString()).toEqual('bar');
        });

        test('returns the portion of a string that matches a regular expression with a capturing group', (): void => {
            expect(Str.of('foo bar').match(/foo (.*)/).toString()).toEqual('bar');
        });
    });

    describe('isMatch', (): void => {
        test('determines if the string matches a given regular expression', (): void => {
            expect(Str.of('foo bar').isMatch(/foo (.*)/)).toBeTruthy();
            expect(Str.of('laravel').isMatch(/foo (.*)/)).toBeFalsy();
        });

        test('determines if the string matches a given array of regular expression', (): void => {
            expect(Str.of('Hello, Laravel!').isMatch([/.*,.*!/, /H.o/])).toBeTruthy();
            expect(Str.of('Hello, Laravel').isMatch([/.*,.*!/, /H.o/])).toBeFalsy();
        });
    });

    describe('matchAll', (): void => {
        test('returns an array containing portions of a string that match a given regular expression pattern', (): void => {
            expect(Str.of('bar foo bar').matchAll(/bar/)).toEqual(['bar', 'bar']);
        });

        test('returns an empty array when there are no matches', (): void => {
            expect(Str.of('bar foo bar').matchAll(/baz/)).toEqual([]);
        });

        test('returns an array containing matches of a regular expression with a capturing group', (): void => {
            expect(Str.of('bar fun bar fly').matchAll(/f(\w*)/)).toEqual(['un', 'ly']);
        });
    });

    describe('test', (): void => {
        test('determines if a string matches the given regular expression pattern', (): void => {
            expect(Str.of('Laravel Framework').test(/Laravel/).toString()).toEqual('true');
        });
    });

    describe('numbers', (): void => {
        test('removes all non-numeric characters from a string', (): void => {
            expect(Str.of('(555) 123-4567').numbers().toString()).toEqual('5551234567');
            expect(Str.of('L4r4v3l!').numbers().toString()).toEqual('443');
            expect(Str.of('Laravel!').numbers().toString()).toEqual('');
        });
    });

    describe('padBoth', (): void => {
        test('pads both sides of a string with another string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padBoth(10, '_').toString()).toEqual('__James___');
        });

        test('pads both sides of a string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padBoth(10).toString()).toEqual('  James   ');
        });
    });

    describe('padLeft', (): void => {
        test('pads the left side of a string with another string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padLeft(10, '-=').toString()).toEqual('-=-=-James');
        });

        test('pads the left side of a string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padLeft(10).toString()).toEqual('     James');
        });
    });

    describe('padRight', (): void => {
        test('pads the right side of a string with another string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padRight(10, '-').toString()).toEqual('James-----');
        });

        test('pads the right side of a string until the final string reaches the desired length', (): void => {
            expect(Str.of('James').padRight(10).toString()).toEqual('James     ');
        });
    });

    describe('pipe', (): void => {
        test('returns a Stringable instance', (): void => {
            const string: Stringable = Str.of('hello world').pipe((string: Stringable): string => string + '!');

            expect(string).toBeInstanceOf(Stringable);
            expect(string.toString()).toEqual('hello world!');
        });

        test('calls the method on the string value when callback is a string', (): void => {
            expect(Str.of('hello world').pipe('toUpperCase').toString()).toEqual('HELLO WORLD');
        });

        test('calls the given function with the string value', (): void => {
            const string: Stringable = Str.of('hello world');
            const callback: ((instance: Stringable) => any) = (string: Stringable): string => string.explode(' ').join('-');
            const result: Stringable = string.pipe(callback);

            expect(result.toString()).toEqual('hello-world');
        });
    });

    describe('plural', (): void => {
        test('converts singular to plural for regular nouns', (): void => {
            expect(Str.of('car').plural().toString()).toBe('cars');
            expect(Str.of('book').plural().toString()).toBe('books');
            expect(Str.of('apple').plural().toString()).toBe('apples');
        });

        test('handles count parameter correctly', (): void => {
            expect(Str.of('child').plural(1).toString()).toBe('child');
            expect(Str.of('child').plural(2).toString()).toBe('children');
            expect(Str.of('person').plural(1).toString()).toBe('person');
            expect(Str.of('person').plural(3).toString()).toBe('people');
        });

        test('converts irregular nouns correctly', (): void => {
            // A
            expect(Str.of('alumna').plural().toString()).toBe('alumnae');
            expect(Str.of('analysis').plural().toString()).toBe('analyses');
            expect(Str.of('axis').plural().toString()).toBe('axes');

            // B-C
            expect(Str.of('bacterium').plural().toString()).toBe('bacteria');
            expect(Str.of('child').plural().toString()).toBe('children');
            expect(Str.of('crisis').plural().toString()).toBe('crises');

            // D-F
            expect(Str.of('datum').plural().toString()).toBe('data');
            expect(Str.of('foot').plural().toString()).toBe('feet');
            expect(Str.of('fungus').plural().toString()).toBe('fungi');

            // G-M
            expect(Str.of('goose').plural().toString()).toBe('geese');
            expect(Str.of('man').plural().toString()).toBe('men');
            expect(Str.of('mouse').plural().toString()).toBe('mice');

            // N-S
            expect(Str.of('nucleus').plural().toString()).toBe('nuclei');
            expect(Str.of('person').plural().toString()).toBe('people');
            expect(Str.of('thesis').plural().toString()).toBe('theses');

            // T-Z
            expect(Str.of('tooth').plural().toString()).toBe('teeth');
            expect(Str.of('wife').plural().toString()).toBe('wives');
            expect(Str.of('zombie').plural().toString()).toBe('zombies');
        });

        test('handles uncountable nouns correctly', (): void => {
            expect(Str.of('sheep').plural().toString()).toBe('sheep');
            expect(Str.of('fish').plural().toString()).toBe('fish');
            expect(Str.of('series').plural().toString()).toBe('series');
            expect(Str.of('money').plural().toString()).toBe('money');
            expect(Str.of('information').plural().toString()).toBe('information');
            expect(Str.of('equipment').plural().toString()).toBe('equipment');
        });

        test('handles special pluralization rules', (): void => {
            // -f/-fe → -ves
            expect(Str.of('leaf').plural().toString()).toBe('leaves');
            expect(Str.of('knife').plural().toString()).toBe('knives');

            // -y → -ies
            expect(Str.of('city').plural().toString()).toBe('cities');
            expect(Str.of('baby').plural().toString()).toBe('babies');

            // -o → -oes
            expect(Str.of('potato').plural().toString()).toBe('potatoes');
            expect(Str.of('volcano').plural().toString()).toBe('volcanoes');

            // -us → -i
            expect(Str.of('cactus').plural().toString()).toBe('cacti');
            expect(Str.of('focus').plural().toString()).toBe('foci');

            // -is → -es
            expect(Str.of('analysis').plural().toString()).toBe('analyses');
            expect(Str.of('basis').plural().toString()).toBe('bases');

            // -ix → -ices
            expect(Str.of('matrix').plural().toString()).toBe('matrices');
            expect(Str.of('index').plural().toString()).toBe('indices');
        });

        test('handles compound words and special cases', (): void => {
            expect(Str.of('passerby').plural().toString()).toBe('passersby');
            expect(Str.of('runner-up').plural().toString()).toBe('runners-up');
        });

        test('handles words with multiple plural forms', (): void => {
            expect(Str.of('octopus').plural().toString()).toBe('octopuses');
            expect(Str.of('hoof').plural().toString()).toBe('hoofs');
        });

        test('preserves case sensitivity', (): void => {
            expect(Str.of('Hero').plural().toString()).toBe('Heroes');
            expect(Str.of('CHILD').plural().toString()).toBe('CHILDREN');
            expect(Str.of('Analysis').plural().toString()).toBe('Analyses');
        });

        test('handles edge cases', (): void => {
            expect(Str.of('').plural().toString()).toBe('');
            expect(Str.of(' ').plural().toString()).toBe(' ');
            expect(Str.of('sheep').plural(0).toString()).toBe('sheep');
            expect(Str.of('person').plural(1.5).toString()).toBe('people');
        });
    });

    describe('pluralStudly', (): void => {
        test('converts a singular word string formatted in studly caps case to its plural form', (): void => {
            expect(Str.of('VerifiedHuman').pluralStudly().toString()).toEqual('VerifiedHumans');
            expect(Str.of('UserFeedback').pluralStudly().toString()).toEqual('UserFeedback');
            expect(Str.of('VerifiedHuman').pluralStudly(2).toString()).toEqual('VerifiedHumans');
            expect(Str.of('VerifiedHuman').pluralStudly(1).toString()).toEqual('VerifiedHuman');
        });
    });

    describe('pluralPascal', (): void => {
        test('converts a singular word string formatted in Pascal case to its plural form', (): void => {
            expect(Str.of('VerifiedHuman').pluralPascal().toString()).toEqual('VerifiedHumans');
            expect(Str.of('UserFeedback').pluralPascal().toString()).toEqual('UserFeedback');
            expect(Str.of('VerifiedHuman').pluralPascal(2).toString()).toEqual('VerifiedHumans');
            expect(Str.of('VerifiedHuman').pluralPascal(1).toString()).toEqual('VerifiedHuman');
        });
    });

    describe('position', (): void => {
        test('returns the position of the first occurrence of a substring in a string', (): void => {
            expect(Str.of('Hello, World!').position('Hello')).toEqual(0);
        });

        test('returns the position of the first occurrence of a substring in a string', (): void => {
            expect(Str.of('Hello, World!').position('W')).toEqual(7);
        });
    });

    describe('prepend', (): void => {
        test('prepends the given values onto the string', (): void => {
            expect(Str.of('Framework').prepend('Laravel ').toString()).toEqual('Laravel Framework');
        });
    });

    describe('remove', (): void => {
        test('removes the given value or values from the string', (): void => {
            expect(Str.of('Arkansas is quite beautiful!').remove('quite ').toString()).toEqual('Arkansas is beautiful!');
        });
    });

    describe('reverse', (): void => {
        test('reverses the given string', (): void => {
            expect(Str.of('Hello World').reverse().toString()).toEqual('dlroW olleH');
        });
    });

    describe('repeat', (): void => {
        test('repeats the given string', (): void => {
            expect(Str.of('a').repeat(5).toString()).toEqual('aaaaa');
        });
    });

    describe('replace', (): void => {
        test('replaces a given string within the string', (): void => {
            expect(Str.of('Laravel 9.x').replace('9.x', '10.x').toString()).toEqual('Laravel 10.x');
        });
    });

    describe('replaceArray', (): void => {
        test('replaces a given value in the string sequentially using an array', (): void => {
            expect(Str.of('The event will take place between ? and ?').replaceArray('?', ['8:30', '9:00']).toString()).toEqual('The event will take place between 8:30 and 9:00');
        });
    });

    describe('replaceFirst', (): void => {
        test('replaces the first occurrence of a given value in a string', (): void => {
            expect(Str.of('the quick brown fox jumps over the lazy dog').replaceFirst('the', 'a').toString()).toEqual('a quick brown fox jumps over the lazy dog');
        });
    });

    describe('replaceStart', (): void => {
        test('replaces the first occurrence of the given value only if it appears at the start of the string', (): void => {
            expect(Str.of('Hello World').replaceStart('Hello', 'Laravel').toString()).toEqual('Laravel World');
        });

        test('does not replace the first occurrence of the given value if it does not appear at the start of the string', (): void => {
            expect(Str.of('Hello World').replaceStart('World', 'Laravel').toString()).toEqual('Hello World');
        });
    });

    describe('replaceLast', (): void => {
        test('replaces the last occurrence of a given value in a string', (): void => {
            expect(Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a').toString()).toEqual('the quick brown fox jumps over a lazy dog');
        });
    });

    describe('replaceEnd', (): void => {
        test('replaces the last occurrence of the given value only if it appears at the end of the string', (): void => {
            expect(Str.of('Hello World').replaceEnd('World', 'Laravel').toString()).toEqual('Hello Laravel');
        });

        test('does not replace the last occurrence of the given value if it does not appear at the end of the string', (): void => {
            expect(Str.of('Hello World').replaceEnd('Hello', 'Laravel').toString()).toEqual('Hello World');
        });
    });

    describe('replaceMatches', (): void => {
        test('replaces all portions of a string matching a pattern with the given replacement string', (): void => {
            expect(Str.of('foo bar baz').replaceMatches(/baz/, 'bar').toString()).toEqual('foo bar bar');
            expect(Str.of('foo bar baz').replaceMatches(/404/, 'found').toString()).toEqual('foo bar baz');
        });

        test('replaces all portions of a string matching a pattern with the given array of replacement strings', (): void => {
            expect(Str.of('foo bar baz').replaceMatches([/bar/, /baz/], ['XXX', 'YYY']).toString()).toEqual('foo XXX YYY');
            expect(Str.of('foo bar baz').replaceMatches([/bar/, /baz/], ['XXX']).toString()).toEqual('foo XXX ');
        });

        test('replaces all portions of a string matching a pattern with the given callback as a replacement', (): void => {
            expect(Str.of('123').replaceMatches(/\d/, (matches: string[]): string => `[${matches[0]}]`).toString()).toEqual('[1][2][3]');
            expect(Str.of('foo baz bar').replaceMatches(/ba(.)/, (matches: [string, string]): string => `ba${(matches[1]).toUpperCase()}`).toString()).toEqual('foo baZ baR');
        });

        test('limits the number of replacements when "limit" value is provided', (): void => {
            expect(Str.of('foo baz baz').replaceMatches(/ba(.)/, 'bar', 1).toString()).toEqual('foo bar baz');
            expect(Str.of('123').replaceMatches(/\d/, (matches: string[]): string => `[${matches[0]}]`, 1).toString()).toEqual('[1]23');
        });
    });

    describe('squish', (): void => {
        test('removes all extraneous white space from a string', (): void => {
            expect(Str.of('    laravel    framework    ').squish().toString()).toEqual('laravel framework');
        });
    });

    describe('startsWith', (): void => {
        test('determines if the given string begins with the given value', (): void => {
            expect(Str.of('This is my name').startsWith('This')).toBeTruthy();
        });

        test('determines if the given string begins with any of the values in the array', (): void => {
            expect(Str.of('This is my name').startsWith(['This', 'That', 'There'])).toBeTruthy();
        });

        test('returns false if the given string does not start with the given value', (): void => {
            expect(Str.of('This is my name').startsWith('There')).toBeFalsy();
        });

        test('returns false if the given string does not start with any of the values in the array', (): void => {
            expect(Str.of('This is my name').startsWith(['That', 'There'])).toBeFalsy();
        });
    });

    describe('doesntStartWith', (): void => {
        test('determines if the given string does not start with the given value', (): void => {
            expect(Str.of('This is my name').doesntStartWith('There')).toBeTruthy();
        });

        test('determines if the given string does not start with any of the values in the array', (): void => {
            expect(Str.of('This is my name').doesntStartWith(['There', 'foo'])).toBeTruthy();
        });

        test('returns false if the given string starts with the given value', (): void => {
            expect(Str.of('This is my name').doesntStartWith('This')).toBeFalsy();
        });

        test('returns false if the string ends starts the given value', (): void => {
            expect(Str.of('This is my name').doesntStartWith(['This', 'foo'])).toBeFalsy();
        });
    });

    describe('start', (): void => {
        test('adds a single instance of the given value to a string if it does not already start with that value', (): void => {
            expect(Str.of('this/string').start('/').toString()).toEqual('/this/string');
        });

        test('does not add a value to a string that already starts with that value', (): void => {
            expect(Str.of('/this/string').start('/').toString()).toEqual('/this/string');
        });
    });

    describe('upper', (): void => {
        test('converts the given string to uppercase', (): void => {
            expect(Str.of('laravel').upper().toString()).toEqual('LARAVEL');
        });
    });

    describe('title', (): void => {
        test('converts the given string to Title Case', (): void => {
            expect(Str.of('a nice title uses the correct case').title().toString()).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('headline', (): void => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word\'s first letter capitalized', (): void => {
            expect(Str.of('taylor_otwell').headline().toString()).toEqual('Taylor Otwell');
            expect(Str.of('EmailNotificationSent').headline().toString()).toEqual('Email Notification Sent');
        });
    });

    describe('apa', (): void => {
        test('converts the given string to title case following the APA guidelines', (): void => {
            expect(Str.of('a nice title uses the correct case').apa().toString()).toEqual('A Nice Title Uses the Correct Case');
        });
    });

    describe('singular', (): void => {
        test('converts plural to singular for regular nouns', (): void => {
            expect(Str.of('cars').singular().toString()).toBe('car');
            expect(Str.of('books').singular().toString()).toBe('book');
            expect(Str.of('apples').singular().toString()).toBe('apple');
        });

        test('handles irregular nouns correctly', (): void => {
            // A
            expect(Str.of('alumnae').singular().toString()).toBe('alumna');
            expect(Str.of('analyses').singular().toString()).toBe('analysis');
            expect(Str.of('axes').singular().toString()).toBe('axis');

            // B-C
            expect(Str.of('bacteria').singular().toString()).toBe('bacterium');
            expect(Str.of('children').singular().toString()).toBe('child');
            expect(Str.of('crises').singular().toString()).toBe('crisis');

            // D-F
            expect(Str.of('demos').singular().toString()).toBe('demo');
            expect(Str.of('feet').singular().toString()).toBe('foot');
            expect(Str.of('fungi').singular().toString()).toBe('fungus');

            // G-M
            expect(Str.of('geese').singular().toString()).toBe('goose');
            expect(Str.of('men').singular().toString()).toBe('man');
            expect(Str.of('mice').singular().toString()).toBe('mouse');

            // N-S
            expect(Str.of('nuclei').singular().toString()).toBe('nucleus');
            expect(Str.of('people').singular().toString()).toBe('person');
            expect(Str.of('theses').singular().toString()).toBe('thesis');

            // T-Z
            expect(Str.of('teeth').singular().toString()).toBe('tooth');
            expect(Str.of('wives').singular().toString()).toBe('wife');
            expect(Str.of('zombies').singular().toString()).toBe('zombie');
        });

        test('handles uncountable nouns correctly', (): void => {
            expect(Str.of('sheep').singular().toString()).toBe('sheep');
            expect(Str.of('fish').singular().toString()).toBe('fish');
            expect(Str.of('series').singular().toString()).toBe('series');
            expect(Str.of('money').singular().toString()).toBe('money');
            expect(Str.of('information').singular().toString()).toBe('information');
        });

        test('handles special singularization rules', (): void => {
            // -ves → -f/-fe
            expect(Str.of('leaves').singular().toString()).toBe('leaf');
            expect(Str.of('knives').singular().toString()).toBe('knife');

            // -ies → -y
            expect(Str.of('cities').singular().toString()).toBe('city');
            expect(Str.of('babies').singular().toString()).toBe('baby');

            // -oes → -o
            expect(Str.of('potatoes').singular().toString()).toBe('potato');
            expect(Str.of('volcanoes').singular().toString()).toBe('volcano');

            // -i → -us
            expect(Str.of('cacti').singular().toString()).toBe('cactus');
            expect(Str.of('foci').singular().toString()).toBe('focus');

            // -es → -is
            expect(Str.of('analyses').singular().toString()).toBe('analysis');
            expect(Str.of('bases').singular().toString()).toBe('basis');

            // -ices → -ix/ex
            expect(Str.of('matrices').singular().toString()).toBe('matrix');
            expect(Str.of('indices').singular().toString()).toBe('index');
        });

        test('handles compound words and special cases', (): void => {
            expect(Str.of('passersby').singular().toString()).toBe('passerby');
            expect(Str.of('runners-up').singular().toString()).toBe('runner-up');
        });

        test('handles words with multiple singular forms', (): void => {
            expect(Str.of('octopuses').singular().toString()).toBe('octopus');
            expect(Str.of('hoofs').singular().toString()).toBe('hoof');
        });

        test('preserves case sensitivity', (): void => {
            expect(Str.of('Heroes').singular().toString()).toBe('Hero');
            expect(Str.of('CHILDREN').singular().toString()).toBe('CHILD');
            expect(Str.of('Analyses').singular().toString()).toBe('Analysis');
        });

        test('handles edge cases', (): void => {
            expect(Str.of('').singular().toString()).toBe('');
            expect(Str.of(' ').singular().toString()).toBe(' ');
            expect(Str.of('123').singular().toString()).toBe('123');
        });
    });

    describe('slug', (): void => {
        test('generates a URL friendly "slug" from the given string', (): void => {
            expect(Str.of('Laravel Framework').slug('-').toString()).toEqual('laravel-framework');
        });
    });

    describe('snake', (): void => {
        test('converts the given string to snake_case', (): void => {
            expect(Str.of('fooBar').snake().toString()).toEqual('foo_bar');
        });
    });

    describe('startsWith', (): void => {
        test('determines if the given string begins with the given value', (): void => {
            expect(Str.of('This is my name').startsWith('This')).toBeTruthy();
        });
    });

    describe('studly', (): void => {
        test('converts the given string to studly caps case', (): void => {
            expect(Str.of('foo_bar').studly().toString()).toEqual('FooBar');
        });
    });

    describe('pascal', (): void => {
        test('converts the given string to Pascal case', (): void => {
            expect(Str.of('foo_bar').pascal().toString()).toEqual('FooBar');
        });
    });

    describe('substr', (): void => {
        test('returns the portion of the string specified by the given start and length parameters', (): void => {
            expect(Str.of('Laravel Framework').substr(8).toString()).toEqual('Framework');
        });

        test('returns the portion of the string specified by the given start and length parameters', (): void => {
            expect(Str.of('Laravel Framework').substr(8, 5).toString()).toEqual('Frame');
        });
    });

    describe('substrCount', (): void => {
        test('returns the number of occurrences of a given value in the given string', (): void => {
            expect(Str.of('If you like ice cream, you will like snow cones.').substrCount('like')).toEqual(2);
        });
    });

    describe('substrReplace', (): void => {
        test('replaces text within a portion of a string starting at the specified position', (): void => {
            expect(Str.of('1300').substrReplace(':', 2).toString()).toEqual('13:');
        });

        test('inserts the string at the specified position without replacing any existing characters', (): void => {
            expect(Str.of('The Framework').substrReplace(' Laravel', 3, 0).toString()).toEqual('The Laravel Framework');
        });
    });

    describe('swap', (): void => {
        test('replaces multiple values in the string', (): void => {
            expect(Str.of('Tacos are great!').swap({
                'Tacos': 'Burritos',
                'great': 'fantastic'
            }).toString()).toEqual('Burritos are fantastic!');
        });
    });

    describe('take', (): void => {
        test('returns specified number of characters from the beginning of the string', (): void => {
            expect(Str.of('Build something amazing!').take(5).toString()).toEqual('Build');
        });
    });

    describe('tap', (): void => {
        test('passes the string to the given closure', (): void => {
            expect(Str.of('Laravel').tap((string: Stringable): Stringable => string.lower()).upper().toString()).toEqual('LARAVEL');
        });
    });

    describe('trim', (): void => {
        test('trims the given string', (): void => {
            expect(Str.of('  Laravel  ').trim().toString()).toEqual('Laravel');
        });

        test('trims the given string with custom characters', (): void => {
            expect(Str.of('/Laravel/').trim('/').toString()).toEqual('Laravel');
        });
    });

    describe('ltrim', (): void => {
        test('trims the left side of the string', (): void => {
            expect(Str.of('  Laravel  ').ltrim().toString()).toEqual('Laravel  ');
        });

        test('trims the left side of the string with specified characters', (): void => {
            expect(Str.of('/Laravel/').ltrim('/').toString()).toEqual('Laravel/');
        });
    });

    describe('rtrim', (): void => {
        test('trims the right side of the given string', (): void => {
            expect(Str.of('  Laravel  ').rtrim().toString()).toEqual('  Laravel');
        });

        test('trims the right side of the string with specified characters', (): void => {
            expect(Str.of('/Laravel/').rtrim('/').toString()).toEqual('/Laravel');
        });
    });

    describe('lcfirst', (): void => {
        test('returns the given string with the first character lowercased', (): void => {
            expect(Str.of('Foo Bar').lcfirst().toString()).toEqual('foo Bar');
        });
    });

    describe('ucfirst', (): void => {
        test('returns the given string with the first character capitalized', (): void => {
            expect(Str.of('foo bar').ucfirst().toString()).toEqual('Foo bar');
        });
    });

    describe('ucsplit', (): void => {
        test('splits the given string into an array by uppercase characters', (): void => {
            expect(Str.of('FooBar').ucsplit()).toEqual(['Foo', 'Bar']);
        });
    });

    describe('when', (): void => {
        test('invokes the given closure if a given condition is true', (): void => {
            expect(Str.of('Taylor').when(true, (string: Stringable): Stringable => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
        });

        test('invokes the fallback closure if the condition is false', (): void => {
            expect(Str.of('Taylor').when(false, (string: Stringable): Stringable => string.append(' Otwell'), (string: Stringable): Stringable => string.append(' Swift')).toString()).toEqual('Taylor Swift');
        });
    });

    describe('unless', (): void => {
        test('invokes the given closure if a given condition is false', (): void => {
            expect(Str.of('Taylor').unless(false, (string: Stringable): Stringable => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
        });

        test('invokes the fallback closure if the condition is true', (): void => {
            expect(Str.of('Taylor').unless(true, (string: Stringable): Stringable => string.append(' Otwell'), (string: Stringable): Stringable => string.append(' Swift')).toString()).toEqual('Taylor Swift');
        });
    });

    describe('whenContains', (): void => {
        test('invokes the given closure if the string contains the given value', (): void => {
            expect(Str.of('tony stark').whenContains('tony', (string: Stringable): Stringable => string.title()).toString()).toEqual('Tony Stark');
        });

        test('invokes the given closure if the string contains any value in the array', (): void => {
            expect(Str.of('tony stark').whenContains(['tony', 'hulk'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Tony Stark');
        });

        test('invokes the fallback closure if the string does not contain the given value', (): void => {
            expect(Str.of('tony stark').whenContains('hulk', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('TONY STARK');
        });
    });

    describe('whenContainsAll', (): void => {
        test('invokes the given closure if the string contains all the given sub-strings', (): void => {
            expect(Str.of('tony stark').whenContainsAll(['tony', 'stark'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Tony Stark');
        });

        test('invokes the fallback closure if the string does not contain all the given sub-strings', (): void => {
            expect(Str.of('tony stark').whenContainsAll(['tony', 'stark', 'ironman'], (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('TONY STARK');
        });
    });

    describe('whenEmpty', (): void => {
        test('invokes the given closure if the string is empty', (): void => {
            expect(Str.of('  ').whenEmpty((string: Stringable): Stringable => string.trim().prepend('Laravel')).toString()).toEqual('Laravel');
        });

        test('invokes the fallback closure if the string is not empty', (): void => {
            expect(Str.of('not empty').whenEmpty((string: Stringable): Stringable => string.trim().prepend('Laravel'), (string: Stringable): Stringable => string.upper()).toString()).toEqual('NOT EMPTY');
        });
    });

    describe('whenNotEmpty', (): void => {
        test('invokes the given closure if the string is not empty', (): void => {
            expect(Str.of('Framework').whenNotEmpty((string: Stringable): Stringable => string.prepend('Laravel ')).toString()).toEqual('Laravel Framework');
        });

        test('invokes the fallback closure if the string is empty', (): void => {
            expect(Str.of('   ').whenNotEmpty((string: Stringable): Stringable => string.prepend('Laravel '), (string: Stringable): Stringable => string.trim().prepend('Fallback: ')).toString()).toEqual('Fallback: ');
        });
    });

    describe('whenEndsWith', (): void => {
        test('invokes the given closure if the string ends with the given sub-string', (): void => {
            expect(Str.of('disney world').whenEndsWith('world', (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the given closure if the string ends with any of the given sub-strings', (): void => {
            expect(Str.of('disney world').whenEndsWith(['hello', 'world'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the fallback closure if the string does not end with the given sub-string', (): void => {
            expect(Str.of('disney world').whenEndsWith('hello', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('DISNEY WORLD');
        });
    });

    describe('whenDoesntEndWith', (): void => {
        test('invokes the given closure if the string does not end with the given sub-string', (): void => {
            expect(Str.of('disney world').whenDoesntEndWith('land', (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the given closure if the string does not end with any of the given sub-strings', (): void => {
            expect(Str.of('disney world').whenDoesntEndWith(['land', 'moon'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the fallback closure if the string ends with the given sub-string', (): void => {
            expect(Str.of('disney world').whenDoesntEndWith('world', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('DISNEY WORLD');
        });
    });

    describe('whenExactly', (): void => {
        test('invokes the given closure if the string exactly matches the given string', (): void => {
            expect(Str.of('laravel').whenExactly('laravel', (string: Stringable): Stringable => string.title()).toString()).toEqual('Laravel');
        });

        test('invokes the fallback closure if the string does not exactly match the given string', (): void => {
            expect(Str.of('laravel').whenExactly('Laravel', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('LARAVEL');
        });
    });

    describe('whenNotExactly', (): void => {
        test('invokes the given closure if the string does not exactly match the given string', (): void => {
            expect(Str.of('framework').whenNotExactly('laravel', (string: Stringable): Stringable => string.title()).toString()).toEqual('Framework');
        });

        test('invokes the fallback closure if the string exactly matches the given string', (): void => {
            expect(Str.of('laravel').whenNotExactly('laravel', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('LARAVEL');
        });
    });

    describe('whenIs', (): void => {
        test('invokes the given closure if the string matches a given pattern', (): void => {
            expect(Str.of('foo/bar').whenIs('foo/*', (string: Stringable): Stringable => string.append('/baz')).toString()).toEqual('foo/bar/baz');
        });

        test('invokes the fallback closure if the string does not match the given pattern', (): void => {
            expect(Str.of('foo/bar').whenIs('bar/*', (string: Stringable): Stringable => string.append('/baz'), (string: Stringable): Stringable => string.upper()).toString()).toEqual('FOO/BAR');
        });
    });

    describe('whenIsAscii', (): void => {
        test('invokes the given closure if the string is 7-bit ASCII', (): void => {
            expect(Str.of('laravel').whenIsAscii((string: Stringable): Stringable => string.title()).toString()).toEqual('Laravel');
        });

        test('invokes the fallback closure if the string is not 7-bit ASCII', (): void => {
            expect(Str.of('läråvèl').whenIsAscii((string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('LÄRÅVÈL');
        });
    });

    describe('whenIsUuid', (): void => {
        test('invokes the given closure if the string is a valid UUID', (): void => {
            expect(Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string: Stringable): Stringable => string.substr(0, 8)).toString()).toEqual('a0a2a2d2');
        });
    });

    describe('whenIsUlid', (): void => {
        test('invokes the given closure if the string is a valid ULID', (): void => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string: Stringable): Stringable => string.substr(0, 8)).toString()).toEqual('01gd6r36');
        });

        test('invokes the fallback closure if the string is not a valid UUID', (): void => {
            expect(Str.of('not-a-uuid').whenIsUuid((string: Stringable): Stringable => string.substr(0, 8), (string: Stringable): Stringable => string.upper()).toString()).toEqual('NOT-A-UUID');
        });
    });

    describe('whenStartsWith', (): void => {
        test('invokes the given closure if the string starts with the given sub-string', (): void => {
            expect(Str.of('disney world').whenStartsWith('disney', (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the given closure if the string starts with any of the given sub-strings', (): void => {
            expect(Str.of('disney world').whenStartsWith(['hello', 'disney'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the fallback closure if the string does not start with the given sub-string', (): void => {
            expect(Str.of('disney world').whenStartsWith('hello', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('DISNEY WORLD');
        });
    });

    describe('whenDoesntStartWith', (): void => {
        test('invokes the given closure if the string does not start with the given sub-string', (): void => {
            expect(Str.of('disney world').whenDoesntStartWith('hello', (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the given closure if the string does not start with any of the given sub-strings', (): void => {
            expect(Str.of('disney world').whenDoesntStartWith(['foo', 'bar'], (string: Stringable): Stringable => string.title()).toString()).toEqual('Disney World');
        });

        test('invokes the fallback closure if the string starts with the given sub-string', (): void => {
            expect(Str.of('disney world').whenDoesntStartWith('dis', (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('DISNEY WORLD');
        });
    });

    describe('whenTest', (): void => {
        test('invokes the given closure if the string matches the given regular expression', (): void => {
            expect(Str.of('laravel framework').whenTest(/laravel/, (string: Stringable): Stringable => string.title()).toString()).toEqual('Laravel Framework');
        });

        test('invokes the fallback closure if the string does not match the given regular expression', (): void => {
            expect(Str.of('laravel framework').whenTest(/^[0-9]+$/, (string: Stringable): Stringable => string.title(), (string: Stringable): Stringable => string.upper()).toString()).toEqual('LARAVEL FRAMEWORK');
        });
    });

    describe('words', (): void => {
        test('limits the number of words in the string', (): void => {
            expect(Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>').toString()).toEqual('Perfectly balanced, as >>>');
        });
    });

    describe('wordCount', (): void => {
        test('returns the number of words in the string', (): void => {
            expect(Str.of('Hello, world!').wordCount()).toEqual(2);
        });
    });

    describe('wordWrap', (): void => {
        test('wraps a string to a given number of characters', (): void => {
            expect(Str.of('The quick brown fox jumped over the lazy dog.').wordWrap(20, '<br />\n').toString()).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
        });
    });

    describe('wrap', (): void => {
        test('wraps the given string with an additional string or a pair of strings', (): void => {
            expect(Str.of('Laravel').wrap('"').toString()).toEqual('"Laravel"');
            expect(Str.of('is').wrap('This ', ' Laravel!').toString()).toEqual('This is Laravel!');
        });
    });

    describe('unwrap', (): void => {
        test('removes the specified strings from the beginning and end of a given string', (): void => {
            expect(Str.of('-Laravel-').unwrap('-').toString()).toEqual('Laravel');
        });

        test('removes the specified strings from the beginning and end of a given string with different delimiters', (): void => {
            expect(Str.of('{framework: "Laravel"}').unwrap('{', '}').toString()).toEqual('framework: "Laravel"');
        });
    });

    describe('toHtmlString', (): void => {
        test('converts the string instance to an instance of HTMLElement', (): void => {
            const input: HTMLInputElement = Str.of('<input type="text" placeholder="Hello">').toHtmlString() as HtmlStringType as HTMLInputElement;

            expect(input).toBeInstanceOf(HTMLInputElement);
            expect(input.type).toEqual('text');
            expect(input.placeholder).toEqual('Hello');
        });

        test('returns a string If no valid HTML is provided', (): void => {
            expect(Str.of('Hello').toHtmlString()).toEqual('Hello');
        });
    });

    describe('toBase64', (): void => {
        test('converts the given string to Base64', (): void => {
            expect(Str.of('Laravel').toBase64().toString()).toEqual('TGFyYXZlbA==');
        });
    });

    describe('fromBase64', (): void => {
        test('converts the given string from Base64', (): void => {
            expect(Str.of('TGFyYXZlbA==').fromBase64().toString()).toEqual('Laravel');
        });
    });

    describe('dd', (): void => {
        test('dumps the given string and ends execution of the script', (): void => {
            const $console: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]> = jest.spyOn(console, 'log').mockImplementation();

            expect((): never => Str.of('Laravel').dd()).toThrow('dd()');
            expect($console).toHaveBeenCalledWith('Laravel');

            $console.mockRestore();
        });
    });

    describe('dump', (): void => {
        test('dumps the given string to the console', (): void => {
            const $console: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]> = jest.spyOn(console, 'log').mockImplementation();

            Str.of('Laravel').dump();
            expect($console).toHaveBeenCalledWith('Laravel');

            $console.mockRestore();
        });
    });

    describe('value', (): void => {
        test('gets the underlying string value', (): void => {
            expect(Str.of('Hello World').value()).toEqual('Hello World');
        });
    });

    describe('toString', (): void => {
        test('gets the raw string value', (): void => {
            expect(Str.of('Laravel').toString()).toEqual('Laravel');
        });
    });

    describe('toInteger', (): void => {
        test('returns the underlying string value as an integer', (): void => {
            expect(Str.of('42').toInteger()).toEqual(42);
            expect(Str.of('-13').toInteger()).toEqual(-13);
        });

        test('returns 0 if the underlying string value is not a number', (): void => {
            expect(Str.of('Laravel').toInteger()).toEqual(0);
            expect(Str.of('').toInteger()).toEqual(0);
            expect(Str.of('  ').toInteger()).toEqual(0);
        });

        test('handles different base values', (): void => {
            expect(Str.of('077').toInteger(0)).toEqual(77);
            expect(Str.of('1010').toInteger(2)).toEqual(10);
            expect(Str.of('42').toInteger(8)).toEqual(34);
            expect(Str.of('0xFF').toInteger(16)).toEqual(255);
            expect(Str.of('Z').toInteger(36)).toEqual(35);
        });

        test('handles very large numbers', (): void => {
            expect(Str.of('9007199254740991').toInteger()).toEqual(Number.MAX_SAFE_INTEGER);
        });

        test('handles partial number strings', (): void => {
            expect(Str.of('123abc').toInteger()).toEqual(123);
            expect(Str.of('abc123').toInteger()).toEqual(0);
        });

        test('handles numeric separators', (): void => {
            expect(Str.of('1_000').toInteger()).toEqual(1);
        });

        test('handles edge values', (): void => {
            expect(Str.of('Infinity').toInteger()).toEqual(0);
            expect(Str.of('NaN').toInteger()).toEqual(0);
        });
    });

    describe('toFloat', (): void => {
        test('returns the underlying string value as a float', (): void => {
            expect(Str.of('1.5').toFloat()).toEqual(1.5);
        });

        test('returns 0 if the underlying string value is not a number', (): void => {
            expect(Str.of('Laravel').toFloat()).toEqual(0);
        });
    });

    describe('toBoolean', (): void => {
        test('returns the underlying string value as a boolean', (): void => {
            expect(Str.of('true').toBoolean()).toEqual(true);
        });

        test('returns false if the underlying string value is not recognized as true', (): void => {
            expect(Str.of('Laravel').toBoolean()).toEqual(false);
        });
    });

    describe('toDate', (): void => {
        test('gets the underlying string value as a formatted Date string', (): void => {
            expect(Str.of('13 September 2023, 12:00 PM').toDate()).toEqual('9/13/2023, 12:00:00');
        });

        test('formats the date and sets the Timezone', (): void => {
            expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'Europe/London')).toEqual('2023-09-13 11:00:00');
            expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'America/Toronto')).toEqual('2023-09-13 06:00:00');
        });

        test('returns "Invalid Date" for incorrect Date/Time string', (): void => {
            expect(Str.of('Laravel').toDate()).toEqual('Invalid Date');
        });

        test('format \'d\' returns the day of the month, 2 digits with leading zeros', (): void => {
            expect(Str.of('2024-02-29').toDate('d', 'CET')).toEqual('29');
        });

        test('format \'D\' returns a textual representation of a day, three letters', (): void => {
            expect(Str.of('2024-02-29').toDate('D', 'CET')).toEqual('Thu');
        });

        test('format \'j\' returns the day of the month without leading zeros', (): void => {
            expect(Str.of('2024-02-29').toDate('j', 'CET')).toEqual('29');
        });

        test('format \'l\' returns a full textual representation of the day of the week', (): void => {
            expect(Str.of('2024-02-29').toDate('l', 'CET')).toEqual('Thursday');
        });

        test('format \'N\' returns ISO 8601 numeric representation of the day of the week', (): void => {
            expect(Str.of('2024-02-29').toDate('N', 'CET')).toEqual('4');
        });

        test('format \'S\' returns English ordinal suffix for the day of the month, 2 characters', (): void => {
            expect(Str.of('2024-02-29').toDate('S', 'CET')).toEqual('th');
        });

        test('format \'w\' returns numeric representation of the day of the week', (): void => {
            expect(Str.of('2024-02-29').toDate('w', 'CET')).toEqual('4');
        });

        test('format \'z\' returns numeric representation of the day of the week', (): void => {
            expect(Str.of('2024-02-29').toDate('z', 'CET')).toEqual('60');
        });

        test('format \'W\' returns ISO 8601 week number of year, weeks starting on Monday', (): void => {
            expect(Str.of('2024-02-29').toDate('W', 'CET')).toEqual('09');
        });

        test('format \'F\' returns a full textual representation of a month', (): void => {
            expect(Str.of('2024-02-29').toDate('F', 'CET')).toEqual('February');
        });

        test('format \'m\' returns numeric representation of a month, with leading zeros', (): void => {
            expect(Str.of('2024-02-29').toDate('m', 'CET')).toEqual('02');
        });

        test('format \'M\' returns a short textual representation of a month, three letters', (): void => {
            expect(Str.of('2024-02-29').toDate('M', 'CET')).toEqual('Feb');
        });

        test('format \'n\' returns numeric representation of a month, without leading zeros', (): void => {
            expect(Str.of('2024-02-29').toDate('n', 'CET')).toEqual('2');
        });

        test('format \'t\' returns number of days in the given month', (): void => {
            expect(Str.of('2024-02-29').toDate('t', 'CET')).toEqual('29');
        });

        test('format \'L\'\' returns whether it"s a leap year', (): void => {
            expect(Str.of('2024-02-29').toDate('L', 'CET')).toEqual('1');
        });

        test('format \'o\' returns ISO 8601 week-numbering year', (): void => {
            expect(Str.of('2024-02-29').toDate('o', 'CET')).toEqual('2024');
        });

        test('format \'X\' returns an expanded full numeric representation of a year', (): void => {
            expect(Str.of('2024-02-29').toDate('X', 'CET')).toEqual('+2024');
        });

        test('format \'x\' returns an expanded full numeric representation if required', (): void => {
            expect(Str.of('2024-02-29').toDate('x', 'CET')).toEqual('2024');
        });

        test('format \'Y\' returns a full numeric representation of a year', (): void => {
            expect(Str.of('2024-02-29').toDate('Y', 'CET')).toEqual('2024');
        });

        test('format \'y\' returns a two-digit representation of a year', (): void => {
            expect(Str.of('2024-02-29').toDate('y', 'CET')).toEqual('24');
        });

        test('format \'a\' returns lowercase Ante meridiem and Post meridiem', (): void => {
            expect(Str.of('2024-02-29 08:00:00').toDate('a', 'CET')).toEqual('am');
        });

        test('format \'A\' returns uppercase Ante meridiem and Post meridiem', (): void => {
            expect(Str.of('2024-02-29 20:00:00').toDate('A', 'CET')).toEqual('PM');
        });

        test('format \'B\' returns Swatch Internet time', (): void => {
            expect(Str.of('2024-02-29 12:00:00').toDate('B', 'CET')).toEqual('500');
        });

        test('format \'g\' returns 12-hour format of an hour without leading zeros', (): void => {
            expect(Str.of('2024-02-29 08:00:00').toDate('g', 'CET')).toEqual('8');
        });

        test('format \'G\' returns 24-hour format of an hour without leading zeros', (): void => {
            expect(Str.of('2024-02-29 20:00:00').toDate('G', 'CET')).toEqual('20');
        });

        test('format \'h\' returns 12-hour format of an hour with leading zeros', (): void => {
            expect(Str.of('2024-02-29 08:00:00').toDate('h', 'CET')).toEqual('08');
        });

        test('format \'H\' returns 24-hour format of an hour with leading zeros', (): void => {
            expect(Str.of('2024-02-29 20:00:00').toDate('H', 'CET')).toEqual('20');
        });

        test('format \'i\' returns minutes with leading zeros', (): void => {
            expect(Str.of('2024-02-29 08:09:00').toDate('i', 'CET')).toEqual('09');
        });

        test('format \'s\' returns seconds with leading zeros', (): void => {
            expect(Str.of('2024-02-29 08:09:07').toDate('s', 'CET')).toEqual('07');
        });

        test('format \'u\' returns microseconds', (): void => {
            expect((): string => Str.of('2024-02-29 08:09:07.654321').toDate('u', 'CET')).toThrow('Microseconds are not supported.');
        });

        test('format \'v\' returns milliseconds', (): void => {
            expect(Str.of('2024-02-29 08:09:07.654').toDate('v', 'CET')).toEqual('654');
        });

        test('format \'e\' returns timezone identifier', (): void => {
            expect(Str.of('2024-02-29 08:09:07').toDate('e', 'CET')).toMatch(/^(?:GMT|UTC|[A-Za-z\/_]+(?:[+\-][0-9]+)?)$/);
        });

        test('format \'I\' returns whether or not the date is in daylight saving time', (): void => {
            expect(Str.of('2024-02-29').toDate('I', 'CET')).toMatch(/^[01]$/);
        });

        test('format \'O\' returns difference to Greenwich time (GMT) without colon between hours and minutes', (): void => {
            expect(Str.of('2024-02-29').toDate('O', 'CET')).toMatch(/^[+\-]\d{4}$/);
        });

        test('format \'P\' returns difference to Greenwich time (GMT) with colon between hours and minutes', (): void => {
            expect(Str.of('2024-02-29').toDate('P', 'CET')).toMatch(/^[+\-]\d{2}:\d{2}$/);
        });

        test('format \'p\' returns the same as P, but returns Z instead of +00:00', (): void => {
            expect(Str.of('2024-02-29').toDate('p', 'CET')).toMatch(/^[+\-]\d{2}:\d{2}$/);
        });

        test('format \'T\' returns timezone abbreviation, if known; otherwise the GMT offset', (): void => {
            expect(Str.of('2024-02-29').toDate('T', 'CET')).toMatch(/^[A-Za-z]+|[+\-]\d{2}:\d{2}$/);
        });

        test('format \'Z\' returns timezone offset in seconds', (): void => {
            expect(Str.of('2024-02-29').toDate('Z', 'CET')).toMatch(/([+\-]?\d+)/);
        });

        test('format \'c\' returns ISO 8601 date', (): void => {
            expect(Str.of('2024-02-29 08:09:07').toDate('c', 'CET')).toEqual('2024-02-29T08:09:07+01:00');
        });

        test('format \'r\' returns seconds since the Unix Epoch', (): void => {
            expect(Str.of('2024-02-29').toDate('r', 'CET')).toEqual('Thu, 29 Feb 2024 01:00:00 +0100');
        });

        test('format \'U\' returns RFC 2822/RFC 5322 formatted date', (): void => {
            expect(Str.of('2024-02-29').toDate('U', 'CET')).toMatch(/^-?\d+$/);
        });
    });
});

describe('str', (): void => {
    test('returns instance of Stringable', (): void => {
        expect(str()).toBeInstanceOf(Stringable);
    });
});