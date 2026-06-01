register({
  id: 'assessment-guidelines',
  name: 'Assessment Guidelines',
  desc: 'Xamk grading rubric for grades 1, 3, and 5',
  group: 'Teaching',
  icon: '🎓',
  code: `<div style="margin:16px 0;border:1px solid #E0E0E0;border-radius:10px;overflow:hidden;">
  <div style="background-color:#000000;padding:10px 20px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FDB92A;">Assessment Guidelines</span>
    <span style="height:1px;flex:1;background-color:#333;"></span>
  </div>
  <div style="padding:16px 20px 18px;border-bottom:1px solid #E0E0E0;">
    <p style="margin:0 0 10px 0;line-height:1.6;">Evaluation is based on Xamk's Assessment Guidelines. The table below describes how the work is being evaluated.</p>
    <p style="margin:0;line-height:1.6;color:#555;font-size:13px;">Grade 1 describes the minimum requirement to pass the course. Grades 3 and 5 outline higher requirements — grades 2 and 4 are interpretations between these. Students who do not meet the minimum requirement have the right to re-attempt twice within one year of the course ending.</p>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr>
        <th style="background:#000;color:#FDB92A;padding:10px 14px;text-align:left;border-right:1px solid #222;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:33.3%;">Grade 1</th>
        <th style="background:#000;color:#FDB92A;padding:10px 14px;text-align:left;border-right:1px solid #222;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:33.3%;">Grade 3</th>
        <th style="background:#000;color:#FDB92A;padding:10px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;width:33.3%;">Grade 5</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#F8F8F8;border-bottom:1px solid #E0E0E0;">
        <td style="padding:12px 14px;border-right:1px solid #E0E0E0;font-size:13px;line-height:1.6;vertical-align:top;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to get assignments done</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to utilise the models / methods / software / techniques required (with a lot of help)</li>
          </ul>
        </td>
        <td style="padding:12px 14px;border-right:1px solid #E0E0E0;font-size:13px;line-height:1.6;vertical-align:top;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to do and understand the assignments well</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to utilise the models / methods / software / techniques required (with some help)</li>
          </ul>
        </td>
        <td style="padding:12px 14px;font-size:13px;line-height:1.6;vertical-align:top;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to conduct the assignments fluently and professionally</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="width:6px;height:6px;background:#FDB92A;border-radius:50%;flex-shrink:0;margin-top:5px;"></span>Able to utilise the models / methods / software / techniques required fluently</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 14px;border-right:1px solid #E0E0E0;font-size:13px;line-height:1.6;vertical-align:top;color:#444;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>The assignments are handed in</li>
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Task accomplished</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Demonstrates some understanding of the software</li>
          </ul>
        </td>
        <td style="padding:12px 14px;border-right:1px solid #E0E0E0;font-size:13px;line-height:1.6;vertical-align:top;color:#444;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Consistent style</li>
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>A good level of polish with some deficiencies</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Demonstrates very good understanding of the use of software</li>
          </ul>
        </td>
        <td style="padding:12px 14px;font-size:13px;line-height:1.6;vertical-align:top;color:#444;">
          <ul style="margin:0;padding:0;list-style:none;">
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Excellent and consistent style</li>
            <li style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Good level of polish including typography and colour choices</li>
            <li style="display:flex;gap:8px;align-items:flex-start;"><span style="color:#FDB92A;font-weight:700;flex-shrink:0;line-height:1.4;">✓</span>Demonstrates very good understanding of the use of software</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>`
});
