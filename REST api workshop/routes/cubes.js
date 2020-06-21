const { Router } = require('express');

const router = Router();

router.get('/all', (req, res) => {
    res.status(200).json({
        cubes: [{
            name: 'Test11',
            description: 'Test11'
        },
        {
            name: 'Test22',
            description: 'Test22'
        }]
    })
});


router.post('/new', (req, res) => {
    const { name, description } = req.body;
    res.status(202).json({
        message: `name ====> ${name}`
    });
})

module.exports = router;