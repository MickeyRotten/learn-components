register({
  id: 'image-caption',
  name: 'Image + Caption',
  desc: 'Figure with accessible caption',
  group: 'Teaching',
  icon: '🖼',
  code: `<figure style="margin: 24px 0; font-family: 'Montserrat', Arial, sans-serif;">
  <img src="https://placehold.co/800x400/000000/FDB92A/png?text=Image+Placeholder" alt="Describe the image content here" style="width: 100%; display: block; border-radius: 10px; height: auto;">
  <figcaption style="font-size: 13px; color: #8D8D8D; margin-top: 10px; text-align: center; font-family: 'Montserrat', Arial, sans-serif;">Figure caption — describe what the image shows and why it is relevant.</figcaption>
</figure>`
});
