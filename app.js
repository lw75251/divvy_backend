const express = require('express');
const app = express();
app.use(express.json) // Alows us to handle JSON Objects

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
    { id: 15, name: 'course15'},
];

/* USING GET REQUESTS */
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/api/courses', (req, res) => {
    res.send('[1,2,3]')
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if ( !course ) res.status(404).send("The course with given ID was not found.")
    res.send(course);
});

/* USING POST REQUESTS */
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    course.push(course);

    res.send(course);
});

// PORT
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))