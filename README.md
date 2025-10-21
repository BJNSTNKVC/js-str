# Str

JavaScript equivalent of [Laravel Str](https://laravel.com/docs/12.x/strings) helper.

## Installation & setup

### NPM

You can install the package via npm:

```bash
npm install @bjnstnkvc/str
```

and then import it into your project

```js
import { Str } from '@bjnstnkvc/str'
```

### CDN

You can install the package via jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@bjnstnkvc/str/lib/main.min.js"></script>
```

## Usage

Once imported, you can use these functions which provide a fluent interface to interact with Strings.

### Strings

#### Str.after()

The `Str.after` method returns everything after the given value in a string. The entire string will be returned if the value does not exist within the string:

```js
Str.after('This is my name', 'This is');

// ' my name'
```

#### Str.afterLast()

The `Str.afterLast` method returns everything after the last occurrence of the given value in a string.
The entire string will be returned if the value does not exist within the string:

```js
Str.afterLast('App\\Http\\Controllers\\Controller', '\\');

// 'Controller'
```

#### Str.apa()

The `Str.apa` method converts the given string to title case following the [APA guidelines](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case):

```js
Str.apa('Creating A Project');

// 'Creating a Project'
```

#### Str.ascii()

The `Str.ascii` method will attempt to transliterate the string into an ASCII value:

```js
Str.ascii('û');

// 'u'
```

#### Str.before()

The `Str.before` method returns everything before the given value in a string:

```js
Str.before('This is my name', 'my name');

// 'This is '
```

#### Str.beforeLast()

The `Str.beforeLast` method returns everything before the last occurrence of the given value in a string:

```js
Str.beforeLast('This is my name', 'is');

// 'This '
```

#### Str.between()

The `Str.between` method returns the portion of a string between two values:

```js
Str.between('This is my name', 'This', 'name');

// ' is my '
```

#### Str.betweenFirst()

The `Str.betweenFirst` method returns the smallest possible portion of a string between two values:

```js
Str.betweenFirst('[a] bc [d]', '[', ']');

// 'a'
```

#### Str.camel()

The `Str.camel` method converts the given string to `camelCase`:

```js
Str.camel('foo_bar');

// 'fooBar'
```

#### Str.charAt()

The `Str.charAt` method returns the character at the specified index. If the index is out of bounds, false is returned:

```js
Str.charAt('This is my name.', 6);

// 's'
```

#### Str.chopStart()

The `Str.chopStart` method removes the given string if it exists at the start of the subject:

```js
Str.chopStart('Hello, world!', 'Hello, ');

// 'world!'
```

You may also pass an array of strings to remove the first matching string found at the start of the subject:

```js
Str.chopStart('Hello, world!', ['Hi, ', 'Hello, ']);

// 'world!'
```

If multiple strings in the array are found at the start of the subject, only the first match will be removed:

```js
Str.chopStart('Hello, Hello, world!', ['Hello, ', 'Hello, ']);

// 'Hello, world!'
```

#### Str.chopEnd()

The `Str.chopEnd` method removes the given string if it exists at the end of the subject:

```js
Str.chopEnd('Hello, world!', ', world!');

// 'Hello'
```

You may also pass an array of strings to remove the first matching string found at the end of the subject:

```js
Str.chopEnd('Hello, world!', ['planet!', ', world!']);

// 'Hello'
```

If multiple strings in the array are found at the end of the subject, only the first match will be removed:

```js
Str.chopEnd('Hello, world!world!', ['world!', 'world!']);

// 'Hello, world!'
```

#### Str.contains()

The `Str.contains` method determines if the given string contains the given value. This method is case-sensitive:

```js
Str.contains('This is my name', 'my');

// true
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.contains('This is my name', ['my', 'foo']);

// true
```

You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.contains('This is my name', 'MY', true);

// true
```

#### Str.containsAll()

The `Str.containsAll` method determines if the given string contains all the values in a given array:

```js
Str.containsAll('This is my name', ['my', 'name']);

// true
```
You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.containsAll('This is my name', ['MY', 'NAME'], true);

// true
```

#### Str.doesntContain()

The `Str.doesntContain` method determines if the given string doesn't contain the given value. By default, this method is case-sensitive:

```js
Str.doesntContain('This is name', 'my');

// true
```

You may also pass an array of values to determine if the given string doesn't contain any of the values in the array:

```js
Str.doesntContain('This is my name', ['my', 'foo']);

// true
```

You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.doesntContain('This is my name', 'MY', true);

// false
```

#### Str.convertCase()

The `Str.convertCase` method converts the case of a string according the mode of conversion (defaults to `MB_CASE_FOLD`). Modes of conversion are:

##### MB_CASE_UPPER

Performs a full upper-case folding.

```js
Str.convertCase('hello', Mode.MB_CASE_UPPER);

// HELLO
```

##### MB_CASE_LOWER

Performs a full lower-case folding.

```js
Str.convertCase('HELLO', Mode.MB_CASE_UPPER);

// hello
```

##### MB_CASE_TITLE

Performs a full title-case conversion based on the Cased and CaseIgnorable derived Unicode properties.

```js
Str.convertCase('a nice title uses the correct case', Mode.MB_CASE_TITLE);

// 'A Nice Title Uses The Correct Case'
```

##### MB_CASE_FOLD

Performs a full case fold conversion which removes case distinctions present in the string.

```js
Str.convertCase('HeLLo', Mode.MB_CASE_FOLD);

// hello
```

#### Str.deduplicate()

The `Str.deduplicate` method replaces consecutive instances of a character with a single instance of that character in the given string. By default, the method deduplicates spaces:

```js
Str.deduplicate('The   Laravel   Framework');

//  The Laravel Framework 
```

```js
Str.deduplicate('The---Laravel---Framework', '-');

// The-Laravel-Framework
```

You can also pass an array of characters to replace consecutive instances of:

```js
Str.deduplicate('Thee---Laravell---Frramework', ['-', 'e', 'l', 'r']);

// The-Laravel-Frramework
```

#### Str.endsWith()

The `Str.endsWith` method determines if the given string ends with the given value:

```js
Str.endsWith('This is my name', 'name');

// true
```

```js
Str.endsWith('This is my name', 'names');

// false
```

You may also pass an array of values to determine if the given string ends with any of the values in the array:

```js
Str.endsWith('This is my name', ['name', 'foo']);

// true
```

```js
Str.endsWith('This is my name', ['names', 'foo']);

// false
```

#### Str.doesntEndWith()

The `Str.doesntEndWith` method determines if the given string doesn't end with a given substring:

```js
Str.doesntEndWith('This is my name', 'names');

// true
```

```js
Str.doesntEndWith('This is my name', 'name');

// false
```

You may also pass an array of values to determine if the given string doesn't end with any of the values in the array:

```js
Str.doesntEndWith('This is my name', ['names', 'foo']);

// true
```

```js
Str.doesntEndWith('This is my name', ['name', 'foo']);

// false
```

#### Str.excerpt()

The `Str.excerpt` method extracts an excerpt from a given string that matches the first instance of a phrase within that string:

```js
Str.excerpt('This is my name', 'my', { 'radius': 3 });

// '...is my na...'
```

The `radius` option, which defaults to 100, allows you to define the number of characters that should appear on each side of the truncated string.
In addition, you may use the omission option to define the string that will be prepended and appended to the truncated string:

```js
Str.excerpt('This is my name', 'name', { 'radius': 3, 'omission': '(...) ' });

// '(...) my name'
```

#### Str.finish()

The `Str.finish` method adds a single instance of the given value to a string if it does not already end with that value:

```js
Str.finish('this/string', '/');

// 'this/string/'
```

```js
Str.finish('this/string/', '/');

// 'this/string/'
```

#### Str.fromBase64()

The `Str.fromBase64` method converts the given string from Base64:

```js
Str.fromBase64('TGFyYXZlbA==');

// 'Laravel'
```

#### Str.headline()

The `Str.headline` method will convert strings delimited by casing, hyphens, or underscores into a space delimited string with each word's first letter capitalized:

```js
Str.headline('steve_jobs');

// 'Steve Jobs'
```

```js
Str.headline('EmailNotificationSent');

// 'Email Notification Sent'
```

#### Str.is()

The `Str.is` method determines if a given string matches a given pattern. Asterisks may be used as wildcard values:

```js
Str.is('foo*', 'foobar');

// true
```

```js
Str.is('baz*', 'foobar');

// false
```

You may disable case sensitivity by setting the ignoreCase argument to true:

```js
Str.is('*.jpg', 'photo.JPG', true);

// true
```

#### Str.isAscii()

The `Str.isAscii` method determines if a given string is 7-bit ASCII:

```js
Str.isAscii('Taylor');

// true
```

```js
Str.isAscii('ü');

// false
```

#### Str.isJson()

The `Str.isJson` method determines if the given string is valid JSON:

```js
Str.isJson('[1,2,3]');

// true
```

```js
Str.isJson('{"first": "John", "last": "Doe"}');

// true
```

```js
Str.isJson('{first: "John", last: "Doe"}');

// false
```

#### Str.isUrl()

The `Str.isUrl` method determines if the given string is a valid URL:

```js
Str.isUrl('http://example.com');

// true
```

```js
Str.isUrl('laravel');

// false
```

#### Str.isUlid()

The `Str.isUlid` method determines if the given string is a valid ULID:

```js
Str.isUlid('01gd6r360bp37zj17nxb55yv40');

// true
```

```js
Str.isUlid('laravel');

// false
```

#### Str.isUuid()

The `Str.isUuid` method determines if the given string is a valid UUID:

```js
Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de');

// true
```

```js
Str.isUuid('laravel');

// false
```

#### Str.kebab()

The `Str.kebab` method converts the given string to kebab-case:

```js
Str.kebab('fooBar');

// 'foo-bar'
```

#### Str.lcfirst()

The `Str.lcfirst` method returns the given string with the first character lowercased:

```js
Str.lcfirst('Foo Bar');

// 'foo Bar'
```

#### Str.length()

The `Str.length` method returns the length of the given string:

```js
Str.length('Laravel');

// 7
```

#### Str.limit()

The `Str.limit` method truncates the given string to the specified length:

```js
Str.limit('The quick brown fox jumps over the lazy dog', 20);

// 'The quick brown fox...'
```

You may pass a third argument to the method to change the string that will be appended to the end of the truncated string:

```js
Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)');

// 'The quick brown fox (...)'
```

You may pass a boolean as fourth argument to the method to ensure the truncation does not cut off in the middle of a word:

```js
Str.limit('The quick brown fox jumps over the lazy dog', 18, '...', false);

// 'The quick brown fo...'
```

```js
Str.limit('The quick brown fox jumps over the lazy dog', 18, '...', true);

// 'The quick brown...'
```

#### Str.lower()

The `Str.lower` method converts the given string to lowercase:

```js
Str.lower('LARAVEL');

// 'laravel'
```

#### Str.mask()

The `Str.mask` method masks a portion of a string with a repeated character, and may be used to obfuscate segments of strings such as email addresses and phone numbers:

```js
Str.mask('taylor@example.com', '*', 3);

// 'tay***************'
```

If needed, you provide a negative number as the third argument to the mask method, which will instruct the method to begin masking at the given distance from the end of the string:

```js
Str.mask('taylor@example.com', '*', -15, 3);

// 'tay***@example.com'
```

#### Str.match

The `Str.match` method will return the portion of a string that matches a given regular expression pattern:

```js
Str.match(/bar/, 'foo bar');

// 'bar'
```

```js
Str.match(/foo (.*)/, 'foo bar');

// 'bar'
```

#### Str.matchAll

The `Str.matchAll` method will return an array containing the portions of a string that match a given regular expression pattern:

```js
Str.matchAll(/bar/, 'bar foo bar');

// ['bar', 'bar']
```

If you specify a matching group within the expression, method will return an array of that group's matches:

```js
Str.matchAll(/f(\w*)/, 'bar fun bar fly');

// ['un', 'ly'];
```

If no matches are found, an empty array will be returned.

#### Str.isMatch

The `Str.isMatch` method will return true if the string matches a given regular expression:

```js
Str.isMatch(/foo (.*)/, 'foo bar');

// true
```

```js
Str.isMatch(/foo (.*)/, 'laravel');

// false
```

#### Str.numbers()

The `Str.numbers` method removes all non-numeric characters from a string:

```js
Str.numbers('(555) 123-4567');

// 5551234567
```

```js
Str.numbers('L4r4v3l!');

// 443
```

If no matches are found, an empty string will be returned.

#### Str.orderedUuid()

The `Str.orderedUuid` method generates a "timestamp first" UUID that may be efficiently stored in an indexed database column.
Each UUID that is generated using this method will be sorted after UUIDs previously generated using the method:

```js
Str.orderedUuid();

// '04fe4df5-7bae-45f4-8040-d0e4568f4054'
```

#### Str.padBoth()

The `Str.padBoth` pads both sides of a string with another string until the final string reaches a desired length:

```js
Str.padBoth('James', 10, '_');

// '__James___'
```

```js
Str.padBoth('James', 10);

// '  James   '
```

#### Str.padLeft()

The `Str.padLeft` pads the left side of a string with another string until the final string reaches a desired length:

```js
Str.padLeft('James', 10, '-=');

// '-=-=-James'
```

```js
Str.padLeft('James', 10);

// '     James'
```

#### Str.padRight()

The `Str.padRight` pads the right side of a string with another string until the final string reaches a desired length:

```js
Str.padRight('James', 10, '-');

// 'James-----'
```

```js
Str.padRight('James', 10);

// 'James     '
```

#### Str.password()

The `Str.password` method may be used to generate a secure, random password of a given length.
The password will consist of a combination of letters, numbers, symbols, and spaces.
By default, passwords are 32 characters long:

```js
Str.password();

// 'EbJo2vE-AS:U,$%_gkrV4n,q~1xy/-_4'
```

```js
Str.password(12);

// 'qwuar>#V|i]N'
```

#### Str.plural()

The `Str.plural` method converts a singular word string to its plural form.

```js
Str.plural('car');

// 'cars'
```

```js
Str.plural('child');

// 'children'
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.plural('child', 2);

// 'children'
```

```js
Str.plural('child', 1);

// 'child'
```

#### Str.pluralStudly()

The `Str.pluralStudly` method converts a singular word string formatted in studly caps case to its plural form.

```js
Str.pluralStudly('VerifiedHuman');

// 'VerifiedHumans'
```

```js
Str.pluralStudly('UserFeedback');

// 'UserFeedback'
```

#### Str.pluralPascal()

The `Str.pluralPascal` method converts a singular word string formatted in Pascal case to its plural form.

```js
Str.pluralPascal('VerifiedHuman');

// 'VerifiedHumans'
```

```js
Str.pluralPascal('UserFeedback');

// 'UserFeedback'
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.pluralPascal('VerifiedHuman', 2);

// 'VerifiedHumans'
```

```js
Str.pluralPascal('VerifiedHuman', 1);

// 'VerifiedHuman'
```

#### Str.random()

The `Str.random` method generates a random string of the specified length:

```js
Str.random(40);
```

#### Str.remove()

The `Str.remove` method removes the given value or array of values from the string:

```js
Str.remove('e', 'Peter Piper picked a peck of pickled peppers.');

// 'Ptr Pipr pickd a pck of pickld ppprs.'
```

You may also pass false as a third argument to the remove method to ignore case when removing strings.

```js
Str.remove('E', 'Peter Piper picked a peck of pickled peppers.', false);

// 'Ptr Pipr pickd a pck of pickld ppprs.'
```

#### Str.repeat()

The `Str.repeat`  method repeats the given string:

```js
Str.repeat('a', 5);

// 'aaaaa'
```

#### Str.replace()

The `Str.replace` method replaces a given string within the string:

```js
Str.replace('9.x', '10.x', 'Laravel 10.x');

// 'Laravel 9.x'
```

The `replace` method also accepts a caseSensitive argument. By default, the replace method is case-sensitive:

```js
Str.replace('framework', 'Laravel', 'Framework 10.x', false);

// 'Framework 10.x'
```

#### Str.replaceArray()

The `Str.replaceArray` method replaces a given value in the string sequentially using an array:

```js
Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?');

// 'The event will take place between 8:30 and 9:00'
```

#### Str.replaceFirst()

The `Str.replaceFirst` method replaces the first occurrence of a given value in a string:

```js
Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog');

// 'a quick brown fox jumps over the lazy dog'
```

#### Str.replaceLast()

The `Str.replaceLast` method replaces the last occurrence of a given value in a string:

```js
Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog');

// 'the quick brown fox jumps over a lazy dog'
```

#### Str.replaceMatches()

The `Str.replaceMatches` method replaces all portions of a string matching a pattern with the given replacement string:

```js
Str.replaceMatches(/[^A-Za-z0-9]+/, '', '(+1) 501-555-1000');

// '15015551000'
```

The `replaceMatches` method also accepts a closure that will be invoked with each portion of the string matching the given pattern, allowing you to perform the replacement logic within the closure and return the replaced value:

```js
Str.replaceMatches(/\d/, (matches) => '[' + matches[0] + ']', '123');

// '[1][2][3]'
```

#### Str.replaceStart()

The `Str.replaceStart` method replaces the first occurrence of the given value only if the value appears at the start of the string:

```js
Str.replaceStart('Hello', 'Laravel', 'Hello World');

// 'Laravel World'

Str.replaceStart('World', 'Laravel', 'Hello World');

// 'Hello World'
```

#### Str.replaceEnd()

The `Str.replaceEnd` method replaces the last occurrence of the given value only if the value appears at the end of the string:

```js
Str.replaceEnd('World', 'Laravel', 'Hello World');

// 'Hello Laravel'

Str.replaceEnd('Hello', 'Laravel', 'Hello World');

// 'Hello World'
```

#### Str.reverse()

The `Str.reverse` method reverses the given string:

```js
Str.reverse('Hello World');

// 'dlroW olleH'
```

#### Str.singular()

The `Str.singular` method converts a string to its singular form.

```js
Str.singular('cars');

// 'car'
```

```js
Str.singular('children');

// 'child'
```

#### Str.slug()

The `Str.slug` method generates a URL friendly "slug" from the given string:

```js
Str.slug('Laravel 5 Framework', '-');

// 'laravel-5-framework'
```

#### Str.snake()

The `Str.snake` method converts the given string to snake_case:

```js
Str.snake('fooBar');

// 'foo_bar'
```

```js
Str.snake('fooBar', '-');

// 'foo-bar'
```

#### Str.squish()

The `Str.squish` method removes all extraneous white space from a string, including extraneous white space between words:

```js
Str.squish('    laravel    framework    ');

// 'laravel framework'
```

#### Str.start()

The `Str.start` method adds a single instance of the given value to a string if it does not already start with that value:

```js
Str.start('this/string', '/');

// '/this/string'
```

```js
Str.start('/this/string', '/');

// '/this/string'
```

#### Str.startsWith()

The `Str.startsWith` method determines if the given string begins with the given value:

```js
Str.startsWith('This is my name', 'This');

// true
```

```js
Str.startsWith('This is my name', 'There');

// false
```

You may also pass an array of values to determine if the given string begins with any of the values in the array:

```js
Str.startsWith('This is my name', ['This', 'That', 'There']);

// true
```

```js
Str.startsWith('This is my name', ['That', 'There']);

// false
```

#### Str.doesntStartWith()

The `Str.doesntStartWith` method determines if the given string doesn't begin with the given value:

```js
Str.doesntStartWith('This is my name', 'There');

// true
```

```js
Str.doesntStartWith('This is my name', 'This');

// false
```

You may also pass an array of values to determine if the given string doesn't begin with any of the values in the array:

```js
Str.doesntStartWith('This is my name', ['There', 'foo']);

// true
```

```js
Str.doesntStartWith('This is my name', ['This', 'foo']);

// false
```

#### Str.studly()

The `Str.studly` method converts the given string to Studly caps case:

```js
Str.studly('foo_bar');

// 'FooBar'
```

#### Str.pascal()

The `Str.pascal` method converts the given string to Pascal case:

```js
Str.pascal('foo_bar');

// 'FooBar'
```

#### Str.substr()

The `Str.substr` method returns the portion of string specified by the start and length parameters:

```js
Str.substr('The Laravel Framework', 4, 7);

// 'Laravel'
```

#### Str.substrCount()

The `Str.substrCount` method returns the number of occurrences of a given value in the given string:

```js
Str.substrCount('If you like ice cream, you will like snow cones.', 'like');

// 2
```

#### Str.substrReplace()

The `Str.substrReplace` method replaces text within a portion of a string, starting at the position specified by the third argument and replacing the number of characters specified by the fourth argument.
Passing `0` to the method's fourth argument will insert the string at the specified position without replacing any of the existing characters in the string:

```js
Str.substrReplace('1300', ':', 2);

// '13:'
```

```js
Str.substrReplace('1300', ':', 2, 0);
// '13:00'
```

#### Str.swap()

The `Str.swap` method replaces multiple values in the given string:

```js
Str.swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }, 'Tacos are great!');

// 'Burritos are fantastic!'
```

#### Str.title()

The `Str.title` method converts the given string to Title Case:

```js
Str.title('a nice title uses the correct case');

// 'A Nice Title Uses The Correct Case'
```

#### Str.toBase64()

The `Str.toBase64` method converts the given string to Base64:

```js
Str.toBase64('Laravel');

// 'TGFyYXZlbA=='
```

#### Str.ucfirst()

The `Str.ucfirst` method returns the given string with the first character capitalized:

```js
Str.ucfirst('foo bar');

// 'Foo bar'
```

#### Str.ucsplit()

The `Str.ucsplit` method splits the given string into an array by uppercase characters:

```js
Str.ucsplit('FooBar');

// [0 => 'Foo', 1 => 'Bar']
```

#### Str.upper()

The `Str.upper` method converts the given string to uppercase:

```js
Str.upper('laravel');

// 'LARAVEL'
```

#### Str.ulid()

The `Str.ulid` method generates a ULID, which is a compact, time-ordered unique identifier:

```js
Str.ulid();

// '01gd6r360bp37zj17nxb55yv40'
```

#### Str.unwrap()

The `Str.unwrap` method removes the specified strings from the beginning and end of a given string:

```js
Str.unwrap('-Laravel-', '-');

// 'Laravel'
```

```js
Str.unwrap('{framework: "Laravel"}', '{', '}');

// 'framework: "Laravel"'
```

#### Str.uuid()

The `Str.uuid` method generates a UUID (version 4):

```js
Str.uuid();

// '39923a8e-d504-42b5-894f-55e79e6632dd'
```

#### Str.uuid7()

The `Str.uuid` method generates a UUID (version 7):

```js
Str.uuid7();

// '019634be-509d-74ac-b2f2-69ac01a6ac00'
```

A `Date` may be passed as an optional parameter which will be used to generate the ordered UUID:

```js
Str.uuid7(new Date('2023-01-01T00:00:00'));

// '01856a69-d980-72e7-a125-96b2aff45909'
```

#### Str.wordCount()

The `Str.wordCount` method returns the number of words that a string contains:

```js
Str.wordCount('Hello, world!');

// 2
```

#### Str.wordWrap()

The `Str.wordWrap` method wraps a string to a given number of characters:

```js
Str.wordWrap('The quick brown fox jumped over the lazy dog.', 20, "<br />\n");

/*
The `quick` brown fox<br />
jumped over the lazy<br />
dog.
*/
```

#### Str.words()

The `Str.words` method limits the number of words in a string.
An additional string may be passed to this method via its third argument to specify which string should be appended to the end of the truncated string:

```js
Str.words('Perfectly balanced, as all things should be.', 3, ' >>>');

// 'Perfectly balanced, as >>>'
```

#### Str.wrap()

The `Str.wrap` method wraps the given string with an additional string or a pair of strings

```js
Str.wrap('Laravel', '"');

// '"Laravel"'
```

```js
Str.wrap('is', 'This ', ' Laravel!');

// 'This is Laravel!'
```

#### str()

The `str` function returns a Stringable instance of the given string.

```js
import { str } from '@bjnstnkvc/str'
```

This function is equivalent to the `Str.of` method.

```js
str('Taylor').append(' Otwell');

// 'Taylor Otwell'
```

### Fluent Strings

Fluent strings provide a more fluent, object-oriented interface for working with string values, allowing you to chain multiple string operations together using a more readable syntax compared to traditional string operations.

#### after

The `after` method returns everything after the given value in a string.
The entire string will be returned if the value does not exist within the string:

```js
Str.of('This is my name').after('This is');

// ' my name'
```

#### afterLast

The `afterLast` method returns everything after the last occurrence of the given value in a string.
The entire string will be returned if the value does not exist within the string:

```js
Str.of('App\\Http\\Controllers\\Controller').afterLast('\\');

// 'Controller'
```

#### apa

The `apa` method converts the given string to title case following the [APA guidelines](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case):

```js
Str.of('a nice title uses the correct case').apa();

// A Nice Title Uses the Correct Case
```

#### append

The `append` method appends the given values to the string:

```js
Str.of('Taylor').append(' Otwell');

// 'Taylor Otwell'
```

#### ascii

The `ascii` method will attempt to transliterate the string into an ASCII value:

```js
Str.of('ü').ascii();

// 'u'
```

#### basename

The `basename` method will return the trailing name component of the given string:

```js
Str.of('/foo/bar/baz').basename();

// 'baz'
```

If needed, you may provide an "extension" that will be removed from the trailing component:

```js
Str.of('/foo/bar/baz.jpg').basename('.jpg');

// 'baz'
```

#### before

The `before` method returns everything before the given value in a string:

```js
Str.of('This is my name').before('my name');

// 'This is '
```

#### beforeLast

The `beforeLast` method returns everything before the last occurrence of the given value in a string:

```js
Str.of('This is my name').beforeLast('is');

// 'This '
```

#### between

The `between` method returns the portion of a string between two values:

```js
Str.of('This is my name').between('This', 'name');

// ' is my '
```

#### betweenFirst

The `betweenFirst` method returns the smallest possible portion of a string between two values:

```js
Str.of('[a] bc [d]').betweenFirst('[', ']');

// 'a'
```

#### camel

The `camel` method converts the given string to camelCase:

```js
Str.of('foo_bar').camel();

// 'fooBar'
```

#### charAt

The `charAt` method returns the character at the specified index. If the index is out of bounds, `false` is returned:

```js
Str.of('This is my name.').charAt(6);

// 's'
```

#### chopStart

The `chopStart` method removes the given string if it exists at the start of the subject:

```js
Str.of('Hello, world!').chopStart('Hello, ');

// 'world!'
```

You may also pass an array of strings to remove the first matching string found at the start of the subject:

```js
Str.of('Hello, world!').chopStart(['Hi, ', 'Hello, ']);

// 'world!'
```

If multiple strings in the array are found at the start of the subject, only the first match will be removed:

```js
Str.of('Hello, Hello, world!').chopStart(['Hello, ', 'Hello, ']);

// 'Hello, world!'
```

#### chopEnd

The `chopEnd` method removes the given string if it exists at the end of the subject:

```js
Str.of('Hello, world!').chopEnd(', world!');

// 'Hello'
```

You may also pass an array of strings to remove the first matching string found at the end of the subject:

```js
Str.of('Hello, world!').chopEnd(['planet!', ', world!']);

// 'Hello'
```

If multiple strings in the array are found at the end of the subject, only the first match will be removed:

```js
Str.of('Hello, world!world!').chopEnd(['world!', 'world!']);

// 'Hello, world!'
```

#### classBasename

The `classBasename` method returns the class name of the given class with the class's namespace removed:

```js
Str.of('Foo\\Bar\\Baz').classBasename();

// 'Baz'
```

#### contains

The `contains` method determines if the given string contains the given value. This method is case-sensitive:

```js
Str.of('This is my name').contains('my');

// true
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('This is my name').contains(['my', 'foo']);

// true
```

You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.of('This is my name').contains('MY', true);

// true
```

#### containsAll

The `containsAll` method determines if the given string contains all the values in the given array:

```js
Str.of('This is my name').containsAll(['my', 'name']);

// true
```

You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.of('This is my name').containsAll(['MY', 'NAME'], true);

// true
```

#### doesntContain

The `doesntContain` method determines if the given string doesn't contain the given value. By default, this method is case-sensitive:

```js
Str.of('This is name').doesntContain('my');

// true
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('This is name').doesntContain(['my', 'foo']);

// true
```

You may disable case sensitivity by setting the `ignoreCase` argument to `true`:

```js
Str.of('This is name').doesntContain('MY', true);

// true
```

#### convertCase

The `Str.convertCase` method converts the case of a string according the mode of conversion (defaults to `MB_CASE_FOLD`). Modes of conversion are:

##### MB_CASE_UPPER

Performs a full upper-case folding.

```js
Str.of('hello').convertCase(Mode.MB_CASE_UPPER);

// HELLO
```

##### MB_CASE_LOWER

Performs a full lower-case folding.

```js
Str.of('HELLO').convertCase(Mode.MB_CASE_UPPER);

// hello
```

##### MB_CASE_TITLE

Performs a full title-case conversion based on the Cased and CaseIgnorable derived Unicode properties.

```js
Str.of('a nice title uses the correct case').convertCase(Mode.MB_CASE_TITLE);

// 'A Nice Title Uses The Correct Case'
```

##### MB_CASE_FOLD

Performs a full case fold conversion which removes case distinctions present in the string.

```js
Str.of('HeLLo').convertCase(Mode.MB_CASE_FOLD);

// hello
```

#### deduplicate

The `deduplicate` method replaces consecutive instances of a character with a single instance of that character in the given string. By default, the method deduplicates spaces:

```js
Str.of('The   Laravel   Framework').deduplicate();

//  The Laravel Framework 
```

```js
Str.of('The---Laravel---Framework').deduplicate('-');

// The-Laravel-Framework
```

You can also pass an array of characters to replace consecutive instances of:

```js
Str.of('Thee---Laravell---Frramework').deduplicate(['-', 'e', 'l', 'r']);

// The-Laravel-Frramework
```

#### dirname

The `dirname` method return the parent directory portion of the given string:

```js
Str.of('/foo/bar/baz').dirname();

// '/foo/bar'
```

If necessary, you may specify how many directory levels you wish to trim from the string:

```js
Str.of('/foo/bar/baz').dirname(2);

// '/foo'
```

#### excerpt

The `excerpt` method extracts an excerpt from the string that matches the first instance of a phrase within that string:

```js
Str.of('This is my name').excerpt('my', { 'radius': 3 });

// '...is my na...'
```

The `radius` option, which defaults to 100, allows you to define the number of characters that should appear on each side of the truncated string.
In addition, you may use the omission option to change the string that will be prepended and appended to the truncated string:

```js
Str.of('This is my name').excerpt('name', { 'radius': 3, 'omission': '(...) ' });

// '(...) my name'
```

#### endsWith

The `endsWith` method determines if the given string ends with the given value:

```js
Str.of('This is my name').endsWith('name');

// true
```

```js
Str.of('This is my name').endsWith('names');

// false
```

You may also pass an array of values to determine if the given string ends with any of the values in the array:

```js
Str.of('This is my name').endsWith(['name', 'foo']);

// true
```

```js
Str.of('This is my name').endsWith(['names', 'foo']);

// false
```
#### doesntEndWith

The `doesntEndWith` method determines if the given string doesn't end with a given substring:

```js
Str.of('This is my name').doesntEndWith('names');

// true
```

```js
Str.of('This is my name').doesntEndWith('name');

// false
```

You may also pass an array of values to determine if the given string doesn't end with any of the values in the array:

```js
Str.of('This is my name').doesntEndWith(['names', 'foo']);

// true
```

```js
Str.of('This is my name').doesntEndWith(['name', 'foo']);

// false
```

#### exactly

The `exactly` method determines if the given string is an exact match with another string:

```js
Str.of('Laravel').exactly('Laravel');

// true
```

#### explode

The `explode` method splits the string by the given delimiter and returns an array containing each section of the split string:

```js
Str.of('foo bar baz').explode(' ');

// ['foo', 'bar', 'baz']
```

#### finish

The `finish` method adds a single instance of the given value to a string if it does not already end with that value:

```js
Str.of('this/string').finish('/');

// 'this/string/'
```

```js
Str.of('this/string/').finish('/');

// 'this/string/'
```

#### fromBase64

The `fromBase64` method converts the given string from Base64:

```js
Str.of('TGFyYXZlbA==').fromBase64();

// 'Laravel'
```

#### headline

The `headline` method will convert strings delimited by casing, hyphens, or underscores into a space delimited string with each word's first letter capitalized:

```js
Str.of('taylor_otwell').headline();

// 'Taylor Otwell'
```

```js
Str.of('EmailNotificationSent').headline();

// 'Email Notification Sent'
```

#### is

The `is` method determines if a given string matches a given pattern. Asterisks may be used as wildcard values

```js
Str.of('foobar').is('foo*');

// true
```

```js
Str.of('foobar').is('baz*');

// false
```

You may disable case sensitivity by setting the ignoreCase argument to true:

```js
Str.of('photo.JPG').is('*.jpg', true);

// true
```

#### isAscii

The `isAscii` method determines if a given string is an ASCII string:

```js
Str.of('Taylor').isAscii();

// true
```

```js
Str.of('ü').isAscii();

// false
```

#### isEmpty

The `isEmpty` method determines if the given string is empty:

```js
Str.of('  ').trim().isEmpty();

// true
```

```js
Str.of('Laravel').trim().isEmpty();

// false
```

#### isNotEmpty

The `isNotEmpty` method determines if the given string is not empty:

```js
Str.of('  ').trim().isNotEmpty();

// false
```

```js
Str.of('Laravel').trim().isNotEmpty();

// true
```

#### isJson

The `isJson` method determines if a given string is valid JSON:

```js
Str.of('[1,2,3]').isJson();

// true
```

```js
Str.of('{"first": "John", "last": "Doe"}').isJson();

// true
```

```js
Str.of('{first: "John", last: "Doe"}').isJson();

// false
```

#### isUlid

The `isUlid` method determines if a given string is a ULID:

```js
Str.of('01gd6r360bp37zj17nxb55yv40').isUlid();

// true
```

```js
Str.of('Taylor').isUlid();

// false
```

#### isUrl

The `isUrl` method determines if a given string is a URL:

```js
Str.of('http://example.com').isUrl();

// true
```

```js
Str.of('Taylor').isUrl();

// false
```

#### isUuid

The `isUuid` method determines if a given string is a UUID:

```js
Str.of('5ace9ab9-e9cf-4ec6-a19d-5881212a452c').isUuid();

// true
```

```js
Str.of('Taylor').isUuid();

// false
```

#### kebab

The `kebab` method converts the given string to kebab-case:

```js
Str.of('fooBar').kebab();

// 'foo-bar'
```

#### lcfirst

The `lcfirst` method returns the given string with the first character lowercased:

```js
Str.of('Foo Bar').lcfirst();

// 'foo Bar'
```

#### length

The `length` method returns the length of the given string:

```js
Str.of('Laravel').length();

// 7
```

#### limit

The `limit` method truncates the given string to the specified length:

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(20);

// 'The quick brown fox...'
```

You may also pass a second argument to change the string that will be appended to the end of the truncated string:

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(20, ' (...)');

// 'The quick brown fox (...)'
```

You may pass a boolean as fourth argument to the method to ensure the truncation does not cut off in the middle of a word:

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(18, '...', false);

// 'The quick brown fo...'
```

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(18, '...', true);

// 'The quick brown...'
```

#### lower

The `lower` method converts the given string to lowercase:

```js
Str.of('LARAVEL').lower();

// 'laravel'
```

#### ltrim

The `ltrim` method trims the left side of the string:

```js
Str.of('  Laravel  ').ltrim();

// 'Laravel  '
```

```js
Str.of('/Laravel/').ltrim('/');

// 'Laravel/'
```

#### mask

The `mask` method masks a portion of a string with a repeated character, and may be used to obfuscate segments of strings such as email addresses and phone numbers:

```js
Str.of('taylor@example.com').mask('*', 3);

// 'tay***************'
```

If needed, you may provide negative numbers as the third or fourth argument to the mask method, which will instruct the method to begin masking at the given distance from the end of the string:

```js
Str.of('taylor@example.com').mask('*', -15, 3);

// 'tay***@example.com'
```

```js
Str.of('taylor@example.com').mask('*', 4, -4);

// 'tayl**********.com'
```

#### match

The `match` method will return the portion of a string that matches a given regular expression pattern:

```js
Str.of('foo bar').match(/bar/);

// 'bar'
```

```js
Str.of('foo bar').match(/foo (.*)/);

// 'bar'
```

#### matchAll

The `matchAll` method will return an array containing the portions of a string that match a given regular expression
pattern:

```js
Str.of('bar foo bar').matchAll(/bar/);

// ['bar', 'bar']
```

If you specify a matching group within the expression, method will return an array of that group's matches:

```js
Str.of('bar fun bar fly').matchAll(/f(\w*)/);

// ['un', 'ly'];
```

If no matches are found, an empty array will be returned.

#### isMatch

The `isMatch` method will return true if the string matches a given regular expression:

```js
Str.of('foo bar').isMatch(/foo (.*)/);

// true
```

```js
Str.of('laravel').isMatch(/foo (.*)/);

// false
```

#### numbers

The `numbers` method removes all non-numeric characters from a string:

```js
Str.of('(555) 123-4567').numbers();

// 5551234567
```

```js
Str.of('L4r4v3l!').numbers();

// 443
```

If no matches are found, an empty string will be returned.

#### newLine

The `newLine` method appends an "end of line" character to a string:

```js
Str.of('Laravel').newLine().append('Framework');

// 'Laravel
//  Framework'
```

#### padBoth

The `padBoth` method pads both sides of a string with another string until the final string reaches the desired length:

```js
Str.of('James').padBoth(10, '_');

// '__James___'
```

```js
Str.of('James').padBoth(10);

// '  James   '
```

#### padLeft

The `padLeft` pads the left side of a string with another string until the final string reaches the desired length:

```js
Str.of('James').padLeft(10, '-=');

// '-=-=-James'
```

```js
Str.of('James').padLeft(10);

// '     James'
```

#### padRight

The `padRight` method pads the right side of a string with another string until the final string reaches the desired length:

```js
Str.of('James').padRight(10, '-');

// 'James-----'
```

```js
Str.of('James').padRight(10);

// 'James     '
```

#### pipe

The `pipe` method allows you to transform the string by passing its current value to the given callable:

```js
Str.of('Laravel').pipe('btoa').prepend('Base64 Encoded: ');

// 'Base64 Encoded: TGFyYXZlbA=='
```

```js
Str.of('TGFyYXZlbA==').pipe('atob').prepend('Base64 Encoded: ');

// 'Base64 Decoded: Laravel'
```

```js
Str.of('Laravel Framework').pipe('toUpperCase');

// 'LARAVEL FRAMEWORK'
```

```js
Str.of('LARAVEL FRAMEWORK').pipe((string) => string.title());

// 'Laravel Framework'
```

```js
Str.of('foo').pipe(string => 'bar');

// 'bar'
```

#### plural

The `plural` method converts a singular word string to its plural form.

```js
Str.of('car').plural();

// 'cars'
```

```js
Str.of('child').plural();

// 'children'
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.of('child').plural(2);

// 'children'
```

```js
Str.of('child').plural(1);

// 'child'
```

#### pluralPascal

The `pluralPascal` method converts a singular word string formatted in Pascal case to its plural form.

```js
Str.of('VerifiedHuman').pluralPascal();

// 'VerifiedHumans'
```

```js
Str.of('UserFeedback').pluralPascal();

// 'UserFeedback'
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.of('VerifiedHuman').pluralPascal(2);

// 'VerifiedHumans'
```

```js
Str.of('VerifiedHuman').pluralPascal(1);

// 'VerifiedHuman'
```

#### position

The `position` method returns the position of the first occurrence of a substring in a string.
If the substring does not exist within the string, `false` is returned:

```js
Str.of('Hello, World!').position('Hello');

// 0
```

```js
Str.of('Hello, World!').position('W');

// 7
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.of('child').plural(2);

// 'children'
```

```js
Str.of('child').plural(1);

// 'child'
```

#### prepend

The `prepend` method prepends the given values onto the string:

```js
Str.of('Framework').prepend('Laravel ');

// 'Laravel Framework'
```

#### remove

The `remove` method removes the given value or array of values from the string:

```js
Str.of('Arkansas is quite beautiful!').remove('quite ');

// 'Arkansas is beautiful!'
```

You may also pass false as a second parameter to ignore case when removing strings.

#### repeat

The `repeat` method repeats the given string:

```js
Str.of('a').repeat(5);

// 'aaaaa'
```

#### replace

The `replace` method replaces a given string within the string:

```js
Str.of('Laravel 9.x').replace('9.x', '10.x');

// 'Laravel 10.x'
```

The `replace` method also accepts a `caseSensitive` argument. By default, the replace method is case-sensitive:

```js
Str.of('macOS 13.x').replace('macOS', 'iOS', false);
```

#### replaceArray

The `replaceArray` method replaces a given value in the string sequentially using an array:

```js
Str.of('The event will take place between ? and ?').replaceArray('?', ['8:30', '9:00']);

// 'The event will take place between 8:30 and 9:00'
```

#### replaceFirst

The `replaceFirst` method replaces the first occurrence of a given value in a string:

```js
Str.of('the quick brown fox jumps over the lazy dog').replaceFirst('the', 'a');

// 'a quick brown fox jumps over the lazy dog'
```

#### replaceLast

The `replaceLast` method replaces the last occurrence of a given value in a string:

```js
Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a');

// 'the quick brown fox jumps over a lazy dog'
```

#### replaceMatches

The `replaceMatches` method replaces all portions of a string matching a pattern with the given replacement string:

```js
Str.of('(+1) 501-555-1000').replaceMatches(/[^A-Za-z0-9]+/, '');

// '15015551000'
```

The `replaceMatches` method also accepts a closure that will be invoked with each portion of the string matching the given pattern,
allowing you to perform the replacement logic within the closure and return the replaced value:

```js
Str.of('123').replaceMatches(/\d/, (match) => '[' + match[0] + ']');

// '[1][2][3]'
```

#### replaceStart

The `replaceStart` method replaces the first occurrence of the given value only if the value appears at the start of the
string:

```js
Str.of('Hello World').replaceStart('Hello', 'Laravel');

// 'Laravel World'
```

```js
Str.of('Hello World').replaceStart('World', 'Laravel');

// 'Hello World'
```

#### replaceEnd

The `replaceEnd` method replaces the last occurrence of the given value only if the value appears at the end of the
string:

```js
Str.of('Hello World').replaceEnd('World', 'Laravel');

// 'Hello Laravel'
```

```js
Str.of('Hello World').replaceEnd('Hello', 'Laravel');

// 'Hello World'
```

#### rtrim

The `rtrim` method trims the right side of the given string:

```js
Str.of('  Laravel  ').rtrim();

// '  Laravel'
```

```js
Str.of('/Laravel/').rtrim('/');

// '/Laravel'
```

#### singular

The `singular` method converts a string to its singular form.

```js
Str.of('cars').singular();

// 'car'
```

```js
Str.of('children').singular();

// 'child'
```

#### slug

The `slug` method generates a URL friendly "slug" from the given string:

```js
Str.of('Laravel Framework').slug('-');

// 'laravel-framework'
```

#### snake

The `snake` method converts the given string to snake_case:

```js
Str.of('fooBar').snake();

// 'foo_bar'
```

#### split

The `split` method splits a string into an array using a regular expression:

```js
Str.of('one, two, three').split(/[\s,]+/);

// ["one", "two", "three"]
```

#### squish

The `squish` method removes all extraneous white space from a string, including extraneous white space between words:

```js
Str.of('    laravel    framework    ').squish();

// 'laravel framework'
```

#### start

The `start` method adds a single instance of the given value to a string if it does not already start with that value:

```js
Str.of('this/string').start('/');

// '/this/string'
```

```js
Str.of('/this/string').start('/');

// '/this/string'
```

#### startsWith

The `startsWith` method determines if the given string begins with the given value:

```js
Str.of('This is my name').startsWith('This');

// true
```

```js
Str.of('This is my name').startsWith('There');

// false
```

You may also pass an array of values to determine if the given string begins with any of the values in the array:

```js
Str.of('This is my name').startsWith(['This', 'That', 'There']);

// true
```

```js
Str.of('This is my name').startsWith(['That', 'There']);

// false
```

#### doesntStartWith

The `doesntStartWith` method determines if the given string doesn't begin with the given value:

```js
Str.of('This is my name').doesntStartWith('There');

// true
```

```js
Str.of('This is my name').doesntStartWith('This');

// false
```

You may also pass an array of values to determine if the given string doesn't begin with any of the values in the array:

```js
Str.of('This is my name').doesntStartWith(['There', 'foo']);

// true
```

```js
Str.of('This is my name').doesntStartWith(['This', 'foo']);

// false
```

#### studly

The `studly` method converts the given string to Studly caps case:

```js
Str.of('foo_bar').studly();

// 'FooBar'
```

#### pascal

The `studly` method converts the given string to Pascal case:

```js
Str.of('foo_bar').pascal();

// 'FooBar'
```

#### substr

The `substr` method returns the portion of the string specified by the given start and length parameters:

```js
Str.of('Laravel Framework').substr(8);

// 'Framework'
```

```js
Str.of('Laravel Framework').substr(8, 5);

// 'Frame'
```

#### substrReplace

The `substrReplace` method replaces text within a portion of a string, starting at the position specified by the second argument and replacing the number of characters specified by the third argument.
Passing `0` to the method's third argument will insert the string at the specified position without replacing any of the existing characters in the string:

```js
Str.of('1300').substrReplace(':', 2);

// '13:'
```

```js
Str.of('The Framework').substrReplace(' Laravel', 3, 0);

// 'The Laravel Framework'
```

#### swap

The `swap` method replaces multiple values in the string:

```js
Str.of('Tacos are great!').swap({ 'Tacos': 'Burritos', 'great': 'fantastic' });

// 'Burritos are fantastic!'
```

#### take

The `take` method returns a specified number of characters from the beginning of the string:

```js
Str.of('Build something amazing!').take(5);

// 'Build'
```

#### tap

The `tap` method passes the string to the given closure, allowing you to examine and interact with the string while not affecting the string itself.
The original string is returned by the `tap` method regardless of what is returned by the closure:

```js
Str.of('Laravel')
    .append(' Framework')
    .tap((string) => string.dump())
    .upper();

// 'LARAVEL FRAMEWORK'
```

// 'LARAVEL FRAMEWORK'
```

#### test

The `test` method determines if a string matches the given regular expression pattern:

```js
Str.of('Laravel Framework').test(/Laravel/);

// true
```

#### title

The `title` method converts the given string to Title Case:

```js
Str.of('a nice title uses the correct case').title();

// 'A Nice Title Uses The Correct Case'
```

#### toBase64

The `toBase64` method converts the given string to Base64:

```js
Str.of('Laravel').toBase64();

// 'TGFyYXZlbA=='
```

#### toHtmlString

The `toHtmlString` method converts the string instance to an instance of HTMLElement, which may be displayed in HTML:

```js
Str.of('<input type="text" placeholder="Hello">').toHtmlString();

<input type="text" placeholder="Hello">
```

If no valid HTML is provided to the method, the method returns an instance of `string`:

```js
Str.of('Hello').toHtmlString();

// 'Hello'
```

#### trim

The `trim` method trims the given string:

```js
Str.of('  Laravel  ').trim();

// 'Laravel'
```

```js
Str.of('/Laravel/').trim('/');

// 'Laravel'
```

#### ucfirst

The `ucfirst` method returns the given string with the first character capitalized:

```js
Str.of('foo bar').ucfirst();

// 'Foo bar'
```

#### ucsplit

The `ucsplit` method splits the given string into an array by uppercase characters:

```js
Str.of('Foo Bar').ucsplit();

// ['Foo', 'Bar']
```

#### unwrap

The `unwrap` method removes the specified strings from the beginning and end of a given string:

```js
Str.of('-Laravel-').unwrap('-');

// 'Laravel'
```

```js
Str.of('{framework: "Laravel"}').unwrap('{', '}');

// 'framework: "Laravel"'
```

#### upper

The `upper` method converts the given string to uppercase:

```js
Str.of('laravel').upper();

// 'LARAVEL'
```

#### when

The `when` method invokes the given closure if a given condition is true.
The closure will receive the fluent string instance:

```js
Str.of('Taylor').when(true, (string) => string.append(' Otwell'));

// 'Taylor Otwell'
```

If necessary, you may pass another closure as the third parameter to the `when` method.
This closure will execute if the condition parameter evaluates to false.

```js
Str.of('Taylor').when(false, (string) => string.append(' Otwell'), (string) => string.append(' Swift'));

// 'Taylor Swift'
```

#### unless

The `unless` method invokes the given closure if a given condition is false.
The closure will receive the fluent string instance:

```js
Str.of('Taylor').unless(false, (string) => string.append(' Otwell'));

// 'Taylor Otwell'
```

If necessary, you may pass another closure as the third parameter to the `unless` method.
This closure will execute if the condition parameter evaluates to true.

#### whenContains

The `whenContains` method invokes the given closure if the string contains the given value.
The closure will receive the fluent string instance:

```js
Str.of('tony stark').whenContains('tony', (string) => string.title());

// 'Tony Stark'
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('tony stark').whenContains(['tony', 'hulk'], (string) => string.title());

// Tony Stark
```

If necessary, you may pass another closure as the third parameter to the `whenContains` method.
This closure will execute if the condition parameter evaluates to false.

#### whenContainsAll

The `whenContainsAll` method invokes the given closure if the string contains all the given sub-strings.
The closure will receive the fluent string instance:

```js
Str.of('tony stark').whenContainsAll(['tony', 'stark'], (string) => string.title());

// 'Tony Stark'
```

If necessary, you may pass another closure as the third parameter to the `whenContainsAll` method.
This closure will execute if the condition parameter evaluates to false.

#### whenEmpty

The `whenEmpty` method invokes the given closure if the string is empty.
If the closure returns a value, that value will also be returned by the `whenEmpty` method.
If the closure does not return a value, the fluent string instance will be returned:

```js
Str.of('  ').whenEmpty((string) => string.trim().prepend('Laravel'));

// 'Laravel'
```

If necessary, you may pass another closure as the third parameter to the `whenEmpty` method.
This closure will execute if the condition parameter evaluates to false.

#### whenNotEmpty

The `whenNotEmpty` method invokes the given closure if the string is not empty.
If the closure returns a value, that value will also be returned by the `whenNotEmpty` method.
If the closure does not return a value, the fluent string instance will be returned:

```js
Str.of('Framework').whenNotEmpty((string) => string.prepend('Laravel '));

// 'Laravel Framework'
```

If necessary, you may pass another closure as the third parameter to the `whenNotEmpty` method.
This closure will execute if the condition parameter evaluates to false.

#### whenStartsWith

The `whenStartsWith` method invokes the given closure if the string starts with the given sub-string.
The closure will receive the fluent string instance:

```js
Str.of('disney world').whenStartsWith('disney', (string) => string.title());

// 'Disney World'
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('disney world').whenStartsWith(['hello', 'disney'], (string) => string.title());

// 'Disney World'
```

If necessary, you may pass another closure as the third parameter to the `whenStartsWith` method.
This closure will execute if the condition parameter evaluates to false.

#### whenDoesntStartWith

The `whenDoesntStartWith` method invokes the given closure if the string does not start with the given sub-string.
The closure will receive the fluent string instance:

```js
Str.of('disney world').whenDoesntStartWith('hello', (string) => string.title());

// 'Disney World'
```

You may also pass an array of values to determine if the given string does not contain any of the values in the array:

```js
Str.of('disney world').whenDoesntStartWith(['hello', 'world'], (string: Stringable) => string.title());

// Tony Stark
```

If necessary, you may pass another closure as the third parameter to the `whenDoesntStartWith` method.
This closure will execute if the condition parameter evaluates to false.

#### whenEndsWith

The `whenEndsWith` method invokes the given closure if the string ends with the given sub-string.
The closure will receive the fluent string instance:

```js
Str.of('disney world').whenEndsWith('world', (string) => string.title());

// 'Disney World'
```

#### whenDoesntEndWith

The `whenDoesntEndWith` method determines if the given string doesn't end with a given substring:
The closure will receive the fluent string instance:

```js
Str.of('disney world').whenDoesntEndWith('land', (string) => string.title());

// 'Disney World'
```

You may also pass an array of values to determine if the given string does not end with any of the values in the array:

```js
Str.of('disney world').whenDoesntEndWith(['land', 'moon'], (string) => string.title());

// true
```

If necessary, you may pass another closure as the third parameter to the `whenDoesntEndWith` method.
This closure will execute if the condition parameter evaluates to false.

#### whenExactly

The `whenExactly` method invokes the given closure if the string exactly matches the given string.
The closure will receive the fluent string instance:

```js
Str.of('laravel').whenExactly('laravel', (string) => string.title());

// 'Laravel'
```

If necessary, you may pass another closure as the third parameter to the `whenExactly` method.
This closure will execute if the condition parameter evaluates to false.

#### whenNotExactly

The `whenNotExactly` method invokes the given closure if the string does not exactly match the given string.
The closure will receive the fluent string instance:

```js
Str.of('framework').whenNotExactly('laravel', (string) => string.title());

// 'Framework'
```

If necessary, you may pass another closure as the third parameter to the `whenNotExactly` method.
This closure will execute if the condition parameter evaluates to false.

#### whenIs

The `whenIs` method invokes the given closure if the string matches a given pattern.
Asterisks may be used as wildcard values.
The closure will receive the fluent string instance:

```js
Str.of('foo/bar').whenIs('foo/*', (string) => string.append('/baz'));

// 'foo/bar/baz'
```

If necessary, you may pass another closure as the third parameter to the `whenIs` method.
This closure will execute if the condition parameter evaluates to false.

#### whenIsAscii

The `whenIsAscii` method invokes the given closure if the string is 7-bit ASCII.
The closure will receive the fluent string instance:

```js
Str.of('laravel').whenIsAscii((string) => string.title());

// 'Laravel'
```

If necessary, you may pass another closure as the third parameter to the `whenIsAscii` method.
This closure will execute if the condition parameter evaluates to false.

#### whenIsUlid

The `whenIsUlid` method invokes the given closure if the string is a valid ULID.
The closure will receive the fluent string instance:

```js
Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string) => string.substr(0, 8));

