const input = require("fs").readFileSync("/dev/stdin").toString().trim();
console.log(input);
const token = input.split(/\s+/)[Symbol.iterator]();
const line = [];
const result = [];
const N = +token.next().value; //점의 갯수
const yPosition = [];
const xPosition = [];
for (let i = 0; i < N; ++i) {
	xPosition.push(+token.next().value);
	yPosition.push(+token.next().value);
}
const Q = +token.next().value; //질의의 갯수
const x = []; //질의의 정보
for (let i = 0; i < Q; ++i) {
	x.push(+token.next().value);
}
//+2/2 Math.floor()
const Binary_searh = (x) => {
	let l = 0;
	let r = N;
	while (l < r) {
		const m = Math.floor((l + r) / 2);
		if (xPosition[m] < x) {
			l = m + 1;
		} else {
			r = m;
		}
	}
	return l; //x이상의 첫번째 원소
};
for (let i = 0; i < Q; ++i) {
	const question = x[i];
	const value = yPosition[Binary_searh(question)];
	const value2 = yPosition[Binary_searh(question) - 1];

	result.push(value > value2 ? 1 : value === value2 ? 0 : -1);
}

line.push(...result);
console.log(line);
console.log(line.join(" "));
