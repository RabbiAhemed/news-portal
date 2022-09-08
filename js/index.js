// Load Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data.news_category));
};
// Show Categories
const showCategories = (categories) => {
  const categoriesSection = document.getElementById("categories-container");

  categories.filter((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div onclick="loadCategoryDetail(${category.category_id})">

                <p class="mx-4 fw-bold">${category.category_name}</p>
            
        </div>`;
    categoriesSection.appendChild(div);
  });
};

// spinner
const toggleSpinner = (isLoading) => {
  const spinnerSection = document.getElementById("spinner");
  if (isLoading) {
    spinnerSection.classList.remove("d-none");
  } else {
    spinnerSection.classList.add("d-none");
  }
};
// toggle view section
const toggleViewSection = (isAvailable) => {
  const viewSection = document.getElementById("view-section");
  if (isAvailable) {
    viewSection.classList.remove("d-none");
  } else {
    viewSection.classList.add("d-none");
  }
};
// toggle footer
const toggleFooter = (isAvailable) => {
  const footer = document.getElementById("footer");
  if (isAvailable) {
    footer.classList.remove("d-none");
  } else {
    footer.classList.add("d-none");
  }
};

// Load Categories Details
const loadCategoryDetail = (category_id) => {
  toggleSpinner(true);
  toggleViewSection(true);
  toggleFooter(true);
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryDetails(data.data))
    .catch((error) => console.log(error));
};

const displayCategoryDetails = (categories) => {
  categories.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  // console.log(categories);
  const noResult = document.getElementById("no-result");
  // show number of contents in that category
  const lengthOfArray = [];
  const arrayLength = categories.map((category) =>
    lengthOfArray.push(category)
  );
  const resultNumber = document.getElementById("result-number");
  resultNumber.classList.add("bg-light");
  resultNumber.classList.add("my-3");
  resultNumber.innerHTML = ``;
  const p = document.createElement("p");
  p.innerHTML = `${arrayLength.length} news found in this category`;
  resultNumber.appendChild(p);
  //
  // Get Category Details Container
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );

  categoryDetailsContainer.innerHTML = "";
  // check if category has data inside and show no data found
  if (categories.length == 0) {
    toggleViewSection(false);
    toggleFooter(true);
    // resultNumber.innerHTML = ``;
    categoryDetailsContainer.classList.add("text-center");
    categoryDetailsContainer.innerHTML = `
    <h1 class="fw-bold text-info fst-italic"> No News Found In This Category</h1>
    `;
    // noResult.innerHTML = ``;
  }
  //
  else {
    toggleViewSection(true);
    toggleFooter(true);
    for (const category of categories) {
      const div = document.createElement("div");
      div.classList.add("mb-3");
      div.classList.add("card");
      div.innerHTML = `
  <div class="row g-0 p-2 ">
  <div class="col-md-4">
    <img src="${category.thumbnail_url}" class="img-fluid " alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${category.title}</h5>
      <p class="card-text">${category.details.slice(0, 150).concat("...")}</p>
      <div class="card-bottom">
      <div class="author-info">
      <img src="${
        category.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
      <span class="card-text fst-italic"><small class="text-muted">${
        category.author.name ? category.author.name : "No data available"
      }</small></span>
      </div>
      <div><span class="card-text fst-italic"><small class="text-muted">Views:${
        category.total_view ? category.total_view : "No data available"
      }</small></span></div>
      <div><button onclick="loadNewsDetail('${
        category._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
      </div>
      </div>
      </div>
  </div>
</div>
  `;
      categoryDetailsContainer.appendChild(div);
    }
    /* Todays pick start */
    document
      .getElementById("todays-pick-button")
      .addEventListener("click", function () {
        categoryDetailsContainer.innerHTML = ``;

        for (category of categories) {
          if (category.others_info.is_todays_pick === true) {
            // console.log("found true");
            const div = document.createElement("div");
            div.classList.add("mb-3");
            div.classList.add("card");
            div.innerHTML = `
  <div class="row g-0 p-2 ">
  <div class="col-md-4">
    <img src="${category.thumbnail_url}" class="img-fluid " alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${category.title}</h5>
      <p class="card-text">${category.details.slice(0, 150).concat("...")}</p>
      <div class="card-bottom">
      <div class="author-info">
      <img src="${
        category.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
      <span class="card-text fst-italic"><small class="text-muted">${
        category.author.name ? category.author.name : "No data available"
      }</small></span>
      </div>
      <div><span class="card-text fst-italic"><small class="text-muted">Views:${
        category.total_view ? category.total_view : "No data available"
      }</small></span></div>
      <div><button onclick="loadNewsDetail('${
        category._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
      </div>
      </div>
      </div>
  </div>
</div>
  `;

            categoryDetailsContainer.appendChild(div);
          }
        }
      });
    /* Todays pick end */
    /* Trending start */
    document
      .getElementById("trending-button")
      .addEventListener("click", function () {
        categoryDetailsContainer.innerHTML = ``;

        for (category of categories) {
          if (category.others_info.is_trending) {
            const div = document.createElement("div");
            div.classList.add("mb-3");
            div.classList.add("card");
            div.innerHTML = `
  <div class="row g-0 p-2 ">
  <div class="col-md-4">
    <img src="${category.thumbnail_url}" class="img-fluid " alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${category.title}</h5>
      <p class="card-text">${category.details.slice(0, 150).concat("...")}</p>
      <div class="card-bottom">
      <div class="author-info">
      <img src="${
        category.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
      <span class="card-text fst-italic"><small class="text-muted">${
        category.author.name ? category.author.name : "No data available"
      }</small></span>
      </div>
      <div><span class="card-text fst-italic"><small class="text-muted">Views:${
        category.total_view ? category.total_view : "No data available"
      }</small></span></div>
      <div><button onclick="loadNewsDetail('${
        category._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
      </div>
      </div>
      </div>
  </div>
</div>
  `;

            categoryDetailsContainer.appendChild(div);
          }
        }
      });
    /* Trending end */
  }
  toggleSpinner(false);
};

const loadNewsDetail = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (news) => {
  const modalBody = document.getElementById("modal");
  modalBody.innerHTML = ``;
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.classList.add("bg-light");
  div.innerHTML = `

      <div class="modal-header bg-info">
      <h5 class="modal-title bg-info" id="exampleModalLongTitle">News Details</h5>
        <button type="button" class="close btn-danger" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <img src="${news.image_url}" class=" img-fluid w-100" alt=""></img>
      <h5 class="my-3" id="exampleModalLongTitle">${news.title}</h5>
      
      <img src="${
        news.author.img
      }" class=" author-img rounded-circle my-2" alt="author..."></img>
      <span class="fst-italic"><small class="text-muted my-2">Author : ${
        news.author.name ? news.author.name : "No data available"
      }</small></span>
      <div class="d-flex justify-content-around align-items-center"> 
      
      <p class="fst-italic">Total Views : ${
        news.total_view ? news.total_view : "No data available"
      }</p>
        
        <p class="fst-italic">Rating : ${news.rating.number} </p>
        <p class="ms-2 fst-italic">Comment : ${news.rating.badge}</p>
        </div>
        <p class="fw-bold fst-italic">${news.details}</p>
        
        <p><span class="fst-italic">Publishing Date : </span> ${
          news.author.published_date
            ? news.author.published_date
            : "Publishing date is not available"
        }</p>  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
      </div>
      `;
  modalBody.appendChild(div);
};

/* Load and Show All Trending News Starts */

const loadAllTrendingNews = () => {
  url = `https://openapi.programming-hero.com/api/news/category/08`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllTrendingNews(data.data));
};

const showAllTrendingNews = (allTrendingNews) => {
  const resultNumber = document.getElementById("result-number");

  resultNumber.innerHTML = ``;
  resultNumber.classList.add("bg-light");
  resultNumber.classList.add("my-3");
  const p = document.createElement("p");
  p.innerHTML = ` Trending News `;
  resultNumber.appendChild(p);

  // console.log(allTrendingNews);
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );
  categoryDetailsContainer.innerHTML = "";
  for (news of allTrendingNews) {
    // console.log(news);
    if (news.others_info.is_trending === true) {
      // console.log("all trending news");
      const div = document.createElement("div");
      div.classList.add("mb-3");
      div.classList.add("card");
      div.innerHTML = `
<div class="row g-0 p-2 ">
<div class="col-md-4">
<img src="${news.thumbnail_url}" class="img-fluid " alt="...">
</div>
<div class="col-md-8">
<div class="card-body">
<h5 class="card-title">${news.title}</h5>
<p class="card-text">${news.details.slice(0, 150).concat("...")}</p>
<div class="card-bottom">
<div class="author-info">
<img src="${
        news.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
<span class="card-text fst-italic"><small class="text-muted">${
        news.author.name ? news.author.name : "No data available"
      }</small></span>
</div>
<div><span class="card-text fst-italic"><small class="text-muted">Views:${
        news.total_view ? news.total_view : "No data available"
      }</small></span></div>
<div><button onclick="loadNewsDetail('${
        news._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
</div>
</div>
</div>
</div>
</div>
`;

      categoryDetailsContainer.appendChild(div);
    }
  }
  // console.log("clicked");
};

