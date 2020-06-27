

module.exports = {
    get: {
        home: (req, res, next) => {
           
            if (req.user) {
                
                return res.render('home', {
                    userEmail: req.user.email
                });
            }
            return res.render('home')
        },
        post: {

        }

    }
}