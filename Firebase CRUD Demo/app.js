function saveData() {
    let name = document.getElementById("name");
    let rollNum = document.getElementById("rollNum");

    var key = firebase.database().ref('students').push().key;
    let student = {
        name: name.value,
        rollNum: rollNum.value,
        key: key,
    }
    console.log(student)
    // firebase.database().ref("student").set(student);
    // firebase.database().ref("student").set("Huzaifa");

    // firebase.database().ref("students").child("student1").set(student);
    // or
    // firebase.database().ref("students/student1").set(student);
    // firebase.database().ref("students").push(student);

    // var key = "student"+Math.floor(Math.random() * 34343049304);
    // or
    // var key = firebase.database().ref('students').push().key;

    firebase.database().ref("students/" + key).set(student);

    name.value = "";
    rollNum.value = "";

}
// console.log(firebase)
// console.log(firebase.database)

function getData() {

    let parent = document.getElementById('main');

    // once : get data only once when page is refresh
    // firebase.database().ref('students/').once('value',function(data){

    //     // console.log(data.val());
    //     let students = data.val();
    //     // console.log(students)
    //     for (var student in students){
    //         // console.log(students[student].name)
    //         // document.write(students[student].name);
    //         let li = document.createElement('li');
    //         let text = document.createTextNode(students[student].name);
    //         li.appendChild(text);
    //         parent.appendChild(li)
    //     }
    // })

    // on: get data whenever new data is added. child_added, child_change, child_delete also an option.
    firebase.database().ref('students/').on('child_added', function (data) {
        let students = data.val();
        console.log(students)
       
    })
}
getData()

function removeData(){
    // remove single data.
    // firebase.database().ref('students/-MGmCVF4Tv6MSWN3i097').remove()
        // remove complete object
    // firebase.database().ref('students').remove()
}

removeData()

function editData(){
    firebase.database().ref('students/-MGnSXolyWUWf4OGZTdk').set({
        key:"-MGnSXolyWUWf4OGZTdk",
        name:"Huzaifa Khan",
        rollNum:'5432'
    })
}
editData()