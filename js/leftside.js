// Get references
const quotebtn = document.getElementById('quoteBtn');
const sidebar = document.getElementById('sidebar');
const form = document.getElementById('quoteForm');
const select = document.getElementById('serviceSelect');
const customInput = document.getElementById('customService');
const loadingScreen = document.getElementById('loadingScreen'); // <-- add a div for loading
let isSubmitting = false; // flag to prevent duplicates

// Toggle sidebar
quotebtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

// Show/hide custom input depending on dropdown selection
select.addEventListener('change', () => {
  if (select.value === 'Other') {
    customInput.style.display = 'block';
    customInput.required = true;
    customInput.focus();
  } else {
    customInput.style.display = 'none';
    customInput.required = false;
    customInput.value = '';
  }
});

// Handle form submission
form.addEventListener('submit', e => {
  e.preventDefault();

  // Prevent duplicate submissions
  if (isSubmitting) return;
  isSubmitting = true;

  // Show loading screen
  loadingScreen.style.display = 'flex';

  // Get selected service
  let selectedService = select.value;
  if (selectedService === 'Other' && customInput.value.trim() !== '') {
    selectedService = customInput.value.trim();
  }

  // Collect all form data
  const data = new FormData(form);
  data.set('service', selectedService); // overwrite service with custom if needed

  // Send to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbyA4zN31Ix2XA9d2BDLavBRewC4TwTassQVrM1ZknRr4e18w73iFj6EJZjKHi--LpInug/exec', {
    method: 'POST',
    body: data
  })
  .then(res => res.text())
  .then(msg => {
    // Hide loading screen
    loadingScreen.style.display = 'none';

    // Show success popup
    alert(msg);

    form.reset();     // Clear form fields
    sidebar.classList.remove('show'); // Close sidebar
  })
  .catch(err => {
    loadingScreen.style.display = 'none';
    alert('Error: ' + err);
  })
  .finally(() => {
    isSubmitting = false; // reset flag
  });
});