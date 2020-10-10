module.exports = {
    method: 'all',
    async resolver(req, res, next){
        res.json({ hello: 'index' })
    }
}