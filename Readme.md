
# ByteLinguists Translation API

This project is part of SIH hackathon where we develop Language Translation tool from English to Hindi that is served as an scalable API.



## Appendix

**Team Name:** ByteLinguists\
**PS CODE:** 1301\
**Ministry:** Ministry of power



## Project Structure
├── **NodeServer/**\
│   └── Node Server for Authenticating and processing API reqs.\
├── **PyServer/**\
│   └── Server that runs the language model in GPU.\
├── **UI/**\
│   └── Front end interface for Manual API calls.\
|── **Benchmark/**\
│   └── Dataset and benchmarking\
|── **LoadTest/**\
│   └── LoadTest files using Locust\
└── Readme.md


## Features

- API for translating from english to Hindi.
- API Authentication and Oauth support using google.
- GPU deployment of API using vllm or HF inference server.
- UI interface for manual access.
- Easy integration with JS scripts **<optional>**



## API Reference

#### Generate API token.

```http
  POST /api/token/generate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username of User.|
|  `password` | `string` | **Required**. Password provided by User.|

#### Revoke API token

```http
  GET /api/token/revoke
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API Token`      | `string` | **Required**. Revokes the API token.|

```http
  GET /api/token/isvalid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API Token`      | `string` | **Required**. Checks if given token is valid |

```http
  GET /api/auth/callback

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer Token`      | `string` | **Required**. callback for Email verification and returns API key to Email.|

```http
  GET /api/generate/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Access Token`      | `string` | **Required**.|
| `Text`               |   `string` | **Required**|

```http
  GET /api/auth/Oauthcallback

  Callback for Oauth Login.
```

```http
  GET /api/token/getOauthURL

  Redirects user to OauthConsent Screen.
```





