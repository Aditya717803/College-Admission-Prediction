from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Admission Seats Prediction API")

# Load the model
model = joblib.load("model1.joblib")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Category mappings
category_mappings = {
    "pool": {"Gender-Neutral": 2, "Female-Only": 1},
    
    "program_names": {
        "Computer Science and Engineering": 43, "Mechanical Engineering": 99, 
        "Civil Engineering": 33, "Electrical Engineering": 48, 
        "Electronics and Communication Engineering": 58, "Chemical Engineering": 29,
        "Metallurgical and Materials Engineering": 111, "Engineering Physics": 67, 
        "Architecture": 8, "Electrical and Electronics Engineering": 56, 
        "Mathematics and Computing": 96, "Bio Technology": 14, 
        "Aerospace Engineering": 1, "Mining Engineering": 115, 
        "Information Technology": 83, "Physics": 123, 
        "Production and Industrial Engineering": 127, "Economics": 47, 
        "Biotechnology and Biochemical Engineering": 25, 
        "Electronics and Instrumentation Engineering": 63, 
        "Materials Science and Engineering": 91, "Ceramic Engineering": 27,
        "Production Engineering": 126, "Ocean Engineering and Naval Architecture": 119,
        "Textile Technology": 130, "Bio Medical Engineering": 13, 
        "Materials Engineering": 90, "Metallurgical Engineering and Materials Science": 108,
        "Materials Science and Metallurgical Engineering": 92, "Applied Geology": 5,
        "Computer Engineering": 42, "Electronics and Electrical Communication Engineering": 59,
        "Artificial Intelligence": 9, "Biosciences and Bioengineering": 23,
        "Mathematics & Computing": 95, "Metallurgical Engineering": 106,
        "Mathematics and Scientific Computing": 98, "Instrumentation and Control Engineering": 85,
        "Engineering Design": 66, "Electronics and Electrical Engineering": 62,
        "Data Science and Artificial Intelligence": 44, "Statistics and Data Science": 129,
        "Industrial and Production Engineering": 79, "Polymer Science and Engineering": 125
    },
    "degree_short": {
        "B.Tech": 5, "B.Tech + M.Tech (IDD)": 6, "BSc": 8, "B.Arch": 1, 
        "Btech + M.Tech (IDD)": 10, "Int MSc.": 12, "BS + MS (IDD)": 7, 
        "Int M.Tech": 11, "BSc + MSc (IDD)": 9, "B.Plan": 4, "B.Pharm": 2, 
        "B.Pharm + M.Pharm": 3
    },
    "category": {
        "GEN": 1, "OBC-NCL": 5, "SC": 7, "ST": 9, "GEN-EWS": 2, "GEN-PWD": 4, 
        "OBC-NCL-PWD": 6, "GEN-EWS-PWD": 3, "SC-PWD": 8, "ST-PWD": 10
    }
}

# Input validation model
class PredictionInput(BaseModel):
    pool: str
    program_names: str
    degree_short: str
    category: str
    marks: int  # Accepting marks as a string

@app.post("/predict")
async def predict_seats(input_data: PredictionInput):
    
    try:
        # Convert marks to float
        marks = float(input_data.marks)
        
        # Convert categorical inputs to numeric values
        processed_data = {
            "pool": category_mappings["pool"].get(input_data.pool),
            "program_names": category_mappings["program_names"].get(input_data.program_names),
            "degree_short": category_mappings["degree_short"].get(input_data.degree_short),
            "category": category_mappings["category"].get(input_data.category),
            "marks": marks
        }
        
        # Check if any mapping failed
        if None in processed_data.values():
            raise ValueError("Invalid input values provided.")
        
        # Convert to numpy array
        input_array = np.array([list(processed_data.values())]).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(input_array)
        predicted_seats = int(np.round(prediction[0]))
        
        return {"predicted_seats": predicted_seats, "input_data": input_data.dict()}
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Welcome to the Admission Seats Prediction API"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)