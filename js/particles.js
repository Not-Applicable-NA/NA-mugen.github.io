window.addEventListener('load', function(){
    //下記particles-js↓のところはHTMLで指定したidと合わせてください
    particlesJS('particles-js',{
        //パーティクルの設定
        "particles": {
            //シェイプの数
            "number": {
                "value": 20,//シェイプの数
                "density": {
                    "enable": true,//密度を変更する
                    "value_area": 400//密集度
                }
            },
            //色
            "color": {
                "value": ["111111","112211","113311","008000","002200"]
            },
            //シェイプの形状
            "shape": {
                "type": "polygon",//シェイプの形
                "stroke": {
                    "width": 3,//外線
                    "color": "#00B000"//つける場合の線色
                    },
                //※typeがpolygon(多角形)の場合
                "polygon": {
                    "nb_sides": 6//角の数
                    },
                //typeがimageの場合
                "image": {
                    "src": "img/gazou.png",//画像の指定
                    "width": 100,//画像の幅
                    "height": 100//画像の高さ
                }
            },
            //シェイプの透明度
            "opacity": {
                "value": 1,//透明度(1で不透明)
                "random": true,//透明度をランダムに
                //randomがtrueの場合
                "anim": {
                    "enable": true,//透明度のアニメーション
                    "speed": 1,//アニメーションスピード
                    "opacity_min": 0.1,//透明度の最小値
                    "sync": false//各シェイプを同時に動かさない
                }
            },
            //シェイプの大きさ
            "size": {
                "value": 40,//大きさ
                "random": true,//大きさをランダムに
                "anim": {
                    "enable": true,//シェイプの大きさをアニメーション
                    "speed": 15,//アニメーションのスピード
                    "size_min": 30,//サイズの最小値
                    "sync": false//各シェイプを同時に動かさない
                }
            },
            //シェイプ間を結ぶ線
            "line_linked": {
                "enable": false,//線をつけない
                "distance": 200,//線をつなぐシェイプの間隔
                "color": "#00CC00",//線の色
                "opacity": 1,//透明度　1で不透明
                "width": 1//線の太さ
            },
            //シェイプの動き
            "move": {
                "enable": true,//動きを付ける
                "speed": 2,//シェイプが動くスピード数値が大きいと早い
                "direction": "none",//動きの方向(none、top、top-right、right、bottom-right、bottom、bottom-left、left、top-left)
                "straight": false,//動きを動きを止めるか否か
                "out_mode": "bounce",//外枠に達した際のシェイプの動き　bounce→跳ね返る　out→フレームアウト
                /*シェイプを引き寄せる*/
                "attract": {
                    "enable": false,//引き寄せない
                    "rotateX": 600,//横軸の指定
                    "rotateY": 1200//横軸の指定
                }
            }
        },
        //相互作用
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                //カーソルを乗せた時の動き
                "onhover": {
                    "enable": false,//無効
                    "mode": "repulse"//enableがtrueの場合の動き(下の★のリストの名前入れるとその動きが発動)
                },
                //クリックしたときの動き
                "onclick": {
                    "enable": false,//無効
                    "mode": "push"//(下の★のリストの名前入れるとその動きが発動)
                },
                "resize":true//リサイズしたとき拡縮しない
            },
            //各モード設定した場合の動き
            "modes": {
                //★シェイプとカーソルの間に線ができる
                "grab": {
                    "distance": 400,//カーソルからの反応距離
                    "line_linked": {
                    "opacity": 1//線の不当明度
                    }
                },
                //★シェイプが膨らむ
                "bubble": {
                    "distance": 200,//カーソルからの反応距離
                    "size": 40,//膨らむ際の大きさ
                    "duration": 2,//持続時間
                    "opacity": 8,//透明度
                    "speed": 3//速度
                    },
                //★シェイプに触れるとカーソルから逃げる
                "repulse": {
                    "distance": 200//カーソルからの反応距離
                    },
                //★シェイプを増やす
                "push": {
                    "particles_nb": 4//数
                    },
                //★シェイプを減らす
                "remove": {
                    "particles_nb": 2//数
                }
            }
        },
            "retina_detect": true,//Retina Display(*高画素密度のディスプレイ)を対応する
        }
    ); 
}); 