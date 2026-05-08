register({
  id: 'course-info',
  name: 'Course Info Block',
  desc: 'Teacher, objectives, goals, evaluation',
  group: 'Course Info',
  icon: '🎓',
  code: `<div style="font-family: 'Montserrat', Arial, sans-serif; margin: 24px 0; border: 1px solid #E0E0E0; border-radius: 12px;">
  <div style="background-color: #000000; padding: 20px 24px; border-radius: 12px 12px 0 0;">
    <p style="color: #FDB92A; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0; font-family: 'Montserrat', Arial, sans-serif;">COURSE CODE &nbsp;·&nbsp; X CREDITS</p>
    <h2 style="color: #FFFFFF; font-size: 20px; font-weight: 700; margin: 0 0 12px 0; font-family: 'Montserrat', Arial, sans-serif;">Course Name Here</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <span style="background-color: #FDB92A; color: #000000; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; font-family: 'Montserrat', Arial, sans-serif;">X credits</span>
      <span style="background-color: #333333; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; font-family: 'Montserrat', Arial, sans-serif;">X compulsory assignments</span>
      <span style="background-color: #333333; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; font-family: 'Montserrat', Arial, sans-serif;">X optional assignments</span>
    </div>
  </div>
  <div style="padding: 20px 24px; border-bottom: 1px solid #E0E0E0; background-color: #FAFAFA;">
    <p style="font-size: 11px; font-weight: 700; color: #8D8D8D; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 14px 0; font-family: 'Montserrat', Arial, sans-serif;">Teacher</p>
    <div style="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;">
      <img src="https://placehold.co/80/FDB92A/000000/png?text=Photo" alt="Teacher — replace with real photo" style="width: 80px; height: 80px; border-radius: 8px; flex-shrink: 0; display: block;">
      <div>
        <p style="font-size: 16px; font-weight: 700; color: #000000; margin: 0 0 6px 0; font-family: 'Montserrat', Arial, sans-serif;">TEACHER NAME</p>
        <p style="font-size: 13px; color: #444444; margin: 0 0 4px 0; font-family: 'Montserrat', Arial, sans-serif;"><span role="img" aria-label="Email">📧</span> &nbsp;<a href="mailto:firstname.lastname@xamk.fi" style="color: #000000; text-decoration: underline; font-family: 'Montserrat', Arial, sans-serif;">firstname.lastname@xamk.fi</a></p>
        <p style="font-size: 13px; color: #444444; margin: 0; font-family: 'Montserrat', Arial, sans-serif;"><span role="img" aria-label="Response time">🕐</span> &nbsp;I reply within 2 working days.</p>
      </div>
    </div>
  </div>
  <div style="padding: 20px 24px; border-bottom: 1px solid #E0E0E0;">
    <p style="font-size: 11px; font-weight: 700; color: #8D8D8D; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px 0; font-family: 'Montserrat', Arial, sans-serif;">Learning Goals</p>
    <ul style="list-style: none; margin: 0; padding: 0;">
      <li style="display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 6px; font-family: 'Montserrat', Arial, sans-serif;"><span style="color: #A6CE39; font-weight: 700; flex-shrink: 0;">✓</span> GOAL ONE</li>
      <li style="display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: #1A1A1A; line-height: 1.7; font-family: 'Montserrat', Arial, sans-serif;"><span style="color: #A6CE39; font-weight: 700; flex-shrink: 0;">✓</span> GOAL TWO</li>
    </ul>
  </div>
  <div style="padding: 20px 24px; border-bottom: 1px solid #E0E0E0;">
    <p style="font-size: 11px; font-weight: 700; color: #8D8D8D; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px 0; font-family: 'Montserrat', Arial, sans-serif;">Learning Objectives</p>
    <ul style="margin: 0; padding-left: 20px;">
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 5px; font-family: 'Montserrat', Arial, sans-serif;">OBJECTIVE ONE?</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; font-family: 'Montserrat', Arial, sans-serif;">OBJECTIVE TWO?</li>
    </ul>
  </div>
  <div style="padding: 20px 24px; border-radius: 0 0 12px 12px;">
    <p style="font-size: 11px; font-weight: 700; color: #8D8D8D; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px 0; font-family: 'Montserrat', Arial, sans-serif;">Evaluation Criteria</p>
    <p style="font-size: 13px; color: #444444; margin: 0 0 10px 0; font-family: 'Montserrat', Arial, sans-serif;">You'll be evaluated on your ability to:</p>
    <ul style="margin: 0; padding-left: 20px;">
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; margin-bottom: 5px; font-family: 'Montserrat', Arial, sans-serif;">CRITERION ONE</li>
      <li style="font-size: 14px; color: #1A1A1A; line-height: 1.7; font-family: 'Montserrat', Arial, sans-serif;">CRITERION TWO</li>
    </ul>
  </div>
</div>`
});
