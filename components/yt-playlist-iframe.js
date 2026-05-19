register({
  id: 'yt-playlist-iframe',
  name: 'YouTube Playlist (iframe)',
  desc: 'Paste a YouTube playlist URL',
  group: 'Media',
  icon: '📋',
  def: {url:'', caption:'Playlist: Title Here'},
  gen: function(st) {
    const pid = ytPlaylistId(st.url);
    const src = pid ? `https://www.youtube.com/embed/videoseries?list=${pid}` : '';
    return `<figure style="margin: 24px 0;">
  ${src
    ? `<iframe width="100%" height="450" src="${src}" title="${esc(st.caption)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display: block; border-radius: 10px; background-color: #000000;"></iframe>`
    : `<div style="width:100%;height:200px;background:#111;border-radius:10px;display:flex;align-items:center;justify-content:center;"><p>Paste a playlist URL above</p></div>`}
  <figcaption style="font-size: 13px; color: #8D8D8D; margin-top: 8px; text-align: center;">${esc(st.caption)}</figcaption>
</figure>`;
  },
  ctrl: function(st) {
    const pid = ytPlaylistId(st.url);
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">Playlist (iframe)</span>
      <div class="ctrl-actions">${ytIdBadge(pid,'Playlist ID')}</div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:68px;font-family:var(--ui)">Playlist URL</span>
        <input class="ci ci-grow" type="text" value="${escA(st.url)}" data-f="url" placeholder="Paste a YouTube playlist URL or embed code">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:68px;font-family:var(--ui)">Caption</span>
        <input class="ci ci-grow" type="text" value="${escA(st.caption)}" data-f="caption" placeholder="Playlist caption">
      </div>
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='url') st.url = el.value;
    else if (f==='caption') st.caption = el.value;
    return true;
  }
});
