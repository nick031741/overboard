const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(block => {
  observer.observe(block);
});


document.addEventListener('DOMContentLoaded', () => {
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
});
