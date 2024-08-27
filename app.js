const express = require('express');
const app = express();
const path = require("node:path");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

app.get('/', (req, res) => {
    req.app.locals.messages = messages;
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get('/new', (req, res) => {
    res.render('form');
});

app.post('/new', (req, res) => {
    messages.push({ text: req.body.message, user: req.body.author, added: new Date() })
    res.redirect('/');
});

app.get('/message/:id', (req, res) => {
    const messageId = req.params.id;
    res.render("message", { message: messages[messageId] });
});


app.listen(8000, () => console.log('active')); 