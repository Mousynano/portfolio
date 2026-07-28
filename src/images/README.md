# Image resources

The visual system uses simple dark technical diagrams. Each image should communicate one workflow with as few elements as possible.

## Naming

```text
src/images/projects/<slug>.svg
src/images/projects/<slug>-demo-frame.svg
```

## Intended use

- `<slug>.svg`: homepage, Work page, and article header.
- `<slug>-demo-frame.svg`: first usage visual inside the Markdown case study.

## Replacement workflow

1. Add a sanitized `.webp`, `.png`, or `.svg` to `src/images/projects/`.
2. Update `cover:` in the project's Markdown frontmatter for the card/header image.
3. Update the Markdown image path for the article usage frame.
4. Run `npm run build` and `npm run check`.

## Visual rule

Prefer a three-part story:

```text
input → system action → useful output
```

Use one accent per important step. Avoid decorative nodes that do not explain the product. The diagram is evidence, not a Where's Waldo page for backend engineers.
