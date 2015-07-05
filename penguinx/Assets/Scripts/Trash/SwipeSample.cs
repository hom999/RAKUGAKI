using UnityEngine;
using System.Collections;

public class SwipeSample : MonoBehaviour {

	public GameObject obj;
	public float speed = 0.05f;

	// Use this for initialization
	void Start () {




		




	}

	// Update is called once per frame
	void Update () {

		// Update is called once per frame
		if(Input.touchCount > 0){

			Touch touch = Input.GetTouch(0);


			switch(touch.phase){
				case TouchPhase.Began:Debug.Log("touch  Panel start");break;
				case TouchPhase.Moved:

					//float xAngle = touch.deltaPosition.y*speed*10;
					//float yAngle = -touch.deltaPosition.x *speed *10;
					Vector2 newVec = new Vector2(touch.position.x,Screen.height - touch.position.y);
					Vector2 tapPoint = Camera.main.ScreenToWorldPoint(newVec);

					float zAngle = 0.0f;
					float xMove = touch.deltaPosition.x * speed *10;
					float yMove = touch.deltaPosition.y * speed *10;

					if(transform.position.x > tapPoint.x){

						if(transform.position.y > tapPoint.y){

							zAngle = -yMove -xMove;

						}else{

							zAngle = -yMove +xMove;

						}

					}else{

						if(transform.position.y > tapPoint.y){

							zAngle = yMove -xMove;

						}else{

							zAngle = yMove +xMove;

						}
					}
					obj.transform.Rotate(0.0f,0.0f,zAngle,Space.World);


					break;
				case TouchPhase.Ended: Debug.Log("touch  Panel end"); break;

				default: break;

			}

		}


	}

}
