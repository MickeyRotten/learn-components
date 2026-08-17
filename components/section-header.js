register({
  id: 'section-header',
  name: 'Header',
  desc: 'Major content break with yellow accent',
  group: 'Layout',
  icon: '📌',
  def: {
    level: 'h1',
    text: 'Page Title Here'
  },
  gen(st) {
    const cfg = {
      h1: { barW: '6px', gap: '14px', margin: '32px 0 16px 0' },
      h2: { barW: '5px', gap: '12px', margin: '32px 0 16px 0' },
      h3: { barW: '4px', gap: '10px', margin: '24px 0 12px 0' },
      h4: { barW: '3px', gap: '8px',  margin: '20px 0 10px 0' },
      h5: { barW: '3px', gap: '8px',  margin: '16px 0 8px 0'  },
    };
    const c = cfg[st.level] || cfg.h1;
    return `<${st.level} style="margin:${c.margin};border-left:${c.barW} solid #FDB92A;padding-left:${c.gap};">${esc(st.text)}</${st.level}>`;
  },
  ctrl(st) {
    const levels = ['h1', 'h2', 'h3', 'h4', 'h5'];
    const opts = levels.map(l =>
      `<option value="${l}"${st.level === l ? ' selected' : ''}>${l.toUpperCase()}</option>`
    ).join('');
    return `
    <div class="ctrl-header"><span class="ctrl-label">Section Header</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Level</span>
        <select class="ci" style="width:80px;flex-shrink:0;" data-f="level" data-i="0">${opts}</select>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Text</span>
        <input class="ci ci-grow" type="text" value="${escA(st.text)}" data-f="text" data-i="0">
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    st[f] = el.value;
    if (f === 'level') return true;
  }
});
