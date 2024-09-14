import requests

url = "https://api.voiceflow.com/v1/knowledge-base/docs/upload?maxChunkSize=1000"

headers = {
    "accept": "application/json",
    "content-type": "multipart/form-data",
    "Authorization": "VF.DM.66e591b1aabf21e69cfe8615.SlBamxxqYnaEyW02"
}

response = requests.post(url, headers=headers)

print(response.text)