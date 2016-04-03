using UnityEngine;
using System.Collections;

public class MapContorller : MonoBehaviour {


	public Map map;


	// Use this for initialization
	void Start () {
	
		//map = Map.GetInstance();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	//表示するマップ位置を設定
	public void SetCurrentMap(int posX, int posY){

		//map.setCurrentPos (posX, posY);
	}

	public void skewMap(int skewX, int skewY){

		//map.skew(skewX, skewY);
	}









}
