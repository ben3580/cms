// test - just add a row to table
function addRow(...args) {
    let table = document.getElementById("courselist")
    let newRow = table.insertRow(-1)
    args.forEach(element => {
        newRow.insertCell().innerHTML = element
    });
}

//addRow("123","test","spring","66")


function enrichCourseId(courseid){
    return `<button id="modalCPTS489" type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal${courseid}">
    ${courseid}
</button>`
}

async function  populateCourses() {
    let res = await fetch('/api/courses')
    let courses = await res.json()
    courses.forEach(course => {
        with(course){
            addRow(enrichCourseId(courseid), coursename, semester, enrollnum)
        }
    });
}

populateCourses()

// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    try {
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          if(response.status == 200){
          return response.json(); 
          }else{
            return Promise.reject(await response.json())
          }
    } catch (error) {
        console.log(error);
    }
  }

function displayalert() {
    document.getElementById("alertmessages").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Course <%=courseid%></strong> added Succesfully.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

function addCourse() {
    let formFields = new FormData(document.forms[0]);
    formObject = Object.fromEntries(formFields);
    postData("http://localhost:3000/api/courses",formObject)
    .then(course => {
        console.log(course);
        with(course){
        addRow(enrichCourseId(courseid), coursename, semester, enrollnum)
        }
        document.forms[0].reset()
        displayalert()
    }).catch(err => console.log(err))
    return false;
}

//use fetch results to add rows
//eliminate adding rows in EJS (so it is only added by javascript)
//call this function populate table

//prevent form submission - create
//create using REST API
//call the populate-table after creation

//prevent delete form submission
//delete using REST API
//call the populate-table after deletion