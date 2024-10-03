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
//정답
const { readFileSync } = require("fs");
const token = readFileSync(0, { encoding: "ascii" })
	.split(/\s+/)
	[Symbol.iterator]();

const N = Number(token.next().value); // 첫 번째 값 N
const M = Number(token.next().value); // 두 번째 값 M
const arr = []; // (Q_i, A_i) 저장용 배열
const Sarr = []; // 문장 저장용 배열
const answer = [];

// 단어 정보 저장
for (let i = 0; i < N; i++) {
	const Q = token.next().value; // 단어 Q_i
	const A = token.next().value; // 단어의 뜻 A_i
	arr.push([Q, A]);
}

// 문장 정보 저장
for (let i = 0; i < M; i++) {
	const s = token.next().value;
	Sarr.push(s);
}

// 각 문장에 대해 처리
for (let i = 0; i < Sarr.length; i++) {
	let tempAnswer = "";
	const currentSentence = Sarr[i];

	let found = false; // 단어를 찾았는지 여부
	let k = 0;

	while (k < currentSentence.length) {
		let matchedWord = null;
		let matchedMeaning = null;

		// 각 위치에서 arr에 있는 단어 중 일치하는 단어 찾기
		for (const [word, meaning] of arr) {
			// 현재 위치에서 word와 일치하는지 확인
			if (currentSentence.slice(k, k + word.length) === word) {
				// 일치하는 단어가 없거나, 현재 단어가 사전순으로 더 앞설 경우
				if (matchedWord === null || word.localeCompare(matchedWord) < 0) {
					matchedWord = word;
					matchedMeaning = meaning;
				}
			}
		}

		// 일치하는 단어가 있으면 그 단어의 의미를 답으로 추가
		if (matchedWord !== null) {
			tempAnswer += matchedMeaning;
			k += matchedWord.length; // 단어 길이만큼 건너뜀
			found = true;
		} else {
			// 단어를 찾지 못했으면 한 글자 건너뜀
			k++;
		}
	}

	// 단어를 찾지 못했으면 -1 추가
	if (!found) {
		answer.push(-1);
	} else {
		answer.push(tempAnswer);
	}
}

// 답 출력
for (let ans of answer) {
	console.log(ans);
}
