/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/**
 * Global variables
 */
const studentsLi = document.querySelectorAll('li.student-item');
const itemsToShow = 10;


// exceeds expectations 
/**
 * Create and append search div
 */
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';

const input = document.createElement('input');
input.placeholder = 'Search for students...';

const button = document.createElement('button');
button.textContent = 'search';

const message = document.createElement('h4');
message.textContent = 'No results';
message.style.display = 'none';

searchDiv.appendChild(input);
searchDiv.appendChild(button);
searchDiv.appendChild(message);

const mainHeaderDiv = document.querySelector('div.page-header');
mainHeaderDiv.appendChild(searchDiv);


/**
 * Search the words typed by user in <li> element's user name and 
 * print elements found or 'No result' message
 * @param {Array} studentsLi 
 * @param {HTML element} searchInput 
 */
function search(studentsLi, searchInput) {
   function printSearch(matches, lis) {
      if (matches === false) {
         message.style.display = '';
      } else {
         message.style.display = 'none';
      }
      showPage(lis, 1);
      appendPageLinks(lis);

   }

   let matches = false;
   const studentsSearch = [];

   // Loop global Array and populate a new one with elements found. 
   // Change display to none in global Array elements
   for (let i = 0; i < studentsLi.length; i++) {
      const student = studentsLi[i].querySelector('h3').textContent.toLowerCase();
      const search = searchInput.value.toLowerCase();

      if (student.includes(search)) {
         matches = true;
         studentsSearch.push(studentsLi[i]);
      }
      studentsLi[i].style.display = 'none';
   }

   printSearch(matches, studentsSearch);
}

// Event listener for button 'Search'
button.addEventListener('click', (e) => {
   const input = e.target.previousElementSibling;
   search(studentsLi, input);
});

// Event Listener for input text
input.addEventListener('keyup', (e) => {
   console.log(e.target.value);
   search(studentsLi, e.target);
});

// End of exceeds expectations
// Meets expectations
/**
 * Hide all of the items in the list except for the variable itemToshow you want to show
 * in a given page
 * @param {Array} lis 
 * @param {number} page 
 */
function showPage(lis, page) {
   const startIndex = (page * itemsToShow) - itemsToShow;
   const endIndex = page * itemsToShow;

   for (let i = 0; i < lis.length; i++) {
      if (i >= startIndex && i < endIndex) {
         lis[i].style.display = '';
      } else {
         lis[i].style.display = 'none';
      }
   }
}

/**
 * Create <li> element with an <a> element
 * @param {number} page 
 */
function createLi(page) {
   /**
    * Create an <tagName> element with its properties and properties' values
    * @param {String} tagName 
    * @param {Array} properties 
    * @param {Array} values 
    */
   function createElement(tagName, properties, values) {
      const element = document.createElement(tagName);

      for (let i = 0; i < properties.length; i++) {
         if (properties[i]) {
            element[properties[i]] = values[i];
         }
      }
      return element;
   }
   /**
    * Append <tagName> element to a <li> element
    * @param {string} tagName 
    * @param {Array} properties 
    * @param {Array} values 
    */
   function appendToLi(tagName, properties, values) {
      const element = createElement(tagName, properties, values);
      li.appendChild(element);
   }

   const li = document.createElement('li');
   appendToLi('a', ['href', 'textContent'], ['#', page]);
   return li;
}

/**
 * Generate, append, and add functionality to the pagination buttons.
 * @param {Array} lis 
 */
function appendPageLinks(lis) {
   const mainDiv = document.querySelector('div.page');
   const oldDiv = mainDiv.querySelector('div.pagination');
   
   const pages = parseInt(Math.ceil(lis.length / itemsToShow));

   const div = document.createElement('div');
   const ul = document.createElement('ul');
   div.className = 'pagination';
   // For no results, no pagination links needed
   if (pages > 0) {
      for (let i = 0; i < pages; i++) {
         const li = createLi(i + 1);
         ul.appendChild(li);
      }
      // define class active in 'a' element in first 'li'
      ul.firstElementChild.querySelector('a').className = 'active';
      div.appendChild(ul);
   }
   // Remove if exits previous pagination links
   if (oldDiv) {
      mainDiv.removeChild(oldDiv);
   }

   mainDiv.appendChild(div);

   // Event listener added in div.pagination to only listen to <a> elements
   div.addEventListener('click', (e) => {
      const link = e.target;
      if (link.tagName === 'A') {
         // Get <a> element active before click and change it
         const oldActive = link.parentNode.parentNode.querySelector('a.active');
         oldActive.className = '';
         showPage(lis, link.textContent);
         // New <a> element active
         link.className = 'active';
      }
   });
}

showPage(studentsLi, 1);
appendPageLinks(studentsLi);