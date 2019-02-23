const Joi = require('joi');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
    {
        id: 15,
        name: 'course15'
    },
];

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/courses', (req, res) => {
    res.send('[1,2,3]')
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given ID was not found.")
    res.send(course);
});

/* USING POST REQUESTS -> ALWAYS WRITE VALIDATION*/
app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }


    // if( !req.body.name || req.body.name.length < 3 ){
    //     // 400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters.')
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    course.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look Up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given ID was not found.")

    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // equivalent to result.error (OBJECT DESTRUCTION)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    course.name = req.body.name;

    // Return updated course to client
    res.status(200).send(course);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(course, schema);
    // Validate
    return Joi.validate(course, schema);
}