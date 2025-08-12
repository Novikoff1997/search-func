const booksList = document.querySelector(".books__list"); // Контейнер карточек
const allBooks = booksList.querySelectorAll(".book__card"); // Все карточки

const searchInput = document.querySelector(".search-input");
const categoriesList = document.querySelector(".categories-list");
const publishingHousesList = document.querySelector(".publishing-houses");
const yearsRange = document.querySelector(".years-range");

const spanYearValue = document.querySelector(".year-value");

const allItems = [...allBooks];
let filteredItemsArray = [];

let searchInputValue;
let searchFilterValue;
let publishersValue = [];
let yearRangeValue;

const viewItems = () => {
  booksList.innerHTML = "";
  filteredItemsArray.forEach((book) => {
    booksList.append(book);
  });
};

const startFilter = () => {
  const filteredItems = allItems.filter((item) => {
    const itemName = item.querySelector(".book__title").textContent.toLowerCase();
    const itemFilterCategory = item.dataset.category;
    const itemPublisher = item.dataset.publishing;
    const itemYear = item.dataset.year;

    const serachInputText = searchInputValue ? itemName.startsWith(searchInputValue) : true;
    const searchCategory = searchFilterValue
      ? searchFilterValue === "all"
        ? true
        : itemFilterCategory === searchFilterValue
      : true;
    const searchPublisher = publishersValue.length > 0 ? publishersValue.includes(itemPublisher) : true;
    const searchYears = yearRangeValue ? itemYear > yearRangeValue : true;

    return serachInputText && searchCategory && searchPublisher && searchYears;
  });

  filteredItemsArray = [...filteredItems];
  viewItems();
};

searchInput.addEventListener("input", (e) => {
  searchInputValue = e.target.value.trim().toLowerCase();
  startFilter();
});

categoriesList.addEventListener("click", (e) => {
  if (e.target.dataset.filter) {
    searchFilterValue = e.target.dataset.filter;
    startFilter();
  }
});

publishingHousesList.addEventListener("input", (e) => {
  e.target.checked ? publishersValue.push(e.target.value) : publishersValue.pop(e.target.value);
  startFilter();
});

yearsRange.addEventListener("input", (e) => {
  yearRangeValue = e.target.value;
  spanYearValue.textContent = yearRangeValue;
  startFilter();
});
