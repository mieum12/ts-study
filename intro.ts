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

// ✅ <<<<<<함수 타이핑에>>>>>>>

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

// ✅ <<<<<<객체 타이핑>>>>>>>
//변수의 타입을 붙여주면 됨
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

type A = { a: string }
const a: A = { a: 'hello'}
//이렇게 써도됨
const a: { a: string } = { a: 'hello'}

// ✅ <<<<<<배열 타이핑>>>>>>>
const arr: string[] = ["1", "2"];
const arr1: Array<number> = [3, 4, 5]; //<>부분은 제네릭
//빈배열은 never
const arr3 = [];

// ✅ <<<<<<튜플 타이핑>>>>>>>
const tuple: [string, number] = ["5", 6];
// 튜플에 요소 추가
// tuple[2] = 'hi' //error
tuple.push("hi"); //이건 못막아줘서 가능하다

// ✅ 느낌표 -> null이 없어진다(근데 비추)
const head = document.querySelector("#head"); // head는 Element | null
const head1 = document.querySelector("#head")!; // head1는 Element

// head.innerHTML = 'hello' 라고만 하면 null이 될 수 있으니 미리 에러로 사전에 경고해줌
// 그래서 이런식으로 미리 에러를 예방하는 코드를 짜게 된다
if (head) {
  head.innerHTML = "hello";
}

// ✅ 타입 커스텀
type Option = "jiwon" | "eeeonn"; //타입을 정교하게 설정 가능, 두가지만 선택 가능하도록 자동완성
const k: Option = "jiwon";

type Name = `hello ${Option}`; //hello jiwon
const kk: Name = "hello eeeonn";

// ✅ rest
function rest(...args: string[]) {
  console.log(args); // [1,2,3]
}
rest("1", "2", "3");

function rest1(a, ...args: string[]) {
  console.log(a, args); // 1, [2,3]
}
rest("1", "2", "3");

// ✅ enum
// enum이라는 타입 -> enum은 js로 변환시 사라진다
// eum은 변수들을 하나의 그룹으로 묶고싶을 떼 사용한다
// enum은 자스로 변환하면 안남아있다
const enum EDirection {
  // 순서대로 0,1,2,3인데 첫 값을 지정해 줄 수도 있음, 각 값을 지정해 줄수도 있음, 문자열도 된다
  Up = 4, //4,5,6,7이 된다
  Down,
  Left,
  Right,
}

const z = EDirection.Up; // z = 4
const v = EDirection.Down; // v = 5

function walk(dir: EDirection) {}
// dir은 EDirection 안의 값, 즉 4개중에 하나여야한다는 뜻
walk(EDirection.Left);

//enum 말고 객체로 갈수도 있다 -> 이건  js로 변환시 as뒤만 사라지고 남아있음
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const; // number로 나오는게 아니라 안의 값을 정확하게 상수로 쓰겠다

// ✅ keyof, typeof
// enum하기 싫으면 이것을 쓴다고 생각하면 됨
const obj3 = { a: "123", b: "hello", c: "world" } as const; //as const는 엄격하게 타이핑 해줌
// 1. 키들만 뽑아오고싶다면 키오브를 앞에 붙여온다
type Key = keyof typeof obj3; //key만 뽑아서 Key라는 타입을 만든것
// obj3라는 값을 타입으로 쓰고 싶을 때: 타입오브를 앞에 붙여줌
// a,b,c 라는 키들을 뽑아서 key라는 타입으로 커스텀해서 만든 것이다

// 2. value들의 타입들만 가져오기
type Value = (typeof obj3)[keyof typeof obj3];
// as const가 있기 때문에 밸류들의 타입이 string이 아니라 실제 정해준 값이다

type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

run(ODirection.Right);

// ✅union (|)
function add(x: string | number, y : string | number) : string | number {
  return x + y
}
// 아래 값은 넘버인데 스트링 또는 넘버 라고 타입의 범위를 넓혀주면 문제가될 수 있다
// 즉 add 자체에 처음부터 'string | number' 라고 설정이 안된다
// 위에부터 그렇게 허용해버리면 아래로 갈수록 타입이 다 꼬일 수 있다
const result: string | number = add(1,2)
add('1','2')
add(1,'2')

// ✅ intersection(&)
type A = { a: string & number } // strign 이면서 number여야한다
// 되는게 없지 않나? 생각할 수 있는데 객체를 예로 들어보자

type A = {hello: 'world'} & {choi: 'jiwon'}
const a: A = {hello: 'world', choi: 'jiwon' } // 이렇게 둘 다 만족하면 된다, 모든 속성이 다 있어야한다

// 근데 이렇게도 된다! : 얘는 '또는'이다
type A = {hello: 'world'} | {choi: 'jiwon'}
const a: A = {hello: 'world', choi: 'jiwon' } // 만족
const a: A = {hello: 'world' } // 이렇게도 만족

// ✅ type or interface
type A = { a: string}
const a: A = { a:'hello'}

