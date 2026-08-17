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
    const rows = st.steps.map((s,i) => `    <tr>
      <td style="width: 36px; vertical-align: top; padding: 0 16px ${i<st.steps.length-1?'16px':'0'} 0;">
        <span style="display: block; width: 36px; height: 36px; background-color: #FDB92A; border-radius: 50%; font-weight: 700; font-size: 16px; color: #000000; line-height: 36px; text-align: center;">${i+1}</span>
      </td>
      <td style="vertical-align: top; padding: 6px 0 ${i<st.steps.length-1?'16px':'0'} 0;">
        <h5 style="margin: 0 0 4px 0">${esc(s.title)}</h5>
        <p style="margin: 0; line-height: 1.6">${fmt(s.desc)}</p>
      </td>
    </tr>`).join('\n');
    return `<table style="width: 100%; border-collapse: collapse; margin: 16px 0;" border="0">
  <tbody>
${rows}
  </tbody>
</table>`;
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
      ${st.steps.map((s,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci" style="flex:2" type="text" value="${escA(s.title)}" data-f="title" data-i="${i}"><textarea class="ci ci-prose" style="flex:3" rows="1" data-f="desc" data-i="${i}">${esc(s.desc)}</textarea><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
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
