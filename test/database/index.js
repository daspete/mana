const Database = require('manablox-database')
const Sleep = require('manablox-utils/Sleep')


const Start = async () => {
    const database = new Database('users')

    await Sleep(2000)

    let bla = await database.Find()

    console.log(bla)

}

Start()