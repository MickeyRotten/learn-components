register({
  id: 'assignment',
  name: 'Assignment Block',
  desc: 'Assignment with specs, deadline, type, and ARENE AI level',
  group: 'Course Info',
  icon: '📝',
  def: {
    code: 'CT10001',
    title: 'Game Design Document',
    deadline: '15 May 2025',
    type: 'individual',
    points: '30 pts',
    ai: 'yellow',
    specs: [
      'Write a 2–3 page game design document for an original game concept.',
      'Include a core mechanics section, player journey diagram, and basic UI wireframe.',
      'Submit as a PDF to the assignment folder by the deadline.'
    ]
  },
  gen: function(st) {
    const aiCfg = {
      red:    { bg:'#FFF0F0', dot:'#CC0000', color:'#CC0000', label:'Red Light — AI Not Permitted',              desc:'This assignment must be completed without any AI assistance. Undisclosed use of AI will be treated as academic misconduct.' },
      yellow: { bg:'#FFF8E6', dot:'#E6A800', color:'#8A6200', label:'Yellow Light — AI Permitted with Reporting', desc:'You may use AI tools, but you must document and report how. Undisclosed use of AI will be treated as academic misconduct.' },
      green:  { bg:'#F2F9E8', dot:'#A6CE39', color:'#5A7A1A', label:'Green Light — AI Freely Permitted',          desc:'You may use AI tools freely for this assignment. No reporting is required.' },
      blue:   { bg:'#E8F9FB', dot:'#1DBED0', color:'#117A85', label:'Blue Light — AI Required',                   desc:'You must use AI as part of this assignment and report how you used it. Not using AI will affect your assessment.' }
    };
    const ai = aiCfg[st.ai] || aiCfg.yellow;
    const typeLabel = st.type === 'group' ? '&#128101; Group' : '&#128100; Individual';
    const items = st.specs.map(s => `      <li style="display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 8px; font-family: 'Montserrat', Arial, sans-serif;"><span style="width: 6px; height: 6px; background-color: #FDB92A; border-radius: 50%; flex-shrink: 0; margin-top: 9px;"></span>${esc(s)}</li>`).join('\n');
    return `<div style="font-family: 'Montserrat', Arial, sans-serif; margin: 24px 0; border: 1px solid #E0E0E0; border-radius: 12px; overflow: hidden;">
  <div style="background-color: #000000; padding: 20px 24px 18px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; margin-bottom: 10px;">
      <p style="color: #FDB92A; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">ASSIGNMENT &nbsp;·&nbsp; ${esc(st.code)}</p>
      <span style="background-color: #1A1A1A; color: #CCCCCC; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; border: 1px solid #333333; font-family: 'Montserrat', Arial, sans-serif; white-space: nowrap; flex-shrink: 0;">${typeLabel}</span>
    </div>
    <h2 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.2; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.title)}</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <span style="background-color: #FDB92A; color: #000000; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; font-family: 'Montserrat', Arial, sans-serif;">&#128197; ${esc(st.deadline)}</span>
      <span style="background-color: #1A1A1A; color: #999999; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; border: 1px solid #333333; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.points)}</span>
    </div>
  </div>
  <div style="padding: 20px 24px; border-bottom: 1px solid #E0E0E0; background-color: #FFFFFF;">
    <p style="font-size: 10px; font-weight: 700; color: #8D8D8D; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px 0; font-family: 'Montserrat', Arial, sans-serif;">Specifications</p>
    <ul style="margin: 0; padding: 0; list-style: none;">\n${items}\n    </ul>
  </div>
  <div style="padding: 14px 24px; background-color: ${ai.bg}; border-top: 3px solid ${ai.dot}; display: flex; align-items: center; gap: 14px;">
    <div style="width: 18px; height: 18px; background-color: ${ai.dot}; border-radius: 50%; flex-shrink: 0;"></div>
    <div>
      <p style="font-size: 10px; font-weight: 700; color: ${ai.color}; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1px; font-family: 'Montserrat', Arial, sans-serif;">ARENE AI &nbsp;·&nbsp; ${ai.label}</p>
      <p style="font-size: 13px; color: #1A1A1A; margin: 0; line-height: 1.5; font-family: 'Montserrat', Arial, sans-serif;">${ai.desc}</p>
    </div>
  </div>
</div>`;
  },
  ctrl: function(st) {
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
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Assignment Block</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-spec">+ Add Spec</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Code</span>
        <input class="ci" style="width:90px;flex-shrink:0" type="text" value="${escA(st.code)}" data-f="code" placeholder="CT10001">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:32px;margin-left:6px;font-family:var(--ui)">Title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.title)}" data-f="title" placeholder="Assignment title">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:52px;font-family:var(--ui)">Deadline</span>
        <input class="ci" style="width:120px;flex-shrink:0" type="text" value="${escA(st.deadline)}" data-f="deadline" placeholder="15 May 2025">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:32px;margin-left:6px;font-family:var(--ui)">Type</span>
        <select class="ci" style="width:130px;flex-shrink:0" data-f="type">${typeOpts}</select>
        <span style="font-size:11px;color:#666;flex-shrink:0;width:40px;margin-left:6px;font-family:var(--ui)">Points</span>
        <input class="ci" style="width:70px;flex-shrink:0" type="text" value="${escA(st.points)}" data-f="points" placeholder="30 pts">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:16px;margin-left:6px;font-family:var(--ui)">AI</span>
        <select class="ci" style="width:170px;flex-shrink:0" data-f="ai">${aiOpts}</select>
      </div>
      <div style="padding:5px 14px 2px"><span class="ctrl-col-hdr">Specification items</span></div>
      ${st.specs.map((s,i) => `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(s)}" data-f="spec" data-i="${i}" placeholder="Specification item"><button class="ctrl-btn-x" data-action="rm-spec" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='code') st.code = el.value;
    else if (f==='title') st.title = el.value;
    else if (f==='deadline') st.deadline = el.value;
    else if (f==='type') st.type = el.value;
    else if (f==='points') st.points = el.value;
    else if (f==='ai') st.ai = el.value;
    else if (f==='spec') st.specs[i] = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add-spec') st.specs.push('New specification item here.');
    else if (act==='rm-spec' && st.specs.length > 1) st.specs.splice(i, 1);
  }
});
