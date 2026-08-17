register({
  id: 'yt-playlist-grid',
  name: 'YouTube Playlist (thumbnails)',
  desc: 'Paste URLs — thumbnails auto-generate',
  group: 'Media',
  icon: '🎬',
  def: {heading:'Playlist Title', videos:[
    {url:'', title:'Video Title 1', duration:'0:00'},
    {url:'', title:'Video Title 2', duration:'0:00'},
    {url:'', title:'Video Title 3', duration:'0:00'}
  ]},
  gen: function(st) {
    const cell = v => {
      const vid = ytVideoId(v.url);
      const href = vid ? `https://www.youtube.com/watch?v=${vid}` : '#';
      const thumb = ytThumb(vid);
      return `      <td style="vertical-align: top; background-color: #FFFFFF; border: 1px solid #E0E0E0; border-radius: 10px; padding: 0;">
        <a href="${href}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;">
          <img src="${thumb}" alt="${esc(v.title)}" style="width: 100%; display: block; border-radius: 10px 10px 0 0; height: auto;">
          <p style="margin: 0 0 4px 0; padding: 10px 12px 0 12px; line-height: 1.4">${esc(v.title)}</p>
          <p style="margin: 0; padding: 0 12px 12px 12px"><span role="img" aria-label="Duration">⏱</span> ${esc(v.duration)}</p>
        </a>
      </td>`;
    };

    // Three thumbnails per row, matching the old flex-wrap layout.
    const perRow = Math.min(3, st.videos.length) || 1;
    const rows = [];
    for (let i = 0; i < st.videos.length; i += perRow) rows.push(st.videos.slice(i, i + perRow));

    const body = rows.map(row => {
      const cells = row.map(cell).join('\n');
      const pad = Array.from({ length: perRow - row.length },
        () => '      <td style="border: none;"></td>').join('\n');
      return `    <tr>\n${cells}${pad ? '\n' + pad : ''}\n    </tr>`;
    }).join('\n');

    return `<h3 style="margin: 24px 0 16px 0">${esc(st.heading)}</h3>
<table style="width: 100%; border-collapse: separate; border-spacing: 8px; table-layout: fixed; margin: 0 0 24px 0;" border="0">
  <tbody>
${body}
  </tbody>
</table>`;
  },
  ctrl: function(st) {
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Playlist Grid (${st.videos.length} videos)</span>
      <div class="ctrl-actions"><button class="ctrl-btn ctrl-btn-add" data-action="add">+ Add Video</button></div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row" style="border-bottom:1px solid #1E1E1E;padding-bottom:6px;margin-bottom:2px">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:90px;font-family:var(--ui)">Section title</span>
        <input class="ci ci-grow" type="text" value="${escA(st.heading)}" data-f="heading" placeholder="Playlist heading">
      </div>
      <div class="ctrl-row" style="padding:3px 14px 2px">
        <span class="ctrl-num"></span>
        <span class="ctrl-col-hdr" style="flex:3">YouTube URL</span>
        <span class="ctrl-col-hdr" style="flex:2;margin-left:6px">Title</span>
        <span class="ctrl-col-hdr" style="width:52px;margin-left:6px">Duration</span>
        <span style="width:38px"></span>
      </div>
      ${st.videos.map((v,i) => {
        const vid = ytVideoId(v.url);
        return `<div class="ctrl-row">
          <span class="ctrl-num">${i+1}</span>
          <input class="ci" style="flex:3" type="text" value="${escA(v.url)}" data-f="vurl" data-i="${i}" placeholder="YouTube URL or embed code">
          <input class="ci" style="flex:2" type="text" value="${escA(v.title)}" data-f="vtitle" data-i="${i}" placeholder="Video title">
          <input class="ci" style="width:52px;flex-shrink:0" type="text" value="${escA(v.duration)}" data-f="vdur" data-i="${i}" placeholder="0:00">
          <span style="font-size:11px;flex-shrink:0;width:14px;text-align:center" title="${vid ? 'ID: '+vid : 'No ID found'}">${vid ? '✓' : '–'}</span>
          <button class="ctrl-btn-x" data-action="remove" data-i="${i}">×</button>
        </div>`;
      }).join('')}
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='heading') st.heading = el.value;
    else if (f==='vurl') st.videos[i].url = el.value;
    else if (f==='vtitle') st.videos[i].title = el.value;
    else if (f==='vdur') st.videos[i].duration = el.value;
    return true;
  },
  onClick: function(st, act, i) {
    if (act==='add') st.videos.push({url:'', title:`Video Title ${st.videos.length+1}`, duration:'0:00'});
    else if (act==='remove' && st.videos.length > 1) st.videos.splice(i, 1);
  }
});
