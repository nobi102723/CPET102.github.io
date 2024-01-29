document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('searchForm');
    const input = document.getElementById('inputModalSearch');
    const modal = new bootstrap.Modal(document.getElementById('templatemo_search')); // Initialize the modal

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = input.value.toLowerCase();

        // Hide the modal after handling the search (you can remove this line if you want to keep the modal open)
        window.location.href = `search?q=${encodeURIComponent(searchTerm)}`;
        modal.hide();
    });
});

