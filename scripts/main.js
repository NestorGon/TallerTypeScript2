import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var btnfilterByName = document.getElementById('button-filterByName');
var btnfilterByCredits = document.getElementById('button-filterByCredits');
var btnCleanfilter = document.getElementById('button-cleanFilter');
var inputSearchBox = document.getElementById('search-box');
var studentTbody = document.getElementById('info');
var studentName = document.getElementById('sname');
var student = new Student("Néstor Felipe González García", 201912670, 1000928471, 19, 'Diagonal 7A #41-3', 2929667);
var rangeMin = document.getElementById('rangeMin');
var rangeMax = document.getElementById('rangeMax');
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudent(student) {
    studentName.innerText = student.name;
    var tbodyElement = document.createElement("tbody");
    tbodyElement.innerHTML = "<tr><td>C\u00F3digo</td>\n                        <td>" + student.studentId + "</td></tr>\n                        <tr><td>C\u00E9dula</td>\n                        <td>" + student.citizenId + "</td></tr>\n                        <tr><td>Edad</td>\n                        <td>" + student.age + "</td></tr>\n                        <tr><td>Direcci\u00F3n</td>\n                        <td>" + student.address + "</td></tr>\n                        <tr><td>Tel\u00E9fono</td>\n                        <td>" + student.phoneNumber + "</td></tr>";
    studentTbody.appendChild(tbodyElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var low = parseInt(rangeMin.value);
    var high = parseInt(rangeMax.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(low, high, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyCleanFilter() {
    clearCoursesInTable();
    renderCoursesInTable(dataCourses);
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = '';
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(low, high, courses) {
    return courses.filter(function (c) {
        return c.credits >= low && c.credits <= high;
    });
}
function updateRangeInfo(range, label) {
    var text = document.getElementById(label).innerText.split(':')[0];
    document.getElementById(label).innerText = text + ': ' + range.value;
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
btnCleanfilter.onclick = function () { return applyCleanFilter(); };
renderCoursesInTable(dataCourses);
renderStudent(student);
updateRangeInfo(rangeMin, 'lblrangeMin');
updateRangeInfo(rangeMax, 'lblrangeMax');
rangeMin.onchange = function () { return updateRangeInfo(rangeMin, 'lblrangeMin'); };
rangeMax.onchange = function () { return updateRangeInfo(rangeMax, 'lblrangeMax'); };
