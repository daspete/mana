module.exports = {
    method: 'get',
    async resolver(req, res, next){
        res.json({ hello: 'id' })
    }
}