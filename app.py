# Importing essential libraries
import numpy as np
import pandas as pd
import pickle

# Loading the dataset
df = pd.read_csv(r'C:\Users\chris\Desktop\capstone final - Copy (3)\Book1.csv')

# Renaming DiabetesPedigreeFunction as DPF
df=df.drop(columns=['test_date'])
 
 
df_copy = df.copy(deep=True)
 
# Model Building
from sklearn.model_selection import train_test_split
X = df.drop(columns='corona_result')
y = df['corona_result']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=0)

# Creating Random Forest Model
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators=20)
classifier.fit(X_train, y_train)

# Creating a pickle file for the classifier
filename = 'covid.pkl'
pickle.dump(classifier, open(filename, 'wb'))