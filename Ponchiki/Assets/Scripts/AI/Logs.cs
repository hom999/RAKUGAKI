using System.Collections;
using UnityEngine;

public class Logs : MonoBehaviour 
{
	// -------------------------------------------------- singleton
    private static Logs mInstance;
    private Logs () //private constructor
	{
		Debug.Log("Create SampleSingleton instance.");
    }
    public static Logs Instance
	{
        get {
            if( mInstance == null ) mInstance = new Logs();
            return mInstance;
        }
	}
	// -------------------------------------------------- >>
	
	
	private bool isDebugging;
	public bool Isdebugging
	{
		set { this.isDebugging = value; }
		get { return this.isDebugging; }
	}
	
	public void p(string msg)
	{
		log(msg, "MYLOGS ------------> ");
	}
	
	public void l(string msg)
	{
		log(msg, "MYLOGS ---> ");
	}
	
	public void log(string msg, string tag){
		if(!isDebugging)
		{
			return;
		}
		Debug.Log(tag + msg);
	}
}

