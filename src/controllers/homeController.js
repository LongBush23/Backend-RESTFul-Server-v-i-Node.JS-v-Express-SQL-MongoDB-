
const getHomepage = (req, res) => {
    //process data
    //call model
    res.send('Hello World vs Hoi Dan IT & Eric! & nodemon')
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getHoiDanIT = (req, res) => {
    // res.send('<h1>hoi dan it voi Eric </h1>')
    res.render('sample.ejs')
}

module.exports = {
    getHomepage, getABC, getHoiDanIT
}