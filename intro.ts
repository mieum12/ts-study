//ts는 js의 변수, 매개변수, 리터값에 타입을 붙이는 것이다
//주 목적은 any를 없애는 것!

const a: string = "5";
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = true; //아무거나 된다

const g: false = false; //무조건 false만 받겠다
const h: 2 = 2; //2만 받겠다

// !!! as를 사용해 바꿀수 있다
let aa = 123;
aa = "hi" as unknown as number; //js로 바꾸면 as부분은 사라짐

// <<<<<<함수 타이핑에>>>>>>>

// 1. 함수 타이핑(타입을 붙여주는 행위)을 해줘야한다
// 매개변수자리, 리턴값자리 모두에 타입을 붙여줘야함(자리 주의)
function add(x: number, y: number): number {
  return x + y;
}

// 1-1. 화살표함수 타이핑 (위치 헷갈릴 수 있어용)
const add1: (x: number, y: number) => number = (x, y) => x + y;

//1-2. 같은함수가 2번 선언된것같은 형태
function add4(x: number, y: number): number;
function add4(x, y) {
  return x + y;
}

// 2. 타입을 밖으로 뺄 수 도 있다
type Add2 = (x: number, y: number) => number;
const add2: Add2 = (x, y) => x + y;

// 3. interface 사용
interface Add3 {
  (x: number, y: number): number;
}
const add3: Add3 = (x, y) => x + y;

// <<<<<<객체 타이핑>>>>>>>
//변수의 타입을 붙여주면 됨
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// <<<<<<배열 타이핑>>>>>>>
const arr: string[] = ["1", "2"];
const arr1: Array<number> = [3, 4, 5]; //<>부분은 제네릭
//빈배열은 never
const arr3 = [];

// <<<<<<튜플 타이핑>>>>>>>
const tuple: [string, number] = ["5", 6];
// 튜플에 요소 추가
// tuple[2] = 'hi' //error
tuple.push("hi"); //이건 못막아줘서 가능하다

// 느낌표 -> null이 없어진다(근데 비추)
const head = document.querySelector("#head"); // head는 Element | null
const head1 = document.querySelector("#head")!; // head1는 Element

// head.innerHTML = 'hello' 라고만 하면 null이 될 수 있으니 미리 에러로 사전에 경고해줌
// 그래서 이런식으로 미리 에러를 예방하는 코드를 짜게 된다
if (head) {
  head.innerHTML = "hello";
}

//타입 커스텀
type Option = "jiwon" | "eeeonn"; //타입을 정교하게 설정 가능, 두가지만 선택 가능하도록 자동완성
const k: Option = "jiwon";

type Name = `hello ${Option}`; //hello jiwon
const kk: Name = "hello eeeonn";

//rest
function rest(...args: string[]) {
  console.log(args); // [1,2,3]
}
rest("1", "2", "3");

function rest1(a, ...args: string[]) {
  console.log(a, args); // 1, [2,3]
}
rest("1", "2", "3");

// enum
// enum이라는 타입 -> enum은 js로 변환시 사라진다
// eum은 변수들을 하나의 그룹으로 묶고싶을 떼 사용한다
const enum EDirection {
  // 순서대로 0,1,2,3인데 첫 값을 지정해 줄 수도 있음, 각 값을 지정해 줄수도 있음, 문자열도 된다
  Up = 4, //4,5,6,7이 된다
  Down,
  Left,
  Right,
}

const z = EDirection.Up; // z = 4
const v = EDirection.Down; // v = 5

function walk(dir: EDirection) {} // dir은 이 4개중에 하나여야한다는 뜻
walk(EDirection.Left);

//enum 말고 객체로 갈수도 있다 -> 이건  js로 변환시 as뒤만 사라지고 남아있음
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const; //안의 값을 상수로 쓰겠다

// keyof, typeof
const obj3 = { a: "123", b: "hello", c: "world" } as const;
//as const는 엄격하게 타이핑 해줌
type Key = keyof typeof obj3; //key만 뽑아서 Key라는 타입을 만든것
type Value = (typeof obj3)[keyof typeof obj3]; //value만

type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

run(ODirection.Right);
