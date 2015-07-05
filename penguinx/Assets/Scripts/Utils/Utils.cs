using UnityEngine;
using System.Collections;

public class Utils{
	
	public static int traceCnt = 0;
	public static string debugString = "test";

	public static void trace (string str){
		Debug.Log ("-------------------------------- system trace : " + Utils.traceCnt ++);
		Debug.Log (str);
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}






}
