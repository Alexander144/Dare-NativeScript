package com.tns.gen.com.firebase.client;

public class ValueEventListener implements com.firebase.client.ValueEventListener {
	public ValueEventListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDataChange(com.firebase.client.DataSnapshot param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onDataChange", void.class, args);
	}

	public void onCancelled(com.firebase.client.FirebaseError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCancelled", void.class, args);
	}

}
