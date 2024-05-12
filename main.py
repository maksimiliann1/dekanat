from flask import Flask, jsonify, request
import flask
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from models import db, departments, accounts, students, marks, teachers
import traceback
import bcrypt

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:3932323@localhost:5432/db_dekanat"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
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
                account_id = received_data['id']
                subjs = []
                if mode == 'Преподаватель':
                    subjs = [(subj[0], subj[1]) for subj in marks.query.with_entities(marks.subject_name, marks.group_id).distinct()]
                elif mode == 'Студент':
                    subjs = [(subj[0], subj[1]) for subj in marks.query.with_entities(marks.subject_name, marks.group_id).distinct()]
                response_data = {
                    "status": "success",
                    "subjects": subjs,
                    "id": account_id,
                    "mode": mode
                }
                print(response_data)
                return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
            elif stage == '3':
                subject, group = received_data['subject'], received_data['group']
                if subject is not None and group is not None:
                    ents = []
                    ents_query = marks.query.filter_by(subject_name=subject, group_id=group)
                    for ent in ents_query:
                        ents.append({
                            'id': ent.id,
                            'student_id': ent.student_id,
                            'module_1': ent.module_1,
                            'module_2': ent.module_2,
                            'last_mark': ent.last_mark
                        })
                    response_data = {
                        "status": "success",
                        "entities": ents,
                        }
                    print(response_data)
                    return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
                else:
                    return flask.Response(response=json.dumps({"status": "error"}), status=401, mimetype='application/json')

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

    if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
        return account.id, account.mode, account.entity_id
    else:
        return None, None, None


if __name__ == "__main__":
    app.run("localhost", 1337)     
