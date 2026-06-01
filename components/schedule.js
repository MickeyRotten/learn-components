register({
  id: 'schedule',
  name: 'Schedule',
  desc: 'Course schedule table with sections and date-based week numbers',
  group: 'Course Info',
  icon: '🗓',
  def: {
    items: [
      { type: 'section', title: 'Part 1' },
      { type: 'row', date: '', topic: 'Introduction to the course', assignments: '', location: '', teacher: '', other: '' },
      { type: 'row', date: '', topic: 'Online lecture', assignments: 'Reading: Chapter 1', location: '', teacher: '', other: '' },
      { type: 'section', title: 'Part 2' },
      { type: 'row', date: '', topic: 'Workshop session', assignments: '', location: '', teacher: '', other: '' },
    ]
  },
  gen(st) {
    const isoWeek = d => {
      if (!d) return '—';
      const dt = new Date(d + 'T00:00:00');
      const thu = new Date(dt);
      thu.setDate(dt.getDate() - (dt.getDay() + 6) % 7 + 3);
      const jan4 = new Date(thu.getFullYear(), 0, 4);
      return String(1 + Math.round((thu - jan4) / 604800000));
    };
    const fmtDate = d => {
      if (!d) return '—';
      return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const tdBase = 'padding:10px 14px;';
    const br = 'border-right:1px solid #E0E0E0;';
    const sectionColors = [
      { bg: '#1DBED0', color: '#FFFFFF' },
      { bg: '#595CA9', color: '#FFFFFF' },
      { bg: '#A6CE39', color: '#000000' },
      { bg: '#F16280', color: '#FFFFFF' },
    ];
    let sectionIdx = 0;
    const rows = st.items.map((item, i) => {
      if (item.type === 'section') {
        const sc = sectionColors[sectionIdx++ % 4];
        const border = i > 0 ? 'border-top:2px solid #333;' : '';
        return `<tr><td colspan="7" style="${tdBase}background:${sc.bg};color:${sc.color};font-weight:700;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;${border}">${esc(item.title)}</td></tr>`;
      }
      const last = i === st.items.length - 1 || st.items[i + 1]?.type === 'section';
      const bb = last ? '' : 'border-bottom:1px solid #E0E0E0;';
      return `<tr style="${bb}">
        <td style="${tdBase}${br}text-align:center;color:#888;font-size:13px;">${esc(isoWeek(item.date))}</td>
        <td style="${tdBase}${br}white-space:nowrap;">${esc(fmtDate(item.date))}</td>
        <td style="${tdBase}${br}line-height:1.5;">${esc(item.topic)}</td>
        <td style="${tdBase}${br}line-height:1.5;font-size:13px;color:#444;">${esc(item.assignments)}</td>
        <td style="${tdBase}${br}line-height:1.5;font-size:13px;color:#444;">${esc(item.location)}</td>
        <td style="${tdBase}${br}line-height:1.5;font-size:13px;color:#444;">${esc(item.teacher)}</td>
        <td style="${tdBase}line-height:1.5;font-size:13px;color:#444;">${esc(item.other)}</td>
      </tr>`;
    }).join('');

    return `<div style="margin:16px 0;border:1px solid #E0E0E0;border-radius:10px;overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr style="background:#000;">
        <th style="padding:10px 14px;text-align:center;color:#FDB92A;border-right:1px solid #222;width:52px;">Wk</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;border-right:1px solid #222;white-space:nowrap;">Date</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;border-right:1px solid #222;">Topic</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;border-right:1px solid #222;">Assignments</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;border-right:1px solid #222;">Location</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;border-right:1px solid #222;">Teacher</th>
        <th style="padding:10px 14px;text-align:left;color:#FDB92A;">Other</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
  },
  ctrl(st) {
    let rowNum = 0;
    const itemRows = st.items.map((item, i) => {
      if (item.type === 'section') {
        return `<div class="ctrl-row" style="background:#1A1A1A;border-radius:4px;margin:2px 0;" data-drop-i="${i}">
          <span class="ctrl-drag" draggable="true" data-drag-i="${i}" title="Drag to reorder">⠿</span>
          <span class="ctrl-num" style="color:#FDB92A;">§</span>
          <input class="ci ci-grow" type="text" value="${escA(item.title)}" data-f="title" data-i="${i}" placeholder="Section title">
          <button class="ctrl-btn-x" data-action="remove" data-i="${i}" title="Remove">✕</button>
        </div>`;
      }
      rowNum++;
      return `<div class="ctrl-row" data-drop-i="${i}">
          <span class="ctrl-drag" draggable="true" data-drag-i="${i}" title="Drag to reorder">⠿</span>
          <span class="ctrl-num">${rowNum}</span>
          <input class="ci" style="width:130px;flex-shrink:0;" type="date" value="${escA(item.date)}" data-f="date" data-i="${i}">
          <input class="ci" style="flex:3;" type="text" value="${escA(item.topic)}" data-f="topic" data-i="${i}" placeholder="Topic">
          <input class="ci" style="flex:2;" type="text" value="${escA(item.assignments)}" data-f="assignments" data-i="${i}" placeholder="Assignments">
          <input class="ci" style="flex:2;" type="text" value="${escA(item.location)}" data-f="location" data-i="${i}" placeholder="Location">
          <input class="ci" style="flex:2;" type="text" value="${escA(item.teacher)}" data-f="teacher" data-i="${i}" placeholder="Teacher">
          <input class="ci" style="flex:1;" type="text" value="${escA(item.other)}" data-f="other" data-i="${i}" placeholder="Other">
          <button class="ctrl-btn-x" data-action="remove" data-i="${i}" title="Remove">✕</button>
        </div>`;
    }).join('');
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Schedule</span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-action" data-action="add-section">+ Section</button>
        <button class="ctrl-btn ctrl-btn-add" data-action="add-row">+ Row</button>
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="padding:3px 14px 2px;">
        <span style="width:20px;flex-shrink:0;"></span>
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr" style="width:130px;flex-shrink:0;">Date</span>
        <span class="ctrl-col-hdr" style="flex:3;margin-left:6px;">Topic</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px;">Assignments</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px;">Location</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px;">Teacher</span>
        <span class="ctrl-col-hdr" style="flex:1;margin-left:6px;">Other</span>
        <span style="width:24px;flex-shrink:0;"></span>
      </div>
      ${itemRows}
    </div>`;
  },
  onDrop(st, from, to) {
    const [item] = st.items.splice(from, 1);
    st.items.splice(to, 0, item);
  },
  onInput(st, f, i, el) {
    st.items[i][f] = el.value;
  },
  onClick(st, act, i) {
    if (act === 'add-row')     st.items.push({ type: 'row', date: '', topic: '', assignments: '', location: '', teacher: '', other: '' });
    if (act === 'add-section') st.items.push({ type: 'section', title: 'New Section' });
    if (act === 'remove')      st.items.splice(i, 1);
  }
});
