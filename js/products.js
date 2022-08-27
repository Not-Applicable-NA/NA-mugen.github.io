// キャラリストを生成(即時関数)
(function () {
    const charListElement = document.querySelector('#charList');
    const htmlFileName = window.location.href.split('/').pop();
    let dataList;
    let currentElement;
    let newElement;
    if('chars.html' === htmlFileName){
        dataList = charDataList;
    }
    else{
        dataList = oldCharDataList;
    }
    dataList.forEach(function(data){
        // リストを作成
        newElement = document.createElement('li');
        charListElement.appendChild(newElement);
        // <div class="listData">
        currentElement = document.getElementById('charList').lastElementChild;
        newElement = document.createElement('div');
        currentElement.appendChild(newElement);
        newElement.setAttribute('class','listData');
        // <div class="charIcon">
        currentElement = currentElement.getElementsByClassName('listData')[0];
        newElement = document.createElement('div');
        currentElement.appendChild(newElement);
        newElement.setAttribute('class','charIcon');
        // <p class="charName">
        newElement = document.createElement('p');
        newElement.innerHTML = data['charName'];
        currentElement.appendChild(newElement);
        newElement.setAttribute('class','charName');
        // <img>
        currentElement = currentElement.firstElementChild;
        newElement = document.createElement('img');
        newElement.src = data['smallPortrait'];
        currentElement.appendChild(newElement);
    });

    // リスト内のキャラ一覧を配列に変換し、
    // 要素とインデックスを1つ1つ取り出す
    Array.from(charListElement.children).forEach(
        (list, listIndex) => {
            // 取り出した各要素(=キャラ)に対し
            // クリック時に詳細を表示するイベントリスナーを設定
            // このとき、表示するキャラのIDは配列のインデックス+1と対応する
            list.addEventListener('click', () => {
                showCharDetail(dataList, listIndex+1);
            })
        }
    );
})();

// 選択されたキャラの詳細を表示
function showCharDetail(charList, charIndex) {
    let currentElement;
    let newElement;

    // キャラが選択されていないとき、
    // #selectCharを削除し、#detailを表示
    if(document.querySelector('#selectChar') !== null){
        document.querySelector('#selectChar').remove();
        document.querySelector('#detail').removeAttribute('style');
    }

    // キャラデータを探索し、IDが一致するキャラの詳細を表示
    // 制作物
    charList.forEach(function(charData){
        if(charIndex === charData['charId']){

            // 大ポトレ表示
            currentElement = document.querySelector('#detailLeft');
            if(null !== document.querySelector('#largePortrait')){
                // すでに表示されている場合は削除
                document.querySelector('#largePortrait').remove();
            }
            newElement = document.createElement('img');
            newElement.src = charData['largePortrait'];
            newElement.id = 'largePortrait';
            currentElement.appendChild(newElement);

            // キャラ名表示
            currentElement = document.querySelector('#headName');
            currentElement.innerHTML = charData['charName'];

            // ランク表示
            currentElement = document.querySelector('#charRank');
            currentElement.innerHTML = charData['rank'];

            // 状況表示
            currentElement = document.querySelector('#charState');
            currentElement.innerHTML = charData['state'];

            // 説明文表示
            currentElement = document.querySelector('#detailText');
            if(null !== document.querySelector('#description')){
                // すでに表示されている場合は削除
                document.querySelector('#description').remove();
            }
            newElement = document.createElement('p');
            newElement.innerHTML = charData['description'];
            newElement.id = 'description';
            currentElement.appendChild(newElement);

            // パレットリスト配下の要素がある場合は全削除
            currentElement = document.querySelector('#palletList');
            while(currentElement.hasChildNodes()){
                currentElement.removeChild(currentElement.firstChild);
            }
            // カラー差の数だけループ
            charData['detail'].forEach(
                (charDataDetail, palListIndex) => {
                    // パレットリストにカラーを追加
                    newElement = document.createElement('li');
                    newElement.innerHTML = charDataDetail['palNo'] + 'P';
                    currentElement.appendChild(newElement);

                    // 追加したパレット要素にイベントリスナーを設定し、
                    // クリック時にそのパレットに対応したイメージを表示する
                    currentElement.children[palListIndex].addEventListener('click', () => {
                        generateCharImageFromPallet(charDataDetail);
                    });
                }
            );
            // デフォルトパレットを表示
            // (キャラ選択時に自動的に表示される)
            generateCharImageFromPallet(charData['detail'][0]);

            // ダウンロードリンクがある場合は表示
            currentElement = document.querySelector('#linkText');
            if(currentElement.hasChildNodes()){
                // すでに表示されている場合は削除
                currentElement.removeChild(currentElement.firstChild);
            }
            if(charData['downloadLink'] !== ""){
                newElement = document.createElement('a');
                newElement.href = charData['downloadLink'];
                newElement.innerHTML = 'Download';
                currentElement.appendChild(newElement);
            }
            
        }
    });
}

