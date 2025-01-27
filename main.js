/* 
------------------------------------------------
// string , Number , Boolean , Object , Array 
// string - ตัวอักษร
let fristname = 'John';
const idcard = '110370';

// number - ตัวเลข
let age = 30;
let height = 180.5;

// boolean - ค่าที่เป็นจริงหรือเท็จ
let isSingle = true;

fristname = 'Jane';
idcard = '1234';
console.log('Name:', fristname, 'Age:', age);
------------------------------------------------
*/ 


/* 
=================================================
+ บวก
- ลบ
* คูณ
/ หาร
% หารเอาเศษ (MOD)
=================================================
*/ 


/* 
=================================================
== เท่ากับ
!= ไม่เท่ากับ
>  มากกว่า
<  น้อยกว่า
>= มากกว่าหรือเท่ากับ
<= น้อยกว่าหรือเท่ากับ
&& และ
|| หรือ
!  not หรือ ไม่
=================================================
*/


let number1 = 5
let number2 = 8
let number = 20

/*
let result = number1 > number2 //boolean ค่าที่ได้จะเป็น true หรือ false
console.log('new number:', result)
*/

//if - else condition

/*
=================================================
if (number1 != number2) {
    console.log('this is if')
} else if (number1 == number2) {
    console.log('this is else if')
} else {
    console.log('this is else')
}
=================================================
*/


/*
=================================================
Grade
>= 80 = A
>= 70 = B
>= 60 = C
>= 50 = D
=================================================
=================================================
let score = prompt('Enter your score:'); // รับค่าจากผู้ใช้
console.log('You have Score:', score)

if (score >= 80) { 
    console.log('Grade A')
} else if (score >= 70) { 
    console.log('Grade B')
} else if (score >= 60) { 
    console.log('Grade C')
} else if (score >= 50) { 
    console.log('Grade D')
} else { 
    console.log('Grade F')
}
=================================================
*/


/*
=================================================
// true && true = true
// true && false = false
let condition = !(number1 >= 3 || number2 >=5)
console.log('result of condition:', condition)

let age = 20
let gender = 'male'

// true || true = true
// true || false = true
// false || false = false
// true || false = !{True} = false
if (age >= 20 && gender == 'male') {
    console.log('You can male adult')
}

if (!(number % 2 == 0)) {
    console.log('Your number is even')
}
=================================================
*/


/* LOOP
=================================================
while
for
=================================================
=================================================
let counter = 0;

//while loop
while (counter < 10) { //True
    console.log('Hello');
    counter = counter + 1;
// เขียนได้ทั้ง 3 แบบ
//    counter = counter + 1;
//    counter += 1;
//    counter++;
}

//for loop
for (let counter = 0; counter < 10; counter = counter + 1) {
    console.log('Hello');
}
=================================================
*/


/* ARRAY
=================================================
let age1 = 18;
let age2 = 19;
let age3 = 20;
console.log(age1, age2, age3)

let ages = [18, 19, 20];
console.log('age is ',ages[2]);
console.log('age is ',ages);

// การแทนที่ค่าใน Array
ages = [21,22];
console.log('new age is ',ages);

// ต่อ array
ages.push(23);
console.log('age list ',ages);

// ลบค่าสุดท้าย array
ages.pop();
console.log('pop age list ',ages);

=================================================
*/


/* 
=================================================
let ages = [15, 19, 13];
console.log('age is ',ages);
ages.sort();
console.log('age is ',ages);

let name_list = ['John', 'Jane', 'Doe'];
name_list.push('David');
console.log('name list ',name_list.length);
console.log('name list ',name_list[0]);
console.log('name list ',name_list[1]);
console.log('name list ',name_list[2]);
console.log('name list ',name_list[3]);

for (let index = 0; index < index.length; index++) {
    console.log('fot name_list is :', name_list[index]);
}
=================================================
*/


/*
=================================================
Object 
let student = [{
    name: 'John',
    age: 30,
    grade: 'A'
},{
    name: 'Jane',
    age: 20,
    grade: 'B'
},{
    name: 'Doe',
    age: 25,
    grade: 'C'
}
];
student.pop(); //ลบข้อมูลสุดท้าย


console.log(student);
for (let index = 0; index < student.length; index++) {
    console.log('Student number',index + 1);
    console.log( student[index].name);
    console.log(student[index].age);
    console.log(student[index].grade);
}
=================================================
*/


/* Object + Array
=================================================
let scores1 = 50
let scores2 = 60
let grade = ''



// arrow function
let calculateGrade = (scores) => {
    if (scores >= 80) {
        grade = 'A'
    } else if (scores >= 70) {
        grade = 'B'
    } else if (scores >= 60) {
        grade = 'C'
    } else if (scores >= 50) {
        grade = 'D'
    } else {
        grade = 'F'
    }
    return grade
}


// เรียกใช้ function calculateGrade โดยส่งค่า scores1 และ scores2 เข้าไป
let grade1 = calculateGrade(scores1)
let grade2 = calculateGrade(scores2)
// แสดงผลลัพธ์
console.log('Grade1:', grade1)
console.log('Grade2:', grade2)

=================================================
*/


/* Array
=================================================
let score = [10,20,30,40,50];
let newScore = []

for (let index = 0; index < score.length; index++) {
    console.log('score',score[index]);
    if (score[index] >= 30) {
        newScore.push(score[index]);
    }
}

console.log('new score',newScore);

newScore.forEach((ns) => {
    console.log('new score',ns);
});

//for (let index = 0; index < score.length; index++) {
//    console.log(score[index]);
//}

//score=score.map((s) => {
//    return s * 2;
//});

//score.forEach((s) => {
//    console.log('score',s);
//});

//map , filter 

=================================================
*/


/* Object function
=================================================

=================================================
*/

let students = [
    {
        name: 'John',
        age: 30,
        grade: 'A'
    },
    {
        name: 'Jane',
        age: 20,
        grade: 'B'
    }
]

let student = students.find((s) => {
    if (s.name == 'John') {
        return true;
    }
})

let doublescore = students.map((s) => {
    score = s.score * 2;
    return  s
})
    
console.log('student',students);
console.log('double score',doublescore)