import streamlit as st

with open("style.css","r") as f:
    st.markdown(
    f"""
    <style>
    {f.read()}
    </style>
    """
    ,
        unsafe_allow_html=True
    )

with st.container() as main:
    with st.container() as child:
        st.subheader("Welcome 👋")
        st.write("Sign in to your account")
        st.text_input("username",placeholder="Username",label_visibility="hidden")
        st.text_input("password",placeholder="Password",type="password",label_visibility="hidden")
        st.write("[Forgot password?](https://www.google.com)")
        st.button("Login!")