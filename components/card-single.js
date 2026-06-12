register({
  id: 'card-single',
  name: 'Cards',
  desc: 'One to many cards, max 3 columns',
  group: 'Cards',
  icon: '🃏',
  def: {
    cards: [
      { emoji: '🎯', title: 'Card Title', body: 'Card description text. Keep it concise — 2–3 sentences at most.' }
    ]
  },
  gen(st) {
    const cols = Math.min(3, st.cards.length);
    const items = st.cards.map(c => {
      const icon = c.emoji.trim()
        ? `<div style="font-size:28px;margin-bottom:10px;">${esc(c.emoji)}</div>`
        : '';
      return `  <div style="background-color:#FFFFFF;border:1px solid #E0E0E0;border-top:4px solid #FDB92A;border-radius:0 0 10px 10px;padding:20px 20px 22px;">
    ${icon}<h5 style="margin:0 0 8px 0;">${esc(c.title)}</h5>
    <p style="margin:0;line-height:1.6;">${esc(c.body)}</p>
  </div>`;
    }).join('\n');
    return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px;margin:16px 0;">
${items}
</div>`;
  },
  ctrl(st) {
    const rows = st.cards.map((c, i) => `
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Card ${i + 1}</span>
      <div class="ctrl-actions">
        ${st.cards.length > 1 ? `<button class="ctrl-btn-x" data-action="remove" data-i="${i}" title="Remove">✕</button>` : ''}
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Emoji</span>
        <input class="ci" style="width:56px;" type="text" value="${escA(c.emoji)}" data-f="emoji" data-i="${i}" placeholder="or empty">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:8px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(c.title)}" data-f="title" data-i="${i}">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;padding-top:6px;font-family:var(--ui)">Body</span>
        <textarea class="ci ci-grow" data-f="body" data-i="${i}" rows="2" style="resize:vertical;">${esc(c.body)}</textarea>
      </div>
    </div>`).join('');

    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Cards (${st.cards.length})</span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add Card</button>
      </div>
    </div>
    ${rows}`;
  },
  onInput(st, f, i, el) {
    st.cards[i][f] = el.value;
  },
  onClick(st, act, i) {
    if (act === 'add') st.cards.push({ emoji: '', title: 'Card Title', body: 'Card description text.' });
    if (act === 'remove') st.cards.splice(i, 1);
  }
});
