from flask import Flask, jsonify, request
import flask
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from models import db, departments, accounts, students, marks, teachers, groups, subjects, admins
import traceback
import bcrypt as bc
from sqlalchemy import join
from sqlalchemy import select
from passlib.hash import bcrypt


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:3932323@localhost:5432/db_dekanat"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/", methods=["GET", "POST"])
def users():
    print("users endpoint reached...")
    try:
        if request.method == "GET":
            with open("users.json", 'r') as f:
                data = json.load(f)
                data.append({
                    "username": "user4",
                    "pets": ["hamster"]
                })

                return flask.jsonify(data)

        if request.method == "POST":
            received_data = request.get_json()
            stage = get_stage(received_data)
            if stage == '1':
                login = received_data['login']
                password = received_data["password"]

                account_id, mode, entity_id = authenticate(received_data['login'], received_data["password"])

                if account_id is not None and mode is not None:
                    name = None
                    surname = None
                    if mode == 'Преподаватель':
                        teacher = teachers.query.filter_by(id=entity_id).first()
                        # Проверяем, что преподаватель найден
                        if teacher:
                            # Получаем имя и фамилию преподавателя из объекта
                            name = teacher.first_name
                            surname = teacher.last_name
                    elif mode == 'Студент':
                        student = students.query.filter_by(id=entity_id).first()
                        name = student.last_name
                        surname = student.first_name
                    elif mode == 'Админ':
                        admin = admins.query.filter_by(id=entity_id).first()
                        name = admin.first_name
                        surname = admin.last_name    
                    response_data = {
                        "status": "success",
                        "id": account_id,
                        "name": name,
                        "surname": surname,
                        "mode": mode
                    }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
                else:
                    return flask.Response(response=json.dumps({"status": "error"}), status=401, mimetype='application/json')
            elif stage == '2':
                mode = received_data['mode']
                subjs = []
                subjs_name = []
                group_names_array = []
                group_names = []
                if mode == 'Преподаватель':
                    account_id = received_data['id']
                    subjs = [(subj[0], subj[1]) for subj in marks.query.with_entities(marks.subject_name, marks.group_id).distinct()]
                    for i in range(len(subjs)):
                        subjs_name.append(subjs[i][0])
                        group_names.append(subjs[i][1])
                    groups_data = groups.query.all()
                    group_dict = {group.id: group.group_name for group in groups_data}
                    group_names_array = [group_dict[group_id] for group_id in group_names]
                    response_data = {
                        "status": "success",
                        "subjects": subjs_name,
                        "groups": group_names_array,
                        "id": account_id,
                        "mode": mode
                    }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200,
                                          mimetype='application/json')
                elif mode == 'Админ':
                    account_id = received_data['account_id']
                    first_name, last_name, patronymic = received_data['first_name'], received_data['last_name'], received_data['patronymic']
                    brd, address, phone = received_data['birthdate'], received_data['address'], received_data['phone']
                    card, login, pwd = received_data['card_number'], received_data['login'], received_data['password']
                    target_mode = received_data['target_mode']
                    if target_mode == 'Студент':
                        group_id = received_data['group_id']
                        privelege_status = received_data['privelege_status']
                        record_book_number = received_data['record_book_number']
                        new_student = students(
                        first_name=first_name,
                        last_name=last_name,
                        patronymic=patronymic,
                        birthdate=brd,
                        address=address,
                        phone=phone,
                        privelege_status=privelege_status,
                        record_book_number=record_book_number,
                        group_id=group_id,
                        email=login,
                        scholarship_card_number=card,
                        )
                        # Добавление новой записи в сессию
                        db.session.add(new_student)
                    elif target_mode == 'Преподаватель':
                        position, department_id = received_data['position'], received_data['department_id']
                        new_teacher = teachers(
                        first_name=first_name,
                        last_name=last_name,
                        patronymic=patronymic,
                        birthdate=brd,
                        address=address,
                        phone=phone,
                        card_number=card,
                        position=position,
                        department_id=department_id
                        )
                        # Добавление новой записи в сессию
                        db.session.add(new_teacher)
                    db.session.commit()
                    if target_mode == 'Студент':
                        account = students.query.filter_by(first_name=first_name, last_name=last_name, patronymic=patronymic, phone=phone).first()
                    elif target_mode == 'Преподаватель':
                        account = teachers.query.filter_by(first_name=first_name, last_name=last_name, patronymic=patronymic, phone=phone).first()
                    uid = account.id
                    acc = accounts.query.filter_by(id=11).first()
                    hashed_pwd = acc.password
                    rounds = int(hashed_pwd[4:6])  # Число раундов - это символы 5 и 6
                    salt = hashed_pwd[7:29]  # Соль - это символы 8-29
                    pwdh = bcrypt.using(rounds=rounds, salt=salt, ident="2a").hash(pwd)
                    new_acc = accounts(
                        login=login,
                        password=pwdh,
                        mode=target_mode,
                        entity_id=uid
                    )
                    db.session.add(new_acc)
                    db.session.commit()
                    response_data = {
                        "status": "success",
                        "id": account_id,
                        "mode": mode
                    }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200,
                                          mimetype='application/json')
                elif mode == 'Студент':
                    account_id = received_data['id']
                    acc = accounts.query.filter_by(id=account_id).first()
                    uid = acc.entity_id
                    # subjs = [subj[0] for subj in marks.query.with_entities(marks.subject_name).filter_by(student_id=11).distinct()]
                    subjects_with_info = marks.query.with_entities(
                        marks.subject_name,
                        marks.module_1,
                        marks.module_2,
                        marks.last_mark
                    ).filter_by(student_id=uid).distinct().all()
                    modules_1 = []
                    modules_2 = []
                    last_marks = []
                    for subject_info in subjects_with_info:
                        subjs.append(subject_info.subject_name)
                        modules_1.append(subject_info.module_1)
                        modules_2.append(subject_info.module_2)
                        last_marks.append(subject_info.last_mark)
                    # subjs = [(subj[0], subj[1]) for subj in marks.query.with_entities(marks.subject_name, marks.student_id).distinct()]
                    response_data = {
                        "status": "success",
                        "subjects": subjs,
                        "module_1": modules_1,
                        "module_2": modules_2,
                        "last_mark": last_marks,
                        "id": account_id,
                        "mode": mode
                    }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
            elif stage == '3':
                subject, group = received_data['subject'], received_data['group']
                account_id, mode = received_data['id'], received_data['mode']
                group_result = groups.query.filter_by(group_name=group).first()
                group_id = int(group_result.id)
                if subject is not None and group is not None:
                    ents = []
                    ents_query = marks.query.filter_by(subject_name=subject, group_id=group_id)
                    student_ids = []
                    for ent in ents_query:
                        student_ids.append(ent.student_id)
                    students_data = students.query.filter(students.id.in_(student_ids)).all()
                    student_dict = {student.id: {"name": student.first_name, "surname": student.last_name,
                                                "patronymic": student.patronymic} for student in students_data}

                    # Преобразование значений в словаре student_dict в JSON-сериализуемый формат
                    for student_id, student_data in student_dict.items():
                        student_dict[student_id] = dict(student_data)

                    student_names_array = [student_dict[student_id] for student_id in student_ids]
                    for ent in ents_query:
                        ents.append({
                            'student_id': ent.student_id,
                            'module_1': ent.module_1,
                            'module_2': ent.module_2,
                            'last_mark': ent.last_mark
                        })
                    response_data = {
                        "status": "success",
                        "id": account_id,
                        "mode": mode,
                        "students": student_names_array,
                        "marks": ents,
                    }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
                else:
                    return flask.Response(response=json.dumps({"status": "error"}), status=401, mimetype='application/json')
            elif stage == '4':
                subject, group = received_data['subject'], received_data['group']
                account_id, mode = received_data['id'], received_data['mode']
                group_result = groups.query.filter_by(group_name=group).first()
                group_id = int(group_result.id)
                student_id = received_data['student_id']
                module_1 = received_data['module_1']
                module_2 = received_data['module_2']
                last_mark = received_data['last_mark']

                mark = marks.query.filter_by(student_id=student_id, subject_name=subject, group_id=group_id).first()
                if mark:
                    mark.module_1 = module_1
                    mark.module_2 = module_2
                    mark.last_mark = last_mark
                    db.session.commit()
                    response_data = {
                        "status": "success",
                        "message": "Оценки успешно обновлены"
                    }
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
                else:
                    return flask.Response(response=json.dumps({"status": "error", "message": "Запись не найдена"}), status=404, mimetype='application/json')

    except Exception as e:
        traceback.print_exc()
        return flask.Response(response=json.dumps({"status": "error", "message": str(e)}), status=500)


def get_stage(f):
    return f['stage']


def authenticate(username, password):
    account = accounts.query.filter_by(login=username).first()

    if account is None:
        return None, None, None

    stored_hash = account.password

    if bc.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
        return account.id, account.mode, account.entity_id
    else:
        return None, None, None


if __name__ == "__main__":
    app.run("localhost", 1337)     
