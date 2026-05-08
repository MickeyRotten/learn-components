register({
  id: 'do-dont',
  name: "Do / Don't",
  desc: 'Side-by-side good/bad examples',
  group: 'Teaching',
  icon: '✓✗',
  code: `<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0; font-family: 'Montserrat', Arial, sans-serif;">
  <div style="flex: 1 1 240px; border: 2px solid #A6CE39; border-radius: 10px;">
    <div style="background-color: #A6CE39; padding: 10px 16px; border-radius: 8px 8px 0 0;"><p style="font-size: 12px; font-weight: 700; color: #000000; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">✓ &nbsp;Do</p></div>
    <div style="padding: 16px;"><ul style="margin: 0; padding-left: 18px;">
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 6px; font-family: 'Montserrat', Arial, sans-serif;">Good practice one.</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 6px; font-family: 'Montserrat', Arial, sans-serif;">Good practice two.</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; font-family: 'Montserrat', Arial, sans-serif;">Good practice three.</li>
    </ul></div>
  </div>
  <div style="flex: 1 1 240px; border: 2px solid #E0E0E0; border-radius: 10px;">
    <div style="background-color: #F5F5F5; padding: 10px 16px; border-radius: 8px 8px 0 0; border-bottom: 1px solid #E0E0E0;"><p style="font-size: 12px; font-weight: 700; color: #8D8D8D; margin: 0; font-family: 'Montserrat', Arial, sans-serif;">✗ &nbsp;Don't</p></div>
    <div style="padding: 16px;"><ul style="margin: 0; padding-left: 18px;">
      <li style="font-size: 14px; color: #444444; line-height: 1.7; margin-bottom: 6px; font-family: 'Montserrat', Arial, sans-serif;">Common mistake one.</li>
      <li style="font-size: 14px; color: #444444; line-height: 1.7; margin-bottom: 6px; font-family: 'Montserrat', Arial, sans-serif;">Common mistake two.</li>
      <li style="font-size: 14px; color: #444444; line-height: 1.7; font-family: 'Montserrat', Arial, sans-serif;">Common mistake three.</li>
    </ul></div>
  </div>
</div>`
});
