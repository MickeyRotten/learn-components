register({
  id: 'timeline',
  name: 'Timeline',
  desc: 'Chronological events — add or remove',
  group: 'Timeline',
  icon: '📅',
  def: {events:[
    {year:'1972',title:'Pong released',desc:'Atari releases Pong, one of the first commercially successful arcade games.'},
    {year:'1985',title:'Super Mario Bros.',desc:'Nintendo releases Super Mario Bros., defining the platformer genre and reviving the home console market.'},
    {year:'1993',title:'DOOM',desc:'id Software releases DOOM, pioneering the first-person shooter genre and popularising online multiplayer.'},
    {year:'2007',title:'iPhone launched',desc:'Apple launches the iPhone, kickstarting the mobile gaming era and opening gaming to a mass global audience.'}
  ]},
  gen: function(st) {
    const items = st.events.map((e,i)=>{
      const last = i===st.events.length-1;
      return `  <div style="display: flex; gap: 0; font-family: 'Montserrat', Arial, sans-serif;">
    <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 32px;">
      <div style="width: 14px; height: 14px; background-color: #FDB92A; border-radius: 50%; flex-shrink: 0; margin-top: 4px;"></div>
      ${last?'':'<div style="width: 2px; flex: 1; background-color: #E0E0E0; min-height: 20px;"></div>'}
    </div>
    <div style="padding: 0 0 ${last?'0':'22px'} 14px;">
      <p style="font-size: 11px; font-weight: 700; color: #FDB92A; margin: 0 0 2px 0; letter-spacing: 1px; font-family: 'Montserrat', Arial, sans-serif;">${esc(e.year)}</p>
      <p style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 4px 0; font-family: 'Montserrat', Arial, sans-serif;">${esc(e.title)}</p>
      <p style="font-size: 13px; color: #444444; margin: 0; line-height: 1.6; font-family: 'Montserrat', Arial, sans-serif;">${esc(e.desc)}</p>
    </div>
  </div>`;
    }).join('\n');
    return `<div style="font-family: 'Montserrat', Arial, sans-serif; margin: 24px 0;">\n${items}\n</div>`;
  },
  ctrl: function(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Events (${st.events.length})</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add Event</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="padding:3px 14px 2px">
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr ci-year">Year</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px">Title</span>
        <span class="ctrl-col-hdr" style="flex:3;margin-left:6px">Description</span>
        <span style="width:24px"></span>
      </div>
      ${st.events.map((e,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-year" type="text" value="${escA(e.year)}" data-f="year" data-i="${i}" placeholder="Year"><input class="ci" style="flex:2" type="text" value="${escA(e.title)}" data-f="title" data-i="${i}" placeholder="Title"><input class="ci" style="flex:3" type="text" value="${escA(e.desc)}" data-f="desc" data-i="${i}" placeholder="Description"><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='year') st.events[i].year = el.value;
    else if (f==='title') st.events[i].title = el.value;
    else if (f==='desc') st.events[i].desc = el.value;
  },
  onClick: function(st, act, i) {
    if (act==='add') st.events.push({year:'YEAR', title:'Event Title', desc:'Event description here.'});
    else if (act==='remove' && st.events.length > 1) st.events.splice(i, 1);
  }
});
