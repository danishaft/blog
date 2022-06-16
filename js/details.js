/*const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");

const renderDetails = async () => { 
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();
    
  const  template = `
    <img src="img/blog-1.jpg" class="img-fluid rounded-start" alt="...">
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `
    container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderDetails());*/


const id = new URLSearchParams(window.location.search).get('id');

const renderDetails = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();

    console.log(post)
}


window.addEventListener('DOMContentLoaded', () => renderDetails());