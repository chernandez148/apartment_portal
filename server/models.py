# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from bcrypt import hashpw, gensalt
from flask_bcrypt import Bcrypt
from config import app, db, CORS

bcrypt = Bcrypt(app)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    property_name = db.Column(db.String, nullable=False)
    street = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    email = db.Column(db.String, db.ForeignKey('units.email'))

    units = db.relationship("Unit", backref="user")

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    serialize_rules = ('-created_at', '-updated_at', "-units", "-email")

class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    employee_first_name = db.Column(db.String, nullable=False)
    employee_last_name = db.Column(db.String, nullable=False)
    employee_email = db.Column(db.String, nullable=False)
    employee_dob = db.Column(db.String, nullable=False)
    employee_sex = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    account_type = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    serialize_rules = ('-created_at', '-updated_at')

class Property(db.Model, SerializerMixin):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    property_name = db.Column(db.String, nullable=False)
    property_street = db.Column(db.String, nullable=False)
    property_city = db.Column(db.String, nullable=False)
    property_state = db.Column(db.String, nullable=False)
    property_postal_code = db.Column(db.Integer, nullable=False)
    num_of_units = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    units = db.relationship("Unit", backref="property")

    serialize_rules = ('-created_at', '-updated_at', "-units")

class Unit(db.Model, SerializerMixin):
    __tablename__ = "units"

    id = db.Column(db.Integer, primary_key=True)
    unit_number = db.Column(db.String, nullable=False)
    unit_type = db.Column(db.String, nullable=False)
    unit_price = db.Column(db.String, nullable=False)
    sqft = db.Column(db.String, nullable=False)
    current_tenant_first_name = db.Column(db.String, nullable=False)
    current_tenant_last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    property_name = db.Column(db.String, db.ForeignKey('properties.property_name'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-created_at', '-updated_at', "-property_name")




