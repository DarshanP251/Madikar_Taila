// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {

    // Select all dropdown buttons and links
    const qtySelectButtons = document.querySelectorAll(".buttons1, .buttons2, .buttons3");
    const searchBarButton = document.querySelector("#magnifierIcon");
    const whatsappButton = document.querySelector("#whatsappBtn");
    const shopNowButton = document.querySelector("#shopnowContainer");
  
    // Popup Containers
    const popupContainer = document.querySelector("#sampleContainer");
    const searchBarPopup = document.querySelector("#searchBarContainer");
  
    // Dropdown List Toggle (For Select Quantity)
    qtySelectButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dropdownList = button.nextElementSibling;
        dropdownList.classList.toggle("show");
      });
    });
  
    // Close popup when user clicks outside the popup container (for quantity selector)
    document.addEventListener("click", (event) => {
      if (!popupContainer.contains(event.target) && !qtySelectButtons[0].contains(event.target)) {
        popupContainer.style.display = "none";
      }
    });
  
    // Search bar functionality
    searchBarButton.addEventListener("click", () => {
      searchBarPopup.style.display = "block";
    });
  
    // Close search bar popup when clicked outside
    document.addEventListener("click", (event) => {
      if (!searchBarPopup.contains(event.target) && !searchBarButton.contains(event.target)) {
        searchBarPopup.style.display = "none";
      }
    });
  
    // WhatsApp button functionality
    whatsappButton.addEventListener("click", () => {
      window.open("https://wa.me/yourwhatsappnumber", "_blank");
    });
  
    // "Shop Now" button interaction
    shopNowButton.addEventListener("click", () => {
      window.location.href = "/shop"; // Redirect to the shop page (change URL if needed)
    });
  
    // Show and hide the dropdown for quantity options
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
      item.addEventListener("click", (event) => {
        const selectedOption = item.querySelector(".selected-option").innerText;
        const parentButton = item.closest('.buttons1');
        parentButton.querySelector('.selected-option').innerText = selectedOption;
        item.closest('.drowdown-list').classList.remove('show');
      });
    });
  
    // Close dropdown when user clicks outside of the dropdown
    document.addEventListener("click", (event) => {
      dropdownItems.forEach((item) => {
        if (!item.contains(event.target)) {
          item.closest('.drowdown-list').classList.remove('show');
        }
      });
    });
  
  });
  