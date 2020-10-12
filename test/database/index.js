const Database = require('manablox-database')

const Start = async () => {
    const database = new Database('users')

    let bla = await database.Find()

    console.log(bla)

}

Start()