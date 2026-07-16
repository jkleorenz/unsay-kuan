# Unsay Kuan? — Design System
*Minimalist · soft edges · subtle shadows · one accent color*

## 1. Philosophy

Three rules, applied everywhere:

1. **One accent color.** It's reserved for the single most important action or state on any screen. If everything is accented, nothing is.
2. **Soft, not sharp.** Every surface — card, button, input, modal — shares one small set of corner radii. Nothing in the UI has a hard 0px corner except dividers.
3. **Shadows suggest elevation, not decoration.** Shadows are barely-there. If a shadow is noticeable on its own, it's too strong.

Neutral grays carry the interface. Color is a pointer, not wallpaper.

## 2. Color

### Accent
```
--accent-50:  #EEF2FF
--accent-100: #E0E7FF
--accent-200: #C7D2FE
--accent-400: #818CF8
--accent-500: #6366F1   /* primary accent */
--accent-600: #4F46E5   /* accent hover/active */
--accent-700: #4338CA   /* accent text on light bg */
```
Swap `#6366F1` for any hue you prefer — the system works with one accent hue as long as you keep the same 50/100/200/400/500/600/700 lightness steps.

### Neutrals (do most of the work)
```
--gray-0:   #FFFFFF   /* page background */
--gray-50:  #FAFAFA   /* subtle section background */
--gray-100: #F4F4F5   /* card background, input background */
--gray-200: #E4E4E7   /* borders, dividers */
--gray-300: #D4D4D8   /* disabled borders */
--gray-500: #71717A   /* secondary text */
--gray-700: #3F3F46   /* body text */
--gray-900: #18181B   /* headings, primary text */
```

### Semantic (functional only — never decorative)
```
--success: #16A34A   /* confirmations, "open now", verified */
--danger:  #DC2626   /* errors, destructive actions */
--warning: #D97706   /* pending/unverified states */
```
These are used sparingly — a badge, an inline validation message — never as a section background or a button fill. The accent color remains the only color used for interactive emphasis.

