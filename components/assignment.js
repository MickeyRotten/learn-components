register({
  id: 'assignment',
  name: 'Assignment Block',
  desc: 'Assignment with specs, evaluation criteria, deadline, and ARENE AI level',
  group: 'Course Info',
  icon: '📝',
  def: {
    code: 'A-1',
    title: 'Game Design Document',
    deadline: '',
    type: 'individual',
    mandatory: 'mandatory',
    ai: 'yellow',
    body: 'Complete the following specifications and submit by the deadline.',
    specs: [
      'Write a 2–3 page game design document for an original game concept.',
      'Include a core mechanics section, player journey diagram, and basic UI wireframe.',
      'Submit as a PDF to the assignment folder by the deadline.'
    ],
    evaluation: [
      'Evaluation criterion 1',
      'Evaluation criterion 2'
    ]
  },
  gen(st) {
    const aiCfg = {
      red:    { bg:'#FFF0F0', dot:'#CC0000', label:'AI Not Permitted',             desc:'This assignment must be completed without any AI assistance. Undisclosed use of AI will be treated as academic misconduct.' },
      yellow: { bg:'#FFF8E6', dot:'#E6A800', label:'AI Permitted with Reporting', desc:'You may use AI tools, but you must document and report how. Undisclosed use of AI will be treated as academic misconduct.' },
      green:  { bg:'#F2F9E8', dot:'#A6CE39', label:'AI Freely Permitted',         desc:'You may use AI tools freely for this assignment. No reporting is required.' },
      blue:   { bg:'#E8F9FB', dot:'#1DBED0', label:'AI Required',                  desc:'You must use AI as part of this assignment and report how you used it. Not using AI will affect your assessment.' }
    };
    const ai = aiCfg[st.ai] || aiCfg.yellow;
    const typeLabel = st.type === 'group' ? '&#128101; Group' : '&#128100; Individual';

    const fmtDate = d => {
      if (!d) return '—';
      return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const pill = (bg, color, border, text) =>
      `<span style="background-color:${bg};color:${color};font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;${border ? `border:1px solid ${border};` : ''}">${text}</span>`;

    const mandatoryPill = st.mandatory === 'bonus'
      ? pill('#1A1A1A', '#AAAAAA', '#333333', '⭐ Bonus')
      : pill('#FDB92A', '#000000', '', '✔ Mandatory');

    const bullet = `<span style="width:6px;height:6px;background-color:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:9px;"></span>`;

    const items = st.specs.map(s =>
      `      <li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:8px;">${bullet}${esc(s)}</li>`
    ).join('\n');

    const evalItems = (st.evaluation || []).map(s =>
      `      <li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:8px;">${bullet}${esc(s)}</li>`
    ).join('\n');

    return `<div style="margin:24px 0;border:1px solid #E0E0E0;border-radius:12px;overflow:hidden;">
  <div style="background-color:#FAFAFA;padding:16px 24px 18px;border-bottom:1px solid #E0E0E0;">
    <h3 style="color:#000000;margin:0 0 14px 0;line-height:1.2;">${esc(st.title)}</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      ${pill('#FDB92A', '#000000', '', `&#128197; ${esc(fmtDate(st.deadline))}`)}
      <span style="background-color:#1A1A1A;color:#CCCCCC;font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;border:1px solid #333333;white-space:nowrap;">${typeLabel}</span>
      ${mandatoryPill}
    </div>
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;background-color:#FFFFFF;">
    ${st.body ? `<p style="margin:0 0 16px 0;line-height:1.7;">${esc(st.body)}</p>` : ''}
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Specifications</p>
    <ul style="margin:0;padding:0;list-style:none;">\n${items}\n    </ul>
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:20px 0 12px 0;">Evaluation</p>
    <ul style="margin:0;padding:0;list-style:none;">\n${evalItems}\n    </ul>
  </div>
  <div style="padding:14px 24px;background-color:${ai.bg};border-top:3px solid ${ai.dot};display:flex;align-items:center;gap:14px;">
    <div style="width:18px;height:18px;background-color:${ai.dot};border-radius:50%;flex-shrink:0;"></div>
    <div>
      <p style="margin:0 0 3px 0;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${ai.label}</p>
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

    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Assignment Block</span>
      <div class="ctrl-actions">
        <button class="ctrl-btn ctrl-btn-add" data-action="add-spec">+ Spec</button>
        <button class="ctrl-btn ctrl-btn-action" data-action="add-eval">+ Eval</button>
      </div>
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
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">AI</span>
        <select class="ci ci-grow" data-f="ai" data-i="0">${aiOpts}</select>
      </div>
      <div style="padding:5px 14px 2px;"><span class="ctrl-col-hdr">Specification items</span></div>
      ${st.specs.map((s,i) => `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(s)}" data-f="spec" data-i="${i}" placeholder="Specification item"><button class="ctrl-btn-x" data-action="rm-spec" data-i="${i}">×</button></div>`).join('')}
      <div style="padding:5px 14px 2px;"><span class="ctrl-col-hdr">Evaluation items</span></div>
      ${(st.evaluation||[]).map((s,i) => `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(s)}" data-f="eval" data-i="${i}" placeholder="Evaluation criterion"><button class="ctrl-btn-x" data-action="rm-eval" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'spec') st.specs[i] = el.value;
    else if (f === 'eval') { if (!st.evaluation) st.evaluation = []; st.evaluation[i] = el.value; }
    else st[f] = el.value;
    if (f === 'mandatory') return true;
  },
  onClick(st, act, i) {
    if (act === 'add-spec') st.specs.push('New specification item here.');
    else if (act === 'rm-spec' && st.specs.length > 1) st.specs.splice(i, 1);
    else if (act === 'add-eval') { if (!st.evaluation) st.evaluation = []; st.evaluation.push('Evaluation criterion'); }
    else if (act === 'rm-eval' && (st.evaluation||[]).length > 1) st.evaluation.splice(i, 1);
  }
});
