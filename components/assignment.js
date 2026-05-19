register({
  id: 'assignment',
  name: 'Assignment Block',
  desc: 'Assignment with specs, deadline, type, and ARENE AI level',
  group: 'Course Info',
  icon: '📝',
  def: {
    code: 'A-1',
    title: 'Game Design Document',
    deadline: '',
    type: 'individual',
    mandatory: 'mandatory',
    weight: 20,
    gradingStyle: 'scale',
    maxPoints: 100,
    gradeToPass: '3',
    ai: 'yellow',
    body: 'Complete the following specifications and submit by the deadline.',
    specs: [
      'Write a 2–3 page game design document for an original game concept.',
      'Include a core mechanics section, player journey diagram, and basic UI wireframe.',
      'Submit as a PDF to the assignment folder by the deadline.'
    ]
  },
  gen(st) {
    const aiCfg = {
      red:    { bg:'#FFF0F0', dot:'#CC0000', label:'AI Not Permitted',              desc:'This assignment must be completed without any AI assistance. Undisclosed use of AI will be treated as academic misconduct.' },
      yellow: { bg:'#FFF8E6', dot:'#E6A800', label:'AI Permitted with Reporting', desc:'You may use AI tools, but you must document and report how. Undisclosed use of AI will be treated as academic misconduct.' },
      green:  { bg:'#F2F9E8', dot:'#A6CE39', label:'AI Freely Permitted',          desc:'You may use AI tools freely for this assignment. No reporting is required.' },
      blue:   { bg:'#E8F9FB', dot:'#1DBED0', label:'AI Required',                   desc:'You must use AI as part of this assignment and report how you used it. Not using AI will affect your assessment.' }
    };
    const ai = aiCfg[st.ai] || aiCfg.yellow;
    const typeLabel = st.type === 'group' ? '&#128101; Group' : '&#128100; Individual';

    const fmtDate = d => {
      if (!d) return '—';
      return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const gradingLabel = st.gradingStyle === 'passfail' ? 'Pass / Fail'
      : st.gradingStyle === 'points' ? 'Points'
      : 'Scale 1–5';

    const pill = (bg, color, border, text) =>
      `<span style="background-color:${bg};color:${color};font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;${border ? `border:1px solid ${border};` : ''}">${text}</span>`;

    const mandatoryPill = st.mandatory === 'bonus'
      ? pill('#1A1A1A', '#AAAAAA', '#333333', '⭐ Bonus')
      : pill('#FDB92A', '#000000', '', '✔ Mandatory');
    const weightPill    = st.mandatory !== 'bonus'
      ? pill('#1A1A1A', '#CCCCCC', '#333333', `Course Grade Weight: ${esc(String(st.weight))}%`)
      : '';
    const gradingPill   = pill('#1A1A1A', '#CCCCCC', '#333333', gradingLabel);
    const passPill      = st.gradingStyle !== 'passfail' && st.gradeToPass
      ? pill('#1A1A1A', '#CCCCCC', '#333333', `Pass: ${esc(st.gradeToPass)}`)
      : '';

    const items = st.specs.map(s =>
      `      <li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:8px;"><span style="width:6px;height:6px;background-color:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:9px;"></span>${esc(s)}</li>`
    ).join('\n');

    return `<div style="margin:24px 0;border:1px solid #E0E0E0;border-radius:12px;overflow:hidden;">
  <div style="background-color:#000000;padding:8px 24px;">
    <p style="color:#FDB92A;letter-spacing:2px;text-transform:uppercase;margin:0;font-size:11px;">📝 &nbsp;ASSIGNMENT &nbsp;·&nbsp; ${esc(st.code)}</p>
  </div>
  <div style="background-color:#FAFAFA;padding:16px 24px 18px;border-bottom:1px solid #E0E0E0;">
    <h3 style="color:#000000;margin:0 0 14px 0;line-height:1.2;">${esc(st.title)}</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      ${pill('#FDB92A', '#000000', '', `&#128197; ${esc(fmtDate(st.deadline))}`)}
      <span style="background-color:#1A1A1A;color:#CCCCCC;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;border:1px solid #333333;white-space:nowrap;">${typeLabel}</span>
      ${mandatoryPill}
      ${weightPill}
      ${gradingPill}
      ${passPill}
    </div>
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;background-color:#FFFFFF;">
    ${st.body ? `<p style="margin:0 0 16px 0;line-height:1.7;">${esc(st.body)}</p>` : ''}
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Specifications</p>
    <ul style="margin:0;padding:0;list-style:none;">\n${items}\n    </ul>
  </div>
  <div style="padding:14px 24px;background-color:${ai.bg};border-top:3px solid ${ai.dot};display:flex;align-items:center;gap:14px;">
    <div style="width:18px;height:18px;background-color:${ai.dot};border-radius:50%;flex-shrink:0;"></div>
    <div>
      <p style="margin:0 0 3px 0;text-transform:uppercase;letter-spacing:1px; font-weight:600;">${ai.label}</p>
      <p style="margin:0 0 6px 0;line-height:1.5;">${ai.desc}</p>
      <p style="margin:0;font-size:12px;">Read More: <a href="https://arene.fi/wp-content/uploads/PDF/2024/tekoalysuositukset/ARENE%20AI%20english.pdf?_t=1731419903" target="_blank" style="color:inherit;text-decoration:underline;">ARENE AI Traffic Lights ↗</a></p>
    </div>
  </div>
</div>`;
  },
  ctrl(st) {
    const aiOpts = [
      ['red',    '🔴 Red — No AI'],
      ['yellow', '🟡 Yellow — AI + report'],
      ['green',  '🟢 Green — AI free'],
      ['blue',   '🔵 Blue — AI required']
    ].map(([v,l]) => `<option value="${v}"${st.ai===v?' selected':''}>${l}</option>`).join('');
    const typeOpts = [
      ['individual','👤 Individual'],
      ['group',     '👥 Group']
    ].map(([v,l]) => `<option value="${v}"${st.type===v?' selected':''}>${l}</option>`).join('');
    const mandatoryOpts = [
      ['mandatory','✔ Mandatory'],
      ['bonus',    '⭐ Bonus']
    ].map(([v,l]) => `<option value="${v}"${st.mandatory===v?' selected':''}>${l}</option>`).join('');
    const gradingOpts = [
      ['scale',   'Scale 1–5'],
      ['passfail','Pass / Fail'],
      ['points',  'Points']
    ].map(([v,l]) => `<option value="${v}"${st.gradingStyle===v?' selected':''}>${l}</option>`).join('');

    const weightField = st.mandatory !== 'bonus' ? `
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Weight</span>
        <input class="ci" style="width:54px;flex-shrink:0;" type="number" min="0" max="100" value="${st.weight}" data-f="weight" data-i="0">
        <span style="font-size:11px;color:#555;flex-shrink:0;font-family:var(--ui)">%</span>` : '';


    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Assignment Block</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-spec">+ Add Spec</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Code</span>
        <input class="ci" style="width:90px;flex-shrink:0;" type="text" value="${escA(st.code)}" data-f="code" data-i="0" placeholder="A-1">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:32px;margin-left:6px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" data-i="0" placeholder="Assignment title">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;padding-top:6px;font-family:var(--ui)">Body</span>
        <textarea class="ci ci-grow" data-f="body" data-i="0" rows="2" style="resize:vertical;">${esc(st.body)}</textarea>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Deadline</span>
        <input class="ci" style="width:130px;flex-shrink:0;" type="date" value="${escA(st.deadline)}" data-f="deadline" data-i="0">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Type</span>
        <select class="ci" style="width:130px;flex-shrink:0;" data-f="type" data-i="0">${typeOpts}</select>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Status</span>
        <select class="ci" style="width:130px;flex-shrink:0;" data-f="mandatory" data-i="0">${mandatoryOpts}</select>
        ${weightField}
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">AI</span>
        <select class="ci ci-grow" data-f="ai" data-i="0">${aiOpts}</select>
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Grading</span>
        <select class="ci" style="width:140px;flex-shrink:0;" data-f="gradingStyle" data-i="0">${gradingOpts}</select>
        ${st.gradingStyle !== 'passfail' ? `
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Pass</span>
        <input class="ci ci-grow" type="text" value="${escA(st.gradeToPass)}" data-f="gradeToPass" data-i="0" placeholder="e.g. 3 or 60 pts">` : ''}
      </div>
      <div style="padding:5px 14px 2px;"><span class="ctrl-col-hdr">Specification items</span></div>
      ${st.specs.map((s,i) => `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(s)}" data-f="spec" data-i="${i}" placeholder="Specification item"><button class="ctrl-btn-x" data-action="rm-spec" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'weight' || f === 'maxPoints') st[f] = Math.max(0, parseInt(el.value) || 0);
    else if (f === 'spec') st.specs[i] = el.value;
    else st[f] = el.value;
    if (f === 'mandatory' || f === 'gradingStyle') return true;
  },
  onClick(st, act, i) {
    if (act === 'add-spec') st.specs.push('New specification item here.');
    else if (act === 'rm-spec' && st.specs.length > 1) st.specs.splice(i, 1);
  }
});
