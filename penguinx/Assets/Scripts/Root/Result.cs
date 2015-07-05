using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Result : MonoBehaviour {

	private Camera cam;
	public string strId;

	void Awake () {
		//Debug.Log("GameStage Awake");
		cam = Camera.main;
		//cam.orthographicSize = Screen.height / 2;
	}

	// Use this for initialization
	void Start () {
		//Debug.Log("Result Loaded");
		
	}

	// Update is called once per frame
	void Update () {

	}
	public void Test_OnHoverOver () {
		//Debug.Log ("Test_OnHoverOver");
	}
	public void Test_OnHoverOut () {
		//Debug.Log ("Test_OnHoverOut");
	}
	public void Test_OnPress () {
		//Debug.Log ("Test_OnPress");
	}
	public void Test_OnRelease () {
		//Debug.Log ("Test_OnRelease");
		Application.LoadLevel("title");
	}
	public void Test_OnSelect () {
		//Debug.Log ("Test_OnSelect");
	}
	public void Test_OnDeselect () {
		//Debug.Log ("Test_OnDeselect");
	}
	public void Test_OnClickOrTap () {
		//Debug.Log ("Test_OnClickOrTap");
	}
	public void Test_OnDoubleClickOrTap () {
		//Debug.Log ("Test_OnDoubleClickOrTap");
	}

}