### Usage rules
- Default text: `--gray-900` on `--gray-0`.
- Secondary/meta text (timestamps, helper text): `--gray-500`.
- Primary buttons and active/selected states: `--accent-500` fill, `--accent-600` on hover.
- Links and text-only actions: `--accent-700` (readable at body size, doesn't need a fill).
- Never pair two saturated colors on screen at once. If a badge needs a status color and the page also has the accent visible, that's fine — but don't introduce a second bright hue.

## 3. Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / page titles | Inter (or system-ui) | 600 | 28–32px |
| Section headings | Inter | 600 | 18–20px |
| Body text | Inter | 400 | 15–16px |
| Small / meta text | Inter | 400 | 13px |
| Buttons / labels | Inter | 500 | 14–15px |

One typeface, three weights (400/500/600). Line height 1.5 for body, 1.2 for headings. Don't mix a display serif in — minimalist means restraint in type choices too, not just color.

## 4. Spacing

4px base grid:
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
```
Card internal padding: `--space-4` to `--space-6`. Gaps between cards in a grid: `--space-4`. Section vertical rhythm: `--space-8` to `--space-12`.

## 5. Radius (the "soft edge" system)

```
--radius-sm: 6px    /* inputs, badges, small buttons */
--radius-md: 10px   /* buttons, chips */
--radius-lg: 14px   /* cards, panels */
--radius-xl: 20px   /* modals, large containers */
--radius-full: 999px /* pills, avatars, toggle tracks */
```
Rule of thumb: the bigger the surface, the bigger the radius — but never so large it looks like a bubble. Nested elements use a slightly smaller radius than their parent (a card at `--radius-lg` with a button inside at `--radius-md`).

## 6. Shadows (subtle only)

```
--shadow-xs: 0 1px 2px rgba(24, 24, 27, 0.04)
--shadow-sm: 0 1px 3px rgba(24, 24, 27, 0.06), 0 1px 2px rgba(24, 24, 27, 0.04)
--shadow-md: 0 4px 8px rgba(24, 24, 27, 0.06), 0 2px 4px rgba(24, 24, 27, 0.04)
--shadow-lg: 0 12px 24px rgba(24, 24, 27, 0.08), 0 4px 8px rgba(24, 24, 27, 0.04)
```
- Resting card: `--shadow-xs` or none — a `--gray-200` border often does the job alone.
- Hovered/interactive card: `--shadow-sm`.
- Dropdown, popover: `--shadow-md`.
- Modal: `--shadow-lg`.

Never use a shadow and a heavy border together — pick one method of separating a surface from the page.

## 7. Components

### Buttons
- **Primary:** `--accent-500` fill, white text, `--radius-md`, no border. Hover → `--accent-600`. This is the one button style allowed to use the accent fill — one primary button per view.
- **Secondary:** `--gray-0` fill, `--gray-200` border, `--gray-900` text, `--radius-md`. Hover → `--gray-50` fill.
- **Ghost/text:** no fill, no border, `--accent-700` text. For low-emphasis actions.
- Disabled: `--gray-100` fill, `--gray-300` text, no hover effect — don't just lower opacity (fails contrast).

### Inputs
- `--gray-0` fill, `--gray-200` border, `--radius-sm`, `--space-3` horizontal padding.
- Focus: border becomes `--accent-500`, plus a soft outer ring `0 0 0 3px var(--accent-100)`. No color change on the fill itself.
- Error state: border `--danger`, helper text below in `--danger`, small size.

### Cards
- `--gray-0` fill, `1px solid var(--gray-200)`, `--radius-lg`, `--shadow-xs`.
- Hover (if clickable): `--shadow-sm` and border shifts to `--gray-300`. No scale/transform — keep motion minimal.

### Badges / tags
- `--radius-full`, small padding (`--space-1` `--space-3`), 12–13px text.
- Neutral badge: `--gray-100` fill, `--gray-700` text.
- Status badges use semantic colors at low opacity fills (e.g. `--success` at 10% background, full `--success` text) — never a solid saturated fill for a small badge.

### Modals
- `--gray-0` fill, `--radius-xl`, `--shadow-lg`, centered, max-width ~480–560px.
- Backdrop: `rgba(24, 24, 27, 0.4)`, no blur (keep it flat and fast).

### Navigation
- Flat top bar, `--gray-0` background, `1px solid var(--gray-200)` bottom border — no shadow needed if there's a border.
- Active nav item: `--accent-700` text, optionally a `--accent-500` 2px underline. Nothing else in the nav gets color.

## 8. Iconography

- Stroke-based icons only (not filled), consistent stroke width (1.5–2px) across the whole app.
- Icon color inherits text color — `--gray-500` for secondary actions, `--accent-500` only when the icon itself is the interactive/active indicator (e.g. a filled star on a saved listing).
- Icon size: 16px inline with text, 20px in isolated buttons, 24px max for empty-state illustrations.

## 9. Motion

- Transitions: 120–160ms, ease-out. Used only for color/shadow/border changes on hover and focus — not for layout shifts.
- No entrance animations on page load. No parallax. Motion should never be the thing a user notices.

## 10. Accessibility baseline

- Body text on `--gray-0`: minimum `--gray-700` (passes AA at 16px).
- Never rely on color alone for status — pair every colored badge with a label ("Verified", "Open now"), not just a colored dot.
- All interactive elements get a visible focus ring (the accent-100 ring described under Inputs) — never `outline: none` without replacing it.
- Respect `prefers-reduced-motion`: transitions collapse to near-instant if set.

## 11. Quick reference — what NOT to do

- Don't add a second bright color "for variety." If a category needs visual distinction (like the business directory categories), use the neutral scale plus icon differences, not a rainbow of hues.
- Don't use pure black (`#000`) or pure white text-on-white — always the gray scale above.
- Don't stack radius sizes inconsistently (an `--radius-lg` card with an `--radius-xl` button inside it looks like a mistake, not a choice).
- Don't use a shadow strong enough to look like a drop-shadow effect from a design tool default — if it's visible from across the room, dial it back.
