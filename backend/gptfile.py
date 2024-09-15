# RUN THIS FILE FOR TESTING PURPOSES, LOOPS THOURH METHODS - DEREK ========================================================
# 3 methods are available: question, flashcard, summarize
from openai import OpenAI
from dotenv import load_dotenv
import os
import base64
import requests

load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
print(OPENAI_API_KEY)

client = OpenAI(api_key = OPENAI_API_KEY)



def flashcard(filename):
  userPrompt = "Please create 5 flashcard questions in the following format: {{id:string, front:string, back:string}}[]. Based on the given document, refer specific sections and content of the document. Keep the questions brief, in plain text, and *ONLY* in json format. Do not use markdown or have any formatting."
  return fileProcess(filename, userPrompt)
def summarize(filename, concept):
  userPrompt = f"Please summarize the concept of {concept} in three key points. Refer specific quotes of the document."
  return fileProcess(filename, userPrompt)

def question(filename, question): # example: What is the university and program is this course for?
  userPrompt = question
  return fileProcess(filename, userPrompt)

def handNotes(filename):
  # Function to encode the image



  # Getting the base64 string
  base64_image = encode_image(filename)

  headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {OPENAI_API_KEY}"
  }

  payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "The given image is of a note taken in class. Please transcribe the text in the image, responding with only the transcription."
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
              }
            }
          ]
        }
      ],
      "max_tokens": 300
  }

  response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

  # print(response.json())
  transcriptionjson = response.json() # return the content as string
  transcription = transcriptionjson['choices'][0]['message']['content']
  print(transcription)
  text_file = open("transcription.txt", "w")
  text_file.write(transcription)
  text_file.close()
  return {"summary": summarize("transcription.txt", "this document"), 
  "transcript": transcription}

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')


def fileProcess(filename, userPrompt):
#/home/derek/Downloads/HTN2024/document.pdf

  assistant = client.beta.assistants.create(
  name="Document Interpret dude",
  instructions="You are an expert on the topic in the given document. Please answer questions the user has on the topic, referring specific sections of the text. Briefly respond within 2 sentences or less.",
  model="gpt-4o",
  tools=[{"type": "file_search"}],
  )
  # Create a vector store caled "Financial Statements"
  vector_store = client.beta.vector_stores.create(name="UploadedDocument")

  # userPrompt = input("Enter question: ")
  
  # Ready the files for upload to OpenAI
  file_paths = [filename] 
  file_streams = [open(path, "rb") for path in file_paths]
  
  # Use the upload and poll SDK helper to upload the files, add them to the vector store,
  # and poll the status of the file batch for completion.
  file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store.id, files=file_streams
  )
  
  # You can print the status and the file counts of the batch to see the result of this operation.
  print(file_batch.status)
  print(file_batch.file_counts)

  # OK LOADED FILE----------


  assistant = client.beta.assistants.update(
    assistant_id=assistant.id,
    tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
  )

  # Upload the user provided file to OpenAI
  message_file = client.files.create(
    file=open(filename, "rb"), purpose="assistants"
  )
  
  # Create a thread and attach the file to the message
  thread = client.beta.threads.create(
    messages=[
      {
        "role": "user",
        "content": userPrompt,
        # Attach the new file to the message.
        "attachments": [
          { "file_id": message_file.id, "tools": [{"type": "file_search"}] }
        ],
      }
    ]
  )
  
  # The thread now has a vector store with that file in its tool resources.
  print(thread.tool_resources.file_search)

  # Use the create and poll SDK helper to create a run and poll the status of
  # the run until it's in a terminal state.

  run = client.beta.threads.runs.create_and_poll(
      thread_id=thread.id, assistant_id=assistant.id
  )

  messages = list(client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id))

  message_content = messages[0].content[0].text
  annotations = message_content.annotations
  citations = []
  for index, annotation in enumerate(annotations):
      message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
      if file_citation := getattr(annotation, "file_citation", None):
          cited_file = client.files.retrieve(file_citation.file_id)
          citations.append(f"[{index}] {cited_file.filename}")

  print(message_content.value)
  print("\n".join(citations))
  return message_content.value


# FOR TESTING PURPOSES RUN THIS FILE ================================================================
doc_path = "./document.pdf"
image_path = "./notes.jpg"
while True:
  print("TYPE: QUESTION: 1, FLASHCARD: 2, SUMMARIZE: 3, READ HANDWRITTEN NOTES: 4, EXIT: ENTER")
  user = input()
  if user == "1":
    question(doc_path, input("Enter question: "))
  elif user == "2":
    flashcard(doc_path)
  elif user == "3":
    summarize(doc_path, input("Enter concept to highlight: "))
  elif user == "4":
    handNotes(image_path)
  else:
    break
