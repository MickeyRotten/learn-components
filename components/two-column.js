register({
  id: 'two-column',
  name: 'Two-Column Text',
  desc: 'Side-by-side content',
  group: 'Layout',
  icon: '⬛',
  code: `<div style="display: flex; gap: 24px; flex-wrap: wrap; margin: 16px 0;">
  <div style="flex: 1 1 280px;">
    <h3 style="margin: 0 0 8px 0">Left Column Heading</h3>
    <p style="line-height: 1.7; margin: 0">Left column content goes here.</p>
  </div>
  <div style="flex: 1 1 280px;">
    <h3 style="margin: 0 0 8px 0">Right Column Heading</h3>
    <p style="line-height: 1.7; margin: 0">Right column content goes here.</p>
  </div>
</div>`
});
