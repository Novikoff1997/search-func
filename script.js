const booksContainer = document.querySelector(".books__list"); // Контейнер карточек (родительский блок)
const booksCards = booksContainer.querySelectorAll(".book__card"); // Все карточки (общий класс)
const searchInput = document.querySelector(".search-input"); // Поле ввода поиска
const categoriesList = document.querySelector(".categories-list"); // Список категорий (родительский блок)
const publishingHousesList = document.querySelector(".publishing-houses"); // Список издателей (Родительский блок)
const yearsRange = document.querySelector(".years-range"); // Ползунок установки года (элемент input range)
const yearValueDisplay = document.querySelector(".year-value"); // Поле для отображения текущего года (Если есть)

const booksArray = [...booksCards];
let filteredBooksArray = [];

// Состоние

const filters = {
  searchText: "",
  category: null,
  publishers: [],
  year: null,
};

// Функция дебаунс

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Функция рендера книг

const renderBooks = () => {
  booksContainer.innerHTML = "";

  if (filteredBooksArray.length > 0) {
    filteredBooksArray.forEach((book) => booksContainer.append(book));
  } else {
    booksContainer.innerHTML = "Книг не найдено"; // Если не нужно сообщение о том что книги не найдены удалить блок else
  }
};

// Условия для фильтров

const matchesSearchText = (bookName) => {
  if (!filters.searchText) return true;
  return bookName.toLowerCase().startsWith(filters.searchText.toLowerCase());
};

const matchesCategory = (bookCategory) => {
  if (!filters.category || filters.category === "all") return true;
  return bookCategory === filters.category;
};

const matchesPublisher = (bookPublisher) => {
  if (filters.publishers.length === 0) return true;
  return filters.publishers.includes(bookPublisher);
};

const matchesYear = (bookYear) => {
  if (!filters.year) return true;
  return bookYear > filters.year;
};

// Функция старта фильтрации

const startFilter = () => {
  const filteredItems = booksArray.filter((item) => {
    const bookData = item.querySelector(".data-attributes").dataset;

    console.log(bookData.publisher);

    return (
      matchesSearchText(bookData.name) &&
      matchesCategory(bookData.category) &&
      matchesPublisher(bookData.publisher) &&
      matchesYear(bookData.year)
    );
  });

  filteredBooksArray = [...filteredItems];
  renderBooks();
};

// Отслушиватели событий

searchInput.addEventListener(
  "input",
  debounce((e) => {
    filters.searchText = e.target.value.trim();
    startFilter();
  }, 300)
);

categoriesList.addEventListener(
  "click",
  debounce((e) => {
    if (e.target.dataset.filter) {
      filters.category = e.target.dataset.filter;
      startFilter();
    }
  }, 300)
);

publishingHousesList.addEventListener(
  "input",
  debounce((e) => {
    e.target.checked ? filters.publishers.push(e.target.value) : filters.publishers.pop(e.target.value);
    startFilter();
  }, 300)
);

yearsRange.addEventListener(
  "input",
  debounce((e) => {
    filters.year = e.target.value;
    startFilter();
  }, 300)
);

yearsRange.addEventListener("input", (e) => {
  yearValueDisplay.textContent = e.target.value;
});