// キャラのパレットに応じたイメージを生成
function generateCharImageFromPallet(palData){
    let currentElement;
    let newElement;
    
    // スプライトを表示
    currentElement = document.querySelector('#imageWrapper');
    if(null !== document.querySelector('#sprite')){
        // すでに表示されている場合は削除
        document.querySelector('#sprite').remove();
    }
    newElement = document.createElement('img');
    newElement.id = 'sprite';
    newElement.src = palData['sprite'];
    currentElement.appendChild(newElement);

    // 背景画像がある場合は表示
    if(null !== document.querySelector('#backgroundImage')){
        // すでに表示されている場合は削除
        document.querySelector('#backgroundImage').remove();
    }
    if(palData['backgroundImage'] !== ""){
        currentElement = document.querySelector('#imageWrapper');
        newElement = document.createElement('img');
        newElement.id = 'backgroundImage';
        newElement.src = palData['backgroundImage'];
        currentElement.appendChild(newElement);
    }

    // スプライト手前に表示するExplodがある場合
    currentElement = document.querySelector('#explodFront');
    while(currentElement.hasChildNodes()){
        currentElement.removeChild(currentElement.firstChild);
    }
    if(palData['frontExplods'].length){
        // Explodの表示枚数分ループ
        palData['frontExplods'].forEach(
            (frontExplodDetail, frontExplodIndex) => {
                newElement = document.createElement('img');
                newElement.src = frontExplodDetail['path'];
                currentElement.appendChild(newElement);
                // スタイル設定(画像が読み込まれたら実行する)
                currentElement.children[frontExplodIndex].addEventListener('load', e => {
                    explodStyle(e.target, frontExplodDetail);
                });
            }
        );
    }

    // スプライト奥に表示するExplodがある場合
    currentElement = document.querySelector('#explodBack');
    while(currentElement.hasChildNodes()){
        currentElement.removeChild(currentElement.firstChild);
    }
    if(palData['backExplods'].length){
        palData['backExplods'].forEach(
            (backExplodDetail, backExplodIndex) => {
                newElement = document.createElement('img');
                newElement.src = backExplodDetail['path'];
                currentElement.appendChild(newElement);
                // スタイル設定(画像が読み込まれたら実行する)
                currentElement.children[backExplodIndex].addEventListener('load', e => {
                    explodStyle(e.target, backExplodDetail);
                });
            }
        );
    }
}

// 表示するExplodにスタイルを適用する
function explodStyle(explodElement, explodData) {
    // 拡大率(x,y)
    explodElement.style.width = explodElement.naturalWidth * explodData['scale-x'] + 'px';
    explodElement.style.height = explodElement.naturalHeight * explodData['scale-y'] + 'px';
    // 座標(x,y) ※基準点は要素の下中央
    explodElement.style.left = explodData['pos-x'] + 'px';
    explodElement.style.bottom = explodData['pos-y'] + 'px';
    // 合成モード
    if('add' === explodData['trans']){
        explodElement.classList.add('transAdd'); // 加算
    }
    else if('sub' === explodData['trans']){
        explodElement.classList.add('transSub'); // 減算
    }
}