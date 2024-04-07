from flask import Flask, request
import flask
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from models import db, departments, accounts
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
            # mode = received_data["mode"]

            account = accounts.query.filter_by(login=login, password=password).first()
            if account is not None:
                return flask.Response(response=json.dumps({"status": "success",},), status=200)
            else:
                return flask.Response(response=json.dumps({"status": "error"}), status=401)
    except Exception as e:
        traceback.print_exc()
        return flask.Response(response=json.dumps({"status": "error", "message": str(e)}), status=500)







if __name__ == "__main__":
    app.run("localhost", 1337)     


    # def authentication(догин и пароль в джейсон формате):
    # она ишет запись в которой есть логин и пароль и возвращает мод и ид
