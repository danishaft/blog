let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form');
let title = document.querySelector('#title');
let body = document.querySelector('#body');

let postBox = [];



function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => {
    console.log(postBox)
    postBox = data

    let postHolder = '';
    postBox.forEach(post => {
        console.log(post)
         postHolder += `<div class="col-12">
                            <div class="card border-0 my-3" style="background-color: rgba(17, 24, 39, 0.9);">
                                <div class="card-body">
                                    <h5 class="card-title fs-1 fw-bold">${post.title}</h5>
                                    <p class="time blur-text small-text">Jun 15 2021</p>
                                    <p class="card-text fs-5 blur-text">${post.body.slice(0, 200)}</p>
                                    <div class="down d-flex justify-content-between px-2">
                                        <a  class="card-link" onclick="openSingle(${post.id})">View...</a>
                                        <div class="postcard-button">
                                            <button type="button"  class="btn btn-outline-primary mx-2 rounded" onclick="deletePost(${post.id})"><i class="bi bi-trash3 pe-2"></i>Delete</button>
                                            <button type="button" class="btn btn-outline-primary rounded" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square pe-2"></i>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    });
    postWrapper.innerHTML = postHolder;

  })
}



postForm.addEventListener('submit', createPosts)

function createPosts(e) {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title.value,
        body: body.value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())

  .then((data) => {

    postBox.unshift(data);
    console.log(postBox)
    let postHolder = '';
    postBox.forEach(post => {
         postHolder += `<div class="col-12" >
                            <div class="card border-0 my-3" style="background-color: rgba(17, 24, 39, 0.9);">
                                <div class="card-body">
                                    <h5 class="card-title fs-1 fw-bold">${post.title}</h5>
                                    <p class="time blur-text small-text">Jun 15 2021</p>
                                    <p class="card-text fs-5 blur-text">${post.body.slice(0, 200)}</p>
                                    <div class="down d-flex justify-content-between px-2">
                                        <a href="" class="card-link" onclick="openSingle(${post.id})">View...</a>
                                        <div class="postcard-button">
                                            <button type="button" class="btn btn-outline-primary mx-2 rounded" onclick="deletePost(${post.id})"><i class="bi bi-trash3 pe-2"></i>Delete</button>
                                            <button type="button" class="btn btn-outline-primary rounded" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square pe-2"></i>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    });
    postWrapper.innerHTML = postHolder
    
  })
}




function updatePost(id) {

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: body.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())

    .then((data) => {

      console.log(data)

      let postTitles = document.querySelectorAll('.card-title')
      let postBodies = document.querySelectorAll('.card-text')
      console.log(postTitles)
      postTitles.forEach((postTitle, index) => {
        if(index + 1 === id) {
          if(data.title !== "") {
            postTitle.innerHTML = data.title
          }
        }
      })

      postBodies.forEach((postBody, index) => {
        if(index + 1 === id) {
          if(data.body !== "") {
            postBody.innerHTML = data.body
          }
        }
      })

    });
}


function openSingle(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('viewedPost', JSON.stringify(data))
      window.location.href = 'detials.html'
    });
}




function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json"
      }
    })
        .then((response) => response.json())
        .then((data) => {

        //postBox = postBox.filter(post => post.id !== id)
        postBox.shift(data)

        let postHolder = '';
      postBox.forEach(post => {
         postHolder += `<div class="col-12" >
                            <div class="card border-0 my-3" style="background-color: rgba(17, 24, 39, 0.9);">
                                <div class="card-body">
                                    <h5 class="card-title fs-1 fw-bold">${post.title}</h5>
                                    <p class="time blur-text small-text">Jun 15 2021</p>
                                    <p class="card-text fs-5 blur-text">${post.body.slice(0, 200)}</p>
                                    <div class="down d-flex justify-content-between px-2">
                                        <a href="" class="card-link" onclick="openSingle(${post.id})">View...</a>
                                        <div class="postcard-button">
                                            <button type="button" class="btn btn-outline-primary mx-2 rounded" onclick="deletePost(${post.id})"><i class="bi bi-trash3 pe-2"></i>Delete</button>
                                            <button type="button" class="btn btn-outline-primary rounded" onclick="updatePost(${post.id})"><i class="bi bi-pencil-square pe-2"></i>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    });
    postWrapper.innerHTML = postHolder
    })
    
}

