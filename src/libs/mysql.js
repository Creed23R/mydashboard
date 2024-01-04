import mysql from 'serverless-mysql'

export const conn = mysql({
    config:{
        localhost: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'dashboard'
    }
})