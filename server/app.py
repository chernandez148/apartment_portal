#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, abort, jsonify, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Employee, Property, Unit

class Login(Resource):
    def post(self):
        request_json=request.get_json()

        email = request_json.get("email")
        password = request_json.get("password")

        check_user = User.query.filter(User.email == email).first()

        if check_user and check_user.authenticate(password):
            session['user_id'] = check_user.id
            response_data = check_user.to_dict(rules=("units", "email"))
            return make_response(response_data, 200)
        
        return {'error': 'Unauthorized'}, 401
                
api.add_resource(Login, '/login')

class EmployeeLogin(Resource):
    def post(self):
        request_json=request.get_json()

        employee_email = request_json.get("employee_email")
        password = request_json.get("password")

        check_user = Employee.query.filter(Employee.employee_email == employee_email).first()

        if check_user and check_user.authenticate(password):
            session['employee_id'] = check_user.id
            response_data = check_user.to_dict()
            return make_response(response_data, 200)
        
        return {'error': 'Unauthorized'}, 401
                
api.add_resource(EmployeeLogin, '/employee_login')

class Register(Resource):
    def post(self):
        request_json=request.get_json()

        first_name = request_json.get("first_name")
        last_name = request_json.get("last_name")
        email = request_json.get("email")
        property_name = request_json.get("property_name")
        street = request_json.get("street")
        city = request_json.get("city")
        state = request_json.get("state")
        postal_code = request_json.get("postal_code")
        password = request_json.get("password")

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            property_name=property_name,
            street=street,
            city=city,
            state=state,
            postal_code=postal_code
        )

        new_user.password_hash = password

        try:
            db.session.add(new_user) 
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 200)
        except IntegrityError as e: 
            db.session.rollback()  
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 422)  
        except Exception as e:
            print(e)
            return make_response({'error': 'Internal Server Error'}, 500)  

        
api.add_resource(Register, '/register')

class NewProperty(Resource):

    def get(self):
        property = [property.to_dict(rules=("units",)) for property in Property.query.all()]
        return make_response(jsonify(property), 200)

    def post(self):
        request_json=request.get_json()

        property_name = request_json.get("property_name")
        property_street = request_json.get("property_street")
        property_city = request_json.get("property_city")
        property_state = request_json.get("property_state")
        property_postal_code = request_json.get("property_postal_code")
        num_of_units = request_json.get("num_of_units")

        new_property = Property(
            property_name=property_name,
            property_street=property_street,
            property_city=property_city,
            property_state=property_state,
            property_postal_code=property_postal_code,
            num_of_units = num_of_units
        )

        try: 
            db.session.add(new_property)
            db.session.commit()
            return make_response(new_property.to_dict(), 200)
        except IntegrityError as e: 
            db.session.rollback()  
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 422)  
        except Exception as e:
            print(e)
            return make_response({'error': 'Internal Server Error'}, 500) 

api.add_resource(NewProperty, '/new_property')

class NewUnit(Resource):
    def get(self):
        units = [unit.to_dict() for unit in Unit.query.all()]
        return make_response(jsonify(units), 200)
    
    def post(self):
        request_json=request.get_json()

        unit_number = request_json.get('unit_number')
        unit_type = request_json.get('unit_type')
        unit_price = request_json.get('unit_price')
        sqft = request_json.get('sqft')
        current_tenant_first_name = request_json.get('current_tenant_first_name')
        current_tenant_last_name = request_json.get('current_tenant_last_name')
        email = request_json.get("email")
        property_name = request_json.get('property_name')

        new_unit = Unit(
            unit_number = unit_number,
            unit_type = unit_type,
            unit_price = unit_price,
            sqft = sqft,
            current_tenant_first_name = current_tenant_first_name,
            current_tenant_last_name = current_tenant_last_name,
            email = email,
            property_name = property_name
        )

        try:
            db.session.add(new_unit)
            db.session.commit()
            return make_response(new_unit.to_dict(), 200)
        except IntegrityError as e: 
            db.session.rollback()  
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 422)  
        except Exception as e:
            print(e)
            return make_response({'error': 'Internal Server Error'}, 500) 

api.add_resource(NewUnit, "/new_unit") 

class UnitByID(Resource):
    def patch(self, id):
        request_json = request.get_json()
        unit = Unit.query.filter_by(id=id).first()

        if unit is None:
            abort(404, "Unit not found")

        for attr in request_json:
            setattr(unit, attr, request_json[attr])

        try:
            db.session.add(unit)
            db.session.commit()
            return {"message": "Unit updated successfully"}, 200
        except Exception as e:
            db.session.rollback()
            abort(500, str(e))

    def delete(self, id):
        unit = Unit.query.filter_by(id=id).first()

        db.session.delete(unit)
        db.session.commit()

api.add_resource(UnitByID, '/new_unit/<int:id>')


class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
    
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0", debug=True)
