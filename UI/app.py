import streamlit as st
import requests


def translate(english_text,url="https://f9f4-34-27-215-117.ngrok-free.app/translate"):
    st.session_state["hindi"] = requests.get(url,params={"English_text":english_text}).json()["Hindi_text"]


st.header("ByteLinguists Translation app")

st.text_area("English Text", key="english", placeholder="Please enter text in English")
st.text_area("Hindi Text", key="hindi", placeholder="Please enter text in Hindi",disabled=True)
st.button('Translate ⚡', on_click=translate, args=[st.session_state['english']])

st.write(st.session_state)