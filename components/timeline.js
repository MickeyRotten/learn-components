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
    // The rail is the <li> left border; the dot is pulled back over it with a negative margin.
    const dot = `<span style="display: inline-block; width: 14px; height: 14px; background-color: #FDB92A; border-radius: 50%; margin: 0 14px 0 -22px; vertical-align: middle;"></span>`;
    const items = st.events.map((e,i)=>{
      const last = i===st.events.length-1;
      return `  <li style="border-left: 2px solid ${last?'transparent':'#E0E0E0'}; padding: 0 0 ${last?'0':'22px'} 15px; margin-left: 7px;">
    <p style="margin: 0 0 2px 0; letter-spacing: 1px">${dot}${esc(e.year)}</p>
    <p style="margin: 0 0 4px 0; padding-left: 6px">${esc(e.title)}</p>
    <p style="margin: 0; line-height: 1.6; padding-left: 6px">${fmt(e.desc)}</p>
  </li>`;
    }).join('\n');
    return `<ul style="list-style: none; margin: 24px 0; padding: 0;">\n${items}\n</ul>`;
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
      ${st.events.map((e,i)=>`<div class="ctrl-row"><span class="ctrl-num">${i+1}</span><input class="ci ci-year" type="text" value="${escA(e.year)}" data-f="year" data-i="${i}" placeholder="Year"><input class="ci" style="flex:2" type="text" value="${escA(e.title)}" data-f="title" data-i="${i}" placeholder="Title"><textarea class="ci ci-prose" style="flex:3" rows="1" data-f="desc" data-i="${i}" placeholder="Description">${esc(e.desc)}</textarea><button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button></div>`).join('')}
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
