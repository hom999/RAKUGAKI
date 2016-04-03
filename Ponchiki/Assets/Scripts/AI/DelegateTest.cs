using UnityEngine;
using System.Collections;

public class DelegateTest
{
	delegate int TestDelegate(string msg);
	
	public void WorkItOut()
	{
		TestDelegate td = msg =>
		{
			return msg.GetHashCode();
		};
		
		int i = td("あいうえお");
		
		//
		int s = "あ".GetHashCode();
		Debug.Log(s.ToString());
		
	}
}