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
    # __tablename__ = 'accounts'
    # id = db.Column(db.Integer, primary_key=True)
    # login = db.Column(db.String(50), nullable=False)
    # password = db.Column(db.String(50), nullable=False)
    # mode = db.Column(db.String(50), nullable=False)
    # entity_id = db.Column(db.Integer, nullable=True)
    # def __repr__(self):
    #     return f"Accounts(name='{self.students_id}')"
    
        
        # student1 = students(first_name='Коновалов', 
        #            last_name='Михаил', 
        #            patronymic='Александрович', 
        #            birthdate=date(2008, 2, 3),
        #            address='Омск', 
        #            group_id=1, 
        #            privelege_status="да",
        #            email='misha@mail.ru', 
        #            phone="+79255454544", 
        #            scholarship_card_number=29434, 
        #            record_book_number=2243433)

   

        db.session.add_all([account])
        db.session.commit()