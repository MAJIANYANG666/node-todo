const { program } = require('commander');
const api = require('./index.js')

program
  .option('-x, --xxx', 'what the x')

program
  .command('add <taskName>')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, args.length - 2).join('')
    api.add(words)
        .then(() => {console.log('添加成功')}, () => {console.log('添加失败')})
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear()
        .then(() => {console.log('清除完毕')}, () => {console.log('清除失败')})
  });

if(process.argv.length === 2) {
    // 说明用户直接运行 node cli.js
    api.showAll()
}
// console.log(process.argv)

// program.parse(process.argv);
// const options = program.opts();
// console.log(options.add)