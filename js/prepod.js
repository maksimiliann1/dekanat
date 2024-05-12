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
    profName = querySelector('.profile__text')
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('name');
    const userSurname = localStorage.getItem('surname');
    const mode = localStorage.getItem('mode');
    profName.value = `${userName} ${userSurname}`
    const stage = 2;
    const object = {
        id: userId,
        stage: stage,
        mode: mode
    };
    const json = JSON.stringify(object);
    console.log(object);
    fetch('http://localhost:1337', {
            method:"GET",
            headers: {
                'Content-type': 'application/json'
            },
            body: json  
        }).then(data => data.text())
        .then(data => {
            data = JSON.parse(data);
            if (data.mode == 'Админ'){
                window.location.href = 'index_admin.html';

            }else if(data.mode == 'Студент'){
                window.location.href = 'index_student.html';
            }else if(data.mode == 'Преподаватель'){
                window.location.href = 'index_prepod.html'; 
                // localStorage.setItem('id', data.id); 
                // localStorage.setItem('name', data.name); 
                // localStorage.setItem('surname', data.surname); 
            }else{
                loginField = document.querySelector(".login__field");
                loginPassword = document.querySelector(".login__password");
                loginField.style.border = "1px solid red";
                loginPassword.style.border = "1px solid red";
            }
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            form.reset();
        });
});