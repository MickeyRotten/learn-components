register({
  id: 'grade-breakdown',
  name: 'Grade Breakdown',
  desc: '5 assignments — add, remove, adjust weights',
  group: 'Course Info',
  icon: '📊',
  def: {rows:[
    {name:'Assignment 1',weight:20,notes:''},
    {name:'Assignment 2',weight:20,notes:''},
    {name:'Assignment 3',weight:20,notes:''},
    {name:'Assignment 4',weight:20,notes:''},
    {name:'Assignment 5',weight:20,notes:''}
  ]},
  gen: function(st) {
    const total = st.rows.reduce((s,r)=>s+Number(r.weight),0);
    const trs = st.rows.map(r=>{
      const w=Math.max(0,Math.min(100,Number(r.weight)));
      return `      <tr style="border-bottom: 1px solid #E0E0E0;">
        <td style="padding: 14px 18px; font-weight: 600; font-size: 14px; color: #000000;">${esc(r.name)}</td>
        <td style="padding: 14px 18px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 140px; background-color: #E0E0E0; height: 8px; border-radius: 4px;"><div style="height: 8px; width: ${w}%; background-color: #FDB92A; border-radius: 4px;"></div></div>
            <span style="font-weight: 700; font-size: 14px; color: #000000; white-space: nowrap;">${w}%</span>
          </div>
        </td>
        <td style="padding: 14px 18px; font-size: 13px; color: #444444;">${esc(r.notes)}</td>
      </tr>`;
    }).join('\n');
    return `<div style="margin: 24px 0; border-radius: 12px; border: 1px solid #E0E0E0;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: #000000;">
        <th style="text-align: left; padding: 14px 18px; color: #FDB92A; font-weight: 700; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">Assignment</th>
        <th style="text-align: left; padding: 14px 18px; color: #FDB92A; font-weight: 700; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; width: 220px;">Weight</th>
        <th style="text-align: left; padding: 14px 18px; color: #FDB92A; font-weight: 700; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">Notes</th>
      </tr>
    </thead>
    <tbody>\n${trs}\n    </tbody>
    <tfoot>
      <tr style="background-color: #F5F5F5; border-top: 2px solid #000000;">
        <td style="padding: 12px 18px; font-weight: 700; font-size: 14px; color: #000000;">Total</td>
        <td style="padding: 12px 18px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 140px; background-color: #000000; height: 8px; border-radius: 4px;"></div>
            <span style="font-weight: 700; font-size: 14px; color: #000000;">${total}%</span>
          </div>
        </td>
        <td style="padding: 12px 18px; font-size: 13px; color: #8D8D8D;">Graded 0–5 / Pass–Fail</td>
      </tr>
    </tfoot>
  </table>
</div>`;
  },
  ctrl: function(st) {
    const total = st.rows.reduce((s,r)=>s+Number(r.weight),0);
    const ok = total===100;
    const ts = ok?'background:#1A3A1A;color:#90EE90':'background:#3A1A1A;color:#FF9999';
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Assignments (${st.rows.length})</span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-action" data-action="auto">⚡ Distribute evenly</button>
        <button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add</button>
        <div class="ctrl-total" style="${ts}">Total: ${total}%</div>
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="padding:3px 14px 2px">
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr" style="flex:3">Name</span>
        <span class="ctrl-col-hdr" style="width:52px;margin-left:6px">Weight</span>
        <span style="width:12px"></span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px">Notes</span>
        <span style="width:24px"></span>
      </div>
      ${st.rows.map((r,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci" style="flex:3" type="text" value="${escA(r.name)}" data-f="name" data-i="${i}" placeholder="Assignment name"><input class="ci ci-sm" type="number" value="${r.weight}" data-f="weight" data-i="${i}" min="0" max="100"><span style="font-size:10px;color:#555;flex-shrink:0">%</span><input class="ci" style="flex:2" type="text" value="${escA(r.notes)}" data-f="notes" data-i="${i}" placeholder="Notes"><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='name') st.rows[i].name = el.value;
    else if (f==='weight') st.rows[i].weight = Math.max(0, Math.min(100, parseInt(el.value)||0));
    else if (f==='notes') st.rows[i].notes = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add') st.rows.push({name:`Assignment ${st.rows.length+1}`, weight:0, notes:''});
    else if (act==='remove' && st.rows.length > 1) st.rows.splice(i, 1);
    else if (act==='auto') { const n=st.rows.length, b=Math.floor(100/n), r=100-b*n; st.rows.forEach((row,j)=>row.weight=b+(j<r?1:0)); }
  }
});
