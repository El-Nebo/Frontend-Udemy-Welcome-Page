function getStarsHTML(starsCount){
    let starsHTML = '';
    for(let i = 0; i < starsCount; i++){
        starsHTML += '<span class="fa fa-star checked"></span>';
    }
    for(let i = 0; i < (5 - starsCount); i++){
        starsHTML += '<span class="fa fa-star"></span>';
    }
    return starsHTML;
}
function drawCourse(course,index){
    let coursesNode = document.querySelector('.container2-courses-panal');
    console.log(coursesNode);
    let courseDiv = document.createElement('div');
    courseDiv.classList.add('course');
    courseDiv.innerHTML = `
        <img class='course-img' width="240" height='135' alt="Python Course" src="${course.img}">
        <div class="course-description">
            <h3><a href="https://www.udemy.com/course/pythonforbeginners/">${course.description}</a></h3>
            <span class="instructor">${course.author}</span>
            <div class="rating">
                <span class="rating-num">4.8</span>
                <div>
                    ${getStarsHTML(course.stars)}   
                </div>
                <span class="rating-count">(${course.ratings_count})</span>
            </div>
            <div class="price-info">
                <span class="current-price">E£${course.price}</span>
                <span class="old-price">E£${course.oldPrice}</span>
            </div>

        </div>
    `;
    coursesNode.appendChild(courseDiv);
}
const fetchCourse = async () => {
    const response = await fetch('http://localhost:3000/courses');
    const courses = await response.json();
    console.log(courses);
    return courses;
}
fetchCourse().then(courses=>courses.forEach(drawCourse)).catch(err=>console.log(err));

let form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let text = document.querySelector('.search-text').value;
    console.log(text);
    let courses = document.querySelectorAll('.course');
    courses.forEach(course=>{
        if(course.querySelector('.course-description').innerText.toLowerCase().includes(text.toLowerCase())){
            course.style.display = 'block';
        }else{
            course.style.display = 'none';
        }
    })
})