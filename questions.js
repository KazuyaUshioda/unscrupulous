// 問題データ。ここを編集すれば問題を追加・変更できます。
// severity: 過激度 1(軽い)〜3(重い)。重い問題を受け入れられるほど許容度への影響が大きくなる。

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
  { genre: "nation", severity: 2, text: "「差別はよくない」と語る先輩が、カレー屋で「なんでインド人じゃなくてネパール人なの？」と文句を言っていた。" },
  { genre: "nation", severity: 2, text: "「日本は単一民族だ」と言い張る人に限って、自分の先祖は三代前までしか知らない。" },
  { genre: "nation", severity: 3, text: "外国人労働者を「安い労働力」と呼ぶ社長。日本人社員のことも同じ名前で呼んでいる。" },
  { genre: "nation", severity: 3, text: "ハーフの子が日本で最初に覚える日本語は「どこの国の人？」だ。" },
  { genre: "nation", severity: 3, text: "「日本人は勤勉だ」という評判の半分は、過労死の件数が証明している。" },

  // 宗教
  { genre: "religion", severity: 2, text: "お坊さんの車が高級車なのは、極楽浄土の下見をしているからだと思う。" },
  { genre: "religion", severity: 2, text: "勧誘を断ったら「あなたは救われない」と言われた。月3万払えば救われるらしい。" },
  { genre: "religion", severity: 3, text: "「私は死なない」と説いた教祖の死後、教えは「死んでも死なない」に改訂された。" },
  { genre: "religion", severity: 3, text: "祈れば病気が治ると説く人ほど、一番いい病院を知っている。" },
  { genre: "religion", severity: 3, text: "「神は乗り越えられる試練しか与えない」と説いた牧師が、乗り越えられなかった信者の葬式を担当していた。" },

  // 性別・ジェンダー
  { genre: "gender", severity: 2, text: "「女性の社会進出」を掲げる社長の会社で、女性が進出しているのは受付だけだ。" },
  { genre: "gender", severity: 2, text: "男女平等を叫ぶ人も、沈む船の救命ボートの前では急に古風になる。" },
  { genre: "gender", severity: 2, text: "「女は感情的だ」と怒鳴り散らす課長。" },
  { genre: "gender", severity: 3, text: "セクハラで訴えられた部長の口癖は「昔はこれが普通だった」。昔は誰も訴えられなかっただけだ。" },
  { genre: "gender", severity: 3, text: "DV夫が逮捕された。近所の人いわく「挨拶をする良い人だった」。挨拶だけは殴らずにできたらしい。" },

  // 障害・病気
  { genre: "health", severity: 2, text: "うつ病の友人に「頑張れ」と言ったら、頑張って寝込んでくれた。" },
  { genre: "health", severity: 2, text: "入院中の祖父が「もう長くない」と言って家族を集めた。これで4回目だ。" },
  { genre: "health", severity: 2, text: "点字ブロックの上に自転車を停める人は、たぶん視力にも問題がある。" },
  { genre: "health", severity: 3, text: "認知症の祖母が毎日お年玉をくれる。毎日正月を演じてあげるのが、孫にできる親孝行だ。" },
  { genre: "health", severity: 3, text: "余命3か月と告げられた叔父が、ポイントカードを作るか一瞬迷っていた。" },

  // 死・災害
  { genre: "death", severity: 2, text: "祖父の葬式で、遺産の話が出た瞬間に親戚全員の涙が止まった。" },
  { genre: "death", severity: 3, text: "生命保険の受取人を妻にしたら、食卓から野菜が消えた。" },
  { genre: "death", severity: 3, text: "孤独死の第一発見者は、たいてい大家さんか宅配便の配達員だ。" },
  { genre: "death", severity: 3, text: "健康のために毎日10キロ走っていた父は、健康なままトラックにはねられた。" },
  { genre: "death", severity: 3, text: "「死ぬ気で働け」が口癖の社長は、社員が本当に死んだら「そこまでしろとは言っていない」と言った。" },

  // 下ネタ
  { genre: "sex", severity: 2, text: "少子化対策に一番効果があるのは、大規模停電らしい。" },
  { genre: "sex", severity: 2, text: "彼の自慢話はいつも長い。他のことは短いのに。" },
  { genre: "sex", severity: 3, text: "AVの「素人」の定義に一番詳しいのは、たぶん税務署だ。" },
  { genre: "sex", severity: 3, text: "両親の寝室から変な声が聞こえた。答え合わせは10か月後、弟という形でやってきた。" },
  { genre: "sex", severity: 3, text: "風俗で出会った嬢が、職場の新人だった。翌朝、お互い「はじめまして」からやり直した。" },

  // 貧困・格差
  { genre: "money", severity: 2, text: "「アットホームな職場」とは、家に帰れないので職場が家になるという意味だ。" },
  { genre: "money", severity: 2, text: "生活保護の不正受給を叩いていた叔父は、自分の確定申告だけは誰にも見せない。" },
  { genre: "money", severity: 3, text: "炊き出しの列で、前に並んでいたのは元上司だった。初めて先輩らしく見えた。" },
  { genre: "money", severity: 3, text: "「親ガチャに外れた」と嘆く息子。親のほうも、子ガチャに外れたと思っている。" },
  { genre: "money", severity: 3, text: "ブラック企業を辞めた友人の退職理由は「死にたくなったから」。離職票には「一身上の都合」と書かれていた。" },

  // 容姿・年齢
  { genre: "looks", severity: 2, text: "マッチングアプリで会った相手が写真と違いすぎて、思わず身分証を見せてもらった。" },
  { genre: "looks", severity: 2, text: "薄毛の人に「帽子が似合いますね」と言うのは、ほぼ死体蹴りだ。" },
  { genre: "looks", severity: 3, text: "美人は3日で飽きる、ブスは3日で慣れる。じゃあ3日で飽きられたブスはどうすればいいのか。" },
  { genre: "looks", severity: 3, text: "整形を繰り返した彼女。子どもが生まれて、初めて自分の元の顔を見た。" },
  { genre: "looks", severity: 3, text: "老人ホームの恋愛は、ライバルが自然にいなくなっていく。" },
];
