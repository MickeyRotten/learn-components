register({
  id: 'definition',
  name: 'Definition Card',
  desc: 'Term + definition + example',
  group: 'Teaching',
  icon: '📖',
  code: `<div style="margin: 16px 0; border: 1px solid #E0E0E0; border-radius: 10px;">
  <div style="background-color: #000000; padding: 10px 20px; border-radius: 10px 10px 0 0; display: flex; align-items: center; gap: 12px;">
    <span style="font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FDB92A;">Definition</span>
    <span style="height: 1px; flex: 1; background-color: #333;"></span>
  </div>
  <div style="padding: 18px 20px 20px 20px;">
    <p style="margin: 0 0 10px 0">Term or Concept</p>
    <p style="line-height: 1.7; margin: 0 0 14px 0">The definition goes here. Write it clearly and concisely — one or two sentences a first-year student can understand without prior knowledge.</p>
    <div style="background-color: #FFF8E6; border-left: 3px solid #FDB92A; border-radius: 0 6px 6px 0; padding: 10px 14px;">
      <p style="text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0">Example</p>
      <p style="margin: 0; line-height: 1.6">A concrete example in practice — ideally a game or mechanic students already know.</p>
    </div>
  </div>
</div>`
});
