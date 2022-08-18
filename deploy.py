# Importing essential libraries
import string
from tkinter.messagebox import YES
from flask import Flask, render_template, request, redirect, request, url_for, session, flash
import pickle
import numpy as np
from functools import wraps
from sorcery import dict_of
import pyrebase
from datetime import *
import os


config = {
    "apiKey": "AIzaSyCvNo0fzI_RX4k9R0ZgkSDt8LWOpsP2FaM",
    "authDomain": "dokonsulta-d5145.firebaseapp.com",
    "databaseURL": "https://dokonsulta-d5145-default-rtdb.firebaseio.com",
    "projectId": "dokonsulta-d5145",
    "storageBucket": "dokonsulta-d5145.appspot.com",
    "messagingSenderId": "427575389379",
    "appId": "1:427575389379:web:505a3f3ca8eec6945ac676",
    "measurementId": "G-LBH6E12KWG"
}

# #init Firebase
firebase = pyrebase.initialize_app(config)
# #auth instance
auth = firebase.auth()
# #Real-time databasename
db = firebase.database()
# #secret key for the session


# instance of flask.
app = Flask(__name__)
# secret key for the session
app.secret_key = os.urandom(24)
app.permanent_session_lifetime = timedelta(minutes=60)


# Load the Random Forest CLassifier model
filename = 'covid.pkl'
classifier = pickle.load(open(filename, 'rb'))

app = Flask(__name__)


@app.route('/')
def home():
   return render_template('triage.html')


# inserting data to database


@app.route('/create', methods=['GET', 'POST'])
def create():
    now = datetime.now()
    if request.method == 'POST':
        Date = str(request.form['Date'])
        first_name = str(request.form['Fname'])
        middle_name = str(request.form['Mname'])
        last_name = str(request.form['Lname'])
        date_of_birth = str(request.form['Bdate'])
        gender = str(request.form['gender'])

        contact = str(request.form['contact'])
        reason = str(request.form['reason'])

        fever = request.form.get('fever')
        cold = request.form.get('cold')
        headache = request.form.get('headache')
        tired = request.form.get('tired')
        taste = request.form.get('taste')
        cough = request.form.get('cough')
        sorethroat = request.form.get('Female')
        diarrhea = request.form.get('Female')
        shortbreath = request.form.get('Female')
        smell = request.form.get('Female')
        if contact == 'Yes':
            contact='contact with covid'
            cntc = 1
        else:
            cntc = 0
            contact=' ' 

        if gender == 'Male':
            gnder = 1
            gender
        else:
            gnder = 0
        if fever:
            fever = 'Fever'
            fvr = 1
        else:
            fever = ' '
            fvr = 0
        if cold:
            cold = 'Cold'
        else:
            cold = ' '
        if headache:
            headache = 'Headache'
            hd = 1
        else:
            headache = ' '
            hd = 0
        if tired:
            tired = 'Tired'
        else:
            tired = ' '
        if taste:
            taste = ' '
        else:
            taste = 'No sense taste'
        if cough:
            cough = 'Cough'
            cf = 1
        else:
            cough = ' '
            cf = 0
        if sorethroat:
            sorethroat = 'Sorethroat'
            st = 1
        else:
            sorethroat = ' '
            st = 0
        if diarrhea:
            diarrhea = 'Diarrhea'
        else:
            diarrhea = ' '
        if shortbreath:
            shortbreath = 'Shortbreath '
            sb = 1
        else:
            shortbreath = ' '
            sb = 0
        if smell:
            smell = ' '
        else:
            smell = 'NO sense of Smell'

        travelhistory = str(request.form['travel'])
        travelwhen = str(request.form['trawhen'])
        travelwhere = str(request.form['trawhere'])
        knowInfected = str(request.form['someone'])

        HighBlood = request.form.get('HighBlood')
        Diabetes = request.form.get('Diabetes')
        Asthma = request.form.get('Asthma')
        Cancer = request.form.get('Cancer')
        Vaccine = str(request.form['vaccine'])

        postdate = now.strftime("%d/%m/%Y %H:%M:%S")

        if HighBlood:
            HighBlood = 'HighBlood '
        else:
            HighBlood = ' '
        if Diabetes:
            Diabetes = 'Diabetes'
        else:
            Diabetes = ' '
        if Asthma:
            Asthma = ' Asthma'
        else:
            Asthma = ' '
        if Cancer:
            Cancer = 'Cancer'
        else:
            Cancer = ' '

        Age = int(request.form['age'])

        if (Age >= 60):
            userage = "1"

        else:
            userage = "0"

        data = np.array([[cntc, gnder,fvr, hd,cf,st,sb,userage]])
        my_prediction = classifier.predict(data)
        
        if my_prediction==1:
            result='covid high risk'
        elif my_prediction==0:
            result ='low risk'
        
        # dictionary (Trige_id , user_id , first_name , last_name , middle_name , symptoms , gender , contact_number, date of birth , date ,result , created at)
        sysmptoms = (fever + " , " + cold  + " , " +  headache  + " , " +  tired  + " , " + taste  + " , " + cough  + " , " + sorethroat  + " , " + diarrhea  + " , " + shortbreath  + " , " + smell  + " , " + travelhistory  + " , " +  travelwhen  + " , " +  travelwhere  + " , " +  knowInfected  + " , " +  HighBlood  + " , " +  Diabetes  + " , " +  Asthma  + " , " +  Cancer +" reason: " + reason)
        created_at= Date
         
        postData = dict_of(result, Age, postdate, Vaccine, first_name, Date,  middle_name, last_name, date_of_birth , gender, contact, sysmptoms, created_at)

        try:
            # push data to database
            db.child("Posts").push(postData)
            return redirect('/admin')
        except:
            return render_template("admin.html")


    


if __name__ == '__main__':
    app.run(debug=True)
