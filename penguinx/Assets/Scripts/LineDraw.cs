using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class LineDraw : MonoBehaviour {

	private bool kanikanikanikani;



	private List<Point> points = new List<Point>();
	public int pointCnt = 100;

	private float spring = 0.1f;
	private float friction = 1.2f;
	private float gravity = 0.5f;

	public Color c1 = Color.yellow;
	public Color c2 = Color.red;
	private LineRenderer lineRenderer;

	void Start() {
		
		lineRenderer = GetComponent<LineRenderer> ();
		lineRenderer.material = new Material(Shader.Find("Particles/Additive"));
		//lineRenderer.SetColors(c1, c2);
		//lineRenderer.SetWidth(0.1f, 0.1f);
		lineRenderer.SetVertexCount(pointCnt);

		points = new List<Point> ();

		int i = 0;
		while (i < pointCnt) {
			Point p = new Point ();
			points.Add(p);
			i++;
		}

		GameObject.Find ("MyText").GetComponent<Text>().text = "さかなくん";

	}

	void Update() {
		updatePointsPosition ();
		setPointsToRenderer();
		
	}

	private void setPointsToRenderer () {

		int i = 0;
		while (i < pointCnt) {
			Vector3 pos = points [i].position;
			lineRenderer.SetPosition(i, pos);
			i++;
		}

	}

	private void updatePointsPosition () {
		int i = 0;
		while (i < pointCnt) {
			Point p = points[i];

			Vector3 pos = new Vector3(
				Mathf.Sin(i + Time.time),
				i * 0.5f - 30f,
				30f);
			
//			pos = new Vector3 (
//				Random.Range(-200f, 200f),
//				Random.Range(-200f, 200f),
//				Random.Range(400f, 1000f)
//			);

			p.position = pos;
			i++;
		}
	}



	private void springTo(Point p, Vector3 target) {

		p.position += ((target - p.position) * spring) * friction;
//		p.x += ((targetX - ball.x) * spring)* friction;
//		p.y += ((targetY - ball.y) * spring)* friction;
//		p.z += ((targetX - ball.x) * spring)* friction;
		
	}


}