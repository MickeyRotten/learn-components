register({
  id: 'resource-list',
  name: 'Resource List',
  desc: 'Readings, links, downloads',
  group: 'Lists',
  icon: '📎',
  def: {
    title: 'Resources',
    headingLevel: 'h3',
    items: [
      { type: 'pdf',   label: 'Resource Title Here', url: '#', note: '' },
      { type: 'link',  label: 'Resource Title Here', url: '#', note: 'Article' },
      { type: 'video', label: 'Resource Title Here', url: '#', note: 'Video · 12 min' }
    ]
  },
  gen(st) {
    const cfg = {
      h1: { barW: '6px', gap: '14px', margin: '32px 0 16px 0' },
      h2: { barW: '5px', gap: '12px', margin: '32px 0 16px 0' },
      h3: { barW: '4px', gap: '10px', margin: '24px 0 12px 0' },
      h4: { barW: '3px', gap: '8px',  margin: '20px 0 10px 0' },
      h5: { barW: '3px', gap: '8px',  margin: '16px 0 8px 0'  },
    };
    const icons = { pdf: '📄', link: '🔗', video: '🎥', book: '📚', other: '📎' };
    const tag = st.headingLevel;
    const header = tag === 'none' ? '' : (() => {
      const c = cfg[tag] || cfg.h3;
      return `<${tag} style="margin:${c.margin};border-left:${c.barW} solid #FDB92A;padding-left:${c.gap};">${esc(st.title)}</${tag}>\n`;
    })();
    const items = st.items.map((item, i) => {
      const last = i === st.items.length - 1;
      const icon = icons[item.type] || icons.other;
      const note = item.note ? `<p style="margin:4px 0 0 26px;font-size:13px;color:#666;line-height:1.5;">${fmt(item.note)}</p>` : '';
      const link = item.url && item.url !== '#'
        ? `<a href="${esc(item.url)}" style="color:#000;font-weight:600;font-size:14px;text-decoration:underline;">${esc(item.label)}</a>`
        : `<span style="font-weight:600;font-size:14px;">${esc(item.label)}</span>`;
      return `  <li style="padding:12px 0;${last ? '' : 'border-bottom:1px solid #E0E0E0;'}"><p style="margin:0;">${icon} &nbsp;${link}</p>${note}</li>`;
    }).join('\n');
    return `${header}<ul style="list-style:none;padding:0;margin:16px 0;">
${items}
</ul>`;
  },
  ctrl(st) {
    const typeOpts = v => ['pdf','link','video','book','other'].map(t =>
      `<option value="${t}"${v === t ? ' selected' : ''}>${{pdf:'📄 PDF', link:'🔗 Link', video:'🎥 Video', book:'📚 Book', other:'📎 Other'}[t]}</option>`
    ).join('');
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Resource List</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Level</span>
        <select class="ci" style="width:80px;flex-shrink:0;" data-f="headingLevel" data-i="0">${['none','h1','h2','h3','h4','h5'].map(l => `<option value="${l}"${st.headingLevel===l?' selected':''}>${l==='none'?'None':l.toUpperCase()}</option>`).join('')}</select>
        ${st.headingLevel !== 'none' ? `
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0" placeholder="Resources">` : ''}
      </div>
      <div class="ctrl-row" style="padding:5px 14px 2px;">
        <span style="width:20px;flex-shrink:0;"></span>
        <span class="ctrl-col-hdr" style="width:100px;flex-shrink:0;">Type</span>
        <span class="ctrl-col-hdr" style="flex:3;margin-left:6px;">Label</span>
        <span class="ctrl-col-hdr" style="flex:3;margin-left:6px;">URL</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px;">Body text</span>
        <span style="width:24px;flex-shrink:0;"></span>
      </div>
      ${st.items.map((item, i) => `
      <div class="ctrl-row">
        <span class="ctrl-num">${i + 1}</span>
        <select class="ci" style="width:100px;flex-shrink:0;" data-f="type" data-i="${i}">${typeOpts(item.type)}</select>
        <input class="ci" style="flex:3;" type="text" value="${escA(item.label)}" data-f="label" data-i="${i}" placeholder="Label">
        <input class="ci" style="flex:3;" type="text" value="${escA(item.url)}" data-f="url" data-i="${i}" placeholder="https://…">
        <textarea class="ci ci-prose" style="flex:2;" rows="1" data-f="note" data-i="${i}" placeholder="e.g. PDF, 12 min">${esc(item.note)}</textarea>
        <button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button>
      </div>`).join('')}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'title' || f === 'headingLevel') st[f] = el.value;
    else st.items[i][f] = el.value;
    if (f === 'headingLevel') return true;
  },
  onClick(st, act, i) {
    if (act === 'add')    st.items.push({ type: 'link', label: 'New Resource', url: '#', note: '' });
    if (act === 'remove') st.items.splice(i, 1);
  }
});
