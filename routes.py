from flask import render_template, request, redirect, url_for, flash
from forms import ContactForm, BookingForm

from app import app  # Moved this line BELOW form imports to prevent circular import issues

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/services')
def services():
    """Services page"""
    return render_template('services.html')

@app.route('/booking', methods=['GET', 'POST'])
def booking():
    """Booking page"""
    form = BookingForm()
    if form.validate_on_submit():
        flash(f'Booking request received for {form.pet_name.data}! We will contact you at {form.phone.data} to confirm your appointment.', 'success')
        return redirect(url_for('booking'))
    return render_template('booking.html', form=form)

@app.route('/about')
def about():
    """About Us page"""
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page"""
    form = ContactForm()
    if form.validate_on_submit():
        flash(f'Thank you {form.name.data}! Your message has been received. We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html', form=form)
