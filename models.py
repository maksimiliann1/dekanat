from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class departments(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    audience_number = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Department(name='{self.address}', phone='{self.address}', audience_number='{self.audience_number}')"

class groups(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer(), nullable=False)
    direction_code = db.Column(db.Integer(), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    headman_phone = db.Column(db.String(50), nullable=False)
    headman_name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Group(group_name='{self.group_name}', amount='{self.amount}', direction_code='{self.direction_code}')"


class students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    patronymic = db.Column(db.String(50), nullable=False)
    birthdate = db.Column(db.Date(), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    privelege_status = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    scholarship_card_number = db.Column(db.Integer(), nullable=False)
    record_book_number = db.Column(db.Integer(), nullable=False)
    def __repr__(self):
        return f"Student(name='{self.first_name}', patronymic='{self.patronymic}', group='{self.group_id}')"

class teachers(db.Model):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    patronymic = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    def __repr__(self):
        return f"Teachers(name='{self.first_name}', patronymic='{self.patronymic}', position='{self.position}')"

class accounts(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    mode = db.Column(db.String(50), nullable=False)
    def __repr__(self):
        return f"Accounts(name='{self.students_id}')"