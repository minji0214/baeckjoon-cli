#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");
const { spawn } = require("child_process");
const readlineSync = require("readline-sync");

program
	.version("1.0.0")
	.argument("<filename>", "The name of the folder to create")
	.option("-i, --input", "Prompt for input")
	.option("-t, --test", "Prompt form test")
	.option("-s, --submit", "submit the test")
	.action((filename, options) => {
		if (options.input) {
			console.log("input을 입력해주세요 (입력을 마치려면 빈 줄을 입력하세요):");

			const input = readlineSync.question("> ");

			// problems 폴더 경로 설정
			const problemsDir = path.join(process.cwd(), "problems");
			// filename 폴더 경로 설정
			const filenameDir = path.join(problemsDir, filename);
			// input.txt 파일 경로 설정
			const filePath = path.join(filenameDir, "input.txt");

			// problems 폴더와 filename 폴더 생성
			fs.ensureDirSync(filenameDir);
			// input.txt 파일 작성
			fs.writeFileSync(filePath, input);

			console.log(`input 생성 완료: ${filePath}`);
		} else if (options.test) {
			// problems 폴더 경로 설정
			const problemsDir = path.join(process.cwd(), "problems");
			// filename 폴더 경로 설정
			const filenameDir = path.join(problemsDir, filename);
			// js 파일 경로 설정
			const jsFilePath = path.join(filenameDir, `${filename}.js`);
			// input.txt 파일 경로 설정
			const inputFilePath = path.join(filenameDir, "input.txt");

			// 파일 존재 여부 확인
			if (!fs.existsSync(jsFilePath)) {
				console.error(`Error: ${jsFilePath} does not exist.`);
				return;
			}
			if (!fs.existsSync(inputFilePath)) {
				console.error(`Error: ${inputFilePath} does not exist.`);
				return;
			}

			// input.txt 파일의 내용 읽기
			const input = fs.readFileSync(inputFilePath, "utf-8");

			// js 파일 실행
			const child = spawn("node", [jsFilePath], {
				stdio: ["pipe", process.stdout, process.stderr],
			});

			// 입력 데이터를 한 번에 전송
			child.stdin.write(input);
			child.stdin.end();

			child.on("close", (code) => {
				console.log(`테스트 완료.`);
			});
		} else if (options.submit) {
		} else {
			console.log("Use the -i or --input option to enter input.");
		}
	});

program.parse(process.argv);
