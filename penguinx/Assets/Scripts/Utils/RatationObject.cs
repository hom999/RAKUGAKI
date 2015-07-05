using UnityEngine;
using System.Collections;

public class RatationObject : MonoBehaviour {

	[SerializeField]
	private GameObject target;
	public GameObject Target {
		get {
			return target;
		}
		set {
			if (target is GameObject) {
				
				target = value;
			}
		}
	}

	public float frequency1 = 0.01f;
	public float frequency2 = 0.01f;

	public float maxAngle1 = 360;
	public float maxAngle2 = 360;

	public Vector3 axis1 = Vector3.right;
	public Vector3 axis2 = Vector3.up;

	float seed1;
	float seed2;


	// Use this for initialization
	void Awake () {
		/*
		if (target == null)
			target = this.gameObject;
		*/

		seed1 = Random.value * 1;
		seed2 = Random.value * 1;

	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

		if (target == null)
			return;
		
		target.transform.localRotation =
			Quaternion.AngleAxis (Mathf.PerlinNoise (Time.time * frequency1, seed1) * 360, axis1) *
				Quaternion.AngleAxis (Mathf.PerlinNoise (Time.time * frequency2, seed2) * 360, axis2);
		
	}
}
