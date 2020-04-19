const { Router } = require('express')
const router = Router()
const Note = require('../models/Note')
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note')
})

router.post('/notes/new-note',isAuthenticated , async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title, description })
    await newNote.save()
    req.flash('success_msg','Note saved successfuly')
    res.redirect('/notes')
})

router.get('/notes',isAuthenticated, async (req, res) => {
    const notes = await Note.find().lean()
    console.log(notes);
    
    res.render('notes/all-notes', { notes } )
})

router.get('/notes/edit/:id',isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean()
    res.render('notes/edit-notes', {note} )
})

router.put('/notes/edit-note/:id',isAuthenticated, async (req, res) => {
    const { title, description }= req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg','Note updated successfuly')
    res.redirect('/notes')
})  

router.delete('/notes/delete/:id',isAuthenticated, async (req, res) => {
    await Note.findByIdAndRemove(req.params.id)
    req.flash('success_msg','Note removed successfuly')
    res.redirect('/notes')
})

module.exports = router