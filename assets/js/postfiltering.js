// Supports blog post filtering, mostly on the main page
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-button');
  const postItems = document.querySelectorAll('.post-item');
  const maxPosts = 8;

  // Define your tag-to-emoji mapping here (used for post prefixes when 'All' is selected)
  const tagEmojiMap = {
    'insights': '📊',
    'games': '🎮',
    'research': '🔬',
    'tools': '🔧',
  };

  function filterPosts(selectedTag) {
    let numPosts = 0;

    postItems.forEach(post => {
      const postTag = post.dataset.tag;
      const tagEmojiSpan = post.querySelector('.tag-emoji');

      if (numPosts < maxPosts) {
        if (selectedTag === 'all' || postTag === selectedTag) {
          if (selectedTag === 'all') {
            post.style.display = 'block'
          } else {
            post.style.display = 'list-item';
            // post.style.paddingLeft = '30px'
          }

          if (tagEmojiSpan) {
            // Only show emoji for post prefixes if 'all' is selected
            if (selectedTag === 'all') {
              const emoji = tagEmojiMap[postTag] || '❔'; // Default emoji if tag not found
              tagEmojiSpan.textContent = emoji + ' ';
              tagEmojiSpan.style.display = 'inline';
            } else {
              tagEmojiSpan.style.display = 'none'; // Hide emoji when filtering
            }
          }
          numPosts++;
        } else {
          post.style.display = 'none';
        }
      } else {
        post.style.display = 'none';
      }
    });
  }

  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'active' class from all buttons
      tagButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      this.classList.add('active');

      const selectedTag = this.dataset.tag;
      filterPosts(selectedTag);
    });
  });

  // Initial filter on page load (i.e. show all posts w/ emoji)
  filterPosts('all');
});