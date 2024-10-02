const { readFileSync } = require("fs");
const token = readFileSync(0, { encoding: "ascii" })
	.split(/\s+/)
	[Symbol.iterator]();
const N = Number(token.next().value); // 첫 번째 값 N
const M = Number(token.next().value); // 두 번째 값 M
const arr = []; //[[ABC,X], [A,Y], [CDE,Z]]
const Sarr = []; // ['ABCDE']
const answer = [];
for (let i = 0; i < N; i++) {
	const Q = token.next().value; // 첫 번째 값 Q
	const A = token.next().value; // 두 번째 값 A
	arr.push([Q, A]);
}
for (let i = 0; i < M; i++) {
	let s = token.next().value;
	Sarr.push(s);
}
for (let i = 0; i < Sarr.length; i++) {
	let tempList = [];
	for (const item of arr) {
		if (Sarr[i].includes(item[0])) {
			tempList.push(item);
		}
	}
	//비어있을 경우 -1
	//여러개일 경우 정렬
	if (tempList.length) {
		tempList.sort((a, b) => a[0].localeCompare(b[0]));

		answer.push(tempList.map((item) => item[1]).join(""));
	} else answer.push(-1);
}
for (let ans of answer) {
	console.log(ans);
}
