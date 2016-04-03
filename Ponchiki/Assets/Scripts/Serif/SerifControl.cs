using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using MiniJSON;

public class SerifControl : MonoBehaviour {

	public string dummyStr = "ここはどこだろう";

	// Use this for initialization
	void Start () {
		
		var textAsset = Resources.Load ("Data/SerifData_Prologue") as TextAsset;
		var jsonText = textAsset.text;

		//文字列を json に合わせて構成された辞書に変換
		var json = Json.Deserialize (jsonText) as Dictionary<string, object>;
		IList lll = (IList)json ["Serifs"];
		Debug.Log(lll[0]);

	}
	
	// Update is called once per frame
	void Update () {




	}
}
