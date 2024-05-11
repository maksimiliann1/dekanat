from flask import Flask, jsonify, request
import flask
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from models import db, departments, accounts, marks
import traceback

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
            login = received_data['login']
            password = received_data["password"]

            account_id, mode = authentication(received_data['login'], received_data["password"])

            if account_id is not None and mode is not None:
                subjs = []
                if mode == 'Преподаватель':
                    subjs = marks.query.with_entities(marks.subject_name).distinct()
                response_data = {
                    "status": "success",
                    "subjects": subjs,
                    "id": account_id,
                    "mode": mode
                }
                print(response_data)
                return flask.Response(response=json.dumps(response_data, ensure_ascii=False), status=200, mimetype='application/json')
            else:
                return flask.Response(response=json.dumps({"status": "error"}), status=401, mimetype='application/json')

    except Exception as e:
        traceback.print_exc()
        return flask.Response(response=json.dumps({"status": "error", "message": str(e)}), status=500)



def authentication(login, password):
    try:
        account = accounts.query.filter_by(login=login, password=password).first()

        if account is not None:
            return account.id, account.mode
        else:
            return None, None
    except Exception as e:
        traceback.print_exc()
        return None, None



if __name__ == "__main__":
    app.run("localhost", 1337)     



    # def authentication(догин и пароль в джейсон формате):
    # она ишет запись в которой есть логин и пароль и возвращает мод и ид

   #         account = accounts.query.filter_by(login=login, password=password).first()
    #         if account is not None:
    #             return flask.Response(response=json.dumps({"status": "success",},), status=200)
    #         else:
    #             return flask.Response(response=json.dumps({"status": "error"}), status=401)
    # except Exception as e:
    #     traceback.print_exc()
    #     return flask.Response(response=json.dumps({"status": "error", "message": str(e)}), status=500)