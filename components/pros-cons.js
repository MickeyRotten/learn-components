register({
  id: 'pros-cons',
  name: 'Pros / Cons',
  desc: 'Editable pros and cons lists',
  group: 'Teaching',
  icon: '⚖️',
  def: {pros:['Pro one.','Pro two.','Pro three.'], cons:['Con one.','Con two.','Con three.']},
  gen: function(st) {
    const pi = st.pros.map(p=>`      <li style="display: flex; gap: 8px; align-items: flex-start; font-size: 14px; color: #1A1A1A; line-height: 1.6; margin-bottom: 8px;"><span style="color: #A6CE39; font-weight: 700; flex-shrink: 0; font-size: 16px; line-height: 1.4;">+</span>${esc(p)}</li>`).join('\n');
    const ci = st.cons.map(c=>`      <li style="display: flex; gap: 8px; align-items: flex-start; font-size: 14px; color: #1A1A1A; line-height: 1.6; margin-bottom: 8px;"><span style="color: #8D8D8D; font-weight: 700; flex-shrink: 0; font-size: 16px; line-height: 1.4;">−</span>${esc(c)}</li>`).join('\n');
    return `<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
  <div style="flex: 1 1 240px; border: 1px solid #E0E0E0; border-top: 4px solid #A6CE39; border-radius: 0 0 10px 10px;">
    <div style="padding: 12px 16px; border-bottom: 1px solid #E0E0E0; background-color: #F2F9E8;"><p style="margin: 0">Pros</p></div>
    <ul style="list-style: none; padding: 14px 16px; margin: 0;">\n${pi}\n    </ul>
  </div>
  <div style="flex: 1 1 240px; border: 1px solid #E0E0E0; border-top: 4px solid #E0E0E0; border-radius: 0 0 10px 10px;">
    <div style="padding: 12px 16px; border-bottom: 1px solid #E0E0E0; background-color: #F5F5F5;"><p style="margin: 0">Cons</p></div>
    <ul style="list-style: none; padding: 14px 16px; margin: 0;">\n${ci}\n    </ul>
  </div>
</div>`;
  },
  ctrl: function(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Pros &amp; Cons</span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-add" data-action="add-pro">+ Pro</button>
        <button class="ctrl-btn ctrl-btn-add" data-action="add-con">+ Con</button>
      </div>
    </div>
    <div class="ctrl-rows" style="display:flex">
      <div style="flex:1;border-right:1px solid #1E1E1E">
        <div style="padding:3px 14px 2px;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5A7A1A">Pros</div>
        ${st.pros.map((p,i)=>`<div class="ctrl-row"><input class="ci ci-grow" type="text" value="${escA(p)}" data-f="pro" data-i="${i}"><button class="ctrl-btn-x" data-action="rm-pro" data-i="${i}">×</button></div>`).join('')}
      </div>
      <div style="flex:1">
        <div style="padding:3px 14px 2px;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#666">Cons</div>
        ${st.cons.map((c,i)=>`<div class="ctrl-row"><input class="ci ci-grow" type="text" value="${escA(c)}" data-f="con" data-i="${i}"><button class="ctrl-btn-x" data-action="rm-con" data-i="${i}">×</button></div>`).join('')}
      </div>
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='pro') st.pros[i] = el.value;
    else if (f==='con') st.cons[i] = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add-pro') st.pros.push('New pro here.');
    else if (act==='add-con') st.cons.push('New con here.');
    else if (act==='rm-pro' && st.pros.length > 1) st.pros.splice(i, 1);
    else if (act==='rm-con' && st.cons.length > 1) st.cons.splice(i, 1);
  }
});
