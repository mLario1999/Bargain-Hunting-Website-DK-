const searchbtn = document.getElementById("search-btn")
const resultsContainer = document.querySelector(".results-container");
const searchInput = document.getElementById("search-input")

searchbtn.addEventListener("click", async function () {
    const queryString = searchInput.value
    try {
        const response = await fetch(`/query?search=${queryString}`);
        const html = await response.text();
        resultsContainer.innerHTML = html;
    } catch (error) {
        console.error("Error fetching data:", error);
        return
    }
})

searchInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault
        searchbtn.click()
    } 
})