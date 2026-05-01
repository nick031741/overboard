document.addEventListener('DOMContentLoaded', () => {

  // ===== FAQ =====
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');

      item.classList.toggle('active');

      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // ===== CONSENT CHECKBOX =====
  const consentCheckbox = document.getElementById('consentCheckbox');
  const submitBtn = document.getElementById('modalSubmit');

  if (consentCheckbox && submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';

    consentCheckbox.addEventListener('change', () => {
      if (consentCheckbox.checked) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
      }
    });
  }

});