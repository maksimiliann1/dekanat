function sendPost(json){
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
            
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            inputs = document.querySelectorAll('input');
            inputs.forEach((item)=>{
                item.value = '';
            })
        });
}
function studentAdd(){
    prepodSurname = document.querySelector('.surname').value;
    prepodName = document.querySelector('.name').value;
    prepodPatronymic = document.querySelector('.patronymic').value;
    prepodBirthday = document.querySelector('.birthdate').value;
    prepodAddres = document.querySelector('.address').value;
    prepodTelephone = document.querySelector('.phone').value;
    prepodCardNumber = document.querySelector('.scholarship_card_number').value;
    prepodLogin = document.querySelector('.email').value;
    prepodPassword = document.querySelector('.password').value;
    id = localStorage.getItem('id');
    const object = {
        last_name: prepodName,
        first_name: prepodSurname,
        patronymic: prepodPatronymic,
        birthday: prepodBirthday,
        address: prepodAddres,
        phone: prepodTelephone,
        card_number: prepodCardNumber,
        login: prepodLogin,
        password: prepodPassword,
        target_mode: "Студент",
        account_id: localStorage.getItem('id'),
        mode: "Админ",
        stage: "2"
        
    };
    const json = JSON.stringify(object);
    sendPost(json) 
}
function prepodAdd(){
    prepodSurname = document.querySelector('.surname_1').value;
    prepodName = document.querySelector('.name_1').value;
    prepodPatronymic = document.querySelector('.patronymic_1').value;
    prepodBirthday = document.querySelector('.birthdate_1').value;
    prepodAddres = document.querySelector('.address_1').value;
    prepodTelephone = document.querySelector('.phone_1').value;
    prepodCardNumber = document.querySelector('.scholarship_card_number_1').value;
    prepodLogin = document.querySelector('.email_1').value;
    prepodPassword = document.querySelector('.password_1').value;
    prepodPosition = document.querySelector('.position').value;
    id = localStorage.getItem('id');
    department_id = document.querySelector('.department_id');
    const object = {
        last_name: prepodName,
        first_name: prepodSurname,
        patronymic: prepodPatronymic,
        birthday: prepodBirthday,
        address: prepodAddres,
        phone: prepodTelephone,
        card_number: prepodCardNumber,
        login: prepodLogin,
        position: prepodPosition,
        password: prepodPassword,
        account_id: id,
        department_id: department_id,
        target_mode: "Преподаватель",
        mode: "Админ",
        stage: "2"
        
    };
    const json = JSON.stringify(object);
    sendPost(json)
    
        
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
    select = document.querySelector(".roles__select");
    studentFormInfo = document.querySelector('.form__info');
    prepodFormInfo = document.querySelector('.form__info__prepod');
    submitButton = document.querySelector('.submit');
    studentFormAcc = document.querySelector('.form_acc_info')
    prepodFormAcc = document.querySelector('.form_acc_info_prepod')
    inputs = document.querySelectorAll('input');
    console.log(prepodFormInfo, prepodFormAcc);
    select.addEventListener('change', ()=>{
        inputs.forEach((item)=>{
            item.value = '';
        })
        if(select.value == 'prepod'){
            studentFormInfo.style.display = "none";
            studentFormAcc.style.display = "none";
            prepodFormInfo.style.display = "block";
            prepodFormAcc.style.display = "block";
        }else{
            studentFormInfo.style.display = "block";
            studentFormAcc.style.display = "block";
            prepodFormInfo.style.display = "none";
            prepodFormAcc.style.display = "none";
        }   
    }); 
    submitButton.addEventListener('click', ()=>{
        if(select.value == 'prepod'){
            prepodAdd();
        }else{
            studentAdd();
        }
    });

        
    
});