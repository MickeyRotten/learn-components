register({
  id: 'callout-important',
  name: 'Callout',
  desc: 'Tip, info, warning, or important note',
  group: 'Callouts',
  icon: '💬',
  def: {
    type: 'tip',
    title: 'Tip',
    body: 'Your text goes here.'
  },
  gen(st) {
    const types = {
      tip:       { bg: '#F2F9E8', border: '#A6CE39', emoji: '💡' },
      info:      { bg: '#E8F9FB', border: '#1DBED0', emoji: 'ℹ️' },
      warning:   { bg: '#FFF8E6', border: '#FDB92A', emoji: '⚠️' },
      important: { bg: '#F5F5F5', border: '#000000', emoji: '📌' },
    };
    const t = types[st.type] || types.tip;
    return `<div style="background-color:${t.bg};border-left:5px solid ${t.border};border-radius:0 10px 10px 0;padding:16px 20px;margin:16px 0;">
  <p style="margin:0 0 6px 0;">${t.emoji} &nbsp;${esc(st.title)}</p>
  <p style="margin:0;line-height:1.7;">${esc(st.body)}</p>
</div>`;
  },
  ctrl(st) {
    const labels = { tip: 'Tip', info: 'Info', warning: 'Warning', important: 'Important' };
    const opts = Object.entries(labels).map(([v, l]) =>
      `<option value="${v}"${st.type === v ? ' selected' : ''}>${l}</option>`
    ).join('');
    return `
    <div class="ctrl-header"><span class="ctrl-label">Callout</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Type</span>
        <select class="ci" style="width:120px;flex-shrink:0;" data-f="type" data-i="0">${opts}</select>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;padding-top:6px;font-family:var(--ui)">Body</span>
        <textarea class="ci ci-grow" data-f="body" data-i="0" rows="3" style="resize:vertical;">${esc(st.body)}</textarea>
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    st[f] = el.value;
    if (f === 'type') {
      st.title = { tip: 'Tip', info: 'Info', warning: 'Note', important: 'Important' }[el.value] || el.value;
      return true;
    }
  }
});
