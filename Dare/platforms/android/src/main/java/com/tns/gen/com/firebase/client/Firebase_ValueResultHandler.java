package com.tns.gen.com.firebase.client;

public class Firebase_ValueResultHandler implements com.firebase.client.Firebase.ValueResultHandler {
	public Firebase_ValueResultHandler() {
		com.tns.Runtime.initInstance(this);
	}

	public void onSuccess(java.lang.Object param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onSuccess", void.class, args);
	}

	public void onError(com.firebase.client.FirebaseError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

}
