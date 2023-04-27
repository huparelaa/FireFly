# Firefly Project Readme

Firefly is a project that consists of two main folders: backend and frontend. The backend uses Django to create an API that is consumed by the frontend.

For your convenience, you can visit the website at: https://onlinefirefly.social

## Requirements
To run the project, you need to have the following installed:

* Python (version 3.8 or higher)
* Node.js (version 12 or higher)
## Installation and Setup

To run the backend, you need to install the required dependencies using the following command:

```bash 
pip install -r backend/requirements.txt
```

Once the dependencies are installed, you can start the server by running the following command:

```bash
python backend/manage.py runserver
```

This will create an API at `http://127.0.0.1:8000/`.

Next, you need to set up the frontend. To do this, navigate to the frontend directory and install the required dependencies using the following command:

```bash
npm start
```

This will start a development server at `http://localhost:3000/`.

## API Usage

The frontend consumes the API created by the backend. To use the API, you need to set the `REACT_APP_API_URL` variable in the `.env` file located in the frontend directory. 

If you are running the backend locally, uncomment the following line in the `.env` file:

```jsx
REACT_APP_API_URL=http://127.0.0.1:8000
```


If you are using the online version of the backend, uncomment the following line in the `.env` file:

```jsx
REACT_APP_API_URL=https://backend.onlinefirefly.social
```
### Thanks for using Firefly!
