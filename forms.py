from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DateField, TimeField, EmailField, TelField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=50)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    phone = TelField('Phone Number', validators=[DataRequired()])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=500)])

class BookingForm(FlaskForm):
    owner_name = StringField('Your Name', validators=[DataRequired(), Length(min=2, max=50)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    phone = TelField('Phone Number', validators=[DataRequired()])
    pet_name = StringField('Pet Name', validators=[DataRequired(), Length(min=1, max=30)])
    pet_type = SelectField('Pet Type', choices=[
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    service = SelectField('Service', choices=[
        ('basic_wash', 'Basic Wash & Dry ($35)'),
        ('full_groom', 'Full Grooming ($65)'),
        ('nail_trim', 'Nail Trimming ($15)'),
        ('teeth_cleaning', 'Teeth Cleaning ($25)'),
        ('flea_treatment', 'Flea Treatment ($30)'),
        ('premium_spa', 'Premium Spa Package ($95)')
    ], validators=[DataRequired()])
    preferred_date = DateField('Preferred Date', validators=[DataRequired()])
    preferred_time = SelectField('Preferred Time', choices=[
        ('09:00', '9:00 AM'),
        ('10:00', '10:00 AM'),
        ('11:00', '11:00 AM'),
        ('12:00', '12:00 PM'),
        ('13:00', '1:00 PM'),
        ('14:00', '2:00 PM'),
        ('15:00', '3:00 PM'),
        ('16:00', '4:00 PM')
    ], validators=[DataRequired()])
    special_requests = TextAreaField('Special Requests', validators=[Length(max=300)])
