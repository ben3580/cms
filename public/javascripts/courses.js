console.log('in courses')

fetch('/api/courses')
.then(res => res.json())
.then(console.log)
.catch(console.error)