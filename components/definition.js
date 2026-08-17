register({
  id: 'definition',
  name: 'Definition Card',
  desc: 'Term + definition + optional example',
  group: 'Teaching',
  icon: '📖',
  def: {
    term: 'Term or Concept',
    definition: 'The definition goes here. Write it clearly and concisely — one or two sentences a first-year student can understand without prior knowledge.',
    showExample: true,
    example: 'A concrete example in practice — ideally a game or mechanic students already know.'
  },
  gen(st) {
    const exampleBlock = st.showExample ? `
      <blockquote style="background-color: #FFF8E6; border-left: 3px solid #FDB92A; border-radius: 0 6px 6px 0; padding: 10px 14px; margin: 0;">
        <p style="text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0">Example</p>
        <p style="margin: 0; line-height: 1.6">${fmt(st.example)}</p>
      </blockquote>` : '';
    return `<table style="width: 100%; border-collapse: collapse; border: 1px solid #E0E0E0; border-radius: 10px; margin: 16px 0;" border="0">
  <tbody>
  <tr>
    <td style="background-color: #000000; padding: 10px 20px; border-radius: 10px 10px 0 0;">
      <p style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FDB92A;">Definition</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 18px 20px 20px 20px; border-radius: 0 0 10px 10px;">
      <p style="margin: 0 0 10px 0">${esc(st.term)}</p>
      <p style="line-height: 1.7; margin: ${st.showExample ? '0 0 14px 0' : '0'}">${fmt(st.definition)}</p>${exampleBlock}
    </td>
  </tr>
  </tbody>
</table>`;
  },
  ctrl(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Definition Card</span>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;font-family:var(--ui)">Term</span>
        <input class="ci ci-grow" type="text" value="${escA(st.term)}" data-f="term" data-i="0">
      </div>
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;padding-top:6px;font-family:var(--ui)">Definition</span>
        <textarea class="ci ci-grow ci-prose" data-f="definition" data-i="0" rows="1">${esc(st.definition)}</textarea>
      </div>
      <div class="ctrl-row">
        <label style="display:flex;align-items:center;gap:6px;font-size:11px;color:#666;font-family:var(--ui);cursor:pointer;">
          <input type="checkbox" data-f="showExample" data-i="0"${st.showExample ? ' checked' : ''}>
          Show example
        </label>
      </div>
      ${st.showExample ? `
      <div class="ctrl-row" style="align-items:flex-start;">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:72px;padding-top:6px;font-family:var(--ui)">Example</span>
        <textarea class="ci ci-grow ci-prose" data-f="example" data-i="0" rows="1">${esc(st.example)}</textarea>
      </div>` : ''}
    </div>`;
  },
  onInput(st, f, i, el) {
    if (f === 'showExample') { st.showExample = el.checked; return true; }
    st[f] = el.value;
  }
});
