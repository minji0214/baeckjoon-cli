const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const token = input.split(/\s+/)[Symbol.iterator]();
const H = +token.next().value;
const W = +token.next().value;
const N = +token.next().value;
const M = +token.next().value;
let answer = "";
//나 + 공간 = M +1
//ceil : 끝에 마지막 한자리에도 사람이 앉을 수 있기 때문.
let 가로 = Math.ceil(W / (M + 1));
let 세로 = Math.ceil(H / (N + 1));
answer = 가로 * 세로;
console.log(answer);
//행마다 w개씩 H행
//세로로 N칸 가로로 M칸 이상 비우기
//거리두기 수칙 최대 몇명 수용?
//h = 5 w=4 n=1 m=1
// 어떻게 접근해볼까
//총 20개의 자리
//1+N+M = 3자리 인당
//올바른 답
//가로로 앉을 수 있는 사람
//세로로 앉을 수 있는 사람
// 예를 들어, 세로 길이 H가 7이고, 각 사람 사이의 간격 N이 2라면 H/(N+1) = 7/3 = 2.33이 나옵니다. 이 값은 소수점이 포함된 값이므로 2명보다는 3명이 들어가야 하는 상황이 발생합니다. 즉, 2명이 배치된 후에 남은 공간에 추가로 1명을 더 배치해야 합니다.
