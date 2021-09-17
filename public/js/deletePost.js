const deletePostFormHandler = async (event) => {
    event.preventDefault();
 
   
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

  
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id : id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
 

  document
  .querySelector('.delete')
  .addEventListener('click', deletePostFormHandler);