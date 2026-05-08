register({
  id: 'comparison-table',
  name: 'Comparison Table',
  desc: 'Concepts compared across shared criteria',
  group: 'Teaching',
  icon: '⇌',
  def: {col1:'Option A', col2:'Option B', rows:[
    ['Aspect 1','Value for A','Value for B'],
    ['Aspect 2','Value for A','Value for B'],
    ['Aspect 3','Value for A','Value for B']
  ]},
  gen: function(st) {
    const trs = st.rows.map(r=>`    <tr style="border-bottom: 1px solid #E0E0E0;">
      <td style="padding: 12px 16px; font-weight: 600; font-size: 13px; color: #000000; background-color: #FAFAFA; font-family: 'Montserrat', Arial, sans-serif; width:30%;">${esc(r[0])}</td>
      <td style="padding: 12px 16px; font-size: 13px; color: #1A1A1A; line-height: 1.5; font-family: 'Montserrat', Arial, sans-serif;">${esc(r[1])}</td>
      <td style="padding: 12px 16px; font-size: 13px; color: #1A1A1A; line-height: 1.5; font-family: 'Montserrat', Arial, sans-serif;">${esc(r[2])}</td>
    </tr>`).join('\n');
    return `<div style="font-family: 'Montserrat', Arial, sans-serif; margin: 16px 0; border: 1px solid #E0E0E0; border-radius: 12px;">
  <table style="width: 100%; border-collapse: collapse; font-family: 'Montserrat', Arial, sans-serif;">
    <thead>
      <tr style="background-color: #000000;">
        <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #555555; font-family: 'Montserrat', Arial, sans-serif; width:30%;">Aspect</th>
        <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 700; color: #FDB92A; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.col1)}</th>
        <th style="padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 700; color: #1DBED0; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.col2)}</th>
      </tr>
    </thead>
    <tbody>\n${trs}\n    </tbody>
  </table>
</div>`;
  },
  ctrl: function(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Comparison Table</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add Row</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="padding:5px 14px;border-bottom:1px solid #1E1E1E;margin-bottom:3px">
        <span class="ctrl-num"></span>
        <span style="font-size:10px;color:#FDB92A;font-weight:700;flex:2;font-family:var(--ui)">Col 1 name</span>
        <input class="ci" style="flex:2" type="text" value="${escA(st.col1)}" data-f="col1-hdr" placeholder="Column 1 name">
        <input class="ci" style="flex:2" type="text" value="${escA(st.col2)}" data-f="col2-hdr" placeholder="Column 2 name">
        <span style="width:24px"></span>
      </div>
      <div class="ctrl-row" style="padding:3px 14px 2px">
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr" style="flex:2">Aspect</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px">${escA(st.col1)}</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px">${escA(st.col2)}</span>
        <span style="width:24px"></span>
      </div>
      ${st.rows.map((r,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci" style="flex:2" type="text" value="${escA(r[0])}" data-f="aspect" data-i="${i}" placeholder="Aspect"><input class="ci" style="flex:2" type="text" value="${escA(r[1])}" data-f="c1" data-i="${i}"><input class="ci" style="flex:2" type="text" value="${escA(r[2])}" data-f="c2" data-i="${i}"><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='col1-hdr') st.col1 = el.value;
    else if (f==='col2-hdr') st.col2 = el.value;
    else if (f==='aspect') st.rows[i][0] = el.value;
    else if (f==='c1') st.rows[i][1] = el.value;
    else if (f==='c2') st.rows[i][2] = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add') st.rows.push(['Aspect','Value A','Value B']);
    else if (act==='remove' && st.rows.length > 1) st.rows.splice(i, 1);
  }
});
