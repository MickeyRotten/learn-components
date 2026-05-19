register({
  id: 'comparison-table',
  name: 'Table',
  desc: 'Generic table with configurable columns and rows',
  group: 'Teaching',
  icon: '⊞',
  def: {
    headers: ['Column 1', 'Column 2', 'Column 3'],
    rows: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  },
  gen(st) {
    const last = st.headers.length - 1;
    const ths = st.headers.map((h, j) =>
      `<th style="padding:10px 14px;text-align:left;color:#FDB92A;${j < last ? 'border-right:1px solid #222;' : ''}">${esc(h)}</th>`
    ).join('');
    const trs = st.rows.map((row, i) => {
      const tds = row.map((cell, j) =>
        `<td style="padding:10px 14px;line-height:1.5;${j < last ? 'border-right:1px solid #E0E0E0;' : ''}">${esc(cell)}</td>`
      ).join('');
      return `<tr style="${i < st.rows.length - 1 ? 'border-bottom:1px solid #E0E0E0;' : ''}">${tds}</tr>`;
    }).join('');
    return `<div style="margin:16px 0;border:1px solid #E0E0E0;border-radius:10px;overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;">
    <thead><tr style="background:#000;">${ths}</tr></thead>
    <tbody>${trs}</tbody>
  </table>
</div>`;
  },
  ctrl(st) {
    const colCount = st.headers.length;
    const headerRow = st.headers.map((h, j) =>
      `<input class="ci ci-grow" type="text" value="${escA(h)}" data-f="header" data-i="${j}" placeholder="Column ${j + 1}">`
    ).join('');
    const bodyRows = st.rows.map((row, i) => {
      const cells = row.map((cell, j) =>
        `<input class="ci ci-grow" type="text" value="${escA(cell)}" data-f="cell" data-i="${i}" data-j="${j}" placeholder="—">`
      ).join('');
      return `<div class="ctrl-row">
        <span class="ctrl-num">${i + 1}</span>
        ${cells}
        ${st.rows.length > 1 ? `<button class="ctrl-btn-x" data-action="remove-row" data-i="${i}" title="Remove row">✕</button>` : '<span style="width:20px;flex-shrink:0;"></span>'}
      </div>`;
    }).join('');
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Table</span>
      <div class="ctrl-actions">
        ${colCount > 1 ? `<button class="ctrl-btn ctrl-btn-action" data-action="remove-col">− Col</button>` : ''}
        <button class="ctrl-btn ctrl-btn-action" data-action="add-col">+ Col</button>
        <button class="ctrl-btn ctrl-btn-add" data-action="add-row">+ Row</button>
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="border-bottom:1px solid #1E1E1E;padding-bottom:6px;">
        <span class="ctrl-num"></span>
        ${headerRow}
        <span style="width:20px;flex-shrink:0;"></span>
      </div>
      ${bodyRows}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'header') st.headers[i] = el.value;
    else if (f === 'cell') st.rows[i][parseInt(el.dataset.j)] = el.value;
  },
  onClick(st, act, i) {
    if (act === 'add-row') {
      st.rows.push(st.headers.map(() => ''));
    } else if (act === 'remove-row' && st.rows.length > 1) {
      st.rows.splice(i, 1);
    } else if (act === 'add-col') {
      st.headers.push(`Column ${st.headers.length + 1}`);
      st.rows.forEach(r => r.push(''));
    } else if (act === 'remove-col' && st.headers.length > 1) {
      st.headers.pop();
      st.rows.forEach(r => r.pop());
    }
  }
});
