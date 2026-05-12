register({
  id: 'text-section',
  name: 'Text Section',
  desc: 'Heading with body paragraph',
  group: 'Layout',
  icon: '¶',
  def: {
    headingLevel: 'h2',
    headingText: 'Section Title'
  },
  gen: function(st) {
    const tag = ['h1','h2','h3'].includes(st.headingLevel) ? st.headingLevel : 'h2';
    const cfg = {
      h1: { barW: 6, barH: 32, gap: 14, size: 'calc(1.044375rem + 1.7325vw)',    margin: '32px 0 16px 0' },
      h2: { barW: 5, barH: 28, gap: 12, size: 'calc(0.9975rem + 1.17vw)',        margin: '32px 0 16px 0' },
      h3: { barW: 4, barH: 22, gap: 10, size: 'calc(0.9740625rem + 0.88875vw)', margin: '24px 0 12px 0' }
    };
    const c = cfg[tag];
    return `<div style="font-family: 'Montserrat', Arial, sans-serif;">
  <div style="display: flex; align-items: center; gap: ${c.gap}px; margin: ${c.margin}; font-family: 'Montserrat', Arial, sans-serif;">
    <div style="width: ${c.barW}px; height: ${c.barH}px; background-color: #FDB92A; border-radius: 3px; flex-shrink: 0;"></div>
    <${tag} style="color: #000000; font-size: ${c.size}; font-weight: 700; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.headingText)}</${tag}>
  </div>
  <p style="color: #333333; font-size: 1rem; line-height: 1.7; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">Write your content here. This paragraph appears below the heading and supports any body copy for the section.</p>
</div>`;
  },
  ctrl: function(st) {
    const levelOpts = ['h1','h2','h3'].map(l =>
      `<option value="${l}"${st.headingLevel === l ? ' selected' : ''}>${l.toUpperCase()}</option>`
    ).join('');
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Text Section</span>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Level</span>
        <select class="ci" style="width:64px;flex-shrink:0" data-f="headingLevel" data-i="0">${levelOpts}</select>
        <span style="font-size:11px;color:#666;flex-shrink:0;width:36px;margin-left:6px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.headingText)}" data-f="headingText" data-i="0" placeholder="Section title">
      </div>
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f === 'headingLevel') st.headingLevel = el.value;
    else if (f === 'headingText') st.headingText = el.value;
  }
});
