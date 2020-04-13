const { Router } = require('express')
const router = Router()

router.get('/notes', (req, res) => {
    res.send('notes')
})


module.exports = router