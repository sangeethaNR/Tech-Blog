const commentPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const content = document.getElementById('comments').value.trim();
  
    if ( content) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id,content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  

  document
  .getElementById('comments-btn')
  .addEventListener('click', commentPostFormHandler);
  
 