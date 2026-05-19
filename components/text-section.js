register({
  id: 'text-section',
  name: 'Text Section',
  desc: 'One to many text columns, each with optional heading',
  group: 'Layout',
  icon: '¶',
  def: {
    columns: [
      { headingLevel: 'h2', headingText: 'Section Title', body: 'Write your content here. This paragraph appears below the heading and supports any body copy for the section.' }
    ]
  },
  gen(st) {
    const cfg = {
      h1: { barW: '6px', barH: '32px', gap: '14px', margin: '0 0 16px 0', radius: '3px' },
      h2: { barW: '5px', barH: '28px', gap: '12px', margin: '0 0 16px 0', radius: '3px' },
      h3: { barW: '4px', barH: '22px', gap: '10px', margin: '0 0 12px 0', radius: '2px' },
      h4: { barW: '3px', barH: '18px', gap: '8px',  margin: '0 0 10px 0', radius: '2px' },
      h5: { barW: '3px', barH: '16px', gap: '8px',  margin: '0 0 8px 0',  radius: '2px' },
    };
    const cols = st.columns.map(col => {
      const header = col.headingLevel === 'none' ? '' : (() => {
        const c = cfg[col.headingLevel] || cfg.h2;
        return `<div style="display:flex;align-items:center;gap:${c.gap};margin:${c.margin};">
      <div style="width:${c.barW};height:${c.barH};background-color:#FDB92A;border-radius:${c.radius};flex-shrink:0;"></div>
      <${col.headingLevel} style="margin:0;">${esc(col.headingText)}</${col.headingLevel}>
    </div>`;
      })();
      return `  <div>
    ${header}<p style="line-height:1.7;margin:0;">${esc(col.body)}</p>
  </div>`;
    }).join('\n');
    const gridCols = Math.min(3, st.columns.length);
    return `<div style="display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:24px;margin:16px 0;">
${cols}
</div>`;
  },
  ctrl(st) {
    const colSections = st.columns.map((col, i) => {
      const levels = ['none', 'h1', 'h2', 'h3', 'h4', 'h5'];
      const opts = levels.map(l =>
        `<option value="${l}"${col.headingLevel === l ? ' selected' : ''}>${l === 'none' ? 'None' : l.toUpperCase()}</option>`
      ).join('');
      const titleRow = col.headingLevel !== 'none' ? `
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(col.headingText)}" data-f="headingText" data-i="${i}" placeholder="Heading text">
      </div>` : '';
      return `
    <div class="ctrl-header" style="margin-top:${i > 0 ? '4px' : '0'};">
      <span class="ctrl-label">Column ${i + 1}</span>
      <div class="ctrl-actions">
        ${st.columns.length > 1 ? `<button class="ctrl-btn-x" data-action="remove" data-i="${i}" title="Remove">✕</button>` : ''}
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Level</span>
        <select class="ci" style="width:80px;flex-shrink:0;" data-f="headingLevel" data-i="${i}">${opts}</select>
      </div>
      ${titleRow}
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;padding-top:6px;font-family:var(--ui)">Body</span>
        <textarea class="ci ci-grow" data-f="body" data-i="${i}" rows="4" style="resize:vertical;">${esc(col.body)}</textarea>
      </div>
    </div>`;
    }).join('');
    return `
    ${colSections}
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label"></span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-add" data-action="add" data-i="0">+ Add Column</button>
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    st.columns[i][f] = el.value;
    if (f === 'headingLevel') return true;
  },
  onClick(st, act, i) {
    if (act === 'add') st.columns.push({ headingLevel: 'h2', headingText: 'Column Title', body: 'Column content goes here.' });
    if (act === 'remove') st.columns.splice(i, 1);
  }
});
