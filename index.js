const db= require('./db.js')
const inquirer = require('inquirer')
// import inquirer from 'inquirer';

module.exports.add = async (title) => {
    // 面向接口编程
    // 读取之前的任务
    const list = await db.read()
    // 往里面添加一个title任务
    list.push({title, done: false})
    // 存储任务到文件
    await db.write(list)
}

module.exports.clear = async (title) => {
    await db.write([])
}

module.exports.showAll = async (title) => {
    // console.log('show all')
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务?',
            choices: list.map((task, index) => {
                return `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`
            }),
            },
        ])
        .then((answers) => {
            console.log(JSON.stringify(answers, null, '  '));
        });
}

