# no-multiple-empty-lines

Disallow multiple empty lines.

The following patterns are considered warnings:

```css
a {}


b {}
```

Comment strings are also checked -- so the following is a warning:

```css
/**
 * Call me Ishmael.
 *
 *
 * Some years ago -- never mind how log precisely -- ...
 */
```

The following patterns are *not* considered warnings:

```css
a {}

b {}
```

```css
a {}
b {}
```

```css
a {} b {}
```

```css
/**
 * Call me Ishmael.
 *
 * Some years ago -- never mind how long precisely -- ...
 */
```
