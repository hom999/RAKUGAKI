using UnityEngine;
using System.Collections;

public class Penguin : MonoBehaviour {

	Animator animator;

	public float speed = 3.0f;
	public float gravity = 0.5f;
	public float mass = 1.0f;
	public float penpenPower = 1f;


	private Vector2 _mPos;

	/* ------------------------------------------------------- state events */

	/**
	 * event handler
	 *
	 */
	void onAngryEnd () {

		//Debug.Log ("AngryEnd");

	}

	/**
	 * event handler
	 *
	 */
	void onFlyEnd () {

		//Debug.Log ("flyEnd");

	}



	// Use this for initialization
	void Start () {

		animator = GetComponent (typeof(Animator)) as Animator;
		Debug.Log (animator);

	}

	/* --------------------------- */

	/**
	 * check mouse tap point
	 * if it's hit, jump self
	 *
	 */
	void hitCheck (float mouseX, float mouseY){




	}


	/**
	 * create child from self
	 *
	 *
	 */
	void dropChild (){




	}





	/* --------------------------- */





	/* ------------------------------------------------------- interaction events */
	void Update () {
		/*
		if (Input.GetKeyDown (KeyCode.UpArrow)) {
			Debug.Log ("key down up");

		}else
		if (Input.GetKeyDown (KeyCode.DownArrow)) {
			Debug.Log ("key down down");
			animator.Play ("Angry");

		}else
		if (Input.GetKeyDown (KeyCode.RightArrow)) {
			Debug.Log ("key down right");
			animator.Play ("Fly");

		}else
		if (Input.GetKeyDown (KeyCode.LeftArrow)) {
			Debug.Log ("key down left");
			animator.Play ("Normal");

		}
		*/
	}
}
