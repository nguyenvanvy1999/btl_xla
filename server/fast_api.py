import os
import logging
from fastapi import FastAPI, File, UploadFile

log = logging.getLogger(__name__)
app = FastAPI()


@app.post("/create_file/")
async def image(image: UploadFile = File(...)):
    try:
        os.mkdir("images")
        print(os.getcwd())
    except Exception as e:
        print(e)
    file_name = os.getcwd()+"/images/"+image.filename.replace(" ", "-")
    with open(file_name, 'wb+') as f:
        f.write(image.file.read())
        f.close()
    return {"filename": file_name}


@app.get('/')
def root():
    return 'Hello world'
