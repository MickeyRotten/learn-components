register({
  id: 'step-list',
  name: 'Step List',
  desc: 'Sequential steps — add or remove',
  group: 'Lists',
  icon: '🔢',
  def: {steps:[
    {title:'First Step',desc:'Describe what happens in this step. What does the student do?'},
    {title:'Second Step',desc:'Step description here.'},
    {title:'Third Step',desc:'Step description here.'}
  ]},
  gen: function(st) {
    const rows = st.steps.map((s,i) => `  <div style="display: flex; gap: 16px; ${i<st.steps.length-1?'margin-bottom: 16px;':''} align-items: flex-start;">
    <div style="min-width: 36px; width: 36px; height: 36px; background-color: #FDB92A; border-radius: 50%; font-weight: 700; font-size: 16px; color: #000000; flex-shrink: 0; line-height: 36px; text-align: center; font-family: 'Montserrat', Arial, sans-serif;">${i+1}</div>
    <div style="padding-top: 6px;">
      <h3 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 4px 0; font-family: 'Montserrat', Arial, sans-serif;">${esc(s.title)}</h3>
      <p style="font-size: 14px; color: #444444; margin: 0; line-height: 1.6; font-family: 'Montserrat', Arial, sans-serif;">${esc(s.desc)}</p>
    </div>
  </div>`).join('\n');
    return `<div style="font-family: 'Montserrat', Arial, sans-serif; margin: 16px 0;">\n${rows}\n</div>`;
  },
  ctrl: function(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Steps (${st.steps.length})</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add Step</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="padding:3px 14px 2px">
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr" style="flex:2">Title</span>
        <span class="ctrl-col-hdr" style="flex:3;margin-left:6px">Description</span>
        <span style="width:24px"></span>
      </div>
      ${st.steps.map((s,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci" style="flex:2" type="text" value="${escA(s.title)}" data-f="title" data-i="${i}"><input class="ci" style="flex:3" type="text" value="${escA(s.desc)}" data-f="desc" data-i="${i}"><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='title') st.steps[i].title = el.value;
    else if (f==='desc') st.steps[i].desc = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add') st.steps.push({title:`Step ${st.steps.length+1}`, desc:'Step description here.'});
    else if (act==='remove' && st.steps.length > 1) st.steps.splice(i, 1);
  }
});
