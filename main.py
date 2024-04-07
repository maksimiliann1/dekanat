from flask import Flask, request
import flask
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import psycopg2
from models import db, departments

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:3932323@localhost:5432/db_dekanat"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)


# @app.route("/")
# def hello():
#     return "Hello, world!"


@app.route("/", methods=["GET", "POST"])
def users():
    print("users endpoint reached...")
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
        print(f"received data: {received_data}")
        if received_data['login'] == 'maxaufov':
            mode = 'admin'
        else:
            mode = 'viewer'
        return_data = {
            "status": "success",
            "mode": f"{mode}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)


if __name__ == "__main__":
    app.run("localhost", 1337)