// '01gd6r36'
```

If necessary, you may pass another closure as the third parameter to the `whenIsUlid` method.
This closure will execute if the condition parameter evaluates to false.

#### whenIsUuid

The `whenIsUuid` method invokes the given closure if the string is a valid UUID.
The closure will receive the fluent string instance:

```js
Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string) => string.substr(0, 8));

// 'a0a2a2d2'
```

If necessary, you may pass another closure as the third parameter to the `whenIsUuid` method.
This closure will execute if the condition parameter evaluates to false.

#### whenTest

The `whenTest` method invokes the given closure if the string matches the given regular expression.
The closure will receive the fluent string instance:

```js
Str.of('laravel framework').whenTest(/laravel/, (string) => string.title());

// 'Laravel Framework'
```

If necessary, you may pass another closure as the third parameter to the `whenTest` method.
This closure will execute if the condition parameter evaluates to false.

#### wordCount

The `wordCount` method returns the number of words that a string contains:

```js
Str.of('Hello, world!').wordCount();

// 2
```

#### words

The `words` method limits the number of words in a string. If necessary, you may specify an additional string that will be appended to the truncated string:

```js
Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>');

// 'Perfectly balanced, as >>>'
```

### Miscellaneous

#### dd

The `dd` method dumps the given string and end execution of the script:

```js
Str.of('Laravel').dd();

