function requestMarks(userId, mode, subj, group){
    const object = {
        id: userId,
        subject: subj,
        group: group,
        mode: mode,
        stage: "3"
    };
    json = JSON.stringify(object);
    console.log(json);
    fetch('http://localhost:1337', {
            method:"POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: json  
        }).then(data => data.text())
        .then(data => {
            data = JSON.parse(data);
            console.log(data);
            table = document.querySelector('.table');
            students = data.students;
            marks = data.marks;
            for(let i = 0; i<students.length; i++){
                str = document.createElement('tr');
                // child.classList.add('predm__li');
                stolb1 = document.createElement('td');
                stolb1.classList.add('td_1');
                stolb2 = document.createElement('td');
                stolb2.classList.add('td_2');
                stolb3 = document.createElement('td');
                stolb3.classList.add('td_2');
                stolb4 = document.createElement('td');
                stolb4.classList.add('td_2');
                stolb1.textContent = `${students[i].name} ${students[i].surname} `;
                if (marks[i].module_1 == null){
                    input = document.createElement('input');
                    input.classList.add('empty_td');
                    input.type = 'text';
                    stolb2.appendChild(input);
                    stolb2.style.backgroundColor = "#D02F2F";
                }else{
                    stolb2.textContent = `${marks[i].module_1}`;
                }
                if (marks[i].module_2 == null){
                    input = document.createElement('input');
                    input.classList.add('empty_td');
                    input.type = 'text';
                    stolb3.appendChild(input);
                    stolb3.style.backgroundColor = "#D02F2F";
                }else{
                    stolb3.textContent = `${marks[i].module_2}`;
                }
                if (marks[i].last_mark == null){
                    input = document.createElement('input');
                    input.classList.add('empty_td');
                    input.type = 'text';
                    stolb4.appendChild(input);
                    stolb4.style.backgroundColor = "#D02F2F";
                }else{
                    stolb4.textContent = `${marks[i].last_mark}`;
                }
                str.appendChild(stolb1);
                str.appendChild(stolb2);
                str.appendChild(stolb3);
                str.appendChild(stolb4);

                table.appendChild(str);

            }
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            console.log('Денис Эклер');
            blockPredm = document.querySelector('.predmets__2');
            blockPredm.style.display = 'block';
        });
}
function deleteRows() {
    let table = document.querySelector("table");
    let rowCount = table.rows.length;
    
    for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
    }
    }
function studentResizer(widthStart){
    profile = document.querySelector(".profile");
    navigationElement = document.querySelector(".second")
    navigation = document.querySelector(".navigation")
    list = document.querySelectorAll(".menu__li")
    logoIMG = document.querySelector(".logo");
    widthStart = 1549;
    widthCurrent = window.innerWidth;
    navigation.style.marginLeft = `${0}px`;
    console.log(list);
    // let temp = 0;
    for (let i = 0; i<list.length; i++){
        let temp = (widthCurrent - logoIMG.offsetWidth - widthCurrent*0.1)/(list.length+1);
        list[i].style.marginLeft = `${temp}px`;
        console.log(temp);    
    }
    // list.forEach((e)=>{
    //     temp = 0;
    //     e.style.marginLeft = `${(widthCurrent - logoIMG.offsetWidth - widthCurrent*0.1)/list.length}px`;
    //     temp+=(widthCurrent - logoIMG.offsetWidth - widthCurrent*0.1)/list.length;
    //     console.log((widthCurrent - logoIMG.offsetWidth - widthCurrent*0.1)/list.length);
    // });
    
    if (widthStart - widthCurrent > 0){
        profile.style.paddingLeft = `${900 - (widthStart - widthCurrent)}px`

    }else{
        profile.style.paddingLeft = `${900 + widthCurrent - widthStart}px` 
    }
    widthStart = widthCurrent;

}
document.addEventListener('DOMContentLoaded', (e)=>{
    // e.preventDefault();
    backMarks = document.querySelector('#back_marks');
    backMarks.addEventListener('click', () => {
        predmets = document.querySelector('.predmets');
        predmets.style.display = 'block';
        predmets2 = document.querySelector('.predmets__2');
        predmets2.style.display = 'none';
        deleteRows();
    })
    studentResizer();
    window.addEventListener('resize', () => {
        studentResizer();
        // console.log(window.innerWidth);
        
    });
    profName = document.querySelector('.profile__text')
    console.log(profName);
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('name');
    const userSurname = localStorage.getItem('surname');
    const mode = localStorage.getItem('mode');
    profName.textContent = `${userName} ${userSurname}`
    const stage = "2";
    const object = {
        id: userId,
        stage: stage,
        mode: mode
    };
    const json = JSON.stringify(object);
    profName = document.querySelector('.profile__text')
    predmUl = document.querySelector('.predm__ul')
   
    console.log(json);
    console.log(object);
    fetch('http://localhost:1337', {
            method:"POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: json  
            
        }).then(data => data.text())
        .then(data => {
            data = JSON.parse(data);
            console.log(data);
            subjects = data.subjects;
            groups = data.groups;
            for(let i = 0; i<subjects.length; i++){
                child = document.createElement('li');
                child.classList.add('predm__li');
                childA = document.createElement('a');
                childA.classList.add('predm__li__text');
                childA.href = '#';
                childA.textContent = `${subjects[i]} ${groups[i]} `;
                childA.className = "predm__li"
                childA.className = "predm__li__text"
                child.appendChild(childA);
                predmUl.appendChild(child);
                child.addEventListener('click', (e)=>{
                    blockPredm = document.querySelector('.predmets');
                    blockPredm.style.display = 'none';
                    requestMarks(userId, mode, subjects[i], groups[i]);
                });
            }
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            console.log("powli vse nahui");
        });
});