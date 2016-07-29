package com.tns.gen.com.firebase.client;

public class Firebase_AuthResultHandler implements com.firebase.client.Firebase.AuthResultHandler {
	public Firebase_AuthResultHandler() {
		com.tns.Runtime.initInstance(this);
	}

	public void onAuthenticated(com.firebase.client.AuthData param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onAuthenticated", void.class, args);
	}

	public void onAuthenticationError(com.firebase.client.FirebaseError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onAuthenticationError", void.class, args);
	}

}
