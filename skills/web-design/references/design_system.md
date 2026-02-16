# Design System & Tailwind Patterns

## Design Principles

### 1. Hierarchy via Typography & Scale
Don't just use bold. Use size and color to establish hierarchy.
*   **H1**: `text-4xl font-bold text-slate-900 tracking-tight`
*   **H2**: `text-2xl font-semibold text-slate-800`
*   **Body**: `text-base text-slate-600 leading-relaxed`
*   **Caption**: `text-sm text-slate-500`

### 2. Whitespace (Spacing)
Space is luxuary. Avoid dense clusters.
*   **Section Padding**: `py-16` or `py-24`
*   **Card Padding**: `p-6` or `p-8`
*   **Item Gap**: `gap-4` (tight), `gap-8` (loose)

### 3. Shadows & Depth
Use shadows to lift interactive elements.
*   **Card**: `bg-white shadow-sm ring-1 ring-slate-900/5`
*   **Dropdown/Modal**: `shadow-xl ring-1 ring-black/5`
*   **Hover**: `hover:shadow-md transition-shadow`

## Tailwind CSS Component Patterns

### Button (Primary)
```jsx
<button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
  Button Text
</button>
```

### Card (Minimal)
```jsx
<div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5">
  <div className="p-6">
    <h3 className="text-base font-semibold leading-7 text-slate-900">Card Title</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">Card content description goes here.</p>
  </div>
</div>
```

### Input Field
```jsx
<div>
  <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Email</label>
  <div className="mt-2">
    <input
      type="email"
      name="email"
      id="email"
      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      placeholder="you@example.com"
    />
  </div>
</div>
```

### Badge / Tag
```jsx
<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
  Badge
</span>
```

## Accessibility (A11y) Checklist

*   [ ] **Contrast**: Text ensures at least 4.5:1 contrast against background (use `color_utils.py` to check).
*   [ ] **Focus States**: Never remove `outline` without providing a custom focus style (`focus:ring`).
*   [ ] **Semantic HTML**: Use `<button>` for actions, `<a>` for links.
*   [ ] **Labels**: All form inputs have associated labels (visible or `sr-only`).
