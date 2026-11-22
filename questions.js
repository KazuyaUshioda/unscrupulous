// 問題データ。ここを編集すれば問題を追加・変更できます。
// severity: 過激度 1(軽い)〜3(重い)。重い問題を受け入れられるほど許容度への影響が大きくなる。

const GENRES = [
  { id: "nation",   label: "人種・国籍" },
  { id: "religion", label: "宗教" },
  { id: "gender",   label: "性別・ジェンダー" },
  { id: "health",   label: "障害・病気" },
  { id: "death",    label: "死・災害" },
  { id: "money",    label: "貧困・格差" },
  { id: "looks",    label: "容姿・年齢" },
];

const QUESTIONS = [
  // 人種・国籍
  { genre: "nation", severity: 2, text: "中国では政府を批判した人がいつの間にかいなくなるので、政府のネットでの評判はいつも満点だ。" },
  { genre: "nation", severity: 2, text: "イギリスはかつて世界の4分の1を支配していたが、料理のレシピだけはどこからも奪ってこなかった。" },
  { genre: "nation", severity: 3, text: "空港の保安検査で毎回別室に呼ばれるアラブ系の友人は、もう検査員と顔なじみになって世間話をしている。" },
  { genre: "nation", severity: 3, text: "アメリカで銃乱射事件のニュースが流れると、日本人は「怖いね」と言い、アメリカ人は「今週は少ないね」と言う。" },
  { genre: "nation", severity: 3, text: "「日本人は勤勉だ」という評判の半分は、過労死の件数が証明している。" },

  // 宗教
  { genre: "religion", severity: 2, text: "地下鉄で持ち主のわからない袋を見つけたとき、日本人は誰も通報せず、黙って隣の車両に移る。" },
  { genre: "religion", severity: 2, text: "勧誘を断ったら「あなたは救われない」と言われた。月3万払えば救われるらしい。" },
  { genre: "religion", severity: 3, text: "教祖が逮捕されたとき、信者たちは「これも修行だ」と言って、一緒に留置所に入りたがった。" },
  { genre: "religion", severity: 3, text: "祈りで病気が治ると説いていた教祖が亡くなった。死因は、病院に行かなかったことだった。" },
  { genre: "religion", severity: 3, text: "神様は全知全能らしいが、大地震の日に何をしていたのかは、どの宗教も説明してくれない。" },

  // 性別・ジェンダー
  { genre: "gender", severity: 2, text: "「女性の社会進出」を掲げる社長の会社で、女性が進出しているのは受付だけだ。" },
  { genre: "gender", severity: 2, text: "男性の自殺率は女性の2倍以上あるが、その話題はだいたい「男なんだから」の一言で終わる。" },
  { genre: "gender", severity: 2, text: "女の子だとわかると中絶する国があったせいで、その国では今、男たちが結婚相手を奪い合っている。" },
  { genre: "gender", severity: 3, text: "妊娠を報告したら、上司は「おめでとう」の次に「で、いつ辞めるの？」と聞いてきた。" },
  { genre: "gender", severity: 3, text: "DV夫が逮捕された。近所の人いわく「挨拶をする良い人だった」。挨拶だけは殴らずにできたらしい。" },

  // 障害・病気
  { genre: "health", severity: 2, text: "うつ病の友人を励まそうと「もっと辛い人もいるよ」と言ったら、友人は本当にその「もっと辛い人」になった。" },
  { genre: "health", severity: 2, text: "抗がん剤で髪が抜けた叔母は「美容院代が浮く」と笑っていたが、浮いたのは半年分だけだった。" },
  { genre: "health", severity: 2, text: "植物状態の祖父に毎日話しかけていた祖母は、医者に「聞こえていません」と言われてから、悪口を言うようになった。" },
  { genre: "health", severity: 3, text: "認知症の祖母が毎日お年玉をくれるので、家族会議で治療は急がないことに決まった。" },
  { genre: "health", severity: 3, text: "出生前診断で障害がわかった夫婦は「どんな子でも愛する」と言っていたが、翌週には病院の予約を取り直していた。" },

  // 死・災害
  { genre: "death", severity: 2, text: "火葬場の待ち時間に出された弁当がおいしすぎて、親戚の誰かが「また来たいね」と言った。" },
  { genre: "death", severity: 3, text: "生命保険の受取人を妻にしたら、食卓から野菜が消えた。" },
  { genre: "death", severity: 3, text: "事故物件に住んでいるが、家賃が相場の半額なので、前の住人には感謝している。" },
  { genre: "death", severity: 3, text: "健康のために毎日10キロ走っていた父は、健康なままトラックにはねられた。" },
  { genre: "death", severity: 3, text: "震災で家族を全員亡くした男性は、テレビ局に何度も取材されたせいで、泣くタイミングを覚えてしまった。" },

  // 貧困・格差
  { genre: "money", severity: 2, text: "「アットホームな職場」とは、家に帰れないので職場が家になるという意味だ。" },
  { genre: "money", severity: 2, text: "生活保護の不正受給を叩いていた叔父は、自分の確定申告だけは誰にも見せない。" },
  { genre: "money", severity: 3, text: "炊き出しの列で、前に並んでいたのは元上司だった。初めて先輩らしく見えた。" },
  { genre: "money", severity: 3, text: "息子は「親ガチャに外れた」と嘆いているが、親のほうも子ガチャに外れたと思っている。" },
  { genre: "money", severity: 3, text: "ブラック企業を辞めた友人の退職理由は「死にたくなったから」。離職票には「一身上の都合」と書かれていた。" },

  // 容姿・年齢
  { genre: "looks", severity: 2, text: "マッチングアプリで会った相手が写真と違いすぎて、思わず身分証を見せてもらった。" },
  { genre: "looks", severity: 2, text: "薄毛の人に「帽子が似合いますね」と言うのは、ほぼ死体蹴りだ。" },
  { genre: "looks", severity: 3, text: "美人は3日で飽きる、ブスは3日で慣れる。じゃあ3日で飽きられたブスはどうすればいいのか。" },
  { genre: "looks", severity: 3, text: "整形を繰り返した彼女は、子どもが生まれて初めて自分の元の顔を見た。" },
  { genre: "looks", severity: 3, text: "老人ホームの恋愛は、ライバルが自然にいなくなっていく。" },
];
