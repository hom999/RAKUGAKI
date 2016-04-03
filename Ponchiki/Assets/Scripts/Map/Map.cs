using UnityEngine;
using System.Collections;

public class Map : MonoBehaviour {

	private Map map;
	private MapData mapData;
	private Object mapJson;

	public Map GetInstance(){




		return this.map;
	}



	// Use this for initialization
	void Start () {


		//map.jsonを読み込んでマップ生成
		creataMap ();

	}
	void creataMap(){

		//incldde map json
//		mapJson = "";
//
//		mapData = new MapData ();
//
//		mapData.registerData (mapJson);

		//本来はfor each で回して全マップの生成
		//現在地から上下左右のマップを作成する
		//移動するたびに上下左右のマップを生成
//		int posX = 0;
//		int posY = 0;
//		createMapChip (mapData.getMapChipData(posX, posY));

	}


	//mapchipデータから実際のマップ生成する 
	// Resourcesから画像を読み込んで、マップボックスに配置する
	void createMapChip() {

	


	}


	
	// Update is called once per frame
	void Update () {
	
	}


	//
	public void setCurrentPos(int posX, int posY){

	}

	//
	public void skewMap(int skewX, int skewY){

	}


}
