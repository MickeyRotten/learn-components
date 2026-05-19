register({
  id: 'key-takeaways',
  name: 'Key Takeaways',
  desc: 'End-of-lesson summary points',
  group: 'Teaching',
  icon: '⭐',
  def: {
    title: 'Key Takeaways',
    items: [
      'Key takeaway one goes here. Make it punchy and memorable.',
      'Key takeaway two goes here.',
      'Key takeaway three goes here.'
    ]
  },
  gen(st) {
    const items = st.items.map((item, i) => {
      const mb = i < st.items.length - 1 ? 'margin-bottom:14px;' : '';
      return `    <li style="display:flex;gap:12px;align-items:flex-start;${mb}">
      <span style="width:22px;height:22px;background-color:#FDB92A;border-radius:50%;font-size:11px;font-weight:700;color:#000;flex-shrink:0;line-height:22px;text-align:center;">${i + 1}</span>
      <p style="margin:0;line-height:1.6;padding-top:2px;">${esc(item)}</p>
    </li>`;
    }).join('\n');
    return `<div style="margin:24px 0;border:1px solid #E0E0E0;border-radius:12px;overflow:hidden;">
  <div style="background-color:#000000;padding:8px 24px;">
    <p style="color:#FDB92A;letter-spacing:2px;text-transform:uppercase;margin:0;font-size:11px;">⭐ &nbsp;${esc(st.title)}</p>
  </div>
  <div style="background-color:#FAFAFA;padding:20px 24px;">
    <ul style="list-style:none;padding:0;margin:0;">
${items}
    </ul>
  </div>
</div>`;
  },
  ctrl(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Key Takeaways</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0" placeholder="Key Takeaways">
      </div>
      <div style="padding:5px 14px 2px;"><span class="ctrl-col-hdr">Items</span></div>
      ${st.items.map((item, i) => `<div class="ctrl-row"><span class="ctrl-num">${i + 1}</span><input class="ci ci-grow" type="text" value="${escA(item)}" data-f="item" data-i="${i}" placeholder="Takeaway"><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'item') st.items[i] = el.value;
    else st[f] = el.value;
  },
  onClick(st, act, i) {
    if (act === 'add') st.items.push('New takeaway here.');
    if (act === 'remove' && st.items.length > 1) st.items.splice(i, 1);
  }
});
