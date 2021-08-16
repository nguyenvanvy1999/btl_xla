from typing import List
import os
import logging
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

log = logging.getLogger(__name__)
app = FastAPI()

DESTINATION = "/"
CHUNK_SIZE = 2 ** 20  # 1MB


async def chunked_copy(src, dst):
    await src.seek(0)
    with open(dst, "wb") as buffer:
        while True:
            contents = await src.read(CHUNK_SIZE)
            if not contents:
                log.info(f"Src completely consumed\n")
                break
            log.info(f"Consumed {len(contents)} bytes from Src file\n")
            buffer.write(contents)


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    fullpath = os.path.join(DESTINATION, file.filename)
    await chunked_copy(file, fullpath)
    return {"File saved to disk at": fullpath}


@app.post("/files/")
async def create_files(files: List[bytes] = File(...)):
    return {"file_sizes": [len(file) for file in files]}


@app.post("/uploadfiles/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [file.filename for file in files]}


@app.get("/")
async def main():
    content = """
<body>
<form action="/uploadfile/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)
