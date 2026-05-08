register({
  id: 'youtube-single',
  name: 'YouTube Single',
  desc: 'Paste a YouTube URL to embed',
  group: 'Media',
  icon: '▶️',
  def: {url:'', caption:'Video title or short caption here'},
  gen: function(st) {
    const vid = ytVideoId(st.url);
    const src = vid ? `https://www.youtube.com/embed/${vid}` : '';
    return `<figure style="margin: 24px 0; font-family: 'Montserrat', Arial, sans-serif;">
  ${src
    ? `<iframe width="100%" height="450" src="${src}" title="${esc(st.caption)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="display: block; border-radius: 10px; background-color: #000000;"></iframe>`
    : `<div style="width:100%;height:200px;background:#111;border-radius:10px;display:flex;align-items:center;justify-content:center;"><p style="color:#555;font-family:'Montserrat',Arial,sans-serif;font-size:13px;">Paste a YouTube URL above</p></div>`}
  <figcaption style="font-size: 13px; color: #8D8D8D; margin-top: 8px; text-align: center; font-family: 'Montserrat', Arial, sans-serif;">${esc(st.caption)}</figcaption>
</figure>`;
  },
  ctrl: function(st) {
    const vid = ytVideoId(st.url);
    return `
    <div class="ctrl-header">
      <span class="ctrl-label">YouTube Single</span>
      <div class="ctrl-actions">${ytIdBadge(vid,'Video ID')}</div>
    </div>
    <div class="ctrl-rows">
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:68px;font-family:var(--ui)">Video URL</span>
        <input class="ci ci-grow" type="text" value="${escA(st.url)}" data-f="url" placeholder="Paste a YouTube URL or the full embed code from YouTube">
      </div>
      <div class="ctrl-row">
        <span style="font-size:11px;color:#666;flex-shrink:0;width:68px;font-family:var(--ui)">Caption</span>
        <input class="ci ci-grow" type="text" value="${escA(st.caption)}" data-f="caption" placeholder="Video caption or title">
      </div>
    </div>`;
  },
  onInput: function(st, f, i, el) {
    if (f==='url') st.url = el.value;
    else if (f==='caption') st.caption = el.value;
    return true;
  }
});
