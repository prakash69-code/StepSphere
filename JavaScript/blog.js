// Blog page category toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const contents = document.querySelectorAll('.content');

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding content
      const targetId = this.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});