interface B {a: string}
const b: B = {a: 'hello'}

// 간단한건 타입, 객체지향을 원하면 인터페이스를 선택하기
// 인터페이스와 타입 간 차이가 있지만 그냥 둘을 잘 선택하면 된다
// 타입은 & 로 상속, 인터페이스는 extends로 상속

// EX
type Animal = {breath: true}
type Mammal = Animal & {breed: true}
type Human = Mammal & {think:true}
// 약간 타입을 상속하는 것 같은 느낌이 된다
// type으로 했을 때 확장의 개념으로 쓸 수 있다
// 간단하게 쓸 수 있다

const jiwon: Human = {breath: true, breed:true, think:true}

interface A {
  breath: true
}
interface B extends A {
  breed: true
}
const b: B = {breed:true, breath: true}
// 인터페이스는 extends라는 확장이라는 개념이 명확하게 들어간다
// 대부분 인터페이스를 쓴다
// 또 인터페이스는 같은 이름으로 여러번 선언 가능, 선언할 때마다 합쳐진다

interface A {
  talk: () => void;
}
interface A {
  eat: () => void;
}
interface A {
  shit: () => void;
}
const a: A = { talk() {}, eat(){}, shit(){}}
// 이렇게 계속 추가, 확장이 된다
// 남의 라이브러리 코드를 수정할 수 있다 현업에서

// 네이밍 컨벤션
// 근데 요즘은 제네릭에만 붙이고 실제 네이밍에는 안붙인다 대부분!!
interface IProps {} // I 붙인다
type TType = string | number; // T 붙인다
enum EHello { // E 붙인다
  left,
  right
}

// ✅좁은 타입과 넓은 타입
// 벤다이어 그램으로 생각하면 '좁은 타입 -> 넓은 타입'으로는 대입이 가능하다
// 교집합 -> 전체집합으로 대입이 가능하듯이!
// 근데 객체로 보면 좀 헷갈릴 수 있다
type A = { name: string }
type B = { age: number }
type AB = A | B // 교집합
type C = { name: string, age: number } // A & B // 합집합
// 속성이 적은 A,B가 넓은 타입이다
// 객체는 상세할수록 좁다!

const ab: AB = {name: 'jiwon'} //만족 //넓은 타입
const c:C = {name:'jiwon', age: 20} //만족 //좁은타입

const c: C = ab //불가: 넓은 타입을 좁은 타입에 대입시킬 수는 없다
const ab: AB = c //이건 가능!

// 주의 - 잉여속성검사
type C = { name: string, age: number }
const c:C = {name:'jiwon', age: 20, married: false}
// 넓은 타입인 c에 좁은 타입 {...}를 넣었는데 에러가 생긴다
// 특수한 상황 - 객체 리터럴을 바로 집어넣는 상황
// 객체 리터럴 검사를 해서 잉여속성 검사를 추가적으로 한다
// 아래처럼 중간에 변수로 한번 빼주면 에러 해결 가능
const cc = {name:'jiwon', age: 20, married: false}
const c:C = cc

// ✅void type - 3가지
//1. 함수를 void로 선언한 것
// 함수의 직접적인 리턴값이 보이드로 설정한 경우에만
// 리턴값이 진짜 보이드가 아니면 에러가 난다

function f1(): void {
  // return값이 없거나 리턴만 있거나 undefined만 가능, null 불가
  return;
}
const f2: void = f1()

// 2. 메서드로 void로 선언할 때
interface Humann {
  talk: () => void;
}
const human: Humann = {
  // 메서드도 리턴값이 있는데 된다?
  talk() { return 3; }
}

const jiwonni = human.talk() // '3'가 아니라 리턴값을 무시해버려서 void가 된다
const jiwonniii = human.talk() as unknown as number // 이렇게 강제로 쓸수는 있다

// 3. 매개변수로 선언한 void
function f3(callback: ()=>void) {

}
// f3안의 콜백도 리턴값이 있을 수 있다
f3(() => {
  return '3';
})

// 즉, 메서드나 매개변수를 void로 설정한 것은 사용하지 않겠다는 의미이다
// 리턴값이 없다는 의미가 아니다
// 같은 void이지만 의미가 좀 다르다

// EX (undefined vs void)
// declare는 구현부를 생략하고싶을 때, 타입만 만들어둘 때
// 대신 자스로 변환하면 사라짐
declare function forEach(arr: number[], callback:(el:number) => void): void;
// function forEach() 로 바디 없이 선언할 수는 있지만 구현부를 아래에 만들어줘야한다
// forEach(){}

let target: number[] = []
// callback 리턴값이 undefined이면 아래는 에러

forEach([1,2,3], el => target.push(el))
// callback 리턴값이 number,undefined이면 아래는 에러
forEach([1,2,3], el => {
  target.push(el)
})

// 매개변수가 언디파인드이면 당연히 에러
// 푸쉬는 리턴값이 넘버이다

// ✅ unknown과 any