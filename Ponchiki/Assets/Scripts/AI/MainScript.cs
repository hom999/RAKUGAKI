using System.Collections;
using UnityEngine;
using UnityEngine.UI;


public class MainScript : MonoBehaviour {

    public GameObject OutputField;
    public InputField TlakField;
    public Ponkichi p;



	// Use this for initialization
	void Start () { 
        Debug.Log(p);
        
	}
	
	// Update is called once per frame
	void Update () {
	    
        
        
        
	}
    
    
    // -------------------------------------------  input field events 
    public void InputFieldValueChanged(){
        Debug.Log("  -----  ValueChanged");
    }

    public void InputFieldEditEnd(){
        Debug.Log("  -----  EditEnd");
    }
    // -------------------------------------------  input field events //
    
    public void TalkTo(){
        Debug.Log("  -----  Talk to ");
        p.thinkReplay(TlakField.text);
    }
    
    
    
    


	void Talk(string msg){
        
        
        
        
	}

	void Replay(string msg){
        
        
        
        
	}
}
