// 問題データ。ここを編集すれば問題を追加・変更できます。
// severity: 過激度 1(軽い)〜3(重い)。重い問題を笑えるほど許容度への影響が大きくなる。

const GENRES = [
  { id: "nation",   label: "人種・国籍" },
  { id: "religion", label: "宗教" },
  { id: "gender",   label: "性別・ジェンダー" },
  { id: "health",   label: "障害・病気" },
  { id: "death",    label: "死・災害" },
  { id: "sex",      label: "下ネタ" },
  { id: "money",    label: "貧困・格差" },
  { id: "looks",    label: "容姿・年齢" },
];

const QUESTIONS = [
  // 人種・国籍
  { genre: "nation", severity: 1, text: "日本人の「検討します」は、世界一丁寧な「お断りします」だ。" },
  { genre: "nation", severity: 1, text: "ドイツ人のジョークは、笑うタイミングまで工程表に書いてある。" },
  { genre: "nation", severity: 2, text: "イギリス料理を褒める方法は一つしかない。「量が少ないですね」。" },
  { genre: "nation", severity: 2, text: "アメリカ人に地図で日本を指してもらったら、まず地図そのものを指した。" },
  { genre: "nation", severity: 3, text: "京都は観光客が増えすぎて「日本人を探せ」という新しい観光ゲームが始まった。" },

  // 宗教
  { genre: "religion", severity: 1, text: "クリスマスを祝い、除夜の鐘を聞き、初詣に行く。日本人が信仰しているのはイベントだ。" },
  { genre: "religion", severity: 1, text: "お賽銭5円で「ご縁」を願うのは、神様相手のなかなか強気な値切り交渉だ。" },
  { genre: "religion", severity: 2, text: "天国がそんなに良い所なら、なぜ聖職者はみんな健康法に詳しいのか。" },
  { genre: "religion", severity: 3, text: "壺を買えば幸せになれると言われた。確かに売った人は幸せそうだった。" },
  { genre: "religion", severity: 3, text: "神は乗り越えられる試練しか与えない。乗り越えられなかった人は、神の見積もりミスだ。" },

  // 性別・ジェンダー
  { genre: "gender", severity: 1, text: "「男は黙って」と言われたので黙っていたら「何か言ってよ」と怒られた。" },
  { genre: "gender", severity: 1, text: "女子会の「全然食べてない」に、デザート3皿目までは含まれない。" },
  { genre: "gender", severity: 2, text: "「女性ならではの視点を」と求められた会議で、女性は彼女一人だった。" },
  { genre: "gender", severity: 2, text: "婚活市場では、男の年収と女の年齢が「顔」と呼ばれている。" },
  { genre: "gender", severity: 3, text: "部長がハラスメント研修で学んだのは「証拠を残さないこと」だった。" },

  // 障害・病気
  { genre: "health", severity: 1, text: "健康診断の前日だけ健康になる。これを一夜漬け健康法という。" },
  { genre: "health", severity: 1, text: "花粉症は、春の訪れを鼻で感じる日本人の繊細な季節感だ。" },
  { genre: "health", severity: 2, text: "うつ病の友人に「頑張れ」と言ったら、頑張って寝込んでくれた。" },
  { genre: "health", severity: 3, text: "認知症の祖父は毎朝「はじめまして」と言ってくれる。毎日が新鮮で少し羨ましい。" },
  { genre: "health", severity: 3, text: "点字メニューを導入した店。料理の写真付きにしたのは店長のこだわりだ。" },

  // 死・災害
  { genre: "death", severity: 1, text: "お墓参りで近況報告をした。返事がないのは、たぶん既読無視だ。" },
  { genre: "death", severity: 2, text: "遺言に「葬式は質素に」と書いたら、本当に誰も来なかった。" },
  { genre: "death", severity: 2, text: "終活セミナーの参加者名簿は、毎年自然に短くなっていく。" },
  { genre: "death", severity: 2, text: "地震速報が鳴った瞬間、まず推しのアカウントの安否を確認した。" },
  { genre: "death", severity: 3, text: "孤独死した男性の部屋から『生きがいの見つけ方』という本が見つかった。" },

  // 下ネタ
  { genre: "sex", severity: 1, text: "彼の「今夜は寝かせないよ」は、ゲームのランクマッチの話だった。" },
  { genre: "sex", severity: 1, text: "ブラウザの履歴を消す速さだけは、誰にも負けない自信がある。" },
  { genre: "sex", severity: 2, text: "少子化対策に一番効果があるのは、大規模停電らしい。" },
  { genre: "sex", severity: 2, text: "彼の自慢話はいつも長い。他のことは短いのに。" },
  { genre: "sex", severity: 3, text: "AVの「素人」の定義に一番詳しいのは、たぶん税務署だ。" },

  // 貧困・格差
  { genre: "money", severity: 1, text: "給料日の財布は、誕生日ケーキのろうそくのように一瞬で消える。" },
  { genre: "money", severity: 1, text: "「お金で幸せは買えない」と言うのは、だいたいお金を持っている人だ。" },
  { genre: "money", severity: 2, text: "「アットホームな職場」とは、家に帰れないので職場が家になるという意味だ。" },
  { genre: "money", severity: 2, text: "年金がもらえるかどうかは、年金事務所より占い師に聞いたほうが早い。" },
  { genre: "money", severity: 3, text: "炊き出しの列で、前に並んでいたのは元上司だった。初めて先輩らしく見えた。" },

  // 容姿・年齢
  { genre: "looks", severity: 1, text: "自撮りの加工が強すぎて、顔認証に本人と認めてもらえなかった。" },
  { genre: "looks", severity: 1, text: "同窓会は、誰が一番変わったかを確かめる答え合わせの会だ。" },
  { genre: "looks", severity: 2, text: "おじさんの「若い頃はモテた」は、検証不能な自己申告だ。" },
  { genre: "looks", severity: 2, text: "薄毛は遺伝するらしい。父の頭を見れば自分の未来がわかる。わかりたくなかった。" },
  { genre: "looks", severity: 3, text: "婚活プロフィールの「ぽっちゃり」は、実物が写真よりひと回り大きいという意味だ。" },
];
