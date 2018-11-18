console.log(123);
console.log(__dirname);
console.log(__filename);
console.info(456);
console.error();
console.warn(888);
console.time(2);
// process.on('exit', function (code) {
//    setTimeout(function () {
//       console.log('该代码不会执行')
//    },0);
//     console.log('退出码为', code);
// });
// console.log("程序执行结束");

process.stdout.write('标准输出流');
console.log(process.cwd());
