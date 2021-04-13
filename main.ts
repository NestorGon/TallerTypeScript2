import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';

const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"
const btnfilterByName: HTMLElement = document.getElementById('button-filterByName')!;
const btnfilterByCredits: HTMLElement = document.getElementById('button-filterByCredits')!;
const btnCleanfilter: HTMLElement = document.getElementById('button-cleanFilter')!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById('search-box')!;
const studentTbody: HTMLElement = document.getElementById('info')!;
const studentName: HTMLElement = document.getElementById('sname')!;
const student: Student = new Student("Néstor Felipe González García", 201912670, 1000928471, 19, 'Diagonal 7A #41-3', 2929667);
const rangeMin: HTMLInputElement = <HTMLInputElement> document.getElementById('rangeMin')!;
const rangeMax: HTMLInputElement = <HTMLInputElement> document.getElementById('rangeMax')!;

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderStudent(student: Student): void {
  studentName.innerText = student.name;
  let tbodyElement = document.createElement("tbody");
  tbodyElement.innerHTML = `<tr><td>Código</td>
                        <td>${student.studentId}</td></tr>
                        <tr><td>Cédula</td>
                        <td>${student.citizenId}</td></tr>
                        <tr><td>Edad</td>
                        <td>${student.age}</td></tr>
                        <tr><td>Dirección</td>
                        <td>${student.address}</td></tr>
                        <tr><td>Teléfono</td>
                        <td>${student.phoneNumber}</td></tr>`;
  studentTbody.appendChild(tbodyElement);
}

function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() { 
  let low: number = parseInt(rangeMin.value);
  let high: number = parseInt(rangeMax.value);
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(low, high, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyCleanFilter() { 
  clearCoursesInTable();
  renderCoursesInTable(dataCourses);
}

function clearCoursesInTable() {
    coursesTbody.innerHTML = '';
}
  
function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

function searchCourseByCredits(low: number, high: number, courses: Course[]) {
  return courses.filter( c => 
    c.credits >= low && c.credits <= high);
}

function updateRangeInfo(range:HTMLInputElement, label:string) {
  let text:string = document.getElementById(label)!.innerText.split(':')[0];
  document.getElementById(label)!.innerText = text + ': ' + range.value;
}

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
btnCleanfilter.onclick = () => applyCleanFilter();
renderCoursesInTable(dataCourses);
renderStudent(student);
updateRangeInfo(rangeMin, 'lblrangeMin');
updateRangeInfo(rangeMax, 'lblrangeMax');
rangeMin.onchange = () => updateRangeInfo(rangeMin, 'lblrangeMin');
rangeMax.onchange = () => updateRangeInfo(rangeMax, 'lblrangeMax');