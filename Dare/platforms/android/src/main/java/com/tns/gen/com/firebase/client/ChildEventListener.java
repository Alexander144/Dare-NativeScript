package com.tns.gen.com.firebase.client;

public class ChildEventListener implements com.firebase.client.ChildEventListener {
	public ChildEventListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onChildAdded(com.firebase.client.DataSnapshot param_0, java.lang.String param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onChildAdded", void.class, args);
	}

	public void onChildChanged(com.firebase.client.DataSnapshot param_0, java.lang.String param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onChildChanged", void.class, args);
	}

	public void onChildRemoved(com.firebase.client.DataSnapshot param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onChildRemoved", void.class, args);
	}

	public void onChildMoved(com.firebase.client.DataSnapshot param_0, java.lang.String param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onChildMoved", void.class, args);
	}

	public void onCancelled(com.firebase.client.FirebaseError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCancelled", void.class, args);
	}

}
