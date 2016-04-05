using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;
using MiniJSON;

public class Ponkichi : MonoBehaviour {

    public Text OutputField;
    
    private List<string> _PonWords = new List<string>();
    

	// Use this for initialization
	void Start () {
	    
        
        _PonWords.Add("しね");
        _PonWords.Add("しね");
        _PonWords.Add("しね");
        _PonWords.Add("しね");
        _PonWords.Add("しね");
        
        
        
        // var textAsset = Resources.Load ("Data/AI_Reply_List") as TextAsset;
		// var jsonText = textAsset.text;

		// //文字列を json に合わせて構成された辞書に変換
		// var json = Json.Deserialize (jsonText) as Dictionary<string, object>;
		// IList lll = (IList)json ["０"];
		// Debug.Log(lll[0]);
        
        
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
    public void thinkReplay(string words){
        Debug.Log(words);
        
        
        string replay = "それはいっちゃだめだろ";
        
        if(words.IndexOf("おはよ") != -1){
            replay = "おはようございます！";
        }
        
        if(words.IndexOf("しね") != -1){
            replay = "しね！";
        }
        
        say(replay);
    }
    
    private void say(string words){
        OutputField.text = words;
    }
    
    
}