/* Load and Show All Trending News Ends */

/* Load and Show All Todays Pick News Starts*/

const loadAllTodaysPickNews = () => {
  url = `https://openapi.programming-hero.com/api/news/category/08`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllTodaysPickNews(data.data));
};

const showAllTodaysPickNews = (allTodaysPickNews) => {
  const resultNumber = document.getElementById("result-number");

  resultNumber.innerHTML = ``;
  resultNumber.classList.add("bg-light");
  resultNumber.classList.add("my-3");
  const p = document.createElement("p");
  p.innerHTML = ` Todays Pick `;
  resultNumber.appendChild(p);

  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );
  categoryDetailsContainer.innerHTML = "";
  for (news of allTodaysPickNews) {
    if (news.others_info.is_todays_pick === true) {
      const div = document.createElement("div");
      div.classList.add("mb-3");
      div.classList.add("card");
      div.innerHTML = `
<div class="row g-0 p-2 ">
<div class="col-md-4">
<img src="${news.thumbnail_url}" class="img-fluid " alt="...">
</div>
<div class="col-md-8">
<div class="card-body">
<h5 class="card-title">${news.title}</h5>
<p class="card-text">${news.details.slice(0, 150).concat("...")}</p>
<div class="card-bottom">
<div class="author-info">
<img src="${
        news.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
<span class="card-text fst-italic"><small class="text-muted">${
        news.author.name ? news.author.name : "No data available"
      }</small></span>
</div>
<div><span class="card-text fst-italic"><small class="text-muted">Views:${
        news.total_view ? news.total_view : "No data available"
      }</small></span></div>
<div><button onclick="loadNewsDetail('${
        news._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
</div>
</div>
</div>
</div>
</div>
`;

      categoryDetailsContainer.appendChild(div);
    }
  }
};

/* Load and Show All Todays pick News Ends */

loadCategories();
