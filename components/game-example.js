register({
  id: 'game-example',
  name: 'Game Example Card',
  desc: 'Concept illustrated by a real game',
  group: 'Teaching',
  icon: '🎮',
  def: {
    image:     'https://placehold.co/200x280/000000/FDB92A/png?text=Cover',
    title:     'Game Title Here',
    developer: 'Studio Name',
    year:      '2024',
    concept:   'Concept being illustrated',
    body:      'Explain what this game demonstrates about the concept. Be specific — which mechanic, which moment, which design decision?'
  },
  gen(st) {
    const devYear = [st.developer, st.year].filter(Boolean).join(' · ');
    const pill = st.concept.trim()
      ? `<div style="display:inline-block;background-color:#FDB92A;padding:3px 10px;border-radius:20px;margin-bottom:12px;"><p style="margin:0;">${esc(st.concept)}</p></div><br>`
      : '';
    return `<div style="margin:16px 0;border:1px solid #E0E0E0;border-radius:10px;display:flex;overflow:hidden;">
  <div style="flex-shrink:0;width:200px;align-self:stretch;min-height:180px;">
    <img src="${escA(st.image)}" alt="${escA(st.title)} cover" style="width:200px;height:100%;object-fit:cover;display:block;">
  </div>
  <div style="flex:1;padding:20px;min-width:200px;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Game Example</p>
    <h5 style="margin:0 0 4px 0;">${esc(st.title)}</h5>
    <p style="margin:0 0 12px 0;">${esc(devYear)}</p>
    ${pill}
    <p style="margin:0;line-height:1.6;">${esc(st.body)}</p>
  </div>
</div>`;
  },
  ctrl(st) {
    return `
    <div class="ctrl-header"><span class="ctrl-label">Game Example</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;font-family:var(--ui)">Image URL</span>
        <input class="ci ci-grow" type="text" value="${escA(st.image)}" data-f="image" data-i="0" placeholder="https://…">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0" placeholder="Game title">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;font-family:var(--ui)">Developer</span>
        <input class="ci ci-grow" type="text" value="${escA(st.developer)}" data-f="developer" data-i="0" placeholder="Studio name">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Year</span>
        <input class="ci ci-year" type="text" value="${escA(st.year)}" data-f="year" data-i="0" placeholder="2024">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;font-family:var(--ui)">Concept</span>
        <input class="ci ci-grow" type="text" value="${escA(st.concept)}" data-f="concept" data-i="0" placeholder="Leave empty to hide pill">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;padding-top:6px;font-family:var(--ui)">Body</span>
        <textarea class="ci ci-grow" data-f="body" data-i="0" rows="3" style="resize:vertical;">${esc(st.body)}</textarea>
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    st[f] = el.value;
  }
});
