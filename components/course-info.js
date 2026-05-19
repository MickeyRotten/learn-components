register({
  id: 'course-info',
  name: 'Course Info Block',
  desc: 'Teacher, objectives, goals, evaluation',
  group: 'Course Info',
  icon: '🎓',
  def: {
    code: 'CT10001',
    name: 'Game Design',
    credits: 5,
    mandatory: 3,
    optional: 2,
    teachers: [
      { name: 'Teacher Name', photo: 'https://placehold.co/80/FDB92A/000000/png?text=Photo', email: 'firstname.lastname@xamk.fi', response: 'I reply within 2 working days.' }
    ],
    goals: ['Understand core game design principles', 'Apply player-centred design thinking'],
    objectives: ['What makes a game fun and replayable?', 'How are mechanics, dynamics and aesthetics connected?'],
    evaluation: ['Ability to design and justify core game mechanics', 'Quality of documentation and design rationale']
  },
  gen(st) {
    const pill = (bg, color, border, text) =>
      `<span style="background-color:${bg};color:${color};font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;${border ? `border:1px solid ${border};` : ''}">${text}</span>`;

    const goalItems = st.goals.map(g =>
      `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:6px;"><span style="color:#A6CE39;font-weight:700;flex-shrink:0;">✓</span>${esc(g)}</li>`
    ).join('');
    const objItems = st.objectives.map(o =>
      `<li style="font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:5px;">${esc(o)}</li>`
    ).join('');
    const evalItems = st.evaluation.map(e =>
      `<li style="font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:5px;">${esc(e)}</li>`
    ).join('');

    return `<div style="margin:24px 0;border:1px solid #E0E0E0;border-radius:12px;overflow:hidden;">
  <div style="background-color:#000000;padding:8px 24px;">
    <p style="color:#FDB92A;letter-spacing:2px;text-transform:uppercase;margin:0;font-size:11px;">🎓 &nbsp;COURSE &nbsp;·&nbsp; ${esc(st.code)}</p>
  </div>
  <div style="background-color:#FAFAFA;padding:16px 24px 18px;border-bottom:1px solid #E0E0E0;">
    <h3 style="color:#000000;margin:0 0 14px 0;line-height:1.2;">${esc(st.name)}</h3>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      ${pill('#FDB92A', '#000000', '', `${esc(String(st.credits))} credits`)}
      ${pill('#1A1A1A', '#CCCCCC', '#333333', `${esc(String(st.mandatory))} mandatory assignments`)}
      ${pill('#1A1A1A', '#CCCCCC', '#333333', `${esc(String(st.optional))} optional assignments`)}
    </div>
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;background-color:#FFFFFF;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 14px 0;">Teacher${st.teachers.length > 1 ? 's' : ''}</p>
    <div style="display:grid;grid-template-columns:repeat(${Math.min(3, st.teachers.length)},1fr);gap:16px;">
      ${st.teachers.map(t => `<div style="display:flex;gap:14px;align-items:flex-start;">
        <img src="${esc(t.photo)}" alt="Teacher photo" style="width:64px;height:64px;border-radius:8px;flex-shrink:0;display:block;object-fit:cover;">
        <div>
          <p style="margin:0 0 6px 0;">${esc(t.name)}</p>
          <p style="margin:0 0 4px 0;">📧 &nbsp;<a href="mailto:${esc(t.email)}" style="color:#000000;text-decoration:underline;">${esc(t.email)}</a></p>
          <p style="margin:0;">🕐 &nbsp;${esc(t.response)}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Learning Goals</p>
    <ul style="list-style:none;margin:0;padding:0;">${goalItems}</ul>
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Learning Objectives</p>
    <ul style="margin:0;padding-left:20px;">${objItems}</ul>
  </div>
  <div style="padding:20px 24px;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;margin:0 0 12px 0;">Evaluation Criteria</p>
    <ul style="margin:0;padding-left:20px;">${evalItems}</ul>
  </div>
</div>`;
  },
  ctrl(st) {
    const listRows = (items, f, addAct, rmAct) => items.map((v, i) =>
      `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(v)}" data-f="${f}" data-i="${i}" placeholder="—"><button class="ctrl-btn-x" data-action="${rmAct}" data-i="${i}">×</button></div>`
    ).join('');

    return `
    <div class="ctrl-header"><span class="ctrl-label">Course Info</span></div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Code</span>
        <input class="ci" style="width:90px;flex-shrink:0;" type="text" value="${escA(st.code)}" data-f="code" data-i="0" placeholder="CT10001">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Name</span>
        <input class="ci ci-grow" type="text" value="${escA(st.name)}" data-f="name" data-i="0" placeholder="Course name">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Credits</span>
        <input class="ci" style="width:50px;flex-shrink:0;" type="number" min="0" value="${st.credits}" data-f="credits" data-i="0">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Mandatory</span>
        <input class="ci" style="width:44px;flex-shrink:0;" type="number" min="0" value="${st.mandatory}" data-f="mandatory" data-i="0">
        <span style="font-size:11px;color:#666;flex-shrink:0;margin-left:6px;font-family:var(--ui)">Optional</span>
        <input class="ci" style="width:44px;flex-shrink:0;" type="number" min="0" value="${st.optional}" data-f="optional" data-i="0">
      </div>
    </div>

    ${st.teachers.map((t, i) => `
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Teacher ${i + 1}</span>
      <div class="ctrl-actions">
        ${st.teachers.length > 1 ? `<button class="ctrl-btn-x" data-action="rm-teacher" data-i="${i}" title="Remove">✕</button>` : ''}
      </div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Name</span>
        <input class="ci ci-grow" type="text" value="${escA(t.name)}" data-f="tName" data-i="${i}" placeholder="Teacher Name">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Photo</span>
        <input class="ci ci-grow" type="text" value="${escA(t.photo)}" data-f="tPhoto" data-i="${i}" placeholder="Image URL">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Email</span>
        <input class="ci ci-grow" type="text" value="${escA(t.email)}" data-f="tEmail" data-i="${i}" placeholder="email@xamk.fi">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:44px;font-family:var(--ui)">Reply</span>
        <input class="ci ci-grow" type="text" value="${escA(t.response)}" data-f="tResponse" data-i="${i}" placeholder="Response time">
      </div>
    </div>`).join('')}
    ${st.teachers.length < 3 ? `
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label"></span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-teacher">+ Add Teacher</button></div>
    </div>` : ''}

    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Learning Goals</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-goal">+ Add</button></div>
    </div>
    <div class="ctrl-rows">${listRows(st.goals, 'goal', 'add-goal', 'rm-goal')}</div>

    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Learning Objectives</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-obj">+ Add</button></div>
    </div>
    <div class="ctrl-rows">${listRows(st.objectives, 'objective', 'add-obj', 'rm-obj')}</div>

    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Evaluation Criteria</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-eval">+ Add</button></div>
    </div>
    <div class="ctrl-rows">${listRows(st.evaluation, 'evalItem', 'add-eval', 'rm-eval')}</div>`;
  },
  onInput(st, f, i, el) {
    if      (f === 'tName')     st.teachers[i].name     = el.value;
    else if (f === 'tPhoto')    st.teachers[i].photo    = el.value;
    else if (f === 'tEmail')    st.teachers[i].email    = el.value;
    else if (f === 'tResponse') st.teachers[i].response = el.value;
    else if (f === 'goal')      st.goals[i]      = el.value;
    else if (f === 'objective') st.objectives[i] = el.value;
    else if (f === 'evalItem')  st.evaluation[i] = el.value;
    else if (f === 'credits' || f === 'mandatory' || f === 'optional')
      st[f] = Math.max(0, parseInt(el.value) || 0);
    else st[f] = el.value;
  },
  onClick(st, act, i) {
    if (act === 'add-teacher' && st.teachers.length < 3)
      st.teachers.push({ name: 'Teacher Name', photo: 'https://placehold.co/80/FDB92A/000000/png?text=Photo', email: 'firstname.lastname@xamk.fi', response: 'I reply within 2 working days.' });
    if (act === 'rm-teacher' && st.teachers.length > 1) st.teachers.splice(i, 1);
    if (act === 'add-goal')  st.goals.push('New learning goal');
    if (act === 'rm-goal'  && st.goals.length > 1)      st.goals.splice(i, 1);
    if (act === 'add-obj')   st.objectives.push('New learning objective');
    if (act === 'rm-obj'   && st.objectives.length > 1) st.objectives.splice(i, 1);
    if (act === 'add-eval')  st.evaluation.push('New evaluation criterion');
    if (act === 'rm-eval'  && st.evaluation.length > 1) st.evaluation.splice(i, 1);
  }
});
