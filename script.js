document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Loop through each event section
    const cardGroups = document.querySelectorAll('.card-group');

    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll('.card-item');
      let groupHasMatch = false;

      cards.forEach((card) => {
        // Read the text from data-name or inner text
        const cardName = card.getAttribute('data-name')?.toLowerCase() || card.innerText.toLowerCase();

        if (cardName.includes(query)) {
          card.style.display = 'block'; // Show card
          groupHasMatch = true;
        } else {
          card.style.display = 'none'; // Hide card
        }
      });

      // Also check if the section title matches the search term
      const groupTitle = group.querySelector('.group-title')?.innerText.toLowerCase() || '';
      if (groupTitle.includes(query)) {
        // If the section title matches, show all cards in this section
        cards.forEach((card) => (card.style.display = 'block'));
        groupHasMatch = true;
      }

      // Hide the entire section title & container if nothing matches
      group.style.display = groupHasMatch ? 'block' : 'none';
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const fullImage = document.getElementById('fullImage');
  const closeBtn = document.querySelector('.close-btn');

  // Listen for clicks on cards
  document.querySelectorAll('.card-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      // Prevent default page redirect navigation if you use <a> tags solely for popups
      e.preventDefault(); 

      const cardDiv = item.querySelector('.card, .pola');
      
      // Extract the image URL from background-image style attribute
      const bgStyle = cardDiv.style.backgroundImage;
      const imageUrl = bgStyle.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');

      if (imageUrl) {
        fullImage.src = imageUrl;
        modal.style.display = 'flex'; // Show modal overlay
      }
    });
  });

  // Close modal when clicking the 'X' button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking anywhere on the dark background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal on 'Escape' key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
});
