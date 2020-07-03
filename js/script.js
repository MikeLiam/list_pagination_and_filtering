/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
let studentsLi = document.querySelectorAll('li.student-item');
const itemsToShow = 10;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(lis, page) {
   const startIndex = (page * itemsToShow) - itemsToShow;
   const endIndex = page * itemsToShow;

   for (let i = 0; i < lis.length; i++) {
      if( i >= startIndex && i < endIndex){
         lis[i].style.display = '';
      } else {
         lis[i].style.display = 'none';
      }
   }
}


function createLi(page) {
   function createElement(tagName, properties, values){
      const element = document.createElement(tagName);
   
      for(let i = 0; i < properties.length; i++) {
         if(properties[i]){
            element[properties[i]] = values[i];
         }
      }
      return element;
   }
   
   function appendToLi(tagName, properties, values) {
      const element = createElement(tagName,properties,values);
      li.appendChild(element);
   }
   
   const li = document.createElement('li');
   appendToLi('a',['href','textContent'],['#',page]);
   return li;
}

/*** 
 Create the `appendPageLinks function` to generate, append, and add 
 functionality to the pagination buttons.
 ***/
function appendPageLinks(lis) {
   const mainDiv = document.querySelector('div.page');
   const div = document.createElement('div')
   const ul = document.createElement('ul');
   const pages = parseInt(Math.floor(lis.length / itemsToShow));  
   
   div.className = 'pagination';
   
   for (let i = 1; i <= pages; i++) {
      const li = createLi(i);
      ul.appendChild(li);
   }
   ul.firstElementChild.firstElementChild.className = 'active';
   div.appendChild(ul);
   mainDiv.appendChild(div);

   div.addEventListener('click', (e) => {
      const link = e.target;
      if( link.tagName === 'A') {
         const oldActive = link.parentNode.parentNode.querySelector('a.active');
         oldActive.className = '';
         showPage(studentsLi,link.textContent);
         link.className = 'active';
      }
   });
}

appendPageLinks(studentsLi);



// Remember to delete the comments that came with this file, and replace them with your own code comments.