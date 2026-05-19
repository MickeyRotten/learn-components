register({
  id: 'spectrum',
  name: 'Spectrum Bar',
  desc: 'Scale between two extremes',
  group: 'Teaching',
  icon: '◀▶',
  def: {
    title: 'Player Engagement Style',
    labelLeft: 'Casual',
    labelRight: 'Hardcore',
    position: 65,
    text: 'Example: Dark Souls sits firmly toward the Hardcore end — high skill ceiling, minimal hand-holding, punishing failure states.'
  },
  gen(st) {
    const pos = Math.max(0, Math.min(100, st.position));
    return `<div style="margin:24px 0;padding:24px;background-color:#FAFAFA;border:1px solid #E0E0E0;border-radius:10px;">
  <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 16px 0;">${esc(st.title)}</p>
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px;">
    <span style="font-size:13px;font-weight:700;color:#000;flex-shrink:0;min-width:70px;">${esc(st.labelLeft)}</span>
    <div style="flex:1;height:10px;background:linear-gradient(to right,#FDB92A,#1DBED0);border-radius:5px;position:relative;">
      <div style="width:16px;height:16px;background:#000;border-radius:50%;border:3px solid #FFF;margin-top:-3px;margin-left:calc(${pos}% - 8px);position:absolute;top:0;"></div>
    </div>
    <span style="font-size:13px;font-weight:700;color:#000;flex-shrink:0;min-width:70px;text-align:right;">${esc(st.labelRight)}</span>
  </div>
  <p style="margin:0;">${esc(st.text)}</p>
</div>`;
  },
  ctrl(st) {
    return `
    <div class="ctrl-header"><span class="ctrl-label">Spectrum</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Left</span>
        <input class="ci ci-grow" type="text" value="${escA(st.labelLeft)}" data-f="labelLeft" data-i="0">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Right</span>
        <input class="ci ci-grow" type="text" value="${escA(st.labelRight)}" data-f="labelRight" data-i="0">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Pos</span>
        <input class="ci" style="width:60px;flex-shrink:0;" type="number" min="0" max="100" value="${st.position}" data-f="position" data-i="0">
        <input type="range" min="0" max="100" value="${st.position}" data-f="position" data-i="0" style="flex:1;accent-color:#FDB92A;">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;padding-top:6px;font-family:var(--ui)">Text</span>
        <textarea class="ci ci-grow" data-f="text" data-i="0" rows="3" style="resize:vertical;">${esc(st.text)}</textarea>
      </div>
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'position') st.position = parseInt(el.value) || 0;
    else st[f] = el.value;
  }
});
