register({
  id: 'quote-block',
  name: 'Quote Block',
  desc: 'Designer or theorist quote',
  group: 'Teaching',
  icon: '💬',
  def: {
    quote: 'A game is a series of interesting decisions.',
    name: 'Sid Meier',
    title: 'Creator of the Civilization series'
  },
  gen(st) {
    return `<blockquote style="margin:24px 0;padding:28px 32px;border-left:5px solid #FDB92A;background-color:#FAFAFA;border-radius:0 10px 10px 0;">
  <p style="line-height:1.5;margin:0 0 16px 0;font-style:italic;font-size:1.15em;">"${fmt(st.quote)}"</p>
  <p style="margin:0 0 2px 0;"><span style="display:inline-block;height:2px;width:24px;background-color:#FDB92A;vertical-align:middle;margin-right:12px;"></span>${esc(st.name)}</p>
  ${st.title ? `<p style="margin:0;padding-left:36px;">${esc(st.title)}</p>` : ''}
</blockquote>`;
  },
  ctrl(st) {
    return `
    <div class="ctrl-header"><span class="ctrl-label">Quote Block</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;padding-top:6px;font-family:var(--ui)">Quote</span>
        <textarea class="ci ci-grow ci-prose" data-f="quote" data-i="0" rows="1">${esc(st.quote)}</textarea>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Name</span>
        <input class="ci ci-grow" type="text" value="${escA(st.name)}" data-f="name" data-i="0" placeholder="Author name">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0" placeholder="Role or description (optional)">
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    st[f] = el.value;
  }
});
