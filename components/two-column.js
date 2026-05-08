register({
  id: 'two-column',
  name: 'Two-Column Text',
  desc: 'Side-by-side content',
  group: 'Layout',
  icon: '⬛',
  code: `<div style="display: flex; gap: 24px; flex-wrap: wrap; margin: 16px 0; font-family: 'Montserrat', Arial, sans-serif;">
  <div style="flex: 1 1 280px;">
    <h3 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 8px 0; font-family: 'Montserrat', Arial, sans-serif;">Left Column Heading</h3>
    <p style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">Left column content goes here.</p>
  </div>
  <div style="flex: 1 1 280px;">
    <h3 style="font-size: 15px; font-weight: 700; color: #000000; margin: 0 0 8px 0; font-family: 'Montserrat', Arial, sans-serif;">Right Column Heading</h3>
    <p style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">Right column content goes here.</p>
  </div>
</div>`
});
