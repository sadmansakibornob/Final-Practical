function searchMeal(event) {
  event.preventDefault();
  var searchTerm = document.getElementById("searchBar").value;
  document.getElementById("searchBar").value = "";
  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showResult(data));
}

function showResult(data) {
  var allMeals = data.meals;
  var showContent = document.getElementById("displayArea");
  showContent.innerHTML = "";

  if (allMeals && allMeals.length > 0) {
    var gridContainer = document.createElement("div");
    gridContainer.classList.add("row", "g-4");

    var firstFive = allMeals.slice(0, 5);
    for (var i = 0; i < firstFive.length; i++) {
      var meal = firstFive[i];
      var newDiv = document.createElement("div");
      newDiv.classList.add("col-md-4", "mb-4");
      createMealCard(meal, newDiv);
      gridContainer.appendChild(newDiv);
    }
    showContent.appendChild(gridContainer);

    if (allMeals.length > 5) {
      var remainingMeals = allMeals.slice(5);
      document.getElementById("showAllBtn").classList.remove("d-none");
      document.getElementById("showAllBtn").onclick = function () {
        for (var j = 0; j < remainingMeals.length; j++) {
          var newDiv = document.createElement("div");
          newDiv.classList.add("col-md-4", "mb-4");
          createMealCard(remainingMeals[j], newDiv);
          gridContainer.appendChild(newDiv);
        }
        document.getElementById("showAllBtn").classList.add("d-none");
      };
    }
  } else {
    showContent.innerHTML = "<p>No meals found.</p>";
  }
}

function createMealCard(meal, newDiv) {
  const uniqueId = `flush-collapse-${meal.idMeal}`;
  newDiv.innerHTML = `
      <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body card-header">
            <h5 class="card-title">${meal.strMeal}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><p><strong>ID: </strong>${meal.idMeal}</p></li>
            <li class="list-group-item"><p><strong>Category: </strong>${meal.strCategory}</p></li>
            <li class="list-group-item"><p><strong>Area: </strong>${meal.strArea}</p></li>            
        </ul> 
        
        <!-- Accordion structure -->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${uniqueId}" aria-expanded="false" aria-controls="${uniqueId}">
                <strong>Cooking Instructions</strong>
              </button>
            </h2>
            <div id="${uniqueId}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">${meal.strInstructions}</div>
            </div>
          </div>
        </div>
      </div>
    `;
}
