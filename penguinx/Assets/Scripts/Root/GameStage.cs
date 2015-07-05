using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class GameStage : MonoBehaviour
{

    private GameObject pen;
    private string strId;
    private float speed = 500;
    private Vector2 mPos;
    private float dist;
    private int scorePoint = 0;
	private Text scoreText;
    private List<GameObject> pengins;
	private GameObject cPen;
	private int timeCnt = 0;

	public GameObject Pen;
	public GameObject PenRed;
	public GameObject PenBlue;
	public GameObject PenLightBlue;
	public GameObject PenGreen;
	public GameObject PenOrange;
	public GameObject PenPink;
	public GameObject PenYellow;
	public GameObject PenRainbow;


    void Awake()
    {
        //Debug.Log("GameStage Awake");
		Camera.main.orthographicSize = Screen.height / 2;

    }

    void Start()
    {
        //Debug.Log("GameStage Loaded");
		pen = GameObject.Find("Pen");

        Vector2 direction = new Vector2(0, 1).normalized;
        pen.GetComponent<Rigidbody2D>().velocity = direction * speed;
		scoreText = GameObject.Find("ScoreLabel").GetComponent<Text>();

		pengins = new List<GameObject> ();
		pengins.Add (pen);
    }

    void Update()
    {
        scoreText.text = scorePoint + "";

        if (Input.GetMouseButtonDown(0))
        {


            mPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            dist = Mathf.Sqrt(
                Mathf.Pow((mPos.x - pen.transform.localPosition.x), 2) +
                Mathf.Pow((mPos.y - pen.transform.localPosition.y), 2)
            );

            if (dist < 100)
            {
                // 移動する向きを求める
                Vector2 direction = new Vector2(Random.Range(-1.0f, 1.0f), 1).normalized;
                // 移動する向きとスピードを代入する
                pen.GetComponent<Rigidbody2D>().velocity = direction * speed;

                scorePoint++;
            }
        }

		/*
        if (pen.transform.localPosition.x < -160)
        {

			pen.transform.localPosition = new Vector2(
					-160.0f,
					pen.transform.localPosition.y
			);

            Vector2 direction = new Vector2(1.0f, 1.0f).normalized;
			pen.GetComponent<Rigidbody2D>().velocity = direction * 1;

        }
        else if (pen.transform.localPosition.x > 160)
        {

			pen.transform.localPosition = new Vector2(
				160.0f,
				pen.transform.localPosition.y
			);
            Vector2 direction = new Vector2(-1.0f, 1.0f).normalized;
			pen.GetComponent<Rigidbody2D>().velocity = direction * 1;

        }
        */

		/*
        if (pen.transform.localPosition.y < -1500)
        {
            Application.LoadLevel("result");
        }
        */

		createPenAtTimeCnt ();
    }

	private void createPenAtTimeCnt () {
		if (timeCnt % 1 == 0) {

			var r = Random.Range (0, 7);
			switch (r) {
			case 0:
				cPen = createPen (PenRainbow);
				break;
			case 1:
				cPen = createPen (PenRed);
				break;
			case 2:
				cPen = createPen (PenBlue);
				break;
			case 3:
				cPen= createPen (PenLightBlue);
				break;
			case 4:
				cPen = createPen (PenGreen);
				break;
			case 5:
				cPen = createPen (PenOrange);
				break;
			case 6:
				cPen = createPen (PenPink);
				break;
			case 7:
				cPen = createPen (PenYellow);
				cPen = createPen (PenYellow);
				cPen = createPen (PenYellow);
				break;
			}

			var s = Random.Range (0.01f, 3.0F);
			cPen.transform.localScale = new Vector2(s, s);
		}
		timeCnt++;
	}

	private GameObject createPen (GameObject pentype) {

		return Instantiate (pentype, new Vector3 (Random.Range (-180, 180), 600, 0), Quaternion.AngleAxis (-30, -Vector3.forward)) as GameObject;

	}

}
