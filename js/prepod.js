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
            }
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            console.log("powli vse nahui");
        });
});