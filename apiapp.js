document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch random meal
    function fetchRandomMeal() {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((data) => {
                // Update your HTML content with the fetched data
                const mealContainer = document.getElementById("random-meal-container");
                if (data.meals && data.meals.length > 0) {
                    const meal = data.meals[0];
                    mealContainer.innerHTML = ` 
                        <h2>${meal.strMeal}</h2>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <p>${meal.strInstructions}</p>
                    `;
                } else {
                    mealContainer.innerHTML = "<p>No meal found</p>";
                }
            })
            .catch((error) => console.error("Error fetching random meal:", error));
    }

    // Function to fetch seafood meals
    function fetchSeafoodMeals() {
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
            .then((response) => response.json())
            .then((data) => {
                // Update your HTML content with the fetched data
                const seafoodContainer = document.getElementById("seafood-container");

                if (data.meals && data.meals.length > 0) {
                    const seafoodMeals = data.meals;
                    const mealList = seafoodMeals
                        .map((meal) => `<li>${meal.strMeal}</li>`)
                        .join("");
                    seafoodContainer.innerHTML = `<ul>${mealList}</ul>`;
                } else {
                    seafoodContainer.innerHTML = "<p>No seafood meals found</p>";
                }
            })
            .catch((error) => console.error("Error fetching seafood meals:", error));
    }

    function openModal() {
        document.getElementById("modal").classList.add("active");
    }

    function closeModal() {
        document.getElementById("modal").classList.remove("active");
    }

    function showMealDetails() {
        var instructions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
        var ingredients = "Ingredient 1, Ingredient 2, Ingredient 3, ...";
        document.getElementById("meal-instructions").innerText = instructions;
        document.getElementById("meal-ingredients").innerText = ingredients;
        openModal();
    }

    fetchRandomMeal();
    fetchSeafoodMeals();
});

document.addEventListener("DOMContentLoaded", function () {
    // Your existing JavaScript code

    const searchBtn = document.getElementById('search-btn');
    const searchResultsList = document.getElementById('search-results-list');
    const mealList = document.getElementById('meal');

    // Event listener for search button
    searchBtn.addEventListener('click', searchMeals);

    // Function to fetch meals based on search
    function searchMeals() {
        let searchInputTxt = document.getElementById('search-input').value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
            .then(response => response.json())
            .then(data => displaySearchResults(data.meals))
            .catch((error) => console.error("Error searching meals:", error));
    }

    // Function to display search results
    function displaySearchResults(meals) {
        searchResultsList.innerHTML = ""; // Clear previous results

        if (meals) {
            meals.forEach(meal => {
                const li = document.createElement('li');
                li.textContent = meal.strMeal;
                li.addEventListener('click', () => showMealDetails(meal));
                searchResultsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = "No matching meals found";
            searchResultsList.appendChild(li);
        }
    }

    // Function to show meal details in a modal
    function showMealDetails(meal) {
        const instructions = meal.strInstructions || "No instructions available";
        const ingredients = meal.strIngredients || "No ingredients available";

        document.getElementById("meal-instructions").innerText = instructions;
        document.getElementById("meal-ingredients").innerText = ingredients;
        openModal();
    }

    // Event listener for meal item image click
    mealList.addEventListener('click', function (e) {
        if (e.target.classList.contains('meal-img')) {
            const mealItem = e.target.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
                .then(response => response.json())
                .then(data => showMealDetailsOnImageClick(data.meals[0]))
                .catch((error) => console.error("Error fetching meal details:", error));
        }
    });

    // Function to show meal details in a modal when image is clicked
    function showMealDetailsOnImageClick(meal) {
        const instructions = meal.strInstructions || "No instructions available";
        const ingredients = meal.strIngredients || "No ingredients available";

        document.getElementById("meal-instructions").innerText = instructions;
        document.getElementById("meal-ingredients").innerText = ingredients;
        openModal();
    }
});


