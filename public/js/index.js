function addrow(...args) {
    const table = document.getElementById("coursestable")
    const row = table.insertRow()
    args.forEach((arg) => {
        row.insertCell().innerHTML = arg
    })
}

async function getcourses() {
    const res = await fetch('http://localhost:3000/api/courses')
    const courses = await res.json()
    return courses
}

function enrichCourseid(courseid) {
    return `<a href="/courses/${courseid}">${courseid}</a>`
}

async function populatetable() {
    const courses = await getcourses()
    courses.forEach((course) =>{
        with(course){
            addrow(enrichCourseid(courseid), coursename, semester, enrollnum)
        }
    })
}

populatetable().then(console.log("course population completed"))

function alertsuccess(courseid) {
    document.getElementById("alertmsg").innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Course ${courseid}</strong> added Succesfully.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function addcourse() {
    const formdata = new FormData(document.forms[0])
    const formobject = Object.fromEntries(formdata)
    console.log(formobject)
    postData('http://localhost:3000/api/courses',formobject).then((course)=> {
        console.log(course)
        with(course){
            addrow(enrichCourseid(courseid), coursename, semester, enrollnum)
        }
        document.forms[0].reset()
        alertsuccess(course.courseid)
    })
    return false;
  }