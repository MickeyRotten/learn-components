register({
  id: 'rules-etiquette',
  name: 'Rules & Etiquette',
  desc: 'Course rules: deadlines, grade improvement, classroom conduct',
  group: 'Teaching',
  icon: '📋',
  def: {
    paras: [
      { text: 'All assignments are to be handed in by the designated deadline (+6 hours grace period), then submissions will be closed.', hi: false },
      { text: 'ONLY assignments submitted on time will receive feedback from the teacher.', hi: true },
      { text: 'If a student does not complete a minimum of the required assignments (check evaluation criteria), the course will be marked as failed with a Zero (0), regardless of attendance.', hi: false },
      { text: 'If there was no attendance, there was no right to resubmit. The student must attend throughout the whole course.', hi: false },
      { text: 'Students are responsible for keeping their backup of their assignments and course-related documents.', hi: false }
    ],
    gradeLead: 'If you wish to improve your final grade, please get in touch with the lecturer. Upon agreement, you have one calendar year to resubmit improved assignments to have your grade re-evaluated:',
    gradeItems: [
      'Contact the lecturer and agree on the method of delivery.',
      'Inform the lecturer about which course you are resubmitting the work for with a link to the correct Learn platform.',
      'Submit all the required assignments to the course (not just the missing/failed ones).',
      'The students are responsible for finding out what assignments are needed.',
      'The evaluation criteria are the same.'
    ],
    etiquetteItems: [
      'The student can not be more than 15 minutes late; after that, the student will not be permitted to join the class. You will need to wait for the next break to join in, but the lecturer will not recap the missed content, and you are not allowed to interfere with other students\' learning process. Exception: If the lesson is being held online, the student may still join without interrupting the ongoing session.',
      'You should always have a pen and paper with you to take notes.',
      'The student must pay attention and take notes; Learn platforms are there for support and assignments only. You are not allowed to work on other things during the lessons that are not part of the group work or given assignments in class. The teacher is not obligated to revisit content due to a student\'s lack of attention.',
      'The lecturer reserves the right to ask a student to leave the class if deemed necessary to maintain a conducive learning environment.',
      'Phones must be set to vibrate mode. If a student must answer a phone call, they will quietly leave the classroom and not disrupt the lesson.',
      'If a class is in session and a student must leave the room, they must do it quietly without disruptions. If a student has an appointment during a lesson, please inform the lecturer in advance. The student must remember that the content covered during their absence will not be revisited. Students who miss a lesson must ask their peers about the content and assignments. The lecturer is not responsible for revisiting or explaining any missed content due to the student\'s absence.'
    ]
  },

  gen(st) {
    const bullet = `<span style="width:6px;height:6px;background-color:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:9px;"></span>`;

    const paraHTML = st.paras.map(p =>
      p.hi
        ? `<div style="background-color:#FFFBEC;border-left:3px solid #FDB92A;padding:10px 16px;margin:0 0 12px 0;border-radius:0 4px 4px 0;"><p style="margin:0;font-size:14px;font-weight:700;color:#1A1A1A;line-height:1.7;">${esc(p.text)}</p></div>`
        : `<p style="margin:0 0 12px 0;font-size:14px;color:#1A1A1A;line-height:1.7;">${esc(p.text)}</p>`
    ).join('');

    const gradeHTML = st.gradeItems.map(item =>
      `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:8px;">${bullet}${esc(item)}</li>`
    ).join('');

    const etiqHTML = st.etiquetteItems.map(item =>
      `<li style="display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#1A1A1A;line-height:1.7;margin-bottom:10px;">${bullet}${esc(item)}</li>`
    ).join('');

    return `<div style="margin:24px 0;border:1px solid #E0E0E0;border-radius:12px;overflow:hidden;">
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;background-color:#FFFFFF;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;font-size:11px;font-weight:700;color:#000000;margin:0 0 16px 0;">Assignments &amp; Deadlines</p>
    ${paraHTML}
  </div>
  <div style="padding:20px 24px;border-bottom:1px solid #E0E0E0;background-color:#FFFFFF;">
    <p style="letter-spacing:1.5px;text-transform:uppercase;font-size:11px;font-weight:700;color:#000000;margin:0 0 12px 0;">Grade Improvement</p>
    <p style="margin:0 0 12px 0;font-size:14px;color:#1A1A1A;line-height:1.7;">${esc(st.gradeLead)}</p>
    <ul style="margin:0;padding:0;list-style:none;">${gradeHTML}</ul>
  </div>
  <div style="background-color:#000000;padding:8px 24px;">
    <p style="color:#FDB92A;letter-spacing:2px;text-transform:uppercase;margin:0;font-size:11px;font-weight:700;">🎓 &nbsp;Classroom Etiquette</p>
  </div>
  <div style="padding:20px 24px;background-color:#FFFFFF;">
    <ul style="margin:0;padding:0;list-style:none;">${etiqHTML}</ul>
  </div>
</div>`;
  },

  ctrl(st) {
    const hiOpts = (p) => [['false','—'],['true','★ Highlight']].map(([v,l])=>
      `<option value="${v}"${String(p.hi)===v?' selected':''}>${l}</option>`
    ).join('');

    const paraRows = st.paras.map((p, i) =>
      `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><select class="ci" style="width:110px;flex-shrink:0;" data-f="paraHi" data-i="${i}">${hiOpts(p)}</select><input class="ci ci-grow" type="text" value="${escA(p.text)}" data-f="paraText" data-i="${i}" placeholder="Paragraph"><button class="ctrl-btn-x" data-action="rm-para" data-i="${i}">×</button></div>`
    ).join('');

    const gradeRows = st.gradeItems.map((item, i) =>
      `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(item)}" data-f="gradeItem" data-i="${i}" placeholder="Step"><button class="ctrl-btn-x" data-action="rm-grade" data-i="${i}">×</button></div>`
    ).join('');

    const etiqRows = st.etiquetteItems.map((item, i) =>
      `<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-grow" type="text" value="${escA(item)}" data-f="etiqItem" data-i="${i}" placeholder="Rule"><button class="ctrl-btn-x" data-action="rm-etiq" data-i="${i}">×</button></div>`
    ).join('');

    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Assignments &amp; Deadlines</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-para">+ Add</button></div>
    </div>
    <div class="ctrl-rows">${paraRows}</div>
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Grade Improvement</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-grade">+ Add Step</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:32px;font-family:var(--ui)">Lead</span>
        <input class="ci ci-grow" type="text" value="${escA(st.gradeLead)}" data-f="gradeLead" data-i="0" placeholder="Lead-in paragraph">
      </div>
      ${gradeRows}
    </div>
    <div class="ctrl-header" style="margin-top:4px;">
      <span class="ctrl-label">Classroom Etiquette</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add-etiq">+ Add Rule</button></div>
    </div>
    <div class="ctrl-rows">${etiqRows}</div>`;
  },

  onInput(st, f, i, el) {
    if      (f === 'paraText')  st.paras[i].text     = el.value;
    else if (f === 'paraHi')    st.paras[i].hi        = el.value === 'true';
    else if (f === 'gradeLead') st.gradeLead          = el.value;
    else if (f === 'gradeItem') st.gradeItems[i]      = el.value;
    else if (f === 'etiqItem')  st.etiquetteItems[i]  = el.value;
  },

  onClick(st, act, i) {
    if      (act === 'add-para')  st.paras.push({ text: 'New paragraph.', hi: false });
    else if (act === 'rm-para'  && st.paras.length > 1)          st.paras.splice(i, 1);
    else if (act === 'add-grade') st.gradeItems.push('New step.');
    else if (act === 'rm-grade' && st.gradeItems.length > 1)     st.gradeItems.splice(i, 1);
    else if (act === 'add-etiq')  st.etiquetteItems.push('New rule.');
    else if (act === 'rm-etiq'  && st.etiquetteItems.length > 1) st.etiquetteItems.splice(i, 1);
  }
});
