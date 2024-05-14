from flask import Flask
from models import db, departments, accounts, students, marks, teachers, groups, subjects
from datetime import date

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:3932323@localhost:5432/db_dekanat"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        student = students(first_name='Никишин', 
                   last_name='Кирилл', 
                   patronymic='Геннадьевич', 
                   birthdate=date(2005, 2, 3),
                   address='Бирюлево', 
                   group_id=1, 
                   privelege_status="нет",
                   email='yaNikishin@mail.ru', 
                   phone="+79254534544", 
                   scholarship_card_number=23434, 
                   record_book_number=6243433)


   

        db.session.add_all([student])
        db.session.commit()