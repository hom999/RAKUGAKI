using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.EventSystems;

public class Title : MonoBehaviour
{
	public string strId;

	void Awake ()
	{
		//Debug.Log("GameStage Awake");
		Camera.main.orthographicSize = Screen.height / 2;
	}

	// Use this for initialization
	void Start ()
	{
		//setEvent (GameObject.Find ("StartBtn"));
	}



	void setEvent (GameObject target) {

		//Debug.Log (target.GetComponent<EventTrigger>());

		EventTrigger trigger = target.GetComponent<EventTrigger>();
		var entry = new EventTrigger.Entry();
		entry.eventID = EventTriggerType.PointerEnter; // 他のイベントを設定したい場合はここを変える
		entry.callback.AddListener( (x) => { tapStartButton(); });
		trigger.triggers.Add(entry);

	}



	// Update is called once per frame
	void Update ()
	{
		Camera.main.transform.Rotate (0, 0.1f, 0);

	}



	void OnMouseDownn ()
	{
		Debug.Log (" -- onMouseDown -- ");
		tapStartButton ();



	}


	/**
	 * 
	 * 
	 * 
	 * 
	 */
	void OnGUI ()
	{
		//Event e = Event.current;
		// ゲーム中ではなく、タッチまたはマウスクリック直後であればtrueを返す。
		//if (e.type == EventType.MouseDown) {
		//	Debug.Log ("MouseDown");
		//}



	}


	/**
	 * 
	 * 
	 */
	public void tapStartButton ()
	{
		Application.LoadLevel ("Game");
	}





}