// 'Laravel'
```

If you do not want to halt the execution of your script, use the `dump` function instead.

#### dump

The `dump` method dumps the given string to the console:

```js
Str.of('Laravel').dump();

// 'Laravel'
```

#### toString

Get the raw string value.

```js
Str.of('Laravel').toString();

// 'Laravel'
```

#### toInteger

The `toInteger` method returns the underlying string value as an integer.

```js
Str.of('1').toInteger();

// 1
```

```js
Str.of('Laravel').toInteger();

// 0
```

You can specify the base (2-36) for conversion. When base is 0, it automatically detects hexadecimal (0x prefix) and octal (0 prefix) numbers:

```js
Str.of('077').toInteger();

// 77

Str.of('1010').toInteger(2);
// 10

Str.of('42').toInteger(8);

// 34

Str.of('0xFF').toInteger(16);

// 255

Str.of('Z').toInteger(36);

// 35
```

In case the underlying string value is not a number, method will return 0.

#### toFloat

The `toFloat` method returns underlying string value as a float.

```js
Str.of('1.5').toFloat();

// 1.5
```

```js
Str.of('Laravel').toFloat();

// 0
```

In case the underlying string value is not a number, method will return 0.

#### toBoolean

The `toBoolean` method returns underlying string value as a boolean.

```js
Str.of('true').toBoolean();

