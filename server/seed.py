# seed.py
#!/usr/bin/env python3

# Local imports
from app import app
from config import db
from models import Employee

with app.app_context():

    print("Starting seed...")

    employee = Employee(
        employee_first_name="Christian",
        employee_last_name="Hernandez",
        employee_email="hernandezchristian94@gmail.com",
        employee_dob="90/29/1992",
        employee_sex="Male",
        account_type="Admin"
    )
    employee.password_hash = "Extra004!"  # Use the password setter
    db.session.add(employee)
    db.session.commit()


    print('Deleting existing data...')
    Employee.query.delete()
