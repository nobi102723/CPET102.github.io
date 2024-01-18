document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');
    const input = document.getElementById('inputModalSearch');
    const modal = new bootstrap.Modal(document.getElementById('templatemo_search')); // Initialize the modal
    
    form.addEventListener('submit', function (event) {

        event.preventDefault();
        const searchTerm = input.value.toLowerCase();
                
        // Redirect to the search results page with the search term as a query parameter
        window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                
        // Hide the modal after handling the search (you can remove this line if you want to keep the modal open)
        modal.hide();
    });
});