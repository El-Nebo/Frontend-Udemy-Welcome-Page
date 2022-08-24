const tabs = [
    {
        "id":"pythonButton",
        "name":"pythonData"
    },
    {
        "id":"excelButton",
        "name":"excelData"
    },
    {
        "id":"webButton",
        "name":"webData"
    },
    {
        "id":"JSButton",
        "name":"jsData"
    },
    {
        "id":"dataScienceButton",
        "name":"dataScienceData"
    },
    {
        "id":"AWSButton",
        "name":"AWSData"
    },
    {
        "id":"drawingButton",
        "name":"drawingData"
    }
];
/////////////////////
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
function drawCourse(course){
    let courseDiv = document.createElement('div');
    courseDiv.classList.add('card');
    // courseDiv.setAttribute('data-bs-slide-to', '4');
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
    return courseDiv
}
//////////////////////
let form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let text = document.querySelector('.search-text').value;
    updateCourses(text);
})
//////////////////////////////
let fetchData = async (data) => {
    // console.log('http://localhost:3000/'+data);
    const response = await fetch('http://localhost:3000/'+data);
    const responsedata = await response.json();
    return responsedata;
}
/////////////////////////////
function makeWrapper(data,active){
    let item = document.createElement('div');
    item.classList.add('carousel-item');
    if(active){
        item.classList.add('active');
    }
    let wrapper = document.createElement('div');
    wrapper.classList.add('cards-wrapper');
    item.appendChild(wrapper);
    data.forEach(course=>{ 
        wrapper.appendChild(course);
    } )

    return item;
}
let data;
let updateCourses = async (searchText="") =>{
    let container = document.querySelector('.container2-intro');
    let header = container.querySelector('h2');
    let paragraph = container.querySelector('p');
    let span = container.querySelector('span');
    header.innerText = data.head;
    paragraph.innerText = data.paragraph;
    span.innerText = "Explore " + data.topicname;
    // console.log(data.courses);
    let carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = '';
    let courses = [];
    let active = true;
    let validCourses = data.courses;
    validCourses = validCourses.filter(course => course["description"].toLowerCase().includes(searchText.toLowerCase()));
    // console.log(validCourses);
    let courses_in_screen = Math.floor(window.innerWidth/380);
    console.log(courses_in_screen);
    validCourses.forEach((course,index)=>{
        courses.push(drawCourse(course));
        if((index+1)%courses_in_screen==0 && index != 0 || index == validCourses.length-1){
            carouselInner.appendChild(makeWrapper(courses,active));
            active = false
            courses = [];
        }
    })
}
let activateBtn = async (button) =>{
    document.querySelectorAll(".container2-tabs button").forEach(btn=>{
        if(btn.id === button){
            btn.classList.add('active-tab');
        }else{
            btn.classList.remove('active-tab');
        }
    })
}

let switchTap = async (event, topic)=>{
    event.preventDefault();
    activateBtn(tabs[topic].id);
    data = await fetchData(tabs[topic].name);
    updateCourses();
}

document.getElementById("pythonButton").click();