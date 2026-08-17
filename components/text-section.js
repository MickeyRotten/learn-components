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
      h1: { barW: '6px', gap: '14px', margin: '0 0 16px 0' },
      h2: { barW: '5px', gap: '12px', margin: '0 0 16px 0' },
      h3: { barW: '4px', gap: '10px', margin: '0 0 12px 0' },
      h4: { barW: '3px', gap: '8px',  margin: '0 0 10px 0' },
      h5: { barW: '3px', gap: '8px',  margin: '0 0 8px 0'  },
    };
    const heading = col => {
      if (col.headingLevel === 'none') return '';
      const c = cfg[col.headingLevel] || cfg.h2;
      return `<${col.headingLevel} style="margin:${c.margin};border-left:${c.barW} solid #FDB92A;padding-left:${c.gap};">${esc(col.headingText)}</${col.headingLevel}>`;
    };

    // Single column needs no layout container at all.
    if (st.columns.length === 1) {
      const col = st.columns[0];
      return `${heading(col)}
<p style="line-height:1.7;margin:0 0 16px 0;">${fmt(col.body)}</p>`;
    }

    // Wrap onto a new row every 3 columns, matching the old grid behaviour.
    const perRow = Math.min(3, st.columns.length);
    const rows = [];
    for (let i = 0; i < st.columns.length; i += perRow) rows.push(st.columns.slice(i, i + perRow));

    const body = rows.map((row, r) => {
      const cells = row.map((col, i) => `      <td style="vertical-align:top;padding:${r > 0 ? '24px' : '0'} ${i === perRow - 1 ? '0' : '24px'} 0 0;">
        ${heading(col)}<p style="line-height:1.7;margin:0;">${fmt(col.body)}</p>
      </td>`).join('\n');
      // Pad short final rows so cells keep an even width.
      const pad = Array.from({ length: perRow - row.length },
        () => '      <td style="vertical-align:top;"></td>').join('\n');
      return `    <tr>\n${cells}${pad ? '\n' + pad : ''}\n    </tr>`;
    }).join('\n');

    return `<table style="width:100%;border-collapse:collapse;table-layout:fixed;margin:16px 0;" border="0">
  <tbody>
${body}
  </tbody>
</table>`;
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
        <textarea class="ci ci-grow ci-prose" data-f="body" data-i="${i}" rows="1">${esc(col.body)}</textarea>
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
