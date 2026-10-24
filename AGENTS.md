<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- chat.md at the root is the human-maintained project log; keep it in sync with every change.
- Site chrome (Header/Footer) is rendered once in src/routes/__root.tsx; pages only render their sections.
- Quote form prefill uses `/` search params `division` and `product` with `#inquiry`; reuse this instead of new routes.
- Tableware catalogue data lives in src/lib/tableware.ts so pages stay presentational.
