# Refactoring Plan

## Critical — Fix immediately

### 1. Replace all non-zinc colors with zinc semantic tokens

Every component that semantically distinguishes win/loss/neutral currently uses raw color values that violate the design system:

| Location | Violation | Fix |
|---|---|---|
| `ScrimEntry/_Score.vue` | `bg-green-600`, `bg-red-500`, `bg-gray-500` | Use zinc tones + text labeling |
| `ScrimEntry/_BannedHero.vue` | `border-red-500` | `border-zinc-300` or `border-zinc-950` |
| `ScrimEntry/_ReplayCode.vue` | `bg-orange-500` | `bg-zinc-950` |
| `ScrimEntry/_OptionsOverlay.vue` | `bg-orange-500`, `bg-red-500`, `bg-blue-500` | All `bg-zinc-*` variants |
| `ScrimEntryBuilder.vue` | `text-green-600`, `text-red-600`, `bg-blue-600` | `text-zinc-*` + icons |
| `MatchOverview.vue` | `bg-red-400`, `bg-green-400` | `bg-zinc-*` |
| `entry.vue` | `bg-green-600`, `bg-blue-600` | `bg-zinc-950` / `bg-zinc-200` |
| `main.css` | `#b31c1c` gradient, `#aeaeae` scrollbars | `var(--color-zinc-*)` |

### 2. Remove all shadows

Per design system, shadows are explicitly banned. Current violations:

- `Modal.vue:21` — `shadow-2xl` on the modal panel
- `ScrimEntry/_OptionsOverlay.vue` — `shadow` on all three action buttons
- `entry.vue:140,145` — `shadow-sm` on action buttons
- `ScrimEntryBuilder.vue:108,114` — `shadow` on submit/cancel buttons

Replace with border step-ups or `hover:brightness-95`.

### 3. Fix direct prop mutation in `ScrimEntryBuilder.vue`

The watcher at lines ~19–29 writes directly to `props.modelValue.winningTeam`. This is an anti-pattern that silently breaks Vue's reactivity contract. It should emit a new value instead:

```ts
// Currently:
props.modelValue.winningTeam = 0

// Should be:
emit('update:modelValue', { ...props.modelValue, winningTeam: 0 })
```

---

## High — Design system consistency

### 4. Replace all `gray-*` with `zinc-*`

`gray` and `zinc` are different color scales that look similar but produce inconsistent results at various shades. All occurrences to fix:

- `ScrimBlockInfo.vue` — `text-gray-400`, `border-gray-200` (3 instances)
- `ScrimEntryBuilder.vue` — `text-gray-500` (4+ instances)

---

## Medium — Code quality

### 7. Standardize prop definitions to TypeScript

Half the components use `defineProps({ ... })` with JS object syntax; the other half use `withDefaults(defineProps<Props>())`. Standardize all to typed interfaces. Priority targets:

- `CategoryButton.vue`
- `Modal.vue`
- `ScrimEntry/_OptionsOverlay.vue`, `_Score.vue`, `_ReplayCode.vue`
- `ScrimEntryBuilder.vue` — `modelValue: Object` → typed interface
- `ScrimEntry/index.vue` — `type: Object` props → `ScrimData` interface

### 8. Replace hardcoded dimensions

These prevent responsive scaling and break the utility-first approach:

- `app.vue` — `grid-cols-[250px_auto]` → Tailwind sidebar width token or CSS variable
- `entry.vue` — `w-[640px]` → `max-w-2xl` or `max-w-screen-sm`
- Various `drop-shadow-[0_1.2px_1.2px_rgba(...)]` → remove entirely per design system

### 9. Define a z-index scale

Z-index values are scattered with no hierarchy:

| Layer | Current values | Proposed token |
|---|---|---|
| Sticky headers | `z-40` | `z-sticky` |
| Overlays | `z-20`, `z-50` | `z-overlay` |
| Modals | `z-[100]` | `z-modal` |

Add to `tailwind.config.js` under `extend.zIndex`.

### 10. Clean up `AppAlert.vue`

Currently a bare `<p><slot /></p>` with no styling or semantic meaning. Either:
- Implement it properly with variant support (info, warning, error using zinc tones), or
- Delete it and remove any imports

### 11. Add escape key handler to `Modal.vue`

No keyboard dismissal is implemented. Add `onKeydown` watcher or `useMagicKeys`.

### 12. Remove unused imports

- `entry.vue` — `AppleIcon`, `ChartColumnStackedIcon` are imported but not used
- `app/teams/[id].vue` — same unused icon imports

---

## Low — Structural cleanup

### 13. Add `role="dialog"` and `aria-modal="true"` to `Modal.vue`

The modal backdrop has no accessibility semantics. Also add `aria-label` to close/action buttons in `_OptionsOverlay.vue`.

### 14. Associate `<label>` elements with inputs in `ScrimEntryBuilder.vue`

Form labels use adjacent positioning but no `for`/`id` linkage, breaking screen readers and click targeting.

### 15. Remove `!important` flag usage

`font-mono!` in `_Score.vue` and `_ReplayCode.vue` uses Tailwind's `!important` escape unnecessarily. Both are scoped components with no competing utility that would require the override.

---

## Order of operations

1. **Colors + shadows** — most visually impactful, zero risk of breaking logic
2. **Prop mutation fix** — correctness bug
3. **gray→zinc sweep** — low risk, sweeping find-replace
4. **TypeScript prop interfaces** — needs parallel `lib/types.ts` or inline interfaces
5. **Hardcoded dimensions + z-index scale** — layout-level, test visually after
6. **Accessibility** — last because it requires testing with screen readers
