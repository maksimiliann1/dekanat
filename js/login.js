function inputZise(field, fieldWith, fieldHeight, fontSize, marginTop){
    field.style.width = `${fieldWith}px`;
    field.style.height = `${fieldHeight}px`;    
    field.style.fontSize = `${fontSize}px`;
    // field.style.marginLeft = `${marginLeft}%`;
    field.style.marginTop = `${marginTop}%`; 
}
function login_resizer(){
    login = document.querySelector("form");
    loginField = document.querySelector(".login__field");
    loginPassword = document.querySelector(".login__password");
    loginImg = document.querySelector(".login__image")
    logoBtn = document.querySelector(".login__submit");
    if(window.screen.width > 1900){
        console.log(window.innerWidth);
        inputZise(loginField, 774, 105, 5);
        inputZise(loginPassword, 774, 105, 3);
        loginImg.src = "../imgs/Rectangle 35.png";
        loginImg.style.width = "307px";
        loginImg.style.height = "202px";
        loginImg.style.paddingTop = "30px";
        login.style.width = "1146px";
        login.style.height = "670px";
        loginField.style.fontSize = "30px";
        loginPassword.style.fontSize = "30px";
        logoBtn.style.width = "300px";
        logoBtn.style.height = "72px";
        logoBtn.style.marginTop = "25px";
        logoBtn.style.fontSize = "30px";
        logoBtn.style.borderRadius = "30px";


        console.log("big");

    }else if (window.innerWidth > 576 && window.innerWidth<=768){
        console.log(window.innerWidth);
        inputZise(loginField, 377, 49, 18, 4);
        inputZise(loginPassword, 377, 49, 18, 4);
        loginImg.style.width = "146px";
        loginImg.style.height = "91px";
        loginImg.src = "../imgs/Rectangle 35.png";
        loginImg.style.paddingTop = "10px";
        login.style.width = "559px";
        login.style.height = "313px";
        logoBtn.style.width = "146px";
        logoBtn.style.height = "31px";
        logoBtn.style.marginTop = "1px";   
        logoBtn.style.fontSize = "15px";
        logoBtn.style.paddingTop = "7px";
        console.log("tablet");            
    }else if(window.innerWidth <= 576){ 
        inputZise(loginField, 210, 34, 13, 8);
        inputZise(loginPassword, 210, 34, 13, 6);
        loginImg.style.width = "101px";
        loginImg.style.height = "66px";
        loginImg.src = "../imgs/Rectangle 35.png";
        loginImg.style.paddingTop = "10px";
        login.style.width = "297px";
        login.style.height = "223px";
        logoBtn.style.width = "87px";   
        logoBtn.style.height = "22px";
        logoBtn.style.marginTop = "-11px";
        logoBtn.style.paddingTop = "4px";
        logoBtn.style.fontSize = "10px";
        console.log("phone");
    }else if(window.screen.width > 768 && window.screen.width < 1900){
        inputZise(loginField, 456, 60, 20, 4);
        inputZise(loginPassword, 456, 60, 20, 4);
        loginImg.style.width = "176px";
        loginImg.style.height = "119px";
        loginImg.src = "../imgs/Rectangle 35.png";
        loginImg.style.paddingTop = "20px";
        login.style.width = "676px";
        login.style.height = "379px";
        logoBtn.style.width = "176px";   
        logoBtn.style.height = "38px";
        logoBtn.style.marginTop = "0px";
        logoBtn.style.paddingTop = "7px";
        logoBtn.style.fontSize = "20px";
        console.log("laptop");
    }
}

document.addEventListener('DOMContentLoaded', (e)=>{
    // e.preventDefault();
    login_resizer();
    window.addEventListener('resize', () => {
        login_resizer();
        console.log("resize");
        
    });
    let form = document.querySelector('form');
    console.log(form);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        const json = JSON.stringify(object);
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
            if (data.mode == 'Админ'){
                window.location.href = 'index_admin.html';
            }else if(data.mode == 'Студент'){
                window.location.href = 'index_student.html';
            }else if(data.mode == 'Преподаватель'){
                window.location.href = 'index_prepod.html'; 
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
});
