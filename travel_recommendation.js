document.addEventListener("DOMContentLoaded", function () {
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {const searchButton = document.querySelector("#searchButton");
      const clearButton = document.querySelector("#clearButton");

      searchButton.addEventListener("click", function () {
        const userInput = document
          .querySelector("#searchInput")
          .value.toLowerCase();
        const matchingResults = filterResults(data, userInput);
        displayResults(matchingResults);
      });

      clearButton.addEventListener("click", function () {
        clearResults();
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  function filterResults(data, userInput) {
    const matchingResults = [];

    data.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(userInput)) {
        matchingResults.push({
          type: "Country",
          name: country.name,
          imageUrl: country.cities[0].imageUrl,
          description: country.cities[0].description
        });
      }
      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(userInput)) {
          matchingResults.push({
            type: "City",
            name: city.name,
            imageUrl: city.imageUrl,
            description: city.description
          });
        }
      });
    });

    data.temples.forEach((temple) => {
      if (temple.name.toLowerCase().includes(userInput)) {
        matchingResults.push({
          type: "Temple",
          name: temple.name,
          imageUrl: temple.imageUrl,
          description: temple.description
        });
      }
    });

    data.beaches.forEach((beach) => {
      if (beach.name.toLowerCase().includes(userInput)) {
        matchingResults.push({
          type: "Beach",
          name: beach.name,
          imageUrl: beach.imageUrl,
          description: beach.description
        });
      }
    });

    return matchingResults;
  }

  function displayResults(results) {
    const resultsContainer = document.querySelector("#resultsContainer");
    resultsContainer.innerHTML = "";

    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.innerHTML = `
                <h3>${result.type}: ${result.name}</h3>
                <img src="${result.imageUrl}" alt="${result.name}">
                <p>${result.description}</p>
            `;
      resultsContainer.appendChild(resultElement);
    });
  }

  function clearResults() {
    const resultsContainer = document.querySelector("#resultsContainer");
    resultsContainer.innerHTML = "";
  }
});