// true
```

```js
Str.of('Laravel').toBoolean();

// false
```

The `toBoolean` method returns true when value is `1`, `true`, `on`, and `yes`. Otherwise, returns `false`.

#### toDate

Get the underlying string value as a formatted Date string.

```js
Str.of('13 September 2023, 12:00 PM').toDate();

// 9/13/2023, 12:00:00
```

You may provide a string as a second and/or third argument to the function in order to format the date and set the Timezone respectively:

```js
Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'Europe/London');

// '2023-09-13 11:00:00'
```

```js
Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'America/Toronto');

// '2023-09-13 06:00:00'
```

Table of all format options and their examples can be found below:

| Format character | Description                                                                                                                                                                                                                         | Example                                 |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| d                | Day of the month, 2 digits with leading zeros.                                                                                                                                                                                      | 01 to 31                                |
| D                | A textual representation of a day, three letters.                                                                                                                                                                                   | Mon through Sun                         |
| j                | Day of the month without leading zeros.                                                                                                                                                                                             | 1 to 31                                 |
| l                | A full textual representation of the day of the week.                                                                                                                                                                               | Sunday through Saturday                 |
| N                | ISO 8601 numeric representation of the day of the week.                                                                                                                                                                             | 1 (for Monday) through 7 (for Sunday)   |
| S                | English ordinal suffix for the day of the month, 2 characters.                                                                                                                                                                      | st, nd, rd or th                        |
| w                | Numeric representation of the day of the week.                                                                                                                                                                                      | 0 (for Sunday) through 6 (for Saturday) |
| z                | Numeric representation of the day of the week.                                                                                                                                                                                      | The day of the year (starting from 0)   |
| W                | ISO 8601 week number of year, weeks starting on Monday.                                                                                                                                                                             | 42 (the 42nd week in the year)          |
| F                | A full textual representation of a month, such as January or March.                                                                                                                                                                 | January through December                |
| m                | Numeric representation of a month, with leading zeros.                                                                                                                                                                              | 01 through 12                           |
| M                | A short textual representation of a month, three letters.                                                                                                                                                                           | Jan through Dec                         |
| n                | Numeric representation of a month, without leading zeros.                                                                                                                                                                           | 1 through 12                            |
| t                | Number of days in the given month.                                                                                                                                                                                                  | 28 through 31                           |
| L                | Whether it's a leap year.                                                                                                                                                                                                           | 1 if it is a leap year, 0 otherwise     |
| o                | ISO 8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.                                                                 | 1999 or 2003                            |
| X                | An expanded full numeric representation of a year, at least 4 digits, with for years BCE, and + for years CE.                                                                                                                       | -0055, +0787, +1999, +10191             |
| x                | An expanded full numeric representation if required, or a standard full numeral representation if possible (like Y). At least four digits. Years BCE are prefixed with a -. Years beyond (and including) 10000 are prefixed by a +. | -0055, 0787, 1999, +10191               |
| Y                | A full numeric representation of a year, at least 4 digits, with for years BCE.                                                                                                                                                     | -0055, 0787, 1999, 2003, 10191          |
| y                | A two-digit representation of a year.                                                                                                                                                                                               | 99 or 03                                |
| a                | Lowercase Ante meridiem and Post meridiem.                                                                                                                                                                                          | am or pm                                |
| A                | Uppercase Ante meridiem and Post meridiem.                                                                                                                                                                                          | AM or PM                                |
| B                | Swatch Internet time.                                                                                                                                                                                                               | 000 through 999                         |
| g                | 12-hour format of an hour without leading zeros.                                                                                                                                                                                    | 1 through 12                            |
| G                | 24-hour format of an hour without leading zeros.                                                                                                                                                                                    | 0 through 23                            |
| h                | 12-hour format of an hour with leading zeros.                                                                                                                                                                                       | 01 through 12                           |
| H                | 24-hour format of an hour with leading zeros.                                                                                                                                                                                       | 00 through 23                           |
| i                | Minutes with leading zeros.                                                                                                                                                                                                         | 00 to 59                                |
| s                | Seconds with leading zeros.                                                                                                                                                                                                         | 00 to 59                                |
| u                | Microseconds.                                                                                                                                                                                                                       | 654321                                  |
| v                | Milliseconds.                                                                                                                                                                                                                       | 654                                     |
| e                | Timezone identifier.                                                                                                                                                                                                                | UTC, GMT, Atlantic/Azores               |
| I                | Whether or not the date is in daylight saving time.                                                                                                                                                                                 | 1 if Daylight Saving Time, 0 otherwise  |
| O                | Difference to Greenwich time (GMT) without colon between hours and minutes.                                                                                                                                                         | +0200                                   |
| P                | Difference to Greenwich time (GMT) with colon between hours and minutes                                                                                                                                                             | +02:00                                  |
| p                | The same as P, but returns Z instead of +00:00.                                                                                                                                                                                     | +02:00                                  |
| T                | Timezone abbreviation, if known; otherwise the GMT offset.                                                                                                                                                                          | EST, MDT, +05                           |
| Z                | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.                                                                                                  | -43200 through 50400                    |
| c                | ISO 8601 date.                                                                                                                                                                                                                      | 2004-02-12T15:19:21+00:00               |
| r                | Seconds since the Unix Epoch.                                                                                                                                                                                                       | January 1 1970 00:00:00 GMT             |
| U                | RFC 2822/RFC 5322 formatted date.                                                                                                                                                                                                   | Thu, 21 Dec 2000 16:01:07 +0200         |

Providing incorrect Date/Time string will result in an error:

```js
Str.of('Laravel').toDate();

// 'Invalid Date'
```