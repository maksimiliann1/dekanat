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
            inputs = document.querySelectorAll('input');
            inputs.forEach((item)=>{
                item.value = '';
            })
        }).catch(()=>{
            alert("ERROR");
        }).finally(()=>{
            form.reset();
        });
}
function studentAdd(){
    prepodSurname = querySelector('.surname').value;
    prepodName = querySelector('.name').value;
    prepodPatronymic = querySelector('.patronymic').value;
    prepodBirthday = querySelector('.birthdate').value;
    prepodAddres = querySelector('.address').value;
    prepodTelephone = querySelector('.phone').value;
    prepodCardNumber = querySelector('.scholarship_card_number').value;
    prepodLogin = querySelector('.email').value;
    prepodPassword = querySelector('.password').value;
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
        mode: "Преподаватель",
        stage: "2"
        
    };
    const json = JSON.stringify(object);
    sendPost(json) 
}
function prepodAdd(){
    prepodSurname = querySelector('.surname_1').value;
    prepodName = querySelector('.name_1').value;
    prepodPatronymic = querySelector('.patronymic_1').value;
    prepodBirthday = querySelector('.birthdate_1').value;
    prepodAddres = querySelector('.address_1').value;
    prepodTelephone = querySelector('.phone_1').value;
    prepodCardNumber = querySelector('.scholarship_card_number_1').value;
    prepodLogin = querySelector('.email_1').value;
    prepodPassword = querySelector('.password_1').value;
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
        mode: "Преподаватель",
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