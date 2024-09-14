import requests

url = "https://general-runtime.voiceflow.com/state/user/userID/interact?logs=off"

payload = {
    "action": { "type": "launch" },
    "config": {
        "tts": False,
        "stripSSML": True,
        "stopAll": True,
        "excludeTypes": ["block", "debug", "flow"]
    }
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": "VF.DM.66e591b1aabf21e69cfe8615.SlBamxxqYnaEyW02"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)