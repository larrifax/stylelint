# rule-single-line-max-declarations

Limit the number of declaration within a single line rule.

## Options

`int`: Maximum number of declarations allowed.

For example, with `1`:

The following patterns are considered warnings:

```css
a { color: pink; top: 3px; }
```

The following patterns are *not* considered warnings:

```css
a { color: pink; }
```

```css
a {
  color: pink;
  top: 3px;
}
```
