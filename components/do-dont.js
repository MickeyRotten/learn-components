register({
  id: 'do-dont',
  name: "Do / Don't",
  desc: 'Side-by-side good/bad examples',
  group: 'Teaching',
  icon: '✓✗',
  code: `<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;">
  <div style="flex: 1 1 240px; border: 2px solid #A6CE39; border-radius: 10px;">
    <div style="background-color: #A6CE39; padding: 10px 16px; border-radius: 8px 8px 0 0;"><p style="margin: 0">✓ &nbsp;Do</p></div>
    <div style="padding: 16px;"><ul style="margin: 0; padding-left: 18px;">
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 6px;">Good practice one.</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 6px;">Good practice two.</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7;">Good practice three.</li>
    </ul></div>
  </div>
  <div style="flex: 1 1 240px; border: 2px solid #E0E0E0; border-radius: 10px;">
    <div style="background-color: #F5F5F5; padding: 10px 16px; border-radius: 8px 8px 0 0; border-bottom: 1px solid #E0E0E0;"><p style="margin: 0">✗ &nbsp;Don't</p></div>
    <div style="padding: 16px;"><ul style="margin: 0; padding-left: 18px;">
      <li style="font-size: 14px; color: #444444; line-height: 1.7; margin-bottom: 6px;">Common mistake one.</li>
      <li style="font-size: 14px; color: #444444; line-height: 1.7; margin-bottom: 6px;">Common mistake two.</li>
      <li style="font-size: 14px; color: #444444; line-height: 1.7;">Common mistake three.</li>
    </ul></div>
  </div>
</div>`
});